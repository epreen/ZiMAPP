'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FaRocket, FaBolt, FaMusic, FaGlobeAfrica } from 'react-icons/fa'

export default function HomeHero() {
    const heroRef = useRef<HTMLHeadingElement>(null)
    const iconsRef = useRef<HTMLDivElement>(null)
    const musicRef = useRef<HTMLAudioElement>(null)
    const warningRef = useRef<HTMLDivElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const startMusic = () => {
        if (musicRef.current) {
            musicRef.current.volume = 0.15
            musicRef.current.play()
            setIsPlaying(true)
        }
    }

    useEffect(() => {
        if (!isPlaying) return

        const icons = gsap.utils.toArray('.floating-icon')
        gsap.set(icons, { opacity: 0, scale: 0.6 })

        gsap.to(icons, {
            opacity: 1,
            scale: 1,
            stagger: 0.2,
            duration: 1,
            ease: 'power2.out',
        })

        icons.forEach((icon: any) => {
            gsap.to(icon, {
                y: gsap.utils.random(-10, 10),
                x: gsap.utils.random(-10, 10),
                rotate: gsap.utils.random(-5, 5),
                duration: gsap.utils.random(4, 7),
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
            })
        })

        if (warningRef.current) {
            gsap.to(warningRef.current, {
                opacity: 0,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            })
        }

        gsap.to('.hero-bg', {
            backgroundColor: 'hsl(var(--primary-hue, 220), 15%, 95%)',
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
        })
    }, [isPlaying])

    return (
        <motion.div
            className="hero-bg relative flex flex-col items-center justify-center h-screen overflow-hidden px-6 md:px-12 gap-6 bg-primary"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            {/* Overlay Popup */}
            {!isPlaying && (
                <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/70 backdrop-blur-md">
                    <Card className="p-6 rounded-md flex flex-col items-center gap-4 shadow-md bg-white/90 border-none max-w-sm w-full">
                        <p className="text-center font-medium text-gray-800">
                            Click start to see something cool
                        </p>
                        <Button
                            onClick={startMusic}
                            variant="default"
                            className="bg-primary text-secondary hover:bg-black cursor-pointer"
                        >
                            Start
                        </Button>
                    </Card>
                </div>
            )}

            {/* Floating icons */}
            <div
                ref={iconsRef}
                className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                    !isPlaying ? 'opacity-0' : 'opacity-100'
                }`}
            >
                <FaRocket
                    className="floating-icon absolute text-4xl text-secondary"
                    style={{ top: '10%', left: '10%' }}
                />
                <FaBolt
                    className="floating-icon absolute text-3xl text-secondary"
                    style={{ top: '25%', right: '15%' }}
                />
                <FaMusic
                    className="floating-icon absolute text-5xl text-secondary"
                    style={{ bottom: '10%', left: '15%' }}
                />
                <FaGlobeAfrica
                    className="floating-icon absolute text-4xl text-secondary"
                    style={{ bottom: '20%', right: '10%' }}
                />
            </div>

            {/* Hero Text */}
            <h1
                ref={heroRef}
                className={`hero relative z-10 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide text-center text-secondary transition-opacity duration-500 uppercase ${
                    !isPlaying ? 'opacity-0' : 'opacity-100'
                }`}
            >
                ZiMAPP Web is now live
            </h1>

            {/* Warning/Blinking Text */}
            <div
                ref={warningRef}
                className={`relative z-10 text-sm sm:text-base md:text-md lg:text-lg max-w-3xl mx-auto text-center px-4 font-light text-white transition-opacity duration-500 ${
                    !isPlaying ? 'opacity-0' : 'opacity-100'
                }`}
            >
                More features to come soon.
            </div>

            {/* Background Music */}
            <audio ref={musicRef} src="/firesidechat.mp3" loop preload="auto" />
        </motion.div>
    )
}