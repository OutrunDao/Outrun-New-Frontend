"use client"

import { useState, useEffect } from "react"
import { Search, ChevronDown, ChevronLeft, ChevronRight, Star, SortDesc, SortAsc } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/ui/section-heading"
import { ParticleCanvas } from "@/components/particle-canvas"

// 模拟数据
const MOCK_PROJECTS = [
  {
    id: 1,
    name: "CyberPunk Doge",
    symbol: "CPDOG",
    description: "The first cyberpunk-themed memecoin with DAO governance",
    stage: "Genesis",
    mode: "flash",
    raisedAmount: 15000.75,
    raisedToken: "UETH",
    population: 78,
    marketCap: 250000,
    progress: 25.0,
    genesisEndTime: "2023-06-15T12:00:00Z",
    createdAt: "2023-05-01T12:00:00Z",
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Base", chainid: 8453, icon: "/networks/base.svg" },
      { name: "Arbitrum", chainid: 42161, icon: "/networks/arbitrum.svg" },
    ],
  },
  {
    id: 9,
    name: "Super Ultra Mega Hyper Quantum Galactic Space Cats",
    symbol: "SUMHQGSC",
    description:
      "Revolutionary multi-dimensional quantum-based memecoin with advanced AI governance and cross-universe compatibility",
    stage: "Genesis",
    mode: "normal",
    raisedAmount: 12500.35,
    raisedToken: "UETH",
    population: 45,
    marketCap: 210000,
    progress: 18.5,
    genesisEndTime: "2023-06-22T14:00:00Z",
    createdAt: "2023-05-08T11:20:00Z",
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Base", chainid: 8453, icon: "/networks/base.svg" },
      { name: "Arbitrum", chainid: 42161, icon: "/networks/arbitrum.svg" },
    ],
  },
  {
    id: 2,
    name: "Moon Cats",
    symbol: "MCAT",
    description: "Feline-inspired memecoin with staking rewards and NFT integration",
    stage: "Genesis",
    mode: "normal",
    raisedAmount: 8200.5,
    raisedToken: "UETH",
    population: 25,
    marketCap: 120000,
    progress: 12.5,
    genesisEndTime: "2023-06-20T18:00:00Z",
    createdAt: "2023-05-10T09:30:00Z",
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Base", chainid: 8453, icon: "/networks/base.svg" },
      { name: "Arbitrum", chainid: 42161, icon: "/networks/arbitrum.svg" },
    ],
  },
  {
    id: 3,
    name: "Pixel Frogs",
    symbol: "PFROG",
    description: "Retro pixel art frogs with cross-chain compatibility",
    stage: "Locked",
    raisedAmount: 52000.25,
    raisedToken: "UETH",
    population: 3856,
    marketCap: 5890000,
    progress: 89.3,
    unlockTime: "2023-07-15T10:00:00Z",
    createdAt: "2023-04-15T14:20:00Z",
    stakingApy: 275.85,
    treasuryFund: 1250000,
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Base", chainid: 8453, icon: "/networks/base.svg" },
      { name: "Arbitrum", chainid: 42161, icon: "/networks/arbitrum.svg" },
    ],
  },
  {
    id: 4,
    name: "Space Hamsters",
    symbol: "SHAM",
    description: "Intergalactic hamster community with multi-chain presence",
    stage: "Genesis",
    mode: "flash",
    raisedAmount: 10500.8,
    raisedToken: "UETH",
    population: 42,
    marketCap: 178000,
    progress: 35.6,
    genesisEndTime: "2023-06-18T09:00:00Z",
    createdAt: "2023-05-05T16:45:00Z",
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Base", chainid: 8453, icon: "/networks/base.svg" },
      { name: "Arbitrum", chainid: 42161, icon: "/networks/arbitrum.svg" },
    ],
  },
  {
    id: 5,
    name: "Neon Shiba",
    symbol: "NSHIB",
    description: "Synthwave-inspired Shiba Inu token with yield farming",
    stage: "Unlocked",
    raisedAmount: 85000.45,
    raisedToken: "UETH",
    population: 7230,
    marketCap: 12500000,
    progress: 100.0,
    createdAt: "2023-03-20T10:15:00Z",
    stakingApy: 1238.5,
    treasuryFund: 3750000,
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Base", chainid: 8453, icon: "/networks/base.svg" },
      { name: "Arbitrum", chainid: 42161, icon: "/networks/arbitrum.svg" },
    ],
  },
  {
    id: 6,
    name: "Quantum Pepe",
    symbol: "QPEPE",
    description: "Quantum computing themed Pepe variant with cross-chain bridges",
    stage: "Refund",
    raisedAmount: 3500.25,
    raisedToken: "UETH",
    population: 18,
    marketCap: 64000,
    progress: 6.4,
    createdAt: "2023-05-15T08:20:00Z",
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Base", chainid: 8453, icon: "/networks/base.svg" },
      { name: "Arbitrum", chainid: 42161, icon: "/networks/arbitrum.svg" },
    ],
  },
  {
    id: 7,
    name: "Astro Cats",
    symbol: "ACAT",
    description: "Space exploration themed cat token with community governance",
    stage: "Genesis",
    mode: "normal",
    raisedAmount: 9200.6,
    raisedToken: "UETH",
    population: 35,
    marketCap: 156000,
    progress: 15.6,
    genesisEndTime: "2023-06-25T14:00:00Z",
    createdAt: "2023-05-12T11:30:00Z",
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Base", chainid: 8453, icon: "/networks/base.svg" },
      { name: "Arbitrum", chainid: 42161, icon: "/networks/arbitrum.svg" },
    ],
  },
  {
    id: 8,
    name: "Crypto Wolves",
    symbol: "CWOLF",
    description: "Wolf-themed token with community-driven development and governance",
    stage: "Locked",
    raisedAmount: 60000.35,
    raisedToken: "UETH",
    population: 5145,
    marketCap: 8780000,
    progress: 78.0,
    unlockTime: "2023-08-05T16:00:00Z",
    createdAt: "2023-04-05T11:20:00Z",
    stakingApy: 855.25,
    treasuryFund: 2100000,
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Base", chainid: 8453, icon: "/networks/base.svg" },
      { name: "Arbitrum", chainid: 42161, icon: "/networks/arbitrum.svg" },
    ],
  },
  // 新增的模拟数据
  {
    id: 10,
    name: "Laser Eyes",
    symbol: "LEYES",
    description: "Bitcoin laser eyes community token with DeFi integrations",
    stage: "Genesis",
    mode: "normal",
    raisedAmount: 18250.35,
    raisedToken: "UETH",
    population: 65,
    marketCap: 315000,
    progress: 22.8,
    genesisEndTime: "2023-06-28T16:00:00Z",
    createdAt: "2023-05-14T10:45:00Z",
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Base", chainid: 8453, icon: "/networks/base.svg" },
    ],
  },
  {
    id: 11,
    name: "Meta Dragons",
    symbol: "MDRG",
    description: "Metaverse dragon collectibles with play-to-earn mechanics",
    stage: "Genesis",
    mode: "flash",
    raisedAmount: 22500.8,
    raisedToken: "UETH",
    population: 92,
    marketCap: 420000,
    progress: 45.2,
    genesisEndTime: "2023-06-19T15:30:00Z",
    createdAt: "2023-05-06T14:20:00Z",
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Polygon", chainid: 137, icon: "/networks/polygon.svg" },
    ],
  },
  {
    id: 12,
    name: "Cosmic Monkeys",
    symbol: "CMONK",
    description: "Space-exploring primates with interstellar governance model",
    stage: "Locked",
    raisedAmount: 75000.55,
    raisedToken: "UETH",
    population: 4230,
    marketCap: 9250000,
    progress: 84.6,
    unlockTime: "2023-07-25T12:00:00Z",
    createdAt: "2023-04-10T09:15:00Z",
    stakingApy: 428.75,
    treasuryFund: 2800000,
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Arbitrum", chainid: 42161, icon: "/networks/arbitrum.svg" },
    ],
  },
  {
    id: 13,
    name: "Digital Pandas",
    symbol: "DPAN",
    description: "Environmentally-conscious token with carbon offset initiatives",
    stage: "Unlocked",
    raisedAmount: 95000.25,
    raisedToken: "UETH",
    population: 8650,
    marketCap: 14800000,
    progress: 100.0,
    createdAt: "2023-03-15T08:30:00Z",
    stakingApy: 1865.35,
    treasuryFund: 4200000,
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Base", chainid: 8453, icon: "/networks/base.svg" },
      { name: "BNB", chainid: 56, icon: "/networks/bnb.svg" },
    ],
  },
  {
    id: 14,
    name: "Virtual Reality Foxes",
    symbol: "VRFOX",
    description: "VR gaming token with NFT integration and gameplay rewards",
    stage: "Genesis",
    mode: "normal",
    raisedAmount: 7850.45,
    raisedToken: "UETH",
    population: 32,
    marketCap: 135000,
    progress: 14.2,
    genesisEndTime: "2023-06-30T18:00:00Z",
    createdAt: "2023-05-16T13:45:00Z",
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Polygon", chainid: 137, icon: "/networks/polygon.svg" },
    ],
  },
  {
    id: 15,
    name: "Synth Wave Whales",
    symbol: "SWAVE",
    description: "80s retro aesthetics with whale-sized liquidity pools",
    stage: "Genesis",
    mode: "flash",
    raisedAmount: 19750.95,
    raisedToken: "UETH",
    population: 86,
    marketCap: 372000,
    progress: 38.5,
    genesisEndTime: "2023-06-17T14:00:00Z",
    createdAt: "2023-05-03T12:30:00Z",
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Arbitrum", chainid: 42161, icon: "/networks/arbitrum.svg" },
    ],
  },
  {
    id: 16,
    name: "Quantum Elephants",
    symbol: "QELPH",
    description: "Large-scale quantum computing themed token with memory mechanics",
    stage: "Refund",
    raisedAmount: 4250.75,
    raisedToken: "UETH",
    population: 22,
    marketCap: 78000,
    progress: 8.6,
    createdAt: "2023-05-17T09:45:00Z",
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Base", chainid: 8453, icon: "/networks/base.svg" },
    ],
  },
  {
    id: 17,
    name: "Arctic Bears",
    symbol: "ABEAR",
    description: "Cold storage focused token with hibernation staking mechanism",
    stage: "Locked",
    raisedAmount: 58500.65,
    raisedToken: "UETH",
    population: 4875,
    marketCap: 7950000,
    progress: 75.4,
    unlockTime: "2023-08-10T10:00:00Z",
    createdAt: "2023-04-08T14:20:00Z",
    stakingApy: 685.45,
    treasuryFund: 1950000,
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "BNB", chainid: 56, icon: "/networks/bnb.svg" },
    ],
  },
  {
    id: 18,
    name: "Neo Tokyo",
    symbol: "NTOK",
    description: "Futuristic cyberpunk city governance token with district allocation",
    stage: "Genesis",
    mode: "normal",
    raisedAmount: 10850.25,
    raisedToken: "UETH",
    population: 47,
    marketCap: 195000,
    progress: 19.3,
    genesisEndTime: "2023-06-27T12:00:00Z",
    createdAt: "2023-05-13T15:30:00Z",
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Base", chainid: 8453, icon: "/networks/base.svg" },
      { name: "Arbitrum", chainid: 42161, icon: "/networks/arbitrum.svg" },
    ],
  },
  {
    id: 19,
    name: "Digital Octopus",
    symbol: "DOCT",
    description: "Multi-tentacled DeFi protocol with cross-chain integrations",
    stage: "Unlocked",
    raisedAmount: 88500.55,
    raisedToken: "UETH",
    population: 7840,
    marketCap: 13250000,
    progress: 100.0,
    createdAt: "2023-03-18T11:45:00Z",
    stakingApy: 1546.25,
    treasuryFund: 3950000,
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Polygon", chainid: 137, icon: "/networks/polygon.svg" },
      { name: "BNB", chainid: 56, icon: "/networks/bnb.svg" },
    ],
  },
  {
    id: 20,
    name: "Holographic Lions",
    symbol: "HLION",
    description: "AR/VR token with holographic display technology integration",
    stage: "Genesis",
    mode: "flash",
    raisedAmount: 16750.85,
    raisedToken: "UETH",
    population: 73,
    marketCap: 285000,
    progress: 32.4,
    genesisEndTime: "2023-06-16T16:00:00Z",
    createdAt: "2023-05-02T10:15:00Z",
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Base", chainid: 8453, icon: "/networks/base.svg" },
    ],
  },
  {
    id: 21,
    name: "Interstellar Rabbits",
    symbol: "IRABB",
    description: "Fast-breeding token economy with cosmic travel mechanics",
    stage: "Genesis",
    mode: "normal",
    raisedAmount: 9750.45,
    raisedToken: "UETH",
    population: 39,
    marketCap: 165000,
    progress: 16.8,
    genesisEndTime: "2023-06-29T15:00:00Z",
    createdAt: "2023-05-15T12:30:00Z",
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Arbitrum", chainid: 42161, icon: "/networks/arbitrum.svg" },
    ],
  },
  {
    id: 22,
    name: "Retro Pixel Heroes",
    symbol: "RPIXL",
    description: "8-bit gaming inspired token with quest-based rewards",
    stage: "Locked",
    raisedAmount: 63500.25,
    raisedToken: "UETH",
    population: 5320,
    marketCap: 8450000,
    progress: 81.2,
    unlockTime: "2023-07-20T14:00:00Z",
    createdAt: "2023-04-12T09:30:00Z",
    stakingApy: 742.65,
    treasuryFund: 2350000,
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Polygon", chainid: 137, icon: "/networks/polygon.svg" },
    ],
  },
  {
    id: 23,
    name: "Quantum Kittens",
    symbol: "QKIT",
    description: "Schrödinger's cat-themed token with probability-based rewards",
    stage: "Refund",
    raisedAmount: 3850.35,
    raisedToken: "UETH",
    population: 20,
    marketCap: 68000,
    progress: 7.5,
    createdAt: "2023-05-16T14:45:00Z",
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Base", chainid: 8453, icon: "/networks/base.svg" },
    ],
  },
  {
    id: 24,
    name: "Synthetic Dinosaurs",
    symbol: "SDINO",
    description: "Jurassic revival token with evolutionary staking mechanics",
    stage: "Genesis",
    mode: "flash",
    raisedAmount: 21250.75,
    raisedToken: "UETH",
    population: 88,
    marketCap: 395000,
    progress: 42.5,
    genesisEndTime: "2023-06-18T13:30:00Z",
    createdAt: "2023-05-04T15:15:00Z",
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "BNB", chainid: 56, icon: "/networks/bnb.svg" },
    ],
  },
  {
    id: 25,
    name: "Electric Zebras",
    symbol: "EZBRA",
    description: "Energy sector token with striped pattern yield distribution",
    stage: "Unlocked",
    raisedAmount: 92500.65,
    raisedToken: "UETH",
    population: 8120,
    marketCap: 13850000,
    progress: 100.0,
    createdAt: "2023-03-16T10:20:00Z",
    stakingApy: 1679.45,
    treasuryFund: 4100000,
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Base", chainid: 8453, icon: "/networks/base.svg" },
      { name: "Arbitrum", chainid: 42161, icon: "/networks/arbitrum.svg" },
    ],
  },
  {
    id: 26,
    name: "Digital Turtles",
    symbol: "DTURT",
    description: "Long-term holding token with shell protection mechanism",
    stage: "Genesis",
    mode: "normal",
    raisedAmount: 11250.45,
    raisedToken: "UETH",
    population: 49,
    marketCap: 205000,
    progress: 20.5,
    genesisEndTime: "2023-06-26T17:00:00Z",
    createdAt: "2023-05-12T13:45:00Z",
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Polygon", chainid: 137, icon: "/networks/polygon.svg" },
    ],
  },
  {
    id: 27,
    name: "Neon Giraffes",
    symbol: "NGIRA",
    description: "Tall-necked vision token with elevated staking rewards",
    stage: "Locked",
    raisedAmount: 57850.35,
    raisedToken: "UETH",
    population: 4560,
    marketCap: 7650000,
    progress: 77.3,
    unlockTime: "2023-08-08T11:00:00Z",
    createdAt: "2023-04-07T10:30:00Z",
    stakingApy: 635.85,
    treasuryFund: 1875000,
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Base", chainid: 8453, icon: "/networks/base.svg" },
    ],
  },
  {
    id: 28,
    name: "Cybernetic Orcas",
    symbol: "CORCA",
    description: "Deep sea data token with pod-based governance",
    stage: "Genesis",
    mode: "flash",
    raisedAmount: 18950.55,
    raisedToken: "UETH",
    population: 81,
    marketCap: 345000,
    progress: 37.9,
    genesisEndTime: "2023-06-17T15:30:00Z",
    createdAt: "2023-05-03T14:15:00Z",
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Arbitrum", chainid: 42161, icon: "/networks/arbitrum.svg" },
    ],
  },
  {
    id: 29,
    name: "Hologram Eagles",
    symbol: "HEAGL",
    description: "High-flying vision token with aerial view governance",
    stage: "Refund",
    raisedAmount: 4150.25,
    raisedToken: "UETH",
    population: 21,
    marketCap: 75000,
    progress: 8.3,
    createdAt: "2023-05-16T16:30:00Z",
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Base", chainid: 8453, icon: "/networks/base.svg" },
    ],
  },
  {
    id: 30,
    name: "Quantum Bears",
    symbol: "QBEAR",
    description: "Hibernating token with quantum sleep staking rewards",
    stage: "Unlocked",
    raisedAmount: 86750.95,
    raisedToken: "UETH",
    population: 7480,
    marketCap: 12900000,
    progress: 100.0,
    createdAt: "2023-03-19T12:45:00Z",
    stakingApy: 1425.75,
    treasuryFund: 3850000,
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Polygon", chainid: 137, icon: "/networks/polygon.svg" },
      { name: "BNB", chainid: 56, icon: "/networks/bnb.svg" },
    ],
  },
  {
    id: 31,
    name: "Pixel Warriors",
    symbol: "PXWAR",
    description: "Retro gaming platform with NFT characters and pixel art battlegrounds",
    stage: "Genesis",
    mode: "normal",
    raisedAmount: 11850.45,
    raisedToken: "UETH",
    population: 51,
    marketCap: 215000,
    progress: 21.5,
    genesisEndTime: "2023-06-25T16:00:00Z",
    createdAt: "2023-05-11T09:45:00Z",
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Arbitrum", chainid: 42161, icon: "/networks/arbitrum.svg" },
    ],
  },
  {
    id: 32,
    name: "Galactic Llamas",
    symbol: "GLAMA",
    description: "Space-traveling llamas with intergalactic yield farming features",
    stage: "Genesis",
    mode: "normal",
    raisedAmount: 10350.65,
    raisedToken: "UETH",
    population: 46,
    marketCap: 185000,
    progress: 18.5,
    genesisEndTime: "2023-06-28T12:00:00Z",
    createdAt: "2023-05-14T10:30:00Z",
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Polygon", chainid: 137, icon: "/networks/polygon.svg" },
    ],
  },
  {
    id: 33,
    name: "Neon Tigers",
    symbol: "NTIGR",
    description: "Synthwave-inspired feline token with stripe-based reward systems",
    stage: "Genesis",
    mode: "normal",
    raisedAmount: 13250.35,
    raisedToken: "UETH",
    population: 58,
    marketCap: 235000,
    progress: 23.5,
    genesisEndTime: "2023-06-24T18:00:00Z",
    createdAt: "2023-05-10T15:45:00Z",
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Base", chainid: 8453, icon: "/networks/base.svg" },
    ],
  },
  {
    id: 34,
    name: "Cyber Vikings",
    symbol: "CVIK",
    description: "Futuristic Norse-themed token with raid-based governance",
    stage: "Genesis",
    mode: "normal",
    raisedAmount: 14750.75,
    raisedToken: "UETH",
    population: 62,
    marketCap: 265000,
    progress: 26.5,
    genesisEndTime: "2023-06-22T17:00:00Z",
    createdAt: "2023-05-08T13:15:00Z",
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Arbitrum", chainid: 42161, icon: "/networks/arbitrum.svg" },
    ],
  },
  {
    id: 35,
    name: "Digital Foxes",
    symbol: "DFOX",
    description: "Cunning and adaptive token with decentralized hunting rewards",
    stage: "Genesis",
    mode: "normal",
    raisedAmount: 9850.55,
    raisedToken: "UETH",
    population: 41,
    marketCap: 175000,
    progress: 17.5,
    genesisEndTime: "2023-06-29T14:00:00Z",
    createdAt: "2023-05-15T11:45:00Z",
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Base", chainid: 8453, icon: "/networks/base.svg" },
    ],
  },
  {
    id: 36,
    name: "Moon Wolves",
    symbol: "MWOLF",
    description: "Lunar-cycle based token with pack mentality governance",
    stage: "Genesis",
    mode: "normal",
    raisedAmount: 12150.85,
    raisedToken: "UETH",
    population: 53,
    marketCap: 220000,
    progress: 22.0,
    genesisEndTime: "2023-06-24T15:30:00Z",
    createdAt: "2023-05-09T14:20:00Z",
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Polygon", chainid: 137, icon: "/networks/polygon.svg" },
    ],
  },
  {
    id: 37,
    name: "Crypto Pandas",
    symbol: "CPAND",
    description: "Bamboo-backed token with sustainable yield farming",
    stage: "Genesis",
    mode: "normal",
    raisedAmount: 10750.35,
    raisedToken: "UETH",
    population: 44,
    marketCap: 192000,
    progress: 19.2,
    genesisEndTime: "2023-06-27T16:30:00Z",
    createdAt: "2023-05-12T09:15:00Z",
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "BNB", chainid: 56, icon: "/networks/bnb.svg" },
    ],
  },
  {
    id: 38,
    name: "Neon Crabs",
    symbol: "NCRAB",
    description: "Sideways-moving market-neutral token with shell protection",
    stage: "Genesis",
    mode: "normal",
    raisedAmount: 9250.65,
    raisedToken: "UETH",
    population: 38,
    marketCap: 165000,
    progress: 16.5,
    genesisEndTime: "2023-06-30T10:00:00Z",
    createdAt: "2023-05-16T08:45:00Z",
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Arbitrum", chainid: 42161, icon: "/networks/arbitrum.svg" },
    ],
  },
  {
    id: 39,
    name: "Pixel Knights",
    symbol: "PKNGT",
    description: "Medieval RPG-inspired token with quest-based rewards",
    stage: "Genesis",
    mode: "normal",
    raisedAmount: 13850.95,
    raisedToken: "UETH",
    population: 59,
    marketCap: 245000,
    progress: 24.5,
    genesisEndTime: "2023-06-23T12:30:00Z",
    createdAt: "2023-05-09T10:45:00Z",
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Base", chainid: 8453, icon: "/networks/base.svg" },
      { name: "Polygon", chainid: 137, icon: "/networks/polygon.svg" },
    ],
  },
  {
    id: 40,
    name: "Cyber Dragons",
    symbol: "CDRG",
    description: "Futuristic dragon-themed token with hoard-based yield",
    stage: "Genesis",
    mode: "normal",
    raisedAmount: 15250.45,
    raisedToken: "UETH",
    population: 67,
    marketCap: 275000,
    progress: 27.5,
    genesisEndTime: "2023-06-21T14:30:00Z",
    createdAt: "2023-05-07T12:15:00Z",
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Arbitrum", chainid: 42161, icon: "/networks/arbitrum.svg" },
    ],
  },
  {
    id: 41,
    name: "Quantum Rabbits",
    symbol: "QRAB",
    description: "Physics-defying token with probability-based rewards",
    stage: "Genesis",
    mode: "normal",
    raisedAmount: 10950.75,
    raisedToken: "UETH",
    population: 47,
    marketCap: 198000,
    progress: 19.8,
    genesisEndTime: "2023-06-26T16:00:00Z",
    createdAt: "2023-05-11T14:30:00Z",
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Base", chainid: 8453, icon: "/networks/base.svg" },
    ],
  },
  {
    id: 42,
    name: "Virtual Hedgehogs",
    symbol: "VHEDG",
    description: "Protected asset token with spike-based defense mechanisms",
    stage: "Genesis",
    mode: "normal",
    raisedAmount: 8950.25,
    raisedToken: "UETH",
    population: 36,
    marketCap: 160000,
    progress: 16.0,
    genesisEndTime: "2023-07-01T10:00:00Z",
    createdAt: "2023-05-17T09:15:00Z",
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Polygon", chainid: 137, icon: "/networks/polygon.svg" },
    ],
  },
  {
    id: 43,
    name: "Digital Phoenixes",
    symbol: "DPHX",
    description: "Rebirth-focused token with cycle-based price recovery",
    stage: "Genesis",
    mode: "normal",
    raisedAmount: 14250.65,
    raisedToken: "UETH",
    population: 61,
    marketCap: 255000,
    progress: 25.5,
    genesisEndTime: "2023-06-22T18:30:00Z",
    createdAt: "2023-05-08T15:45:00Z",
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Arbitrum", chainid: 42161, icon: "/networks/arbitrum.svg" },
      { name: "BNB", chainid: 56, icon: "/networks/bnb.svg" },
    ],
  },
  {
    id: 44,
    name: "Metaverse Lizards",
    symbol: "MLIZ",
    description: "Adaptable token with environment-based yield mechanics",
    stage: "Genesis",
    mode: "normal",
    raisedAmount: 11450.85,
    raisedToken: "UETH",
    population: 50,
    marketCap: 205000,
    progress: 20.5,
    genesisEndTime: "2023-06-25T12:00:00Z",
    createdAt: "2023-05-10T13:30:00Z",
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Base", chainid: 8453, icon: "/networks/base.svg" },
    ],
  },
  {
    id: 45,
    name: "Cyber Owls",
    symbol: "COWL",
    description: "Wisdom-focused token with night-time yield bonuses",
    stage: "Genesis",
    mode: "normal",
    raisedAmount: 12850.35,
    raisedToken: "UETH",
    population: 55,
    marketCap: 230000,
    progress: 23.0,
    genesisEndTime: "2023-06-24T14:00:00Z",
    createdAt: "2023-05-09T16:15:00Z",
    omnichain: [
      { name: "Ethereum", chainid: 1, icon: "/networks/ethereum.svg" },
      { name: "Polygon", chainid: 137, icon: "/networks/polygon.svg" },
    ],
  },
]

