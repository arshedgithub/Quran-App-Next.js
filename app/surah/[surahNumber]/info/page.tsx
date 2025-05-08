import { apiFetch } from "@/lib";
import { Link } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function generateStaticParams() {
    return Array.from({ length: 114 }, (_, i) => ({
        surahNumber: (i + 1).toString(),
    }));
}

export async function generateMetadata({ params }: any): Promise<Metadata> {    // eslint-disable-line @typescript-eslint/no-explicit-any 
    try {
        const chapterData = await apiFetch<{ chapter: Chapter }>(`/chapters/${params.surahNumber}`);
        if (!chapterData) return { title: `Surah ${params.surahNumber} Info` };

        const chapter = chapterData.chapter;
        return {
            title: `Surah ${chapter.name_simple} (${chapter.id}) - Info`,
            description: `Learn more about Surah ${chapter.name_simple}: ${chapter.translated_name.name}`,
        };
    } catch {
        return { title: `Surah ${params.surahNumber} Info` };
    }
}

export default async function SurahInfoPage({ params }: any) {  // eslint-disable-line @typescript-eslint/no-explicit-any 
    try {
        const { surahNumber } = params;

        const chapterData = await apiFetch<{ chapter: Chapter }>(`/chapters/${surahNumber}`);
        const infoData = await apiFetch<{ chapter_info: ChapterInfo }>(`/chapters/${surahNumber}/info`, { revalidate: 2592000 }); // 30 days

        const chapter = chapterData.chapter;
        const info = infoData.chapter_info;

        if (!chapter || !info) notFound();

        return (
            <div className="p-6 space-y-8">
                <div className="text-center space-y-1">
                    <h1 className="text-2xl font-bold">Surah {chapter.id} - {chapter.name_simple}</h1>
                    <p className="text-gray-500">{chapter.translated_name.name} ({chapter.name_arabic})</p>
                    <p className="text-sm flex items-center justify-center gap-2 text-gray-600">
                        {chapter.revelation_place === "makkah" ? "🕋" : "🕌"}
                        {chapter.revelation_place.charAt(0).toUpperCase() + chapter.revelation_place.slice(1)} • {chapter.verses_count} verses
                    </p>
                </div>

                <Link href={`/surah/${chapter.id}`} className="text-blue-600 hover:underline text-sm">
                    Go to Surah {chapter.name_simple} reading
                </Link>

                <div className="prose max-w-none text-justify" dangerouslySetInnerHTML={{ __html: info.text }} />
            </div>
        );
    } catch (error) {
        console.error("Error loading Surah Info:", error);
        return (
            <div className="p-6 text-center">
                <h1 className="text-2xl font-bold">Error loading Surah Info</h1>
                <p className="mt-4">Please try again later.</p>
            </div>
        );
    }
}
