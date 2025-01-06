/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Clock, Flame, Brain, Timer, Star, Trophy } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetDashboard } from "@/hooks/focuss-sessions.hook";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import { BadgeIcon } from "@/components/modules/Shared/BadgeIcon";

const StatCardSkeleton = () => (
  <Card className="bg-gradient-to-br from-background/50 to-muted/50 backdrop-blur-sm border-border/50">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <Skeleton className="h-4 w-[100px] bg-muted/60" />
      <Skeleton className="h-4 w-4 rounded-full bg-muted/60" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-8 w-[60px] mb-2 bg-muted/60" />
      <Skeleton className="h-2 w-full bg-muted/60" />
    </CardContent>
  </Card>
);

const ChartSkeleton = () => (
  <Card className="bg-gradient-to-br from-background/50 to-muted/50 backdrop-blur-sm border-border/50">
    <CardHeader>
      <Skeleton className="h-6 w-[150px] mb-2 bg-muted/60" />
      <Skeleton className="h-4 w-[200px] bg-muted/60" />
    </CardHeader>
    <CardContent>
      <div className="h-[300px] flex items-center justify-center">
        <Skeleton className="h-full w-full bg-muted/60" />
      </div>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const { data, isLoading } = useGetDashboard();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6 min-h-screen bg-gradient-to-br from-background via-muted/5 to-background">
        <div className="text-center mb-8">
          <Skeleton className="h-10 w-[200px] mx-auto mb-2 bg-muted/60" />
          <Skeleton className="h-4 w-[300px] mx-auto bg-muted/60" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
      </div>
    );
  }

  const productivityScore = Math.min(100, (data.totalMinutes / 120) * 100);

  const getTimeOfDay = (timestamp: number) => {
    const hour = new Date(timestamp).getHours();
    if (hour < 9) return "Morning";
    if (hour < 21) return "Afternoon";
    return "Evening";
  };

  const sessionDistribution = data.recentSessions.reduce(
    (acc: Record<string, number>, session: { timestamp: number }) => {
      const timeOfDay = getTimeOfDay(session.timestamp);
      acc[timeOfDay] = (acc[timeOfDay] || 0) + 1;
      return acc;
    },
    {}
  );

  const sessionDistributionData = Object.entries(sessionDistribution).map(
    ([name, value]) => ({
      name,
      value: ((value as number) / data.recentSessions.length) * 100,
    })
  );

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <motion.div
      className="p-6 space-y-6 bg-gradient-to-br from-background via-muted/5 to-background min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="text-center mb-8" variants={itemVariants}>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-chart-3 to-chart-5 text-transparent bg-clip-text">
          Focus Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Your productivity journey visualized
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20 backdrop-blur-sm hover:border-primary/30 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Productivity Score
              </CardTitle>
              <Brain className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {productivityScore.toFixed(0)}%
              </div>
              <Progress
                value={productivityScore}
                className="mt-2 bg-primary/20"
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-br from-chart-2/20 to-chart-2/5 border-chart-2/20 backdrop-blur-sm hover:border-chart-2/30 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Current Streak
              </CardTitle>
              <Flame className="h-4 w-4 text-chart-2 animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {data.currentStreak} days
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Keep the momentum going!
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-br from-chart-3/20 to-chart-3/5 border-chart-3/20 backdrop-blur-sm hover:border-chart-3/30 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Focus Time
              </CardTitle>
              <Clock className="h-4 w-4 text-chart-3" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {Math.floor(data.totalMinutes / 60)}h {data.totalMinutes % 60}m
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Across {data.totalSessions} sessions
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-br from-chart-5/20 to-chart-5/5 border-chart-5/20 backdrop-blur-sm hover:border-chart-5/30 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Average Session
              </CardTitle>
              <Timer className="h-4 w-4 text-chart-5" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {Math.round(data.totalMinutes / data.totalSessions)} min
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Per focus session
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-br from-card to-muted/5 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Focus Time Trends</CardTitle>
              <CardDescription>Daily productivity patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    dataKey="minutes"

                    data={Object.entries(data.dailyStats).map(
                      ([date, stats]) => ({
                        date,
                        minutes: (
                          stats as {
                            totalMinutes: number;
                            sessionsCount: number;
                          }
                        ).totalMinutes,
                        sessions: (
                          stats as {
                            totalMinutes: number;
                            sessionsCount: number;
                          }
                        ).sessionsCount,
                      })
                    )}
                  >
                    <defs>
                      <linearGradient
                        id="colorMinutes"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={COLORS[1]}
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor={COLORS[1]}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={COLORS[1]}
                      opacity={0.3}
                    />
                    <XAxis dataKey="date" stroke={COLORS[1]} />
                    <YAxis stroke={COLORS[1]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="minutes"
                      stroke={COLORS[1]}
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorMinutes)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-br from-card to-muted/5 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Session Distribution</CardTitle>
              <CardDescription>Time of day breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sessionDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, value }) =>
                        `${name} (${value.toFixed(0)}%)`
                      }
                    >
                      {sessionDistributionData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          opacity={0.8}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                      formatter={(value: number) => `${value.toFixed(1)}%`}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-br from-card to-muted/5 border-border/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-primary" />
              <CardTitle>Achievement Badges</CardTitle>
            </div>
            <CardDescription>
              Your earned recognition and milestones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.badges.map((badge: any, index: number) => (
                <BadgeIcon key={index} badge={badge} />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-br from-card to-muted/5 border-border/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Recent Focus Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-muted/5">
                  <TableHead className="font-semibold">Time</TableHead>
                  <TableHead className="font-semibold">Duration</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data.recentSessions.map(
                  (session: {
                    id: number;
                    timestamp: number;
                    duration: number;
                    status: string;
                  }) => (
                    <TableRow
                      key={session.id}
                      className="hover:bg-muted/5 transition-colors"
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          {new Date(session.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Timer className="w-4 h-4 text-muted-foreground" />
                          {session.duration} minutes
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`
                          ${
                            session.status === "COMPLETED"
                              ? "bg-chart-3/20 text-chart-3 hover:bg-chart-3/30"
                              : "bg-muted/20 text-muted-foreground hover:bg-muted/30"
                          }
                          transition-colors
                        `}
                        >
                          <div className="flex items-center gap-1">
                            {session.status === "COMPLETED" ? (
                              <Star className="w-3 h-3" />
                            ) : (
                              <Timer className="w-3 h-3" />
                            )}
                            {session.status}
                          </div>
                        </Badge>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
