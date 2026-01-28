import "./App.css"; 
import { MemoryRouter, Routes, Route, Link } from "react-router-dom";

function HomePage() {
    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Home Page</h1>
            <p className="mb-4">made by David Bischof {":)"}</p>
            <nav className="flex gap-2">
                <Link to="/settings" className="px-3 py-1 bg-blue-500 text-white rounded">Settings</Link>
                <Link to="/about" className="px-3 py-1 bg-green-500 text-white rounded">About</Link>
            </nav>
        </div>
    );
}

function SettingsPage () {
    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Settings</h1>
            <p className="mb-4">Configure your extension here</p>
            <Link to="/" className="px-3 py-1 bg-gray-500 text-white rounded">Back to Home</Link>
        </div>
    );
}

function AboutPage() {
    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">About</h1>
            <p className="mb-4">Playtime Controller Extension v1.0</p>
            <Link to="/" className="px-3 py-1 bg-gray-500 text-white rounded">Back to Home</Link>
        </div>
    );
}
 
function App() { 
    return ( 
        <MemoryRouter initialEntries={['/']}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/about" element={<AboutPage />} />
            </Routes>
        </MemoryRouter>
    ); 
} 
 
export default App; 
