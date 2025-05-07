import { getAccessToken } from "@/lib";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 1209600; // Revalidate once a 14 days (86400 * 14)

// Ensure static generation for all chapter paths
export const dynamicParams = false;

export async function generateStaticParams() {
    const token = await getAccessToken();

    try {
        const response = await fetch(`${process.env.API_END_POINT}/chapters`, {
            headers: {
                Accept: 'application/json',
                'x-auth-token': token,
                'x-client-id': process.env.CLIENT_ID!,
            },
            next: { revalidate }
        });

        if (!response.ok) throw new Error(`Failed to fetch chapters: ${response.status}`);

        const data = await response.json();
        return data.chapters.map((chapter: Chapter) => ({
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
        const response = await fetch(`${process.env.API_END_POINT}/chapters/${params.surahNumber}`);
        if (!response.ok) return { title: `Surah ${params.surahNumber}` };

        const data = await response.json();
        const chapter = data.chapter as Chapter;

        return {
            title: `Surah ${chapter.name_simple} (${chapter.id})`,
            description: `Read and listen to Surah ${chapter.name_simple} - ${chapter.translated_name.name}`,
        };
    } catch {
        return { title: `Surah ${params.surahNumber}` };
    }
}

export default async function SurahPage({ params }: any) {  // eslint-disable-line @typescript-eslint/no-explicit-any  
    const token = await getAccessToken();

    try {
        const [chapterRes, versesRes, infoRes] = await Promise.all([
            fetch(`${process.env.API_END_POINT}/chapters/${params.surahNumber}`, {
                headers: {
                    Accept: 'application/json',
                    'x-auth-token': token,
                    'x-client-id': process.env.CLIENT_ID!,
                }, next: { revalidate }
            }),
            fetch(`${process.env.API_END_POINT}/verses/by_chapter/${params.surahNumber}?translations=131`, {
                headers: {
                    Accept: 'application/json',
                    'x-auth-token': token,
                    'x-client-id': process.env.CLIENT_ID!,
                }, next: { revalidate }
            }), // adjust translation ID
            fetch(`${process.env.API_END_POINT}/chapters/${params.surahNumber}/info`, {
                headers: {
                    Accept: 'application/json',
                    'x-auth-token': token,
                    'x-client-id': process.env.CLIENT_ID!,
                }, next: { revalidate }
            }),
        ]);

        if (!chapterRes.ok || !versesRes.ok || !infoRes.ok) notFound();

        const chapterData = await chapterRes.json();
        const versesData = await versesRes.json();
        const infoData = await infoRes.json();

        const chapter: Chapter = chapterData.chapter;
        const verses: Verse[] = versesData.verses;
        const info: ChapterInfo = infoData.chapter_info;

        if (!chapter) notFound();

        console.log("chapter data: ", chapter);
        console.log("verses data: ", verses);
        console.log("info data: ", info);

        return (
            <div className="p-6 space-y-8">
                <div className="text-center space-y-1">
                    <h1 className="text-2xl font-bold">Surah {chapter.id} - {chapter.name_simple}</h1>
                    <p className="text-gray-500">{chapter.translated_name.name} ({chapter.name_arabic})</p>
                    <p className="text-sm">{chapter.revelation_place} • {chapter.verses_count} verses</p>
                    {chapter.bismillah_pre && (
                        <p className="text-xl font-arabic mt-4">
                            بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                        </p>
                    )}
                </div>

                <div className="prose max-w-none text-justify" dangerouslySetInnerHTML={{ __html: info.text }} />

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
        console.error("Error fetching surah:", error);
        return (
            <div className="p-6 text-center">
                <h1 className="text-2xl font-bold">Error loading Surah {params.surahNumber}</h1>
                <p className="mt-4">Unable to load surah information. Please try again later.</p>
            </div>
        );
    }
}
