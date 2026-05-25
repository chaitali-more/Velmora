import 'server-only'

import { promises as fs } from 'node:fs'
import path from 'node:path'
import type { Post } from '@/types/posts'

const postsFilePath = path.join(process.cwd(), 'data', 'posts.json')

async function readPostsFile() {
  const raw = await fs.readFile(postsFilePath, 'utf8')
  return JSON.parse(raw) as Post[]
}

function sortPosts(posts: Post[]) {
  return [...posts].sort((first, second) => {
    return new Date(second.date).getTime() - new Date(first.date).getTime()
  })
}

export async function getPosts() {
  const posts = await readPostsFile()
  return sortPosts(posts)
}

export async function getPostBySlug(slug: string) {
  const posts = await readPostsFile()
  return posts.find((post) => post.slug === slug)
}

export async function addPost(post: Post) {
  const posts = await readPostsFile()
  const existingPost = posts.find((item) => item.slug === post.slug)

  if (existingPost) {
    throw new Error('A post with this slug already exists.')
  }

  const updatedPosts = sortPosts([post, ...posts])
  await fs.writeFile(postsFilePath, `${JSON.stringify(updatedPosts, null, 2)}\n`, 'utf8')

  return post
}
