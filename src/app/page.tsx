"use client";

import { useSession } from "next-auth/react";
import { SignInButton } from "@/components/auth/signin-button";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { Poppins, Inter } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500", "600", "700"],
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
      className={`min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100 flex items-center justify-center relative overflow-hidden ${inter.className}`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Morphing Blobs */}
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full opacity-20"
          style={{
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          }}
          animate={{
            borderRadius: [
              "60% 40% 30% 70% / 60% 30% 70% 40%",
              "30% 60% 70% 40% / 50% 60% 30% 60%",
              "50% 50% 40% 60% / 40% 50% 60% 50%",
              "60% 40% 30% 70% / 60% 30% 70% 40%",
            ],
            x: [0, 50, -30, 0],
            y: [0, -20, 40, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full opacity-15"
          style={{
            borderRadius: "40% 60% 70% 30% / 50% 60% 40% 50%",
          }}
          animate={{
            borderRadius: [
              "40% 60% 70% 30% / 50% 60% 40% 50%",
              "70% 30% 40% 60% / 60% 40% 50% 50%",
              "30% 70% 50% 50% / 40% 60% 30% 70%",
              "40% 60% 70% 30% / 50% 60% 40% 50%",
            ],
            x: [0, -40, 20, 0],
            y: [0, 30, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Floating Particles */}
        <motion.div
          className="absolute top-32 right-32 w-4 h-4 bg-purple-400 rounded-full opacity-60"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-40 left-40 w-6 h-6 bg-indigo-400 rounded-full opacity-40"
          animate={{
            y: [0, -30, 0],
            x: [0, -15, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Brand Logo */}
      <motion.div
        className="absolute top-8 left-8 flex items-center z-20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span
          className={`ml-3 text-xl font-bold text-gray-800 ${poppins.className}`}
        >
          PizzaMaster
        </span>
      </motion.div>

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between gap-12 relative z-10">
        {/* Text Content */}
        <motion.div
          className="w-full lg:w-1/2 z-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Badge */}
          <motion.div
            className="mb-6 inline-flex items-center px-4 py-2 rounded-full bg-purple-500/20 text-purple-700 font-medium text-sm backdrop-blur-sm border border-purple-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Pizza
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className={`text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight ${poppins.className}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Manage Your{" "}
            <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Lorem
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl text-gray-600 mb-10 max-w-lg leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <SignInButton
              variant="default"
              provider="google"
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            >
              <svg
                className="w-6 h-6 mr-3"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
              </svg>
              Continue with Google
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </SignInButton>
          </motion.div>
        </motion.div>

        {/* 3D Visual Content */}
        <motion.div
          className="hidden lg:block w-1/2 relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative">
            {/* Main 3D Dashboard Visual */}
            <motion.div
              className="relative"
              animate={{
                y: [0, -20, 0],
                rotateY: [0, 5, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                transformStyle: "preserve-3d",
                filter: "drop-shadow(0 20px 40px rgba(139, 92, 246, 0.3))",
              }}
            >
              <svg
                width="500"
                height="500"
                viewBox="0 0 500 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10"
              >
                {/* Dashboard Background */}
                <rect
                  x="50"
                  y="50"
                  width="400"
                  height="400"
                  rx="20"
                  fill="url(#dashboardGradient)"
                  className="shadow-2xl"
                />

                {/* Header Bar */}
                <rect
                  x="50"
                  y="50"
                  width="400"
                  height="60"
                  rx="20"
                  fill="url(#headerGradient)"
                />

                {/* Navigation Dots */}
                <circle cx="80" cy="80" r="6" fill="#ff5f57" />
                <circle cx="100" cy="80" r="6" fill="#ffbd2e" />
                <circle cx="120" cy="80" r="6" fill="#28ca42" />

                {/* Chart Elements */}
                <motion.g
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                >
                  <rect
                    x="80"
                    y="140"
                    width="80"
                    height="120"
                    rx="8"
                    fill="url(#chartGradient1)"
                  />
                  <rect
                    x="180"
                    y="160"
                    width="80"
                    height="100"
                    rx="8"
                    fill="url(#chartGradient2)"
                  />
                  <rect
                    x="280"
                    y="120"
                    width="80"
                    height="140"
                    rx="8"
                    fill="url(#chartGradient3)"
                  />
                </motion.g>

                {/* Metric Cards */}
                <motion.g
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                >
                  <rect
                    x="80"
                    y="300"
                    width="100"
                    height="80"
                    rx="12"
                    fill="white"
                    fillOpacity="0.9"
                  />
                  <rect
                    x="200"
                    y="300"
                    width="100"
                    height="80"
                    rx="12"
                    fill="white"
                    fillOpacity="0.9"
                  />
                  <rect
                    x="320"
                    y="300"
                    width="100"
                    height="80"
                    rx="12"
                    fill="white"
                    fillOpacity="0.9"
                  />
                </motion.g>

                {/* Floating Elements */}
                <motion.circle
                  cx="400"
                  cy="150"
                  r="15"
                  fill="url(#floatingGradient)"
                  animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <defs>
                  <linearGradient
                    id="dashboardGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#f8fafc" />
                  </linearGradient>
                  <linearGradient
                    id="headerGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                  <linearGradient
                    id="chartGradient1"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                  <linearGradient
                    id="chartGradient2"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#67e8f9" />
                  </linearGradient>
                  <linearGradient
                    id="chartGradient3"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#6ee7b7" />
                  </linearGradient>
                  <radialGradient
                    id="floatingGradient"
                    cx="50%"
                    cy="50%"
                    r="50%"
                  >
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </radialGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Floating UI Elements */}
            <motion.div
              className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-10 h-10 text-white" />
              </motion.div>
            </motion.div>

            <motion.div
              className="absolute -bottom-5 -left-5 w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg"
              animate={{
                y: [0, -15, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
            >
              <Zap className="w-8 h-8 text-white" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
