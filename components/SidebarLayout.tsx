"use client"

import { Globe, Menu, Search, Settings, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function SidebarLayout({ chapters, children }: { chapters: Chapter[], children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="h-screen flex flex-col">
            {/* Top Navbar */}
            <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-white shadow-sm">
                <div className="flex items-center space-x-3">
                    <button className="text-2xl" title="Menu" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <Menu size={24} />
                    </button>
                    <span className="text-lg font-semibold">Sri - Quran</span>
                </div>
                <div className="flex items-center space-x-4 text-xl">
                    <button title="Search">
                        <Search size={20} />
                    </button>
                    
                    <button title="Translation">
                        <Globe size={20} />
                    </button>
                    <div>English</div>

                    <button title="Settings">
                        <Settings size={20} />
                    </button>
                </div>
            </header>

            {/* Sidebar */}
            <div className="flex flex-1 overflow-hidden">
                {sidebarOpen && (
                    <aside className="w-80 p-4 border-r border-blue-100 bg-white overflow-y-auto relative z-10">
                        <button
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                            onClick={() => setSidebarOpen(false)}
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
                )}

                {/* Main content */}
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
        </div>
    );
}
