import { useSettingsStore } from "../stores/settingsStore";

const COLOR_OPTIONS = [
  { label: "经典红", value: "#FF6B6B" },
  { label: "温柔粉", value: "#F9A8D4" },
  { label: "元气橙", value: "#FB923C" },
  { label: "清新绿", value: "#4ADE80" },
  { label: "天空蓝", value: "#60A5FA" },
  { label: "薰衣紫", value: "#A78BFA" },
];

export default function PersonalizationTab() {
  const settings = useSettingsStore();
  const { updateSettings } = settings;

  return (
    <div className="flex flex-col gap-4 text-sm">
      {/* Preview */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 flex items-center justify-center h-32 overflow-hidden">
        <svg
          width={Math.min(settings.tomatoSize, 100)}
          height={Math.min(settings.tomatoSize, 100) * 1.1}
          viewBox="0 0 100 108"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="50" cy="56" rx="42" ry="40" fill={settings.tomatoColor} />
          <ellipse cx="38" cy="62" rx="16" ry="14" fill="#FFFFFF30" />
          <ellipse cx="32" cy="42" rx="14" ry="9" fill="#FFFFFF40" />
          <path d="M50 18 Q47 10 54 6" stroke="#4CAF50" strokeWidth="5" fill="none" strokeLinecap="round" />
          <ellipse cx="60" cy="14" rx="12" ry="5" fill="#66BB6A" transform="rotate(-25 60 14)" />
          <ellipse cx="44" cy="14" rx="10" ry="4" fill="#81C784" transform="rotate(15 44 14)" />
          <circle cx="38" cy="52" r="4" fill="#333" />
          <circle cx="62" cy="52" r="4" fill="#333" />
          <circle cx="39.5" cy="50.5" r="1.5" fill="white" />
          <circle cx="63.5" cy="50.5" r="1.5" fill="white" />
          <path d="M42 62 Q50 71 58 62" stroke="#333" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <circle cx="26" cy="58" r="5" fill="#FF6B6B40" />
          <circle cx="74" cy="58" r="5" fill="#FF6B6B40" />
        </svg>
      </div>

      {/* Color */}
      <Section title="🎨 番茄颜色">
        <div className="flex flex-wrap gap-2">
          {COLOR_OPTIONS.map((c) => (
            <button
              key={c.value}
              onClick={() => updateSettings({ tomatoColor: c.value })}
              className="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
              style={{
                backgroundColor: c.value,
                borderColor: settings.tomatoColor === c.value ? "#333" : "transparent",
              }}
              title={c.label}
            />
          ))}
          <input
            type="color"
            value={settings.tomatoColor}
            onChange={(e) => updateSettings({ tomatoColor: e.target.value })}
            className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-200"
          />
        </div>
      </Section>

      {/* Size */}
      <Section title="📏 番茄大小">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">小</span>
          <input
            type="range" min={60} max={120} step={5}
            value={settings.tomatoSize}
            onChange={(e) => updateSettings({ tomatoSize: Number(e.target.value) })}
            className="flex-1 h-1 accent-red-400"
          />
          <span className="text-xs text-gray-400">大</span>
          <span className="text-xs font-medium text-gray-800 w-10 text-right tabular-nums">
            {settings.tomatoSize}
          </span>
        </div>
      </Section>

      {/* Opacity */}
      <Section title="🔍 休眠透明度">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">淡</span>
          <input
            type="range" min={30} max={100} step={5}
            value={Math.round(settings.tomatoOpacity * 100)}
            onChange={(e) => updateSettings({ tomatoOpacity: Number(e.target.value) / 100 })}
            className="flex-1 h-1 accent-red-400"
          />
          <span className="text-xs text-gray-400">浓</span>
          <span className="text-xs font-medium text-gray-800 w-10 text-right tabular-nums">
            {Math.round(settings.tomatoOpacity * 100)}%
          </span>
        </div>
      </Section>

      {/* Theme */}
      <Section title="🌓 界面主题">
        <div className="flex gap-2">
          {(["light", "dark", "system"] as const).map((t) => (
            <button
              key={t}
              onClick={() => updateSettings({ theme: t })}
              className={`flex-1 py-1.5 text-xs rounded-lg transition-colors ${
                settings.theme === t
                  ? "bg-red-100 dark:bg-red-900/40 text-red-500 dark:text-red-400 font-medium"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {t === "light" ? "☀ 浅色" : t === "dark" ? "🌙 深色" : "💻 跟随系统"}
            </button>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-3">
      <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">{title}</h3>
      {children}
    </div>
  );
}
