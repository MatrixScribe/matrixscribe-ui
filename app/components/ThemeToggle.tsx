"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-3 py-1 text-sm rounded-md bg-neutral-200 dark:bg-neutral-800"
    >
      {dark ? "Light" : "Dark"}
    </button>
  );
}
