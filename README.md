# 🍅 PomoPet

> A desktop pet pomodoro timer — A tiny tomato that lives on your desktop and helps you focus.  
> 桌面宠物番茄钟 — 一颗住在你桌面上的小番茄，帮你专注工作。

[![GitHub](https://img.shields.io/badge/GitHub-endless--summer222%2F--pomodoro-181717?logo=github)](https://github.com/endless-summer222/-pomodoro)

---

## 🚀 Quick Start | 快速开始

### 直接运行（Windows）| Run Directly (Windows)

1. 找到项目根目录下的 **`PomoPet.exe`**，双击运行即可。  
   Find **`PomoPet.exe`** in the project root, double-click to run.

2. 番茄会出现在桌面上 — 点击它，选择「开始专注」即可开始第一个番茄钟。  
   The tomato appears on your desktop — click it, choose "开始专注" to start your first pomodoro.

> 💡 **提示**：`PomoPet.exe` 是已编译好的独立可执行文件，无需安装任何依赖，拷贝到任意位置均可运行。  
> **Tip**: `PomoPet.exe` is a pre-built standalone executable — no dependencies needed, copy it anywhere and run.

### 开发者运行 | Run as Developer

```bash
# 环境要求 | Prerequisites
# Node.js v18+ · pnpm · Rust (latest stable) · Windows WebView2 (built-in on Win11)

git clone https://github.com/endless-summer222/-pomodoro.git
cd pomodoro-pet
pnpm install
pnpm tauri dev        # 开发模式 | Dev mode
pnpm tauri build      # 编译发布版 | Build release (exe → src-tauri/target/release/)
```

---

## ✨ Features | 功能

- 🍅 **桌面宠物** Desktop Pet — 一颗可爱的番茄悬浮在桌面，点击展开菜单。A cute tomato floating on your desktop, click to reveal menu.

- ⏱ **番茄计时** Pomodoro Timer — 25′ 专注 → 5′ 短休 → 长休 → 自动循环，时长可调。25′ focus → 5′ short break → long break → auto-cycle, fully customizable.

- 🎨 **个性化定制** Personalization — 番茄颜色、大小、透明度、界面主题随心换。Tomato color, size, opacity, and UI theme — make it yours.

- ⚙ **丰富设置** Rich Settings — 自动开始、系统通知、音效、置顶、开机自启等。Auto-start, notifications, sound, always-on-top, auto-launch, and more.

- 🖱 **自由拖拽** Drag Anywhere — 把番茄拖到屏幕任意位置，位置自动记忆。Drag the tomato anywhere, position is remembered.

- 🔔 **通知提醒** Notifications — 阶段结束时系统通知 + 提示音。System notification + sound when a session ends.

- 📊 **番茄计数** Pomodoro Count — 徽章显示已完成番茄数。Badge showing completed pomodoros.

- 🪟 **无边框透明** Frameless Transparent — 极简设计，融入桌面。Minimalist design, blends into your desktop.

---

## 📖 Usage | 使用方法

### 🐾 基础操作 | Basic

| 操作      | Action         | 怎么做               | How                                           |
| ------- | -------------- | ----------------- | --------------------------------------------- |
| 开始专注    | Start Focus    | 点击番茄 → 点击「开始专注」   | Click tomato → "开始专注"                         |
| 暂停 / 继续 | Pause / Resume | 点击计时器中间的 ▶ / ⏸ 按钮 | Click the center play/pause button            |
| 跳过当前阶段  | Skip           | 点击 ⏭ 按钮           | Click the ⏭ skip button                       |
| 收起计时器   | Collapse       | 点击 ✕ 按钮，或点击桌面其他区域 | Click ✕ button, or click elsewhere on desktop |
| 移动番茄    | Move           | 按住番茄拖动到任意位置       | Hold and drag the tomato anywhere             |
| 退出应用    | Quit           | 点击番茄 → 点击「退出」     | Click tomato → "退出"                           |

---

### ⚙ 设置 | Settings

点击番茄 → 「设置」，进入设置面板。  
Click the tomato → "设置" to open the settings panel.

#### ⏱ 计时设置 | Timer Settings

| 设置项       | Setting              | 说明           | Description                   | 默认值   | Default |
| --------- | -------------------- | ------------ | ----------------------------- | ----- | ------- |
| 专注时长      | Focus Duration       | 每次专注的分钟数     | Minutes per focus session     | 25 分钟 |         |
| 短休息时长     | Short Break Duration | 专注后的短休息分钟数   | Minutes for short break       | 5 分钟  |         |
| 长休息时长     | Long Break Duration  | 每轮的长休息分钟数    | Minutes for long break        | 20 分钟 |         |
| 长休息间隔     | Long Break Interval  | 完成几个番茄后触发长休息 | Pomodoros before a long break | 4 个   |         |
| 休息后自动开始专注 | Auto-start Focus     | 休息结束后自动进入专注  | Auto-start focus after break  | 关     |         |
| 专注后自动开始休息 | Auto-start Break     | 专注结束后自动进入休息  | Auto-start break after focus  | 关     |         |

> 所有滑块直接拖动即可调整，实时生效。  
> Drag the sliders to adjust — takes effect immediately.

#### 🔔 通知 | Notifications

| 设置项  | Setting              | 说明             | Description                                | 默认值 | Default |
| ---- | -------------------- | -------------- | ------------------------------------------ | --- | ------- |
| 系统通知 | System Notifications | 阶段结束时弹出系统通知    | Pop up system notification when phase ends | 开   |         |
| 音效   | Sound                | 播放提示音          | Play alert sound                           | 开   |         |
| 音量   | Volume               | 提示音音量 (0-100%) | Alert sound volume                         | 50% |         |

#### 🖱 行为 | Behavior

| 设置项    | Setting                | 说明                | Description                            | 默认值 | Default |
| ------ | ---------------------- | ----------------- | -------------------------------------- | --- | ------- |
| 置顶显示   | Always on Top          | 番茄窗口始终在最前         | Keep tomato window always on top       | 开   |         |
| 失焦自动收回 | Collapse on Blur       | 点击其他窗口时计时器自动收起    | Auto-collapse timer when clicking away | 开   |         |
| 开机自启   | Auto-start with System | 系统启动时自动运行 PomoPet | Launch PomoPet on system startup       | 关   |         |

> 点击底部「恢复默认设置」可将所有设置重置为默认值。  
> Click "恢复默认设置" at the bottom to reset all settings to defaults.

---

### 🎨 个性化 | Personalization

点击番茄 → 「个性化」，进入个性化面板。  
Click the tomato → "个性化" to open the personalization panel.

#### 番茄颜色 | Tomato Color

6 种预设颜色 + 1 个自定义取色器，点击即可切换番茄颜色：  
6 preset colors + 1 custom color picker — click to change the tomato's color:

- 🔴 经典红 Classic Red  `#FF6B6B`
- 🩷 温柔粉 Soft Pink  `#F9A8D4`
- 🟠 元气橙 Vibrant Orange  `#FB923C`
- 🟢 清新绿 Fresh Green  `#4ADE80`
- 🔵 天空蓝 Sky Blue  `#60A5FA`
- 🟣 薰衣紫 Lavender  `#A78BFA`

> 右侧的取色器可选取任意颜色。The color picker on the right lets you choose any color.

#### 番茄大小 | Tomato Size

拖动滑块调整番茄尺寸，范围 60–120 px，顶部预览区实时展示效果。  
Drag to resize the tomato (60–120 px) — live preview at the top.

#### 休眠透明度 | Idle Opacity

控制番茄在非专注状态下的透明度（30%–100%），数值越低番茄越透明。  
Controls the tomato's transparency when idle (30%–100%) — lower = more transparent.

#### 界面主题 | UI Theme

三选一界面配色方案 | Choose from three color schemes:

- ☀ **浅色** Light — 明亮白底 | Bright white background
- 🌙 **深色** Dark — 暗色护眼 | Dark eye-friendly
- 💻 **跟随系统** System — 自动匹配系统主题 | Follows your system setting

---

## 🏗 Tech Stack | 技术栈

| Layer         | Tech                  |
| ------------- | --------------------- |
| Frontend      | React 19 + TypeScript |
| Animation     | Framer Motion         |
| Styling       | TailwindCSS 4         |
| State         | Zustand               |
| Desktop Shell | Tauri v2 (Rust)       |

---

## 📁 Project Structure | 项目结构

```
pomodoro-pet/
├── PomoPet.exe               # 🚀 预编译可执行文件 | Pre-built executable
├── src/                      # React frontend
│   ├── App.tsx               # 根组件 / 窗口 & 视图管理 | Root — window & view manager
│   ├── components/
│   │   ├── TomatoPet.tsx     # 桌面宠物 + 菜单 | Desktop pet + radial menu
│   │   ├── TomatoTimer.tsx   # 番茄计时器环形 UI | Timer ring UI
│   │   ├── SettingsPanel.tsx # 设置面板容器（标签页切换）| Settings panel with tabs
│   │   ├── SettingsTab.tsx   # 设置标签页 | Timer / notifications / behavior
│   │   └── PersonalizationTab.tsx  # 个性化标签页 | Color / size / opacity / theme
│   ├── hooks/
│   │   └── useTimer.ts       # 计时逻辑 | Timer engine
│   ├── stores/
│   │   ├── timerStore.ts     # 计时状态 | Timer state (Zustand)
│   │   └── settingsStore.ts  # 设置 & 个性化状态 | Settings & personalization state
│   └── lib/
│       ├── notifications.ts  # 系统通知 | System notification wrapper
│       └── sound.ts          # 音效 (Web Audio API) | Sound synth
├── src-tauri/                # Tauri Rust backend
│   ├── src/lib.rs
│   ├── tauri.conf.json       # 窗口配置 | Window config (transparent, frameless)
│   └── capabilities/
└── package.json
```

---

##  📝 License

MIT
