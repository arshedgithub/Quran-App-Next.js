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
        const { chapters } = data;
        
        return chapters.map((chapter: Chapter) => ({
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

    console.log("Surah page: ", params.surahNumber);
    
    try {
        const response = await fetch(
            `${process.env.API_END_POINT}/chapters/${params.surahNumber}`,
            {
                headers: {
                    Accept: 'application/json',
                    'x-auth-token': token,
                    'x-client-id': process.env.CLIENT_ID!,
                },
                next: { revalidate }
            }
        );

        if (!response.ok) {
            if (response.status === 404) notFound();
            throw new Error(`Failed to fetch surah data: ${response.status}`);
        }

        const data = await response.json();
        console.log("second api calling: ", data);
        
        const chapter = data.chapter as Chapter;
        if (!chapter) notFound();

        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold text-center">
                    Surah {chapter.id} - {chapter.name_simple}
                </h1>
                <p className="text-center text-gray-500 mt-2">
                    {chapter.translated_name.name} ({chapter.name_arabic})
                </p>

                <div className="mt-6">
                    <p className="text-center">{chapter.revelation_place} • {chapter.verses_count} verses</p>
                    {chapter.bismillah_pre && (
                        <p className="text-center text-xl mt-4 font-arabic">
                            بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                        </p>
                    )}
                </div>

                <div>
                    <div>verses and translation here</div>
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
