import { useSettingsStore } from "../stores/settingsStore";

export default function SettingsTab() {
  const settings = useSettingsStore();
  const { updateSettings } = settings;

  return (
    <div className="flex flex-col gap-4 text-sm">
      {/* Timer Section */}
      <Section title="⏱ 计时设置">
        <SliderRow label="专注时长" value={settings.focusDuration} unit="分钟" min={1} max={60} step={1}
          onChange={(v) => updateSettings({ focusDuration: v })} />
        <SliderRow label="短休息时长" value={settings.shortBreakDuration} unit="分钟" min={1} max={15} step={1}
          onChange={(v) => updateSettings({ shortBreakDuration: v })} />
        <SliderRow label="长休息时长" value={settings.longBreakDuration} unit="分钟" min={10} max={45} step={1}
          onChange={(v) => updateSettings({ longBreakDuration: v })} />
        <SliderRow label="长休息间隔" value={settings.longBreakInterval} unit="个番茄" min={2} max={8} step={1}
          onChange={(v) => updateSettings({ longBreakInterval: v })} />
        <ToggleRow label="休息后自动开始专注" enabled={settings.autoStartFocus}
          onChange={(v) => updateSettings({ autoStartFocus: v })} />
        <ToggleRow label="专注后自动开始休息" enabled={settings.autoStartBreak}
          onChange={(v) => updateSettings({ autoStartBreak: v })} />
      </Section>

      {/* Notification Section */}
      <Section title="🔔 通知">
        <ToggleRow label="系统通知" enabled={settings.notificationsEnabled}
          onChange={(v) => updateSettings({ notificationsEnabled: v })} />
        <ToggleRow label="音效" enabled={settings.soundEnabled}
          onChange={(v) => updateSettings({ soundEnabled: v })} />
        <SliderRow label="音量" value={settings.soundVolume} unit="%" min={0} max={100} step={5}
          onChange={(v) => updateSettings({ soundVolume: v })} />
      </Section>

      {/* Behavior Section */}
      <Section title="🖱 行为">
        <ToggleRow label="置顶显示" enabled={settings.alwaysOnTop}
          onChange={(v) => updateSettings({ alwaysOnTop: v })} />
        <ToggleRow label="失焦自动收回" enabled={settings.collapseOnBlur}
          onChange={(v) => updateSettings({ collapseOnBlur: v })} />
        <ToggleRow label="开机自启" enabled={settings.autoStartWithSystem}
          onChange={(v) => updateSettings({ autoStartWithSystem: v })} />
      </Section>

      {/* Reset */}
      <button
        onClick={() => settings.resetSettings()}
        className="w-full py-2 text-xs text-gray-400 hover:text-red-400 transition-colors border border-gray-100 rounded-xl"
      >
        恢复默认设置
      </button>
    </div>
  );
}

/* ===== Helper sub-components ===== */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-3">
      <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">{title}</h3>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function SliderRow({
  label, value, unit, min, max, step, onChange,
}: {
  label: string; value: number; unit: string; min: number; max: number; step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-xs text-gray-600 dark:text-gray-300 whitespace-nowrap">{label}</span>
      <div className="flex items-center gap-2">
        <input
          type="range" min={min} max={max} step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-20 h-1 accent-red-400"
        />
        <span className="text-xs font-medium text-gray-800 dark:text-gray-200 w-14 text-right tabular-nums">
          {value} {unit}
        </span>
      </div>
    </div>
  );
}

function ToggleRow({
  label, enabled, onChange,
}: {
  label: string; enabled: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-gray-600">{label}</span>
      <button
        onClick={() => onChange(!enabled)}
        className={`w-9 h-5 rounded-full transition-colors relative ${
          enabled ? "bg-red-400" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-4 h-4 rounded-full bg-white shadow-sm absolute top-0.5 transition-transform ${
            enabled ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}
