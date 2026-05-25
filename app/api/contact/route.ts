import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

type ContactPayload = {
  name?: unknown
  email?: unknown
  message?: unknown
  website?: unknown
}

function getString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function validatePayload(payload: ContactPayload) {
  const fieldErrors: Record<string, string> = {}
  const name = getString(payload.name)
  const email = getString(payload.email)
  const message = getString(payload.message)
  const website = getString(payload.website)

  if (website) {
    fieldErrors.message = 'Unable to send this message.'
  }

  if (!name) {
    fieldErrors.name = 'Please enter your name.'
  } else if (name.length < 2) {
    fieldErrors.name = 'Name must be at least 2 characters.'
  } else if (name.length > 80) {
    fieldErrors.name = 'Name must be 80 characters or fewer.'
  }

  if (!email) {
    fieldErrors.email = 'Please enter your email address.'
  } else if (!emailPattern.test(email)) {
    fieldErrors.email = 'Please enter a valid email address.'
  } else if (email.length > 120) {
    fieldErrors.email = 'Email must be 120 characters or fewer.'
  }

  if (!message) {
    fieldErrors.message = 'Please enter your message.'
  } else if (message.length < 10) {
    fieldErrors.message = 'Message must be at least 10 characters.'
  } else if (message.length > 1000) {
    fieldErrors.message = 'Message must be 1000 characters or fewer.'
  }

  return {
    fieldErrors,
    values: { name, email, message },
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload
    const { fieldErrors, values } = validatePayload(payload)

    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json(
        { error: 'Please fix the highlighted fields.', fieldErrors },
        { status: 400 }
      )
    }

    const safeName = escapeHtml(values.name)
    const safeEmail = escapeHtml(values.email)
    const safeMessage = escapeHtml(values.message).replaceAll('\n', '<br />')

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'chaitalicoding@gmail.com',
      replyTo: values.email,
      subject: `New message from ${values.name}`,
      html: `
        <h2>New contact from Velmora</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
      text: `New contact from Velmora\n\nName: ${values.name}\nEmail: ${values.email}\n\nMessage:\n${values.message}`,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to send. Please try again later.' }, { status: 500 })
  }
}
