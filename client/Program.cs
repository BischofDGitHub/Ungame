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

    [DllImport("user32.dll", SetLastError = true)]
    private static extern bool PostMessage(IntPtr hWnd, uint Msg, IntPtr wParam, IntPtr lParam);

    [DllImport("user32.dll")]
    private static extern bool IsWindowVisible(IntPtr hWnd);

    private const uint WM_CLOSE = 0x0010;

    private static readonly HttpClient client = new HttpClient();
    private const string SERVER_URL = "http://localhost:3000/test";

    // Blacklist of partial window titles to close
    private static readonly string[] Blacklist = { "Minecraft", "Fortnite", "Steam", "Discord" };

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
            await Task.Delay(10000);
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

                    // Check blacklist and close if match found
                    foreach (var blacklistedItem in Blacklist)
                    {
                        if (title.Contains(blacklistedItem, StringComparison.OrdinalIgnoreCase))
                        {
                            Console.WriteLine($"Closing prohibited window: {title}");
                            PostMessage(hWnd, WM_CLOSE, IntPtr.Zero, IntPtr.Zero);
                        }
                    }
                }
            }
            return true;
        }, IntPtr.Zero);

        return titles;
    }
}
