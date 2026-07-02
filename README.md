# 🍅 PomoPet

> A desktop pet pomodoro timer — A tiny tomato that lives on your desktop and helps you focus.  
> 桌面宠物番茄钟 — 一颗住在你桌面上的小番茄，帮你专注工作。

---

## ✨ Features | 功能

- 🍅 **Desktop Pet** — A cute tomato floating on your desktop, click to reveal the timer.  
  **桌面宠物** — 一颗可爱的番茄悬浮在桌面，点击展开计时器。

- ⏱ **Pomodoro Timer** — 25min focus → 5min break → auto-cycle. Customizable duration.  
  **番茄计时** — 25分钟专注 → 5分钟休息 → 自动循环。时长可自定义。

- 🖱 **Drag Anywhere** — Drag the tomato to any position on screen, position is remembered.  
  **自由拖拽** — 把番茄拖到屏幕任意位置，位置自动记忆。

- 🔔 **Notifications** — System notification + sound when a session ends.  
  **通知提醒** — 番茄结束 / 休息结束时系统通知 + 提示音。

- 📊 **Pomodoro Count** — Badge showing today's completed pomodoros.  
  **番茄计数** — 徽章显示今日已完成的番茄数。

- 🎨 **Frameless Transparent** — Minimalist design, blends into your desktop background.  
  **无边框透明** — 极简设计，融入桌面背景。

---

## 🚀 Usage | 使用方法

### Basic | 基础操作

| Action | How |
|--------|-----|
| **开始专注** Start Focus | 点击番茄 → 点击「开始专注」 |
| **暂停/继续** Pause/Resume | 点击计时器中间的 ▶ / ⏸ 按钮 |
| **跳过** Skip | 点击 ⏭ 按钮 |
| **收起** Collapse | 点击 ✕ 按钮，或点击桌面其他地方 |
| **移动番茄** Move | 按住番茄拖动到任意位置 |
| **退出** Quit | 点击番茄 → 点击「退出」 |

---

## 🛠 Dev | 开发

### Prerequisites | 环境要求

- **Node.js** v18+
- **pnpm**
- **Rust** (latest stable)
- **Windows WebView2** (Win11 自带)

### Setup | 安装

```bash
git clone <repo-url>
cd pomodoro-pet
pnpm install
```

### Run in dev mode | 开发模式运行

```bash
pnpm tauri dev
```

### Build release | 编译发布版

```bash
pnpm tauri build
```

`.exe` 文件在 `src-tauri/target/release/app.exe`

---

## 🏗 Tech Stack | 技术栈

| Layer | Tech |
|-------|------|
| Frontend | React 19 + TypeScript |
| Animation | Framer Motion |
| Styling | TailwindCSS 4 |
| State | Zustand |
| Desktop Shell | Tauri v2 (Rust) |

---

## 📁 Project Structure | 项目结构

```
pomodoro-pet/
├── src/                    # React frontend
│   ├── App.tsx             # Root component
│   ├── components/
│   │   ├── TomatoPet.tsx   # Idle pet + menu
│   │   └── TomatoTimer.tsx # Timer ring UI
│   ├── hooks/
│   │   └── useTimer.ts     # Timer logic
│   ├── stores/
│   │   └── timerStore.ts   # Zustand state
│   └── lib/
│       ├── notifications.ts
│       └── sound.ts        # Web Audio API synth
├── src-tauri/              # Tauri Rust backend
│   ├── src/lib.rs
│   ├── tauri.conf.json     # Window config
│   └── capabilities/
└── package.json
```

---

## 📝 License

MIT
