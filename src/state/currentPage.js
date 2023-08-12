import { proxy, useSnapshot } from "valtio";

const state = proxy({ language: "SP" });

export const setLanguage = (language) => {
  state.language = language;
};

export const useLanguage = () => {
  const { language } = useSnapshot(state, { sync: true });
  return language;
};
