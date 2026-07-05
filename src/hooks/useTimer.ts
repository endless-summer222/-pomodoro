import { useEffect, useRef } from "react";
import { useTimerStore } from "../stores/timerStore";
import { useSettingsStore } from "../stores/settingsStore";
import { sendNotification, isNotificationPermissionGranted, requestNotificationPermission } from "../lib/notifications";
import { playEndSound } from "../lib/sound";

export function useTimer() {
  const {
    phase,
    timeRemaining,
    isRunning,
    setIsRunning,
    tick,
    completePomodoro,
    skipPhase,
    setPhase,
  } = useTimerStore();

  const autoStartBreak = useSettingsStore((s) => s.autoStartBreak);
  const autoStartFocus = useSettingsStore((s) => s.autoStartFocus);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Tick every second — stable interval, only depend on isRunning
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        tick();
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, tick]);

  // Handle timer completion
  useEffect(() => {
    if (isRunning && timeRemaining <= 0) {
      if (phase === "focus") {
        playEndSound();
        sendNotification("🍅 番茄完成！", "专注时间结束，休息一下吧~");
        completePomodoro();
        if (autoStartBreak) {
          setIsRunning(true);
        }
      } else {
        playEndSound();
        sendNotification("☕ 休息结束", "准备好开始下一个番茄了吗？");
        if (autoStartFocus) {
          setPhase("focus");
          setIsRunning(true);
        } else {
          setPhase("idle");
        }
      }
    }
  }, [timeRemaining, isRunning, phase, completePomodoro, setPhase, setIsRunning, autoStartBreak, autoStartFocus]);

  const startFocus = async () => {
    const granted = await isNotificationPermissionGranted();
    if (!granted) {
      await requestNotificationPermission();
    }
    setPhase("focus", true);
    setIsRunning(true);
  };

  const togglePause = () => {
    setIsRunning(!isRunning);
  };

  const skip = () => {
    skipPhase();
  };

  const startBreak = () => {
    setIsRunning(true);
  };

  return {
    phase,
    timeRemaining,
    isRunning,
    startFocus,
    togglePause,
    skip,
    startBreak,
  };
}
