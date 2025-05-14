import { Globe, Menu, Search, Settings } from "lucide-react";

interface NavBarProps {
    onSideBarClick: () => void;
    onSettingsClick: () => void;
}

export default function NavBar({ onSideBarClick, onSettingsClick }: NavBarProps) {
    return (
        <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-white shadow-sm">
            <div className="flex items-center space-x-3">
                <button className="text-2xl" title="Menu" onClick={onSideBarClick}>
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

                <button onClick={onSettingsClick} title="Settings">
                    <Settings size={20} />
                </button>
            </div>
        </header>);
}