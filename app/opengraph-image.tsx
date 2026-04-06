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
          padding: '56px',
          color: '#f8fafc',
          background:
            'linear-gradient(135deg, rgb(9, 9, 11) 0%, rgb(24, 24, 27) 45%, rgb(63, 63, 70) 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            letterSpacing: 8,
            textTransform: 'uppercase',
            color: '#d4d4d8',
          }}
        >
          {siteConfig.name}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            maxWidth: '80%',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 76,
              lineHeight: 1.05,
              fontWeight: 700,
            }}
          >
            Thoughts on technology, life, and growth.
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 32,
              lineHeight: 1.4,
              color: '#d4d4d8',
            }}
          >
            Articles and ideas from Velmora.
          </div>
        </div>
      </div>
    ),
    size
  )
}
