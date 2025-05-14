"use client"

import NavBar from "./navbar";
import LeftSideBar from "./leftSidebar";
import Settings from "./settings";
import { useState } from "react";

export function Layout({ chapters, children }: { chapters: Chapter[], children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [settingsOpen, setSettingsOpen] = useState(false);

    function handleSideBarClose() {
        setSidebarOpen(false);
    }

    function handleSettingsClose() {
        setSettingsOpen(false);
    }

    function handleSideBar() {
        setSidebarOpen(!sidebarOpen);
        setSettingsOpen(false)
    }

    function handleSettings() {
        setSettingsOpen(!settingsOpen);
        setSidebarOpen(false);
    }

    return (
        <div className="h-screen flex flex-col">

            <NavBar onSideBarClick={handleSideBar} onSettingsClick={handleSettings} />

            <div className="flex flex-1 overflow-hidden">
                {sidebarOpen && <LeftSideBar chapters={chapters} onSideBarClose={handleSideBarClose} />}
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
                {settingsOpen && <Settings onSettingsClose={handleSettingsClose} />}
            </div>

        </div>
    );
}
