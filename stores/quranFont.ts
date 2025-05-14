import { QURAN_FONTS } from "@/types";
import { create } from "zustand";

type QuranFontSettingState = {
  QuranFont: QURAN_FONTS;
  setQuranFont: (font: QURAN_FONTS) => void;
};

export const useQuranFontSettings = create<QuranFontSettingState>((set) => ({
  QuranFont: QURAN_FONTS.UTHMANI,
  setQuranFont: (font) => set({ QuranFont: font }),
}));
