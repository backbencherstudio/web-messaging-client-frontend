"use client"

import { useState, useEffect } from "react";
import { TiWeatherSunny } from "react-icons/ti";
import { GoMoon } from "react-icons/go";

export default function ThemeToggle() {
    const [theme, setTheme] = useState("light"); // Default to light mode
    const [mounted, setMounted] = useState(false); // Prevent hydration mismatch

    useEffect(() => {
        // ✅ Only run this in the browser
        const storedTheme = localStorage.getItem("theme") || "light";
        setTheme(storedTheme);
        document.documentElement.classList.add(storedTheme); // Apply the stored theme
        setMounted(true); // ✅ Component is now mounted
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark"); // Toggle the dark class based on the new theme
    };

    if (!mounted) return null; // ✅ Prevents hydration errors

    return (
        <button onClick={toggleTheme} className="w-[54px] relative h-[28px] flex items-center bg-white dark:bg-custom-gradient rounded-[77px] p-[7px] border-[.77px] border-[#545460] transition">
        {theme === "dark" ? <span className="w-[18px] h-[18px] absoulte translate-x-full flex rounded-full bg-white text-black "><GoMoon /> </span> : <span className="w-[18px] h-[18px] absoulte  rounded-full bg-black text-white flex items-center justify-center p-[2px]"><TiWeatherSunny /></span> } 
           
           
            {/* <button className="w-[54px] h-[28px] flex items-center bg-white rounded-[77px] p-[7px] border ">
                        
                    </button> */}
        </button>
    );
}
