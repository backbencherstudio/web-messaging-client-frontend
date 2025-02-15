"use client"; // ✅ Ensure this is a client component
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState("light"); // Default to light mode
    const [mounted, setMounted] = useState(false); // Prevent hydration mismatch

    useEffect(() => {
        // ✅ Only run this in the browser
        const storedTheme = localStorage.getItem("theme") || "light";
        setTheme(storedTheme);
        setMounted(true); // ✅ Component is now mounted
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };

    if (!mounted) return null; // ✅ Prevents hydration errors

    return (
        <button onClick={toggleTheme} className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full transition">
            {theme === "dark" ? "🌙" : "☀️"}
        </button>
    );
}
