"use client";

import { useSession } from "next-auth/react";
import { SignInButton } from "@/components/auth/signin-button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/dashboard");
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900 dark:from-slate-950 dark:via-slate-900 dark:to-purple-950 flex items-center justify-center relative overflow-hidden ${poppins.className}`}
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.4)_1px,transparent_0)] bg-[size:32px_32px]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-7xl sm:text-8xl lg:text-9xl font-bold tracking-tight mb-8 text-white"
        >
          Dashboard
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto mb-16 leading-relaxed font-medium"
        >
          Modern business management platform with intuitive design
          <br />
          to power up your{" "}
          <span className="underline decoration-purple-400 underline-offset-4">
            productivity
          </span>{" "}
          workflows
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <SignInButton
            variant="default"
            provider="google"
            className="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-full bg-white text-black hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl"
          >
            Access Dashboard
            <ArrowRight className="w-5 h-5" />
          </SignInButton>
        </motion.div>
      </div>
    </div>
  );
}