// 阶段标签颜色映射
const STAGE_COLORS: Record<string, { bg: string; text: string; glow: string; gradient: string }> = {
  Genesis: {
    bg: "bg-purple-600",
    text: "text-white",
    glow: "shadow-[0_0_8px_rgba(168,85,247,0.6)]",
    gradient: "from-purple-600 to-pink-500",
  },
  Refund: {
    bg: "bg-red-600",
    text: "text-white",
    glow: "shadow-[0_0_8px_rgba(239,68,68,0.6)]",
    gradient: "from-red-600 to-orange-500",
  },
  Locked: {
    bg: "bg-pink-600",
    text: "text-white",
    glow: "shadow-[0_0_8px_rgba(236,72,153,0.6)]",
    gradient: "from-pink-600 to-purple-500",
  },
  Unlocked: {
    bg: "bg-cyan-600",
    text: "text-white",
    glow: "shadow-[0_0_8px_rgba(6,182,212,0.6)]",
    gradient: "from-cyan-500 to-blue-500",
  },
}

// 链过滤器选项
const CHAIN_FILTERS = [
  { id: "all", label: "All Chains" },
  { id: "ethereum", label: "Ethereum", icon: "/networks/ethereum.svg" },
  { id: "base", label: "Base", icon: "/networks/base.svg" },
  { id: "arbitrum", label: "Arbitrum", icon: "/networks/arbitrum.svg" },
  { id: "polygon", label: "Polygon", icon: "/networks/polygon.svg" },
  { id: "bnb", label: "BNB Chain", icon: "/networks/bnb.svg" },
]

