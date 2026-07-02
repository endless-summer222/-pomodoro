import { useState } from "react";
import { motion } from "framer-motion";
import SettingsTab from "./SettingsTab";
import PersonalizationTab from "./PersonalizationTab";

interface SettingsPanelProps {
  onClose: () => void;
  initialTab?: "settings" | "personalization";
}

type Tab = "settings" | "personalization";

export default function SettingsPanel({ onClose, initialTab = "settings" }: SettingsPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  return (
    <motion.div
      className="no-drag w-full h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Header with tabs */}
      <div className="flex items-center border-b border-gray-100 dark:border-gray-800 px-4 pt-3 pb-0">
        <TabButton
          active={activeTab === "settings"}
          onClick={() => setActiveTab("settings")}
          icon="⚙"
          label="设置"
        />
        <TabButton
          active={activeTab === "personalization"}
          onClick={() => setActiveTab("personalization")}
          icon="🎨"
          label="个性化"
        />
        <div className="flex-1 drag-region h-8" />
        <button
          onClick={onClose}
          className="no-drag w-7 h-7 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center hover:bg-gray-200 transition-colors text-xs"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "settings" ? <SettingsTab /> : <PersonalizationTab />}
      </div>
    </motion.div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`no-drag flex items-center gap-1 px-3 py-2 text-xs font-medium rounded-t-lg transition-colors ${
        active
          ? "text-red-500 border-b-2 border-red-500 bg-red-50/50"
          : "text-gray-400 hover:text-gray-600"
      }`}
    >
      <span className="text-sm">{icon}</span>
      {label}
    </button>
  );
}
