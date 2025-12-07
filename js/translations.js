const translations = {
  pt: {
    title: "Régua de Intervalos",
    intervalsTitle: "Régua de Intervalos",
    scalesTitle: "Régua de Escalas",
    triadsTitle: "Régua de Tríades",
    pentatonicMinor: "Pentatônica Menor",
    minorScale: "Escala Menor",
    majorScale: "Escala Maior",
    triadMinor5d: "Tríade Menor com Quinta Diminuta",
    triadMinor: "Tríade Menor",
    triadMajor: "Tríade Maior",
    resetBtn: "Reiniciar",
  },
  en: {
    title: "Interval Ruler",
    intervalsTitle: "Interval Ruler",
    scalesTitle: "Scale Ruler",
    triadsTitle: "Triad Ruler",
    pentatonicMinor: "Pentatonic Minor",
    minorScale: "Minor Scale",
    majorScale: "Major Scale",
    triadMinor5d: "Diminished Triad",
    triadMinor: "Minor Triad",
    triadMajor: "Major Triad",
    resetBtn: "Reset",
  },
};

const toggleLanguage = () => {
  const currentLang = localStorage.getItem("language") || "pt";
  const newLang = currentLang === "pt" ? "en" : "pt";
  setLanguage(newLang);
};

const setLanguage = (lang) => {
  localStorage.setItem("language", lang);
  updateLanguage(lang);
  updateLanguageSelector(lang);
};

const getTranslation = (key, lang) => {
  return translations[lang]?.[key] || translations.pt[key];
};

const updateLanguage = (lang) => {
  document.title = getTranslation("title", lang);
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = getTranslation(key, lang);
  });
};

const updateLanguageSelector = (lang) => {
  const btn = document.querySelector("#language-toggle");

  console.log("Switching language to:", lang);
  if (btn) {
    btn.textContent = lang === "pt" ? "🇺🇸" : "🇧🇷";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const currentLanguage = localStorage.getItem("language") || "pt";
  setLanguage(currentLanguage);
});
