"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { FaSearch } from "react-icons/fa";

export default function DebouncedSearch({
  value,
  onChange,
  placeholder = "Search...",
  delay = 500,
  disabled = false,
}) {
  const [localValue, setLocalValue] = useState(value);
  const timeoutRef = useRef(null);

  // Sync local value with prop value without causing extra renders
  useEffect(() => {
    if (value !== localValue) {
      setLocalValue(value);
    }
  }, [value]);

  const handleChange = useCallback(
    (e) => {
      const newValue = e.target.value;
      setLocalValue(newValue);

      // Clear any pending timeouts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        onChange(newValue);
      }, delay);
    },
    [onChange, delay]
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-[50%] lg:w-full lg:max-w-[315px]">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={localValue}
        onChange={handleChange}
        className="w-full border bg-[#f9fafb] dark:bg-transparent border-[#EAF1FF] rounded-lg p-2 pl-10 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        disabled={disabled}
      />
    </div>
  );
}
