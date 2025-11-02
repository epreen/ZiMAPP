'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { FaRocket, FaBolt, FaMusic, FaGlobeAfrica, FaCloud } from 'react-icons/fa'

export default function HomeHero() {
    const heroRef = useRef<HTMLHeadingElement>(null)
    const iconsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const icons = gsap.utils.toArray('.floating-icon')
        gsap.set(icons, { opacity: 0, scale: 0.5 })

        gsap.to(icons, {
            opacity: 1,
            scale: 1,
            stagger: 0.2,
            duration: 1,
            ease: 'back.out(1.7)',
        })

        // Floating / drifting animation
        icons.forEach((icon: any) => {
            gsap.to(icon, {
                y: gsap.utils.random(-20, 20),
                x: gsap.utils.random(-20, 20),
                rotate: gsap.utils.random(-15, 15),
                duration: gsap.utils.random(3, 6),
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
            })
        })

        // Hero text animation
        if (heroRef.current) {
            gsap.fromTo(
                heroRef.current,
                { scale: 0.8, opacity: 0 },
                {
                    scale: 1.1,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'elastic.out(1, 0.5)',
                    onComplete: () => {
                        gsap.to(heroRef.current, {
                            scale: 1.05,
                            duration: 2,
                            ease: 'power1.inOut',
                            repeat: -1,
                            yoyo: true,
                        })
                    },
                }
            )
        }

        // Background pulse
        gsap.to('.hero-bg', {
            backgroundColor: 'hsl(var(--primary-hue), 60%, 50%)',
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
        })
    }, [])

    return (
        <motion.div
            className="hero-bg relative flex items-center justify-center h-screen bg-primary overflow-hidden text-secondary uppercase px-4 md:px-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            {/* Floating icons */}
            <div ref={iconsRef} className="absolute inset-0">
                <FaRocket className="floating-icon absolute text-3xl md:text-5xl text-secondary" style={{ top: '10%', left: '10%' }} />
                <FaBolt className="floating-icon absolute text-2xl md:text-4xl text-secondary" style={{ top: '25%', right: '15%' }} />
                <FaMusic className="floating-icon absolute text-4xl md:text-6xl text-secondary" style={{ bottom: '10%', left: '15%' }} />
                <FaGlobeAfrica className="floating-icon absolute text-3xl md:text-5xl text-secondary" style={{ bottom: '20%', right: '10%' }} />
                <FaCloud className="floating-icon absolute text-2xl md:text-4xl text-secondary" style={{ top: '50%', left: '45%' }} />
            </div>

            {/* Hero Text */}
            <h1
                ref={heroRef}
                className="hero relative z-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wide sm:tracking-wider md:tracking-widest drop-shadow-lg text-center"
            >
                ZiMAPP Web is Alive
            </h1>
        </motion.div>
    )
}