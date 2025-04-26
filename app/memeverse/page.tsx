"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Stars, Coins, Gavel } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/ui/section-heading"
import { FeatureCard } from "@/components/ui/feature-card"
import { UseCaseCard } from "@/components/ui/use-case-card"
import { ParticleCanvas } from "@/components/particle-canvas"

export default function MemeversePage() {
  const { scrollYProgress } = useScroll()
  const containerRef = useRef<HTMLDivElement>(null)

  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8])
  const titleY = useTransform(scrollYProgress, [0, 0.1], [0, -20])

  return (
    <div ref={containerRef} className="relative flex flex-col min-h-screen">
      {/* Background elements - UPDATED to match main page */}
      {/* <div className="fixed inset-0 bg-gradient-to-b from-[#0f0326] via-[#1a0445] to-[#000000] -z-20" /> */}
      <ParticleCanvas className="fixed inset-0 -z-10" />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-20">
        {/* 移除这个重复的网格背景，因为我们已经在GlobalBackground中添加了全局网格 */}
        {/* <div className="absolute inset-0 bg-grid-pattern bg-center opacity-10" /> */}

        {/* Hero overlay - UPDATED to match main page */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0326]/40 via-[#1a0445]/40 to-[#000000]/30 opacity-30" />

        <div className="container px-4 md:px-6 mx-auto py-24">
          <div className="flex flex-col items-center text-center space-y-12">
            <motion.div style={{ opacity: titleOpacity, y: titleY }} className="space-y-6 max-w-4xl">
              <div className="inline-block mb-6">
                <div className="relative">
                  <div className="absolute inset-0 blur-xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-70 rounded-full" />
                  <div className="relative px-6 py-2 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full text-sm font-medium text-white">
                    Memecoin × DeFi × DAO
                  </div>
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                Memeverse
              </h1>

              <p className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
                An OmniChain memecoin launchpad built on the concept of FFLaunch, featuring memecoin staking and DAO
                governance.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-full px-8 h-12 text-base shadow-[0_0_15px_rgba(168,85,247,0.5)]"
              >
                Explore Memecoins
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 rounded-full px-8 h-12 text-base backdrop-blur-sm"
              >
                Launch Your Memecoin
              </Button>
            </motion.div>
          </div>
        </div>
        {/* Bottom gradient - UPDATED to match main page */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0f0326] to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 container px-4 md:px-6 mx-auto relative z-10">
        <div className="absolute inset-0 bg-grid-pattern bg-center opacity-5" />

        <SectionHeading
          title="Key Features"
          description="Memeverse provides a platform for creating, launching, and managing memecoins with integrated staking and DAO governance."
          gradient="from-purple-400 to-pink-500"
          align="center"
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <FeatureCard
            title="OmniChain Memecoin Launchpad"
            description="Memeverse is built on the concept of FFLaunch, providing a fair and free platform for memecoin launches."
            bulletPoints={["Cross-chain compatibility", "Fair and free launches", "Community-driven approach"]}
            icon={<Stars className="h-6 w-6 text-purple-500" />}
            color="#a855f7"
            delay={0.1}
            className="bg-black/60 backdrop-blur-sm"
          />

          <FeatureCard
            title="Memecoin Staking"
            description="Memeverse features memecoin staking, allowing users to stake their memecoins and earn rewards."
            bulletPoints={[
              "Stake memecoins for rewards",
              "Earn from the yield vault",
              "Participate in market-making profits",
            ]}
            icon={<Coins className="h-6 w-6 text-purple-500" />}
            color="#a855f7"
            delay={0.2}
            className="bg-black/60 backdrop-blur-sm"
          />

          <FeatureCard
            title="DAO Governance"
            description="Memeverse includes DAO governance, allowing memecoin communities to make decisions collectively."
            bulletPoints={[
              "Decentralized decision-making",
              "Community-driven development",
              "Transparent governance process",
            ]}
            icon={<Gavel className="h-6 w-6 text-purple-500" />}
            color="#a855f7"
            delay={0.3}
            className="bg-black/60 backdrop-blur-sm"
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0326]/0 via-[#1a0445]/50 to-[#0f0326]/0 opacity-50" />

        <div className="container px-4 md:px-6 mx-auto relative">
          <SectionHeading
            title="How Memeverse Works"
            description="Memeverse provides a simple and intuitive platform for creating, launching, and managing memecoins."
            gradient="from-blue-400 to-cyan-500"
            align="center"
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl"
            >
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
              <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-purple-600 to-pink-600" />
              <div className="absolute inset-0 bg-grid-pattern bg-center opacity-10" />
              <div className="relative p-6 md:p-8">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Memeverse Protocol Diagram"
                  width={500}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </motion.div>

            <div>
              <UseCaseCard
                title="How Memeverse Works"
                description="Memeverse employs a three-step process to provide a simple and intuitive platform for creating, launching, and managing memecoins."
                steps={[
                  "Users can create their memecoins with just a few clicks via the website UI, without needing any programming knowledge.",
                  "Launch your memecoin across multiple chains with a universal token template and fair distribution mechanisms.",
                  "Stake your memecoins in the Memecoin Yield Vault and participate in DAO governance to shape the future of your memecoin.",
                ]}
                color="#a855f7"
                delay={0.1}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0326]/0 via-[#1a0445]/50 to-[#0f0326]/0" />

        <div className="container px-4 md:px-6 mx-auto relative">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 backdrop-blur-xl" />
              <div className="absolute inset-0 bg-grid-pattern bg-center opacity-20" />

              <div className="relative p-8 md:p-12 lg:p-16">
                <div className="text-center max-w-3xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 mb-6">
                    Ready to Join the Memeverse?
                  </h2>

                  <p className="text-zinc-300 text-lg leading-relaxed mb-8">
                    Create, launch, and manage your memecoin with Memeverse's intuitive platform and community-driven
                    approach.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-full px-8 h-12 text-base shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                    >
                      Launch App
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 rounded-full px-8 h-12 text-base backdrop-blur-sm"
                    >
                      Read Documentation
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
