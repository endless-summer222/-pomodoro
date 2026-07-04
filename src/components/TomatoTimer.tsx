import { motion } from "framer-motion";
import { useTimerStore } from "../stores/timerStore";
import { playStartSound } from "../lib/sound";

interface TimerActions {
  startFocus: () => Promise<void>;
  togglePause: () => void;
  skip: () => void;
  startBreak: () => void;
}

interface TomatoTimerProps {
  onCollapse: () => void;
  timerActions: TimerActions;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function getPhaseLabel(phase: string): string {
  switch (phase) {
    case "focus": return "专注";
    case "short_break": return "短休息";
    case "long_break": return "长休息";
    default: return "准备";
  }
}

function getPhaseColor(phase: string): string {
  switch (phase) {
    case "focus": return "#EF4444";
    case "short_break": return "#22C55E";
    case "long_break": return "#3B82F6";
    default: return "#9CA3AF";
  }
}

export default function TomatoTimer({ onCollapse, timerActions }: TomatoTimerProps) {
  const { phase, timeRemaining, totalDuration, isRunning, completedPomodoros } = useTimerStore();
  const { startFocus, togglePause, skip, startBreak } = timerActions;

  const progress = totalDuration > 0 ? (totalDuration - timeRemaining) / totalDuration : 0;
  const color = getPhaseColor(phase);
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const svgSize = 152;

  const handleStart = () => {
    if (phase === "idle") {
      playStartSound();
      startFocus();
    } else if (phase === "short_break" || phase === "long_break") {
      playStartSound();
      startBreak();
    } else {
      togglePause();
    }
  };

  return (
    <motion.div
      className="drag-region relative flex flex-col items-center justify-center w-full h-full gap-2.5 p-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Phase label */}
      <span className="text-[11px] font-semibold tracking-widest uppercase" style={{ color }}>
        {getPhaseLabel(phase)}
      </span>

      {/* Timer circle */}
      <div className="relative">
        <svg width={svgSize} height={svgSize} className="-rotate-90">
          <circle
            cx={svgSize / 2} cy={svgSize / 2} r={radius}
            fill="none" stroke={color + "25"} strokeWidth="5"
          />
          <motion.circle
            cx={svgSize / 2} cy={svgSize / 2} r={radius}
            fill="none" stroke={color} strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            animate={{ strokeDashoffset: circumference * (1 - progress) }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </svg>

        {/* Center time */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-4xl font-bold tabular-nums text-gray-800 dark:text-white tracking-tight"
            key={timeRemaining}
            initial={{ opacity: 0.6, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15 }}
          >
            {formatTime(timeRemaining)}
          </motion.span>
          <span className="text-[11px] text-gray-400 mt-0.5">
            🍅 × {completedPomodoros}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 no-drag">
        {phase !== "idle" && (
          <motion.button
            className="w-8 h-8 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur text-gray-400 dark:text-gray-500 flex items-center justify-center hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors shadow-sm"
            onClick={skip} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} title="跳过"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polygon points="5 4 15 12 5 20 5 4" />
              <line x1="19" y1="5" x2="19" y2="19" />
            </svg>
          </motion.button>
        )}

        <motion.button
          className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg no-drag"
          style={{ backgroundColor: color }}
          onClick={handleStart} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
        >
          {isRunning ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="ml-0.5">
              <polygon points="7,3 21,12 7,21" />
            </svg>
          )}
        </motion.button>

        <motion.button
          className="w-8 h-8 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur text-gray-400 dark:text-gray-500 flex items-center justify-center hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors shadow-sm"
          onClick={onCollapse} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} title="收起"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
}
