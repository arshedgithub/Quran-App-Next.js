import { X } from "lucide-react";
import Link from "next/link";

interface LeftSideBarProps {
    chapters: Chapter[];
    onSideBarClose: () => void;
}

export default function LeftSideBar({ chapters, onSideBarClose }: LeftSideBarProps) {
    return (

        <aside className="w-80 p-4 border-r border-blue-100 bg-white overflow-y-auto relative z-10">
            <button
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                onClick={onSideBarClose}
                title="Close Sidebar"
            >
                <X size={20} />
            </button>
            <h2 className="text-2xl font-semibold mb-4">Chapters</h2>
            <ul className="space-y-4">
                {chapters.map((chapter: Chapter) => (
                    <li key={chapter.id}>
                        <Link href={`/surah/${chapter.id}`} className="block">
                            <div className="flex items-center gap-4 px-2">
                                <div className="w-1/6 text-sm font-semibold text-gray-700">{chapter.id}</div>

                                <div className="w-3/6">
                                    <div className="text-sm font-medium">{chapter.name_simple}</div>
                                    <div className="text-xs text-gray-500 italic">{chapter.translated_name.name}</div>
                                </div>

                                <div className="w-2/6 text-xl font-bold text-right font-arabic">{chapter.name_arabic}</div>
                            </div>
                            <hr className="mt-2 border-t-2 border-blue-200" />
                        </Link>
                    </li>
                ))}
            </ul>

        </aside>
    )
}