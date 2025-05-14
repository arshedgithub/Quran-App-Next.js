'use client';

import { useQuranFontSettings } from "@/stores";
import { QURAN_FONTS } from "@/types";

export default function VerseList({ verses }: { verses: Verse[] }) {
  const { QuranFont } = useQuranFontSettings();

  function setVerse(verse: Verse) {
    if (QuranFont == QURAN_FONTS.IMLAEI) return verse.text_imlaei
    else if (QuranFont == QURAN_FONTS.INDOPAK) return verse.text_indopak
    else return verse.text_uthmani
  }

  return (
    <div className="space-y-6">
      {verses.map((verse) => (
        <div key={verse.id} className="border-b pb-4">
          <p className="text-right font-arabic text-5xl">
            {setVerse(verse)}
          </p>
          <p className="text-lg mt-2">{verse.translations?.[0]?.text}</p>
          <p className="text-xs text-gray-500 text-right mt-1">({verse.verse_key})</p>
        </div>
      ))}
    </div>
  );
}
