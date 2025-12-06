const initTheme = () => {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("theme") || "light";
  root.setAttribute("data-theme", savedTheme);
};

const toggleTheme = () => {
  const root = document.documentElement;
  const currentTheme = root.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  root.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateToggleButton(newTheme);
};

const updateToggleButton = (theme) => {
  const btn = document.querySelector(".theme-toggle");
  if (btn) {
    btn.textContent = theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  const savedTheme = localStorage.getItem("theme") || "light";
  updateToggleButton(savedTheme);
});
