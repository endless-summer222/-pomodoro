import { useEffect, useRef } from "react";
import { useTimerStore } from "../stores/timerStore";
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

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Tick every second
  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
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
  }, [isRunning, timeRemaining, tick]);

  // Handle timer completion
  useEffect(() => {
    if (isRunning && timeRemaining <= 0) {
      if (phase === "focus") {
        playEndSound();
        sendNotification("🍅 番茄完成！", "专注时间结束，休息一下吧~");
        completePomodoro();
      } else {
        playEndSound();
        sendNotification("☕ 休息结束", "准备好开始下一个番茄了吗？");
        setPhase("idle");
      }
    }
  }, [timeRemaining, isRunning, phase, completePomodoro, setPhase]);

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
