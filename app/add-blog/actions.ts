'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { addPost } from '@/lib/posts'
import type { Post } from '@/types/posts'

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function getStringValue(formData: FormData, field: string) {
  return String(formData.get(field) ?? '').trim()
}

function buildContentBlocks(content: string): Post['content'] {
  return content
    .split(/\r?\n\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((text) => ({ type: 'paragraph' as const, text }))
}

export async function createBlogPost(formData: FormData) {
  const title = getStringValue(formData, 'title')
  const browserTitle = getStringValue(formData, 'browserTitle')
  const category = getStringValue(formData, 'category')
  const excerpt = getStringValue(formData, 'excerpt')
  const image = getStringValue(formData, 'image')
  const alt = getStringValue(formData, 'alt')
  const content = getStringValue(formData, 'content')
  const date = getStringValue(formData, 'date') || new Date().toISOString().slice(0, 10)
  const submittedSlug = getStringValue(formData, 'slug')
  const slug = slugify(submittedSlug || title)

  if (!title || !category || !excerpt || !image || !alt || !content || !slug) {
    redirect('/add-blog?status=error')
  }

  const post: Post = {
    slug,
    title,
    browserTitle: browserTitle || undefined,
    date,
    image,
    alt,
    category,
    excerpt,
    content: buildContentBlocks(content),
  }

  try {
    await addPost(post)
  } catch (error) {
    const message =
      error instanceof Error ? encodeURIComponent(error.message) : encodeURIComponent('Unable to save post.')

    redirect(`/add-blog?status=error&message=${message}`)
  }

  revalidatePath('/')
  revalidatePath('/blog')
  revalidatePath('/add-blog')
  revalidatePath(`/blog/${slug}`)
  redirect(`/add-blog?status=success&slug=${slug}`)
}
