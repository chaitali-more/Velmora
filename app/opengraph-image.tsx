import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/seo'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px 70px',
          color: '#f8fafc',
          background: 'linear-gradient(135deg, #0b1020 0%, #101827 50%, #030712 100%)',
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #00C6FF 0%, #C850C0 100%)',
            }}
          />
          <div
            style={{
              display: 'flex',
              fontSize: 30,
              fontWeight: 800,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: '#ffffff',
            }}
          >
            {siteConfig.name}
          </div>
        </div>

        {/* Center Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            maxWidth: '90%',
          }}
        >
          <div
            style={{
              width: 120,
              height: 6,
              borderRadius: 3,
              background: 'linear-gradient(to right, #00C6FF, #7F77DD, #C850C0)',
            }}
          />
          <div
            style={{
              display: 'flex',
              fontSize: 72,
              lineHeight: 1.15,
              fontWeight: 900,
              letterSpacing: -1,
              color: '#ffffff',
              marginTop: 10,
            }}
          >
            Free Online Tools & Calculators
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 32,
              lineHeight: 1.4,
              color: '#94a3b8',
              fontWeight: 500,
            }}
          >
            Smart health tracking, image utilities, and productivity tools.
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 20,
            fontWeight: 600,
            color: '#64748b',
          }}
        >
          <span>Fast. Secure. 100% Local.</span>
          <span style={{ letterSpacing: 1 }}>www.velmoranow.in</span>
        </div>
      </div>
    ),
    size
  )
}
