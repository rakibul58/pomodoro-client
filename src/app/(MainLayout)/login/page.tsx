"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import VForm from "@/components/form/VForm";
import { Button } from "@/components/ui/button";
import VInput from "@/components/form/VInput";
import { AuthValidations } from "@/schemas/auth.validations";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserLogin } from "@/hooks/auth.hook";
import { useUser } from "@/context/user.provider";
import Loading from "@/components/modules/Shared/LoadingBlur";
import Image from "next/image";
import { Timer, BarChart, Coffee } from "lucide-react";
import timerImg from "../../../../public/timer.svg";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, setIsLoading: userLoading } = useUser();
  const redirect = searchParams.get("redirect");
  const [formKey, setFormKey] = useState(0);
  const [defaultValues, setDefaultValues] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const setPresetValues = (values: LoginForm) => {
    setDefaultValues(values);
    setFormKey((prev) => prev + 1);
  };

  const onSubmit = (data: LoginForm) => {
    handleUserLogin(data);
    userLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess, userLoading, user, redirect, router]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 py-8 my-10">
      {isPending && <Loading />}

      {/* Left side - Branding/Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="lg:w-1/2 flex items-center justify-center p-6 bg-primary/5 rounded-2xl"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6 text-primary">
            Welcome Back to Pomodoro
          </h1>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
            Pick up where you left off and stay focused
          </p>
          <div className="relative aspect-video w-full max-w-xl mx-auto rounded-xl overflow-hidden shadow-xl">
            <Image
              src={timerImg}
              alt="Pomodoro Timer illustration"
              className="object-cover w-full h-full"
              height={100}
              width={100}
            />
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="p-4 bg-background rounded-lg shadow-sm">
              <Timer className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Focus Timer
              </p>
            </div>
            <div className="p-4 bg-background rounded-lg shadow-sm">
              <BarChart className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Track Progress
              </p>
            </div>
            <div className="p-4 bg-background rounded-lg shadow-sm">
              <Coffee className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Smart Breaks
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right side - Login Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="bg-primary/5 p-6 rounded-lg mb-8">
            <h1 className="text-lg font-bold mb-4">Quick Access</h1>
            <div className="flex flex-wrap gap-3">
              <Button
                size="sm"
                onClick={() =>
                  setPresetValues({
                    email: "user1@gmail.com",
                    password: "123",
                  })
                }
              >
                User
              </Button>
            </div>
          </div>

          <VForm
            key={formKey}
            resolver={zodResolver(AuthValidations.loginValidationSchema)}
            onSubmit={onSubmit}
            defaultValues={defaultValues}
          >
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <VInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="Enter your email"
              />
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <VInput
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
              />
            </motion.div>

            <div className="flex items-center justify-end">
              <Link
                href="/forget-password"
                className="text-sm text-primary hover:text-primary/80 mb-6"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              className="w-full py-6 text-lg font-semibold"
              size="lg"
              type="submit"
            >
              {isPending ? "Signing in..." : "Sign In"}
            </Button>
          </VForm>

          <div className="text-center pt-6 border-t">
            <p className="text-gray-600 dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-primary hover:text-primary/80 font-semibold"
              >
                Create Account
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
