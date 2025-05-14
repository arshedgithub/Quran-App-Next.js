import QuranFontSwitcher from "./quranFontSwitcher";
import { X } from "lucide-react";

interface SettingsPaneProps {
    onSettingsClose: () => void;
}
export default function Settings({ onSettingsClose }: SettingsPaneProps) {
    return (
        <aside className="w-auto p-4 border-l border-gray-200 bg-white overflow-y-auto relative z-10">
            <button
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                onClick={onSettingsClose}
                title="Close Sidebar"
            >
                <X size={20} />
            </button>
            <h2 className="text-2xl font-semibold mb-4">Settings</h2>
            <QuranFontSwitcher />

            {/* more settings here */}
        </aside>
    )
}