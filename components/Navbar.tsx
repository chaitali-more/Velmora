// components/Navbar.tsx
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiSun, FiMoon } from 'react-icons/fi'

export default function Navbar() {
  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') === 'dark'
    setDark(savedTheme)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    document.documentElement.classList.toggle('dark', dark)
  }, [dark, mounted])

  function toggleDark() {
    const newDark = !dark
    setDark(newDark)
    document.documentElement.classList.toggle('dark', newDark)
    localStorage.setItem('theme', newDark ? 'dark' : 'light')
  }

  return (
    <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-4 py-2 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold tracking-tight">
  
  {/* Light mode logo */}
  <Image
    src="/images/velmora-logo-white-black.png"
    alt="Velmora logo for technology, healthy living, and personal growth blog"
    width={200}
    height={62}
    className="block dark:hidden"
  />

  {/* Dark mode logo */}
  <Image
    src="/images/velmora-blogs-logo2.png"
    alt="Velmora - technology, healthy living, and personal growth blog"
    width={200}
    height={62}
    className="hidden dark:block"
  />

</Link>

        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            Contact
          </Link>

          <button
  onClick={toggleDark}
  className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 
  flex items-center justify-center 
  bg-white dark:bg-gray-900
  text-gray-700 dark:text-gray-300
  hover:bg-gray-100 dark:hover:bg-gray-800
  transition-all duration-300 ease-in-out"
  aria-label="Toggle dark mode"
>
  <span className="relative flex items-center justify-center w-5 h-5">
    <FiSun
      className={`absolute w-5 h-5 text-yellow-400 transform transition-all duration-500 ${
        mounted && dark ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'
      }`}
    />
    <FiMoon
      className={`absolute w-5 h-5 text-gray-600 dark:text-gray-300 transform transition-all duration-500 ${
        mounted && dark ? '-rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
      }`}
    />
  </span>
</button>
        </div>
      </div>
    </nav>
  )
}
