import * as api from "src/api/main";
import { i18n } from "src/boot/i18n";
import { defineStore } from "pinia";
import { computed, ref } from "vue-demi";
import languages from "quasar/lang/index.json";
import { Quasar } from "quasar";
import { useI18n } from "vue-i18n";
const langList = import.meta.glob("../../node_modules/quasar/lang/*.mjs");
export const useMainStore = defineStore("main", () => {
  const baseURL = process.env.API || "";

  const availableLangs = ["ru", "uz-Latn", "uz-Cyrl"];
  const appLanguages = languages.filter((lang) =>
    availableLangs.includes(lang.isoName)
  );

  const defaultLangOptions = [
    {
      value: "ru",
      label: "Русский",
      shortName: "Рус",
      icon: "/images/lang/ru.png",
    },
    {
      value: "uz-Latn",
      label: "O'zbekcha",
      shortName: "O'zb",
      icon: "/images/lang/uz.png",
    },
    {
      value: "uz-Cyrl",
      label: "Ўзбекча",
      shortName: "Ўзб",
      icon: "/images/lang/uz.png",
    },
  ];

  const langOptions = [];

  appLanguages.forEach((lang) => {
    const res = defaultLangOptions.find((l) => l.value === lang.isoName);
    if (res) {
      langOptions.push({
        nativeName: lang.nativeName,
        ...res,
      });
    }
  });
  const { locale } = useI18n();

  const availableLocales = computed(() => {
    return langOptions.filter((v) => v.value !== locale.value);
  });
  const currentLocale = computed(() => {
    return langOptions.find((v) => v.value === locale.value) || {};
  });

  async function setLanguage(val = null) {
    const navigatorLang = navigator.language.split("-")[0];

    let lang = val || localStorage.getItem("locale") || navigatorLang;

    lang = availableLangs.find((v) => v.startsWith(lang));

    !lang && (lang = "ru");

    // const langQuasar = `quasar/lang/${lang}`;

    // const qLang = await import("quasar/lang/" + lang);

    try {
      langList[`../../node_modules/quasar/lang/${lang}.mjs`]().then((lang) => {
        Quasar.lang.set(lang.default);
      });
    } catch (err) {
      // Requested Quasar Language Pack does not exist,
      // let's not break the app, so catching error
    }
    // Quasar.lang.set(qLang.default);
    i18n.global.locale.value = lang;
    localStorage.setItem("locale", lang);
  }
  async function loadRegions() {
    const res = await api.loadRegions();
    return res?.regions;
  }
  async function loadDistricts(id) {
    const res = await api.loadDistricts(id);
    return res?.districts;
  }

  return {
    baseURL,
    setLanguage,
    availableLocales,
    currentLocale,
    loadRegions,
    loadDistricts,
  };
});
