"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Plane } from "lucide-react"
import { useTheme } from "next-themes"

export function PlaneAnimation() {
  const [visible, setVisible] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    // Show plane animation after a delay
    const timer = setTimeout(() => {
      setVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <motion.div
      className="fixed z-50 pointer-events-none"
      initial={{ x: -100, y: 300, opacity: 0 }}
      animate={{
        x: window.innerWidth + 100,
        y: 100,
        opacity: [0, 1, 1, 0],
        rotate: 15,
      }}
      transition={{
        duration: 8,
        ease: "easeInOut",
      }}
      onAnimationComplete={() => setVisible(false)}
    >
      <Plane size={48} className={isDark ? "text-white" : "text-rose-500"} />
      <motion.div
        className={`absolute top-1/2 right-full h-1 w-20 rounded-full ${isDark ? "bg-white/30" : "bg-rose-500/30"}`}
        initial={{ width: 0 }}
        animate={{ width: 80 }}
        transition={{
          duration: 8,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  )
}

