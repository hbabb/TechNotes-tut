'use client'

import { useEffect, useRef } from 'react'

interface MatrixRainProps {
  className?: string
}

export const MatrixRain = ({ className = '' }: MatrixRainProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const katakana =
      'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン'
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const nums = '0123456789'
    const alphabet = katakana + latin + nums

    const fontSize = 16
    const columns = Math.floor(canvas.width / 10) // More dense columns

    const drops: number[] = []
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.floor(Math.random() * canvas.height)
    }

    const draw = () => {
      context.fillStyle = 'rgba(0, 0, 0, 0.05)'
      context.fillRect(0, 0, canvas.width, canvas.height)

      context.fillStyle = '#0F0'
      context.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)]
        const x = i * 10
        context.fillText(text, x, drops[i])

        if (drops[i] > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i] += fontSize
      }
    }

    const animationFrame = setInterval(draw, 100)

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drops.length = 0
      for (let x = 0; x < Math.floor(canvas.width / 10); x++) {
        drops[x] = Math.floor(Math.random() * canvas.height)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearInterval(animationFrame)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="-z-20 fixed inset-0">
      <div className="-z-15 absolute inset-0 bg-matrix-dark" />
      <canvas
        ref={canvasRef}
        className={`-z-1 fixed inset-0 ${className}`}
        style={{ mixBlendMode: 'screen' }}
      />
    </div>
  )
}
