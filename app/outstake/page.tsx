"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Coins, TrendingUp, Layers } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/ui/section-heading"
import { FeatureCard } from "@/components/ui/feature-card"
import { TokenCard } from "@/components/token-card"
import { ParticleCanvas } from "@/components/particle-canvas"

export default function OutStakePage() {
  const { scrollYProgress } = useScroll()
  const containerRef = useRef<HTMLDivElement>(null)

  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8])
  const titleY = useTransform(scrollYProgress, [0, 0.1], [0, -20])

  return (
    <div ref={containerRef} className="relative">
      {/* Background elements - UPDATED to match main page */}
      {/* <div className="fixed inset-0 bg-gradient-to-b from-[#0f0326] via-[#1a0445] to-[#000000] -z-20" /> */}
      <ParticleCanvas className="fixed inset-0 -z-10" />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-20">
        {/* Grid background - UPDATED to match main page */}
        <div className="absolute inset-0 bg-grid-pattern bg-center opacity-10" />

        {/* Hero overlay - UPDATED to match main page */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0326]/40 via-[#1a0445]/40 to-[#000000]/30 opacity-30" />

        <div className="container px-4 md:px-6 mx-auto py-24">
          <div className="flex flex-col items-center text-center space-y-12">
            <motion.div style={{ opacity: titleOpacity, y: titleY }} className="space-y-6 max-w-4xl">
              <div className="inline-block mb-6">
                <div className="relative">
                  <div className="absolute inset-0 blur-xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-70 rounded-full" />
                  <div className="relative px-6 py-2 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full text-sm font-medium text-white">
                    Yield Tokenization
                  </div>
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                OutStake
              </h1>

              <p className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
                A protocol built entirely around yield-bearing tokens, introducing the first non-USD stablecoin model
                tied to yield rates.
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
                Start Staking
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 rounded-full px-8 h-12 text-base backdrop-blur-sm"
              >
                Read Documentation
              </Button>
            </motion.div>
          </div>
        </div>
        {/* Bottom gradient - UPDATED to match main page */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0f0326] to-transparent" />
      </section>

      {/* Token Types Section */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-grid-pattern bg-center opacity-10" />
        <div className="container px-4 md:px-6 mx-auto relative">
          <SectionHeading
            title="OutStake Token Types"
            description="OutStake introduces a novel staking model based on yield-bearing tokens, allowing them to be used in a range of DeFi applications."
            gradient="from-purple-400 to-blue-500"
            badge="TOKEN ECOSYSTEM"
            align="center"
            className="mb-16 md:mb-24"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <TokenCard
              title="SY = Standardized Yield Token"
              description="A vault token based on the ERC5115 standard designed to encapsulate yield-bearing tokens with a standardized interface."
              formula="staking SY + lock-up period = POT + PT + YT"
              gradient="from-purple-500 to-blue-600"
              delay={0.1}
            />

            <TokenCard
              title="PT = Principal Token"
              description="The principal component separated from the Yield-bearing Token, representing ownership of the principal with no expiration date."
              formula="PT = standard ERC20 token with no expiration"
              gradient="from-blue-600 to-cyan-500"
              delay={0.2}
            />

            <TokenCard
              title="YT = Yield Rate Token"
              description="The value is directly correlated with the yieldrate of the yield-bearing asset, providing higher income and multiple revenue streams."
              formula="YT value ∝ yield rate of underlying asset"
              gradient="from-purple-500 to-cyan-500"
              delay={0.3}
            />

            <TokenCard
              title="UPT = Omnichain Universal Principal Token"
              description="An omnichain universal principal token supported by LayerZero, enabling seamless transfers across different blockchains."
              formula="lock yield-bearing tokens → mint UPT tokens"
              gradient="from-cyan-500 to-blue-600"
              delay={0.4}
            />

            <TokenCard
              title="SP = Staking Position"
              description="Represents the right to redeem locked staking positions upon maturity, created by encapsulating the already minted PT."
              formula="SP holders → redeem principal + fixed yield"
              gradient="from-purple-500 to-blue-600"
              delay={0.5}
            />

            <TokenCard
              title="PYT = Points Yield Token"
              description="A token that represents points accumulated from yield generation, which can be used in the Outrun ecosystem."
              formula="PYT = ecosystem utility token"
              gradient="from-blue-600 to-cyan-500"
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 md:py-32 relative z-10">
        <div className="absolute inset-0 bg-grid-pattern bg-center opacity-10" />
        <div className="container px-4 md:px-6 mx-auto relative">
          <SectionHeading
            title="Key Features"
            description="OutStake offers greater flexibility, enhanced composability, and higher returns compared to other yield token protocols."
            gradient="from-purple-400 to-blue-500"
            badge="FEATURES"
            align="center"
            className="mb-16 md:mb-24"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard
              title="Novel Staking Model"
              description="Controls the yields generated by yield-bearing tokens and unlocks the liquidity of staked assets with an eternal lifecycle for enhanced token utility."
              icon={<Coins className="h-6 w-6 text-blue-500" />}
              color="#3b82f6"
              delay={0.1}
              className="bg-black/60 backdrop-blur-sm"
            />

            <FeatureCard
              title="Yield Rate Token (YT)"
              description="Value directly correlated with the yieldrate of the yield-bearing asset, providing multiple revenue streams and higher income potential."
              icon={<TrendingUp className="h-6 w-6 text-blue-500" />}
              color="#3b82f6"
              delay={0.2}
              className="bg-black/60 backdrop-blur-sm"
            />

            <FeatureCard
              title="Ecosystem Support"
              description="The assets supported by OutStake form the foundational support for the entire Outrun ecosystem, providing a stable base for all modules."
              icon={<Layers className="h-6 w-6 text-blue-500" />}
              color="#3b82f6"
              delay={0.3}
              className="bg-black/60 backdrop-blur-sm"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-grid-pattern bg-center opacity-10" />
        <div className="container px-4 md:px-6 mx-auto relative">
          <SectionHeading
            title="How OutStake Works"
            description="OutStake employs an innovative economic model that provides higher returns and multiple sources of income."
            gradient="from-purple-400 to-blue-500"
            badge="PROCESS"
            align="center"
            className="mb-16 md:mb-24"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden rounded-2xl"
                >
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                  <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-blue-600 to-purple-600" />
                  <div className="relative p-6 md:p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full font-bold bg-blue-600/20 text-blue-400">
                        1
                      </div>
                      <h3 className="text-xl font-bold text-white">Deposit Yield-Bearing Tokens</h3>
                    </div>
                    <p className="text-zinc-300 leading-relaxed">
                      Users deposit their yield-bearing tokens (like stETH, slisBNB, etc.) into the OutStake protocol.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden rounded-2xl"
                >
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                  <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-cyan-600 to-blue-600" />
                  <div className="relative p-6 md:p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full font-bold bg-cyan-600/20 text-cyan-400">
                        2
                      </div>
                      <h3 className="text-xl font-bold text-white">Receive SY Tokens</h3>
                    </div>
                    <p className="text-zinc-300 leading-relaxed">
                      The protocol wraps the yield-bearing tokens into Standardized Yield (SY) tokens based on the
                      ERC5115 standard.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden rounded-2xl"
                >
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                  <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-purple-600 to-blue-600" />
                  <div className="relative p-6 md:p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full font-bold bg-purple-600/20 text-purple-400">
                        3
                      </div>
                      <h3 className="text-xl font-bold text-white">Stake SY with Lock-up Period</h3>
                    </div>
                    <p className="text-zinc-300 leading-relaxed">
                      Users stake their SY tokens and specify a lock-up period, which mints three types of tokens: POT,
                      PT, and YT.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden rounded-2xl"
                >
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                  <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-blue-600 to-purple-600" />
                  <div className="relative p-6 md:p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full font-bold bg-blue-600/20 text-blue-400">
                        4
                      </div>
                      <h3 className="text-xl font-bold text-white">Earn Multiple Income Streams</h3>
                    </div>
                    <p className="text-zinc-300 leading-relaxed">
                      Users can earn from both the yield generated by their deposits and additional income from trading
                      YT tokens, which are correlated with yield rates.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl"
            >
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
              <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-purple-600 to-blue-600" />
              <div className="absolute inset-0 bg-grid-pattern bg-center opacity-10" />
              <div className="relative p-6 md:p-8">
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="OutStake Protocol Diagram"
                  width={600}
                  height={500}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 relative">
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
                    Ready to Start Earning with OutStake?
                  </h2>
                  <p className="text-zinc-300 text-lg leading-relaxed mb-8">
                    Join the OutStake protocol today and start earning higher returns with our innovative yield-bearing
                    token model.
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
