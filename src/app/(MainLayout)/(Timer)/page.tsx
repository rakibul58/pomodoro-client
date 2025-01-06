"use client";
import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Timer } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetStats, useLogSession } from "@/hooks/focuss-sessions.hook";

const FOCUS_TIME = 1 * 60; // 25 minutes
const BREAK_TIME = 0.5 * 60; // 5 minutes

const TimerPage = () => {
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [focusAudio, setFocusAudio] = useState<HTMLAudioElement | null>(null);
  const [breakAudio, setBreakAudio] = useState<HTMLAudioElement | null>(null);
  const logSession = useLogSession();

  useEffect(() => {
    const focusNotification = new Audio("/notification.mp3");
    const breakNotification = new Audio("/break-complete.mp3");
    focusNotification.load();
    breakNotification.load();
    setFocusAudio(focusNotification);
    setBreakAudio(breakNotification);
  }, []);

  const { data: stats } = useGetStats();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSessionComplete();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleSessionComplete = async () => {
    if (!isMuted) {
      try {
        if (isBreak && breakAudio) {
          await breakAudio.play();
        } else if (!isBreak && focusAudio) {
          await focusAudio.play();
        }
      } catch (error) {
        console.error("Error playing notification:", error);
      }
    }

    if (!isBreak) {
      logSession.mutate(25);
    }

    setIsBreak(!isBreak);
    setTimeLeft(isBreak ? FOCUS_TIME : BREAK_TIME);
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getProgress = () => {
    const total = isBreak ? BREAK_TIME : FOCUS_TIME;
    return ((total - timeLeft) / total) * 100;
  };

  const getSessionsColor = () => {
    const sessions = stats?.sessionsCompleted || 0;
    if (sessions >= 20) return "text-green-500";
    if (sessions >= 10) return "text-yellow-500";
    return "text-blue-500";
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-card">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-3xl font-bold text-foreground">
                  {isBreak ? "Break Time" : "Focus Session"}
                </CardTitle>
                <CardDescription className="text-lg mt-2">
                  {isBreak ? "Time to recharge ⚡" : "Stay focused, stay productive 🎯"}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {isMuted ? <VolumeX /> : <Volume2 />}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="w-72 h-72 relative mb-8">
              <div className="absolute inset-0 rounded-full border-8 border-muted/30" />
              <svg
                className="absolute inset-0 transform -rotate-90"
                viewBox="0 0 100 100"
              >
                <circle
                  className={`${
                    isBreak ? "stroke-teal-500" : "stroke-primary"
                  } transition-all duration-500 ease-in-out`}
                  strokeWidth="8"
                  strokeLinecap="round"
                  fill="transparent"
                  r="46"
                  cx="50"
                  cy="50"
                  style={{
                    strokeDasharray: `${2 * Math.PI * 46}`,
                    strokeDashoffset: `${
                      (2 * Math.PI * 46 * (100 - getProgress())) / 100
                    }`,
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-6xl font-bold text-foreground mb-2">
                  {formatTime(timeLeft)}
                </span>
                <Badge
                  variant={isBreak ? "secondary" : "default"}
                  className="text-lg px-4 py-1"
                >
                  {isBreak ? "Break" : "Focus"}
                </Badge>
              </div>
            </div>

            <div className="flex space-x-4 mb-8">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="lg"
                      onClick={() => setIsRunning(!isRunning)}
                      className={`w-16 h-16 rounded-full ${
                        isBreak ? "bg-teal-500 hover:bg-teal-600" : "bg-primary hover:bg-primary/90"
                      }`}
                    >
                      {isRunning ? <Pause size={24} /> : <Play size={24} />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isRunning ? "Pause Timer" : "Start Timer"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => {
                        setIsRunning(false);
                        setTimeLeft(FOCUS_TIME);
                        setIsBreak(false);
                      }}
                      className="w-16 h-16 rounded-full"
                    >
                      <RotateCcw size={24} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Reset Timer</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card h-fit">
          <CardHeader>
            <CardTitle className="text-2xl">Today&apos;s Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted/30 p-6 rounded-xl">
              <h3 className="text-lg font-medium mb-3">Focus Time</h3>
              <div className="flex items-center space-x-3 mb-3">
                <Timer className="w-5 h-5 text-primary" />
                <span className="text-3xl font-bold">
                  {stats?.totalFocusTime || 0}
                  <span className="text-xl text-muted-foreground">min</span>
                </span>
              </div>
              <Progress
                value={stats?.totalFocusTime ? (stats.totalFocusTime / 240) * 100 : 0}
                className="h-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/30 p-4 rounded-xl">
                <h4 className="text-sm font-medium mb-2 text-muted-foreground">
                  Current Streak
                </h4>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">{stats?.currentStreak || 0}</span>
                  <span className="text-sm ml-1 text-muted-foreground">days</span>
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-xl">
                <h4 className="text-sm font-medium mb-2 text-muted-foreground">
                  Sessions
                </h4>
                <span className={`text-2xl font-bold ${getSessionsColor()}`}>
                  {stats?.sessionsCompleted || 0}
                </span>
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-xl">
              <h4 className="text-sm font-medium mb-2 text-muted-foreground">
                Focus Level
              </h4>
              <Badge 
                variant="secondary" 
                className={`text-lg ${stats?.focusLevel === "MASTER" ? "bg-gradient-to-r from-purple-500 to-pink-500" : ""}`}
              >
                {stats?.focusLevel || "BEGINNER"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TimerPage;