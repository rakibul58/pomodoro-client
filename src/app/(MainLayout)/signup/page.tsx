"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import VForm from "@/components/form/VForm";
import { Button } from "@/components/ui/button";
import VInput from "@/components/form/VInput";
import { Timer, BarChart, Coffee } from "lucide-react";
import { AuthValidations } from "@/schemas/auth.validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserRegistration } from "@/hooks/auth.hook";
import Loading from "@/components/modules/Shared/LoadingBlur";
import { useUser } from "@/context/user.provider";
import Image from "next/image";
import timerImg from "../../../../public/timer.svg";

export default function Signup() {
  const router = useRouter();
  const {
    mutate: handleUserRegistration,
    isPending,
    isSuccess,
  } = useUserRegistration();
  const { user, setIsLoading: userLoading } = useUser();

  const handleCreateUser: SubmitHandler<FieldValues> = (data) => {
    const registrationData = {
      name: data.name,
      email: data.email,
      password: data.password,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    handleUserRegistration(registrationData);
    userLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess && user) {
      router.push("/dashboard");
    }
  }, [isPending, isSuccess, user, router]);

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
            Focus Better with Pomodoro
          </h1>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
            Boost your productivity, one tomato at a time
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
                Customizable Timers
              </p>
            </div>
            <div className="p-4 bg-background rounded-lg shadow-sm">
              <BarChart className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Progress Tracking
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

      {/* Right side - Registration Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              Create Account
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Start your productivity journey today
            </p>
          </div>

          <VForm
            resolver={zodResolver(AuthValidations.createUserValidationSchema)}
            onSubmit={handleCreateUser}
          >
            <div className="space-y-4">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <VInput
                  label="Full Name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                />
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <VInput
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                />
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <VInput
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                />
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Button
                  className="w-full py-6 text-lg font-semibold"
                  size="lg"
                  type="submit"
                >
                  Create Account
                </Button>
              </motion.div>
            </div>
          </VForm>

          <div className="text-center pt-6 border-t">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary hover:text-primary/80 font-semibold"
              >
                Login
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