// 阶段过滤器选项
const STAGE_FILTERS = [
  { id: "genesis", label: "Genesis" },
  { id: "refund", label: "Refund" },
  { id: "locked", label: "Locked" },
  { id: "unlocked", label: "Unlocked" },
]

// 排序选项
const SORT_OPTIONS: any = {
  genesis: {
    normal: [
      { id: "createdAt", label: "Creation Time" },
      { id: "genesisEndTime", label: "Genesis Endtime" },
      { id: "raisedAmount", label: "Total Raised" },
      { id: "population", label: "Population" },
    ],
    flash: [
      { id: "createdAt", label: "Creation Time" },
      { id: "genesisEndTime", label: "Genesis Endtime" },
      { id: "raisedAmount", label: "Total Raised" },
      { id: "population", label: "Population" },
      { id: "progress", label: "Progress" },
    ],
  },
  refund: [],
  locked: [
    { id: "createdAt", label: "Creation Time" },
    { id: "unlockTime", label: "Unlock Time" },
    { id: "marketCap", label: "Trading Volume" },
    { id: "stakingApy", label: "Staking APY" },
    { id: "treasuryFund", label: "Treasury Fund" },
  ],
  unlocked: [
    { id: "createdAt", label: "Creation Time" },
    { id: "marketCap", label: "Trading Volume" },
    { id: "stakingApy", label: "Staking APY" },
    { id: "treasuryFund", label: "Treasury Fund" },
  ],
}

