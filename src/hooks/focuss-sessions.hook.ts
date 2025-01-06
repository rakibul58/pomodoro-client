"use client";
import {
  focusMetrics,
  getDashboard,
  logFocusSession,
} from "@/services/Focus-Sessions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetStats = () => {
  return useQuery({
    queryKey: ["user-stats"],
    queryFn: async () => {
      const response = await focusMetrics();
      return response?.data || {};
    },
  });
};

export const useLogSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (duration: number) => await logFocusSession({ duration }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-stats"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      toast("Session Completed! Great job!");
    },
  });
};

export const useGetDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const response = await getDashboard();
      return response?.data || {};
    },
  });
};
