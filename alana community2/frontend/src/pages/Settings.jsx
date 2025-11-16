import { useState, useEffect } from "react";

export default function Settings() {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedLang = localStorage.getItem("lang");

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }

    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  }

  function changeLanguage(e) {
    const lang = e.target.value;
    setLanguage(lang);
    localStorage.setItem("lang", lang);
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      <div className="space-y-6">

        {/* THEME */}
        <div className="flex items-center justify-between">
          <p className="font-medium">Theme</p>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700"
          >
            {theme === "light" ? "Switch to Dark" : "Switch to Light"}
          </button>
        </div>

        {/* LANGUAGE */}
        <div>
          <p className="mb-2 font-medium">Language</p>
          <select
            value={language}
            onChange={changeLanguage}
            className="border p-2 rounded"
          >
            <option value="en">English</option>
            <option value="el">Ελληνικά</option>
          </select>
        </div>
      </div>
    </div>
  );
}
