'use client'

import { Button } from "@/components/ui/button"
import { Menu, DollarSign, Ghost } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

export function BlockPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2D0A4E] to-[#0F172A] text-white">
      <header className="border-b border-purple-800/30 backdrop-blur-md bg-purple-900/10">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button className="p-2 hover:bg-purple-800/20 rounded-lg transition-colors">
            <Menu className="w-6 h-6" />
            <span className="sr-only">Menu</span>
          </button>
          
          <Link href="/" className="text-[#14F195] text-2xl font-mono font-bold">
            BUBSY
          </Link>
          
          <div className="flex gap-4">
            <Button variant="ghost" className="font-mono text-sm gap-2 text-purple-200 hover:text-[#14F195] hover:bg-purple-800/20">
              <DollarSign className="w-4 h-4" />
              REWARDS
            </Button>
            <Button variant="ghost" className="font-mono text-sm gap-2 text-purple-200 hover:text-[#14F195] hover:bg-purple-800/20">
              <Ghost className="w-4 h-4" />
              BUBSY
            </Button>
          </div>
        </nav>
      </header>
      
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative w-64 h-64 mx-auto mb-12">
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-[#4A0E78] via-[#14F195] to-[#4A0E78] opacity-30 blur-xl" />
            <Image
              src="/placeholder.svg"
              alt="Bubsy pixel art"
              width={256}
              height={256}
              className="relative z-10 mix-blend-lighten"
            />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-mono font-bold mb-4 text-purple-100">
            UPGRADE YOUR COMMUNITY
          </h1>
          <h2 className="text-3xl md:text-5xl font-mono font-bold mb-8 text-[#14F195]">
            WITH BUBSY THE GREAT
          </h2>
          
          <p className="font-mono text-lg md:text-xl text-purple-200 mb-12 max-w-2xl mx-auto">
            Bubsy is a next-generation ecosystem comprising both a bot and a DApp, designed to help you moderate, analyze, and understand your community with the help of Artificial Intelligence
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              className="font-mono text-lg border-[#14F195] text-[#14F195] hover:bg-[#14F195] hover:text-[#2D0A4E]"
            >
              READ DOCS
            </Button>
            <Button
              className="font-mono text-lg bg-[#4A0E78] text-white hover:bg-[#5C1194]"
            >
              GET BUBSY
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}