// 每页项目数
const PROJECTS_PER_PAGE = 15

export default function MemeverseBoardPage() {
  const [activeChainFilter, setActiveChainFilter] = useState("all")
  const [activeStageFilter, setActiveStageFilter] = useState("genesis")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProjects, setFilteredProjects] = useState<any[]>([])
  const [isChainDropdownOpen, setIsChainDropdownOpen] = useState(false)
  const [isStageDropdownOpen, setIsStageDropdownOpen] = useState(false)
  const [selectedMode, setSelectedMode] = useState("normal") // "normal", "flash"
  const [showListedOnOutSwap, setShowListedOnOutSwap] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOption, setSortOption] = useState<string>("createdAt") // 默认按创建时间排序
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc") // 默认降序
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  // 获取适用于当前阶段和模式的排序选项
  const getSortOptions = () => {
    if (activeStageFilter === "genesis") {
      return SORT_OPTIONS.genesis[selectedMode] || []
    }
    return SORT_OPTIONS[activeStageFilter] || []
  }

  // 获取当前排序选项的标签
  const getCurrentSortLabel = () => {
    const options = getSortOptions()
    const option = options.find((opt) => opt.id === sortOption)
    return option ? option.label : "Creation Time"
  }

  // 处理过滤逻辑
  useEffect(() => {
    let result = [...MOCK_PROJECTS]

    // 应用阶段过滤器
    const stageMap: Record<string, string> = {
      genesis: "Genesis",
      refund: "Refund",
      locked: "Locked",
      unlocked: "Unlocked",
    }
    result = result.filter((project) => project.stage === stageMap[activeStageFilter])

    // 应用模式过滤器（仅在Genesis阶段）
    if (activeStageFilter === "genesis") {
      result = result.filter((project) => project.mode === selectedMode)
    }

    // 应用OutSwap列表过滤器（仅在Genesis阶段）
    if (activeStageFilter === "genesis" && showListedOnOutSwap) {
      result = result.filter((project) => project.listedOnOutSwap)
    }

    // 应用链过滤器
    if (activeChainFilter !== "all") {
      result = result.filter((project) => project.chain?.toLowerCase() === activeChainFilter)
    }

    // 应用搜索过滤器
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (project) =>
          project.name.toLowerCase().includes(query) ||
          project.symbol.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query),
      )
    }

    // 应用排序
    if (sortOption) {
      result.sort((a, b) => {
        let valueA = a[sortOption]
        let valueB = b[sortOption]

        // 处理日期字符串
        if (
          typeof valueA === "string" &&
          (sortOption === "createdAt" || sortOption === "genesisEndTime" || sortOption === "unlockTime")
        ) {
          valueA = new Date(valueA).getTime()
          valueB = new Date(valueB).getTime()
        }

        if (sortDirection === "asc") {
          return valueA > valueB ? 1 : -1
        } else {
          return valueA < valueB ? 1 : -1
        }
      })
    }

    setFilteredProjects(result)
    // 重置到第一页
    setCurrentPage(1)
  }, [activeChainFilter, activeStageFilter, searchQuery, selectedMode, showListedOnOutSwap, sortOption, sortDirection])

  // 计算总页数
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE)

  // 获取当前页项目
  const currentProjects = filteredProjects.slice((currentPage - 1) * PROJECTS_PER_PAGE, currentPage * PROJECTS_PER_PAGE)

  // 页码变化处理
  const handlePageChange = (pageNumber: number) => {
    // 确保页码在有效范围内
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
      // 滚动到页面顶部
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // 切换排序方向
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc")
  }

  // 生成页码按钮
  const renderPagination = () => {
    // 如果总页数小于等于1，不显示分页
    if (totalPages <= 1) return null

    const pageNumbers = []

    // 最多显示5个页码按钮
    const maxButtonsToShow = 5
    let startPage: number
    let endPage: number

    if (totalPages <= maxButtonsToShow) {
      // 如果总页数小于等于最大显示按钮数，显示所有页码
      startPage = 1
      endPage = totalPages
    } else {
      // 否则，计算起始和结束页码
      const maxPagesBeforeCurrentPage = Math.floor(maxButtonsToShow / 2)
      const maxPagesAfterCurrentPage = Math.ceil(maxButtonsToShow / 2) - 1

      if (currentPage <= maxPagesBeforeCurrentPage) {
        // 当前页接近开始
        startPage = 1
        endPage = maxButtonsToShow
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        // 当前页接近结束
        startPage = totalPages - maxButtonsToShow + 1
        endPage = totalPages
      } else {
        // 当前页在中间
        startPage = currentPage - maxPagesBeforeCurrentPage
        endPage = currentPage + maxPagesAfterCurrentPage
      }
    }

    // 生成页码按钮
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    return (
      <div className="flex items-center justify-center mt-8 space-x-2">
        {/* 上一页按钮 */}
        <Button
          variant="outline"
          size="sm"
          className={`rounded-full bg-black/30 border ${
            currentPage === 1
              ? "border-purple-500/20 text-pink-300/50 cursor-not-allowed"
              : "border-purple-500/30 text-pink-300 hover:border-pink-400/50"
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* 页码按钮 */}
        {pageNumbers.map((number) => (
          <Button
            key={number}
            variant="outline"
            size="sm"
            className={`rounded-full ${
              currentPage === number
                ? "bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white border-none shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                : "bg-black/30 border border-purple-500/30 text-pink-300 hover:border-pink-400/50"
            }`}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </Button>
        ))}

        {/* 下一页按钮 */}
        <Button
          variant="outline"
          size="sm"
          className={`rounded-full bg-black/30 border ${
            currentPage === totalPages
              ? "border-purple-500/20 text-pink-300/50 cursor-not-allowed"
              : "border-purple-500/30 text-pink-300 hover:border-pink-400/50"
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  const toggleChainDropdown = () => {
    if (activeDropdown === "chain") {
      setActiveDropdown(null)
      setIsChainDropdownOpen(false)
    } else {
      setActiveDropdown("chain")
      setIsChainDropdownOpen(true)
      setIsStageDropdownOpen(false)
      setIsSortDropdownOpen(false)
    }
  }

  const toggleStageDropdown = () => {
    if (activeDropdown === "stage") {
      setActiveDropdown(null)
      setIsStageDropdownOpen(false)
    } else {
      setActiveDropdown("stage")
      setIsStageDropdownOpen(true)
      setIsChainDropdownOpen(false)
      setIsSortDropdownOpen(false)
    }
  }

  const toggleSortDropdown = () => {
    if (activeDropdown === "sort") {
      setActiveDropdown(null)
      setIsSortDropdownOpen(false)
    } else {
      setActiveDropdown("sort")
      setIsSortDropdownOpen(true)
      setIsChainDropdownOpen(false)
      setIsStageDropdownOpen(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown) {
        const target = event.target as HTMLElement
        if (!target.closest(".dropdown-container")) {
          setActiveDropdown(null)
          setIsChainDropdownOpen(false)
          setIsStageDropdownOpen(false)
          setIsSortDropdownOpen(false)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [activeDropdown])

  return (
    <div className="relative flex flex-col min-h-screen">
      {/* 背景元素 */}
      <ParticleCanvas className="fixed inset-0 -z-10" />

      {/* 页面内容 */}
      <div className="container px-4 md:px-6 mx-auto py-24">
        {/* 页面标题 */}
        <SectionHeading
          title="Memeverse Board"
          description="Discover and participate in the latest memecoin launching through the Memeverse"
          gradient="from-purple-400 via-pink-500 to-blue-500"
          align="center"
          className="mb-12"
        />

        {/* 搜索和过滤器 */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* 搜索框 */}
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-pink-400" />
              </div>
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2 bg-black/30 border border-purple-500/30 rounded-lg text-white placeholder:text-pink-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 focus:border-pink-500/50 hover:border-pink-400/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* 过滤器组 */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto items-center">
              {/* 链过滤器下拉菜单 */}
              <div className="relative dropdown-container">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-black/30 border border-purple-500/30 text-pink-300 hover:bg-purple-900/30 hover:border-pink-400/50 rounded-full transition-all duration-300 px-4"
                  onClick={toggleChainDropdown}
                >
                  <div className="flex items-center justify-center gap-1">
                    {activeChainFilter !== "all" ? (
                      <div className="flex items-center gap-1.5">
                        <img
                          src={CHAIN_FILTERS.find((c) => c.id === activeChainFilter)?.icon || "/placeholder.svg"}
                          alt={activeChainFilter}
                          className="w-4 h-4"
                        />
                        {CHAIN_FILTERS.find((c) => c.id === activeChainFilter)?.label}
                      </div>
                    ) : (
                      "All Chains"
                    )}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </div>
                </Button>
                {isChainDropdownOpen && (
                  <div className="absolute z-50 mt-2 w-48 rounded-md bg-black/80 backdrop-blur-md border border-purple-500/30 shadow-lg animate-in fade-in-50 zoom-in-95 duration-200">
                    <div className="py-1">
                      {CHAIN_FILTERS.map((chain) => (
                        <button
                          key={chain.id}
                          className={`flex items-center w-full px-4 py-2 text-sm ${
                            activeChainFilter === chain.id
                              ? "bg-gradient-to-r from-purple-600/30 to-pink-500/30 text-pink-300"
                              : "text-pink-300 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-500/20"
                          } transition-colors duration-200`}
                          onClick={() => {
                            setActiveChainFilter(chain.id)
                            setIsChainDropdownOpen(false)
                          }}
                        >
                          {chain.icon && (
                            <img src={chain.icon || "/placeholder.svg"} alt={chain.label} className="w-4 h-4 mr-2" />
                          )}
                          {chain.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 阶段过滤器下拉菜单 */}
              <div className="relative dropdown-container">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-black/30 border border-purple-500/30 text-pink-300 hover:bg-purple-900/30 hover:border-pink-400/50 rounded-full transition-all duration-300 px-4"
                  onClick={toggleStageDropdown}
                >
                  <div className="flex items-center justify-center gap-1">
                    {STAGE_FILTERS.find((s) => s.id === activeStageFilter)?.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </div>
                </Button>
                {isStageDropdownOpen && (
                  <div className="absolute z-50 mt-2 w-48 rounded-md bg-black/80 backdrop-blur-md border border-purple-500/30 shadow-lg animate-in fade-in-50 zoom-in-95 duration-200">
                    <div className="py-1">
                      {STAGE_FILTERS.map((stage) => (
                        <button
                          key={stage.id}
                          className={`w-full text-left px-4 py-2 text-sm ${
                            activeStageFilter === stage.id
                              ? "bg-gradient-to-r from-purple-600/30 to-pink-500/30 text-pink-300"
                              : "text-pink-300 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-500/20"
                          } transition-colors duration-200`}
                          onClick={() => {
                            setActiveStageFilter(stage.id)
                            setIsStageDropdownOpen(false)
                            setSortOption("createdAt") // 重置为默认排序
                          }}
                        >
                          {stage.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 排序过滤器 */}
              <div className="relative dropdown-container">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-black/30 border border-purple-500/30 text-pink-300 hover:bg-purple-900/30 hover:border-pink-400/50 rounded-full transition-all duration-300 px-4"
                  onClick={toggleSortDropdown}
                >
                  <div className="flex items-center justify-center gap-1">
                    {getCurrentSortLabel()}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </div>
                </Button>
                {isSortDropdownOpen && (
                  <div className="absolute z-50 mt-2 w-48 rounded-md bg-black/80 backdrop-blur-md border border-purple-500/30 shadow-lg animate-in fade-in-50 zoom-in-95 duration-200">
                    <div className="py-1">
                      {getSortOptions().map((option) => (
                        <button
                          key={option.id}
                          className={`flex items-center w-full px-4 py-2 text-sm ${
                            sortOption === option.id
                              ? "bg-gradient-to-r from-purple-600/30 to-pink-500/30 text-pink-300"
                              : "text-pink-300 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-500/20"
                          } transition-colors duration-200`}
                          onClick={() => {
                            setSortOption(option.id)
                            setIsSortDropdownOpen(false)
                          }}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 排序方向按钮 */}
              <Button
                variant="outline"
                size="sm"
                className="p-0 w-8 h-8 flex justify-center items-center bg-black/30 border border-purple-500/30 rounded-full hover:bg-purple-900/30 hover:border-pink-400/50"
                onClick={toggleSortDirection}
              >
                {sortDirection === "asc" ? (
                  <SortAsc className="h-4 w-4 text-pink-300" />
                ) : (
                  <SortDesc className="h-4 w-4 text-pink-300" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Genesis阶段特殊过滤器 */}
        {activeStageFilter === "genesis" && (
          <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* 模式切换按钮 */}
            <div className="flex items-center bg-black/30 backdrop-blur-sm rounded-full p-1 border border-purple-500/30">
              <button
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedMode === "normal"
                    ? "bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                    : "text-pink-300 hover:text-pink-200"
                }`}
                onClick={() => setSelectedMode("normal")}
              >
                Normal Mode
              </button>
              <button
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedMode === "flash"
                    ? "bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                    : "text-pink-300 hover:text-pink-200"
                }`}
                onClick={() => setSelectedMode("flash")}
              >
                Flash Mode
              </button>
            </div>
          </div>
        )}

        {/* 项目列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* 无结果提示 */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="text-2xl font-bold text-pink-400 mb-2">No projects found</div>
            <p className="text-pink-300/70">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* 分页组件 */}
        {renderPagination()}
      </div>
    </div>
  )
}

// 格式化市值
function formatMarketCap(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M`
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(2)}K`
  } else {
    return `${value}`
  }
}

// 格式化日期时间
function formatDateTime(dateTimeStr: string): string {
  const date = new Date(dateTimeStr)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

// 格式化美元金额
function formatUSD(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

// 项目卡片组件
function ProjectCard({ project }: { project: any }) {
  const stageStyle = STAGE_COLORS[project.stage] || {
    bg: "bg-gray-600",
    text: "text-white",
    glow: "",
    gradient: "from-gray-600 to-gray-500",
  }

  // 确定卡片的边框渐变色
  const getBorderGradient = () => {
    switch (project.stage) {
      case "Genesis":
        return "from-purple-500/70 via-pink-500/70 to-purple-500/70"
      case "Locked":
        return "from-pink-500/70 via-purple-500/70 to-pink-500/70"
      case "Unlocked":
        return "from-cyan-500/70 via-blue-500/70 to-cyan-500/70"
      case "Refund":
        return "from-red-500/70 via-orange-500/70 to-red-500/70"
      default:
        return "from-white/10 to-white/5"
    }
  }

  // 确定卡片的背景渐变色
  const getBackgroundGradient = () => {
    switch (project.stage) {
      case "Genesis":
        return "from-purple-950/90 via-[#0f0326]/95 to-purple-950/90"
      case "Locked":
        return "from-pink-950/90 via-[#0f0326]/95 to-pink-950/90"
      case "Unlocked":
        return "from-cyan-950/90 via-[#0f0326]/95 to-cyan-950/90"
      case "Refund":
        return "from-red-950/90 via-[#0f0326]/95 to-red-950/90"
      default:
        return "from-[#0f0326]/95 to-[#0f0326]/95"
    }
  }

  // 高APY标识
  const isHighApy = project.stakingApy && project.stakingApy > 1000

  return (
    <div
      className={`group relative rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] cursor-pointer`}
    >
      {/* 霓虹灯边框效果 */}
      <div
        className={`absolute inset-0 rounded-lg bg-gradient-to-br ${getBorderGradient()} opacity-70 group-hover:opacity-100 transition-opacity duration-300`}
      ></div>

      {/* 卡片内容 */}
      <div className={`bg-gradient-to-br ${getBackgroundGradient()} rounded-lg overflow-hidden relative z-10 m-[1px]`}>
        {/* 网格背景 */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>

        <div className="p-2.5 relative z-10">
          <div className="flex justify-between items-center mb-1.5">
            <div className="flex items-center max-w-[180px] overflow-hidden">
              <span
                className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 text-base whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px]"
                title={project.symbol}
              >
                {project.symbol}
              </span>{" "}
              <span
                className="text-sm text-pink-200/90 ml-1 whitespace-nowrap overflow-hidden text-ellipsis max-w-[70px]"
                title={project.name}
              >
                {project.name}
              </span>
            </div>

            {/* Market Cap */}
            <div className="text-cyan-300/80 text-xs mx-auto">
              Market Cap: <span className="text-cyan-200 font-medium">{formatMarketCap(project.marketCap)}</span>
            </div>

            {/* 阶段标签 */}
            <div
              className={`text-xs px-3 py-1 rounded-md bg-gradient-to-r ${stageStyle.gradient} ${stageStyle.text} ${stageStyle.glow} transition-all duration-300`}
            >
              {project.stage}
            </div>
          </div>

          <div className="flex">
            {/* 左侧项目图片 - 移除背景框 */}
            <div className="w-[120px] h-[120px] flex-shrink-0 relative flex items-center justify-center rounded-md overflow-hidden group-hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all duration-300">
              <img src={"/placeholder.svg"} alt={project.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-2 right-2 bg-black/60 rounded-full p-1 shadow-[0_0_5px_rgba(0,0,0,0.3)]">
                <img
                  src={project.omnichain?.[0]?.icon || "/networks/ethereum.svg"}
                  alt={project.omnichain?.[0]?.name}
                  className="w-5 h-5"
                />
              </div>

              {/* 高APY标识 */}
              {isHighApy && (
                <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-xs font-bold px-2 py-0.5 rounded-md flex items-center shadow-[0_0_8px_rgba(234,179,8,0.5)]">
                  <Star className="w-3 h-3 mr-1 fill-white" />
                  High APY
                </div>
              )}
            </div>

            {/* 右侧项目信息 */}
            <div className="flex-1 pl-3 flex flex-col min-w-0 overflow-hidden h-[120px]">
              {/* 项目描述 - 固定在最上面 */}
              <p
                className="text-cyan-300/70 text-xs mb-1.5 whitespace-nowrap overflow-hidden text-ellipsis group-hover:text-cyan-200/90 transition-colors duration-200"
                title={project.description}
              >
                {project.description}
              </p>

              {/* 其他信息 - 下对齐 */}
              <div className="mt-auto space-y-1">
                {/* Omnichain支持 */}
                <div className="text-pink-300/70 text-xs flex items-center">
                  <span className="text-pink-300/90 mr-1">Omnichain:</span>
                  <div className="flex">
                    {project.omnichain?.map((chain, index) => (
                      <div key={index} className="relative group/chain">
                        <img
                          src={chain.icon || "/placeholder.svg"}
                          alt={chain.name}
                          className="w-4 h-4 ml-0.5 transition-transform duration-200 hover:scale-125"
                          title={`${chain.name} (${chain.chainid})`}
                        />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-gradient-to-r from-purple-900/90 to-pink-900/90 backdrop-blur-sm text-[10px] text-pink-200 px-1.5 py-0.5 rounded shadow-[0_0_8px_rgba(168,85,247,0.3)] border border-pink-500/20 invisible opacity-0 group-hover/chain:visible group-hover/chain:opacity-100 transition-all duration-200 whitespace-nowrap">
                          {chain.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Genesis和Refund阶段显示Total raised */}
                {(project.stage === "Genesis" || project.stage === "Refund") && (
                  <div className="text-pink-300/70 text-xs">
                    Total raised:{" "}
                    <span className="text-pink-200 font-medium">
                      {project.raisedAmount.toFixed(2)} {project.raisedToken}
                    </span>
                  </div>
                )}

                {/* Genesis阶段显示Genesis Endtime */}
                {project.stage === "Genesis" && project.genesisEndTime && (
                  <div className="text-pink-300/70 text-xs">
                    Genesis Endtime:{" "}
                    <span className="text-pink-200 font-medium">{formatDateTime(project.genesisEndTime)}</span>
                  </div>
                )}

                {/* Locked阶段显示Unlock Time */}
                {project.stage === "Locked" && project.unlockTime && (
                  <div className="text-pink-300/70 text-xs">
                    Unlock Time: <span className="text-pink-200 font-medium">{formatDateTime(project.unlockTime)}</span>
                  </div>
                )}

                {/* Locked和Unlocked阶段显示Staking APY - 移除背景 */}
                {(project.stage === "Locked" || project.stage === "Unlocked") && project.stakingApy && (
                  <div className="text-pink-300/70 text-xs">
                    Staking APY:{" "}
                    <span className={`${isHighApy ? "text-yellow-400" : "text-green-400"} font-medium`}>
                      {project.stakingApy.toFixed(2)}%
                    </span>
                  </div>
                )}

                {/* Locked和Unlocked阶段显示Treasury Fund */}
                {(project.stage === "Locked" || project.stage === "Unlocked") && project.treasuryFund && (
                  <div className="text-pink-300/70 text-xs">
                    Treasury Fund: <span className="text-pink-200 font-medium">{formatUSD(project.treasuryFund)}</span>
                  </div>
                )}

                {/* 所有阶段都显示Population */}
                <div className="text-pink-300/70 text-xs">
                  Population: <span className="text-pink-200 font-medium">{project.population.toLocaleString()}</span>
                </div>

                {/* 进度条和百分比 - 只在Genesis阶段的Flash模式下显示 */}
                {project.stage === "Genesis" && project.mode === "flash" && (
                  <div className="flex items-center">
                    <div className="flex-grow">
                      <div className="w-full bg-black/50 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 h-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-right text-xs text-pink-400 font-medium ml-2">
                      {project.progress.toFixed(1)}%
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
