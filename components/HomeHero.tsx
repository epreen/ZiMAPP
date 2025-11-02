'use client'

import { motion } from 'framer-motion'
import { gsap } from 'gsap'

export default function HomeHero() {
    return (
        <motion.div
            className="flex items-center justify-center h-screen bg-brand font-light font-sans"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            onAnimationComplete={() => gsap.to('.hero', { scale: 1.05, duration: 1 })}
        >
            <h1 className="hero text-4xl font-bold">ZiMAPP Web is Alive 🚀</h1>
        </motion.div>
    )
}