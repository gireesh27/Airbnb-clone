"use client"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export function BackgroundAnimation() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />

      {/* Animated circles */}
      <motion.div
        className={`absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full ${
          isDark ? "bg-indigo-900/10" : "bg-rose-500/5"
        }`}
        animate={{
          x: [0, 30, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className={`absolute top-40 right-1/4 w-[400px] h-[400px] rounded-full ${
          isDark ? "bg-blue-900/10" : "bg-amber-500/5"
        }`}
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className={`absolute bottom-20 left-1/3 w-[600px] h-[600px] rounded-full ${
          isDark ? "bg-purple-900/10" : "bg-pink-500/5"
        }`}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

