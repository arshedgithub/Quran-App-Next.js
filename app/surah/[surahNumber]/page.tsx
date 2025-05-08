import { apiFetch } from "@/lib";
import { Link } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Ensure static generation for all chapter paths
export const dynamicParams = false;

export async function generateStaticParams() {
    try {
        const chapterData = await apiFetch<{ chapter: Chapter[] }>(`/chapters`, { revalidate: 2592000 });  // 30 days
        const chapter_list: Chapter[] = chapterData.chapter;

        if (!chapter_list) throw new Error(`Failed to fetch chapters...`);

        return chapter_list.map((chapter: Chapter) => ({
            surahNumber: chapter.id.toString(),
        }));

    } catch (error) {
        console.error("Error generating static params:", error);
        return Array.from({ length: 114 }, (_, i) => ({
            surahNumber: (i + 1).toString(),
        }));
    }
}

// Generate metadata for the page
export async function generateMetadata({ params }: any): Promise<Metadata> {    // eslint-disable-line @typescript-eslint/no-explicit-any
    try {
        const chapterData = await apiFetch<{ chapter: Chapter }>(`/chapters/${params.surahNumber}`);
        if (!chapterData) return { title: `Surah ${params.surahNumber}` };

        const chapter = chapterData.chapter as Chapter;
        return {
            title: `Surah ${chapter.name_simple} (${chapter.id})`,
            description: `Read and listen to Surah ${chapter.name_simple} - ${chapter.translated_name.name}`,
        };
    } catch {
        return { title: `Surah ${params.surahNumber}` };
    }
}

export default async function SurahPage({ params }: any) {  // eslint-disable-line @typescript-eslint/no-explicit-any  
    try {
        const { surahNumber } = params;

        const chapterData = await apiFetch<{ chapter: Chapter }>(`/chapters/${surahNumber}`);
        const versesData = await apiFetch<{ verses: Verse[] }>(`/verses/by_chapter/${surahNumber}?translations=131`);

        const chapter: Chapter = chapterData.chapter;
        const verses: Verse[] = versesData.verses;

        if (!chapter || !verses) notFound();

        return (
            <div className="p-6 space-y-8">
                <div className="text-center space-y-1">
                    <p className="text-sm">Surah {chapter.id}</p>
                    <h1 className="text-2xl font-bold">{chapter.name_simple} - {chapter.name_arabic}</h1>
                    <p className="text-gray-500">{chapter.translated_name.name}</p>
                    <p className="text-sm flex items-center justify-center gap-2 text-gray-600">
                        {chapter.revelation_place === "makkah" ? "🕋" : "🕌"}
                        {chapter.revelation_place.charAt(0).toUpperCase() + chapter.revelation_place.slice(1)} • {chapter.verses_count} verses
                    </p>

                    <Link href={`/surah/${chapter.id}/info`} className="text-blue-600 hover:underline text-sm">
                        Learn more about Surah {chapter.name_simple}
                    </Link>

                    {chapter.bismillah_pre && (
                        <p className="text-xl font-arabic mt-8 font-bold">
                            بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                        </p>
                    )}
                </div>

                <div className="space-y-6">
                    {verses.map((verse) => (
                        <div key={verse.id} className="border-b pb-4">
                            <p className="text-right font-arabic text-2xl">{verse.text_uthmani}</p>
                            <p className="text-sm mt-2">{verse.translations?.[0]?.text}</p>
                            <p className="text-xs text-gray-500 text-right mt-1">({verse.verse_key})</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error: any) {  // eslint-disable-line @typescript-eslint/no-explicit-any
        console.error("Error fetching surah: ", error);
        return (
            <div className="p-6 text-center">
                <h1 className="text-2xl font-bold">Error loading Surah {params.surahNumber}</h1>
                <p className="mt-4">Unable to load surah information. Please try again later.</p>
            </div>
        );
    }
}
