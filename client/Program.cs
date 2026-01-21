using System.Runtime.InteropServices;
using System.Text;
using System.Text.Json;

namespace WindowMonitor;

class Program
{
    // P/Invoke
    private delegate bool EnumWindowsProc(IntPtr hWnd, IntPtr lParam);

    [DllImport("user32.dll")]
    private static extern bool EnumWindows(EnumWindowsProc enumProc, IntPtr lParam);

    [DllImport("user32.dll", CharSet = CharSet.Unicode)]
    private static extern int GetWindowText(IntPtr hWnd, StringBuilder lpString, int nMaxCount);

    [DllImport("user32.dll")]
    private static extern bool IsWindowVisible(IntPtr hWnd);

    private static readonly HttpClient client = new HttpClient();
    private const string SERVER_URL = "http://localhost:3000/test";

    static async Task Main(string[] args)
    {
        while (true)
        {
            try
            {
                var windows = GetOpenWindows();
                var payload = new { windows };
                var json = JsonSerializer.Serialize(payload);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                // Send and fire-and-forget (or wait, but we don't care about response much)
                await client.PostAsync(SERVER_URL, content);
            }
            catch (Exception)
            {
                // Silently ignore errors (e.g. server down) to keep the monitor running
            }

            // Wait 30 seconds
            await Task.Delay(30000);
        }
    }

    private static List<string> GetOpenWindows()
    {
        var titles = new List<string>();

        EnumWindows((hWnd, lParam) =>
        {
            if (IsWindowVisible(hWnd))
            {
                var sb = new StringBuilder(256);
                GetWindowText(hWnd, sb, 256);
                var title = sb.ToString();

                // Filter out empty titles
                if (!string.IsNullOrWhiteSpace(title))
                {
                    titles.Add(title);
                }
            }
            return true;
        }, IntPtr.Zero);

        return titles;
    }
}
