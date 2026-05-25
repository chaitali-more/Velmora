import type { Metadata } from 'next'
import BlogsShowcaseSection from '@/components/BlogsShowcaseSection'
import HeroSection from '@/components/HeroSection'
import SmartHealthCalculatorsSection from '@/components/SmartHealthCalculatorsSection'
import { buildHomeMetadata } from '@/lib/seo'
import ToolsSection from '@/components/Toolssection'

export const metadata: Metadata = buildHomeMetadata()



export default function HomePage() {
  return (
    <div className="-my-12 mx-auto w-full max-w-7xl px-4">
      <HeroSection />
      <ToolsSection/>
      <SmartHealthCalculatorsSection />

      <BlogsShowcaseSection />

    
    </div>
  )
}
