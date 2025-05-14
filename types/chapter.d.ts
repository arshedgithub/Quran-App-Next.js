interface Chapter {
    id: number;
    name_simple: string;
    name_arabic: string;
    revelation_place: string;
    revelation_order: string;
    verses_count: number;
    bismillah_pre: boolean;
    translated_name: {
        name: string;
        language_name: string
    };
}

interface Verse {
    id: number;
    verse_number: number;
    text_uthmani: string;
    text_uthmani_simple: string;
    text_imlae: string;
    text_imlae_simple: string;
    verse_key: string;
    translations: { text: string }[];
    words: Word[]
}

interface Word {
    position: number;
    translation: {
        text: string;
    }
    transliteration: {
        text: string;
    }
}

interface ChapterInfo {
    text: string;
    short_text: string;
    source: string;
}