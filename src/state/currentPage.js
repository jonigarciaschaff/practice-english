import { proxy, useSnapshot } from "valtio";

const state = proxy({ language: "spanish" });

export const setLanguage = (language) => {
  state.language = language;
};

export const useLanguage = () => {
  const { language } = useSnapshot(state, { sync: true });
  return language;
};
