"use client";

import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const darkMode = localStorage.getItem("theme") === "dark";
    if (darkMode) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <button onClick={toggleDarkMode}
      className="rounded-full px-3 py-1 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
    >
      {isDark ? "☀" : "🌙"}
    </button>
  );
}
