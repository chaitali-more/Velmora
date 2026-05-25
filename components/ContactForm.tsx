'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'
type FormValues = {
  name: string
  email: string
  message: string
  website: string
}
type FormErrors = Partial<Record<keyof Pick<FormValues, 'name' | 'email' | 'message'>, string>>

const initialForm: FormValues = { name: '', email: '', message: '', website: '' }
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validateContactForm(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  const name = values.name.trim()
  const email = values.email.trim()
  const message = values.message.trim()

  if (!name) {
    errors.name = 'Please enter your name.'
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters.'
  } else if (name.length > 80) {
    errors.name = 'Name must be 80 characters or fewer.'
  }

  if (!email) {
    errors.email = 'Please enter your email address.'
  } else if (!emailPattern.test(email)) {
    errors.email = 'Please enter a valid email address.'
  } else if (email.length > 120) {
    errors.email = 'Email must be 120 characters or fewer.'
  }

  if (!message) {
    errors.message = 'Please enter your message.'
  } else if (message.length < 10) {
    errors.message = 'Message must be at least 10 characters.'
  } else if (message.length > 1000) {
    errors.message = 'Message must be 1000 characters or fewer.'
  }

  return errors
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState<FormValues>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [serverMessage, setServerMessage] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm((current) => ({ ...current, [name]: value }))
    setStatus('idle')
    setServerMessage('')

    if (name === 'name' || name === 'email' || name === 'message') {
      setErrors((current) => ({ ...current, [name]: undefined }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const nextErrors = validateContactForm(form)
    setErrors(nextErrors)
    setServerMessage('')

    if (Object.keys(nextErrors).length > 0 || form.website.trim()) {
      setStatus('error')
      return
    }

    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          website: form.website.trim(),
        }),
      })

      const payload = (await res.json().catch(() => null)) as { error?: string; fieldErrors?: FormErrors } | null

      if (!res.ok) {
        setErrors(payload?.fieldErrors ?? {})
        setServerMessage(payload?.error ?? 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setStatus('success')
    } catch {
      setServerMessage('Unable to send your message right now. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="mx-auto max-w-3xl py-12 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-xl font-black text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
          OK
        </div>
        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Message sent!</h3>
        <p className="text-gray-500 dark:text-gray-400">I&apos;ll get back to you soon.</p>
      </div>
    )
  }

  const inputClass =
    'w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 dark:focus:ring-violet-500 transition'
  const hasErrors = Object.keys(errors).length > 0

  return (
    <form onSubmit={handleSubmit} noValidate className="mx-auto flex max-w-3xl flex-col gap-4">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          maxLength={80}
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          className={inputClass}
        />
        {errors.name ? <p id="name-error" className="mt-1 text-sm font-medium text-red-500">{errors.name}</p> : null}
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={120}
          autoComplete="email"
          inputMode="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          className={inputClass}
        />
        {errors.email ? <p id="email-error" className="mt-1 text-sm font-medium text-red-500">{errors.email}</p> : null}
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between gap-3">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Message
          </label>
          <span className="text-xs text-gray-400 dark:text-gray-500">{form.message.trim().length}/1000</span>
        </div>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={1000}
          rows={5}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : 'message-help'}
          placeholder="What's on your mind?"
          value={form.message}
          onChange={handleChange}
          className={inputClass}
        />
        {errors.message ? (
          <p id="message-error" className="mt-1 text-sm font-medium text-red-500">{errors.message}</p>
        ) : (
          <p id="message-help" className="mt-1 text-xs text-gray-400 dark:text-gray-500">Minimum 10 characters.</p>
        )}
      </div>

      {status === 'error' ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-300">
          {serverMessage || (hasErrors ? 'Please fix the highlighted fields.' : 'Something went wrong. Please try again.')}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-lg bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3 font-semibold text-white shadow-[0_10px_24px_rgba(167,139,250,0.35)] transition hover:opacity-95 disabled:opacity-50"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
