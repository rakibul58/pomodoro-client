"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Timer, Menu, BarChart, Settings, Coffee } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { useUser } from "@/context/user.provider";
import UserAvatarDropdown from "./UserAvatarDropdown";
import { useQueryClient } from "@tanstack/react-query";
import { logout } from "@/services/AuthServices";
import { protectedRoutes } from "@/constants";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, setIsLoading: userLoading } = useUser();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    queryClient.invalidateQueries({ queryKey: ["settings"] });
    await logout();
    userLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mainMenu = [
    { href: "/timer", label: "Timer", icon: Timer },
    { href: "/stats", label: "Statistics", icon: BarChart },
    { href: "/breaks", label: "Break Activities", icon: Coffee },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-[100] bg-background transition-all duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      {/* Timer Status Bar */}
      <div className="bg-primary/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-1.5">
          <p className="text-center text-primary-foreground text-sm font-medium">
            Current Focus Session: 25:00
          </p>
        </div>
      </div>

      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-6xl mx-auto">
          <div className="flex h-16 items-center px-4">
            <Link href="/" className="flex items-center gap-2 mr-6">
              <Timer className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Pomodoro</span>
            </Link>

            <div className="hidden md:flex items-center gap-6 mr-6">
              {mainMenu.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-2"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-1 items-center justify-end gap-4">
              <div className="flex items-center gap-4">
                <ModeToggle />

                {user ? (
                  <UserAvatarDropdown
                    user={user}
                    onLogout={handleLogout}
                    image={user?.avatarImg || ""}
                  />
                ) : (
                  <Link href="/login">
                    <Button>Login</Button>
                  </Link>
                )}

                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild className="md:hidden">
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="z-[105]">
                    <SheetTitle>Menu</SheetTitle>
                    <div className="flex flex-col gap-4 mt-8">
                      {mainMenu.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="text-sm font-medium py-2 flex items-center gap-2"
                          onClick={() => setIsOpen(false)}
                        >
                          <item.icon className="h-4 w-4" />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;