"use client";

import { useQuranFontSettings } from "@/stores";
import { QURAN_FONTS } from "@/types";

const fonts = [
  { label: "Uthmani", value: QURAN_FONTS.UTHMANI },
  { label: "Imla'ei", value: QURAN_FONTS.IMLAEI },
  { label: "IndoPak", value: QURAN_FONTS.INDOPAK },
  { label: "Tajweed", value: QURAN_FONTS.UTHMANI_TAJWEED },
];

export default function QuranFontSwitcher() {
  const { QuranFont, setQuranFont } = useQuranFontSettings();

  return (
    <div>
      <h3 className="font-semibold mb-2">Quran Font</h3>
      <div className="inline-flex rounded-full bg-gray-100 p-1 space-x-1">
        {fonts.map((font) => (
          <button
            key={font.label}
            className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
              QuranFont === font.value
                ? "bg-white shadow text-black"
                : "text-gray-600 hover:bg-white"
            }`}
            onClick={() => setQuranFont(font.value)}
          >
            {font.label}
          </button>
        ))}
      </div>
    </div>
  );
}
