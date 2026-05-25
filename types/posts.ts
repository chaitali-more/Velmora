export type ListItem =
  | string
  | {
      text: string
      href: string
      label?: string
    }

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'list'; items: ListItem[] }
  | { type: 'numbered_list'; items: string[] }
  | { type: 'divider' }
  | { type: 'tip'; text: string }
  | { type: 'note'; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | {
      type: 'cta_banner'
      title: string
      description: string
      buttonText: string
      link: string
      image: string
    }
  | {
      type: 'cta_simple'
      text: string
      link: string
    }
  | {
      type: 'cta_card'
      title: string
      description: string
      buttonText: string
      link: string
    }
  | {
      type: 'cta_inline'
      text: string
      link: string
    }
  | {
      type: 'image_content'
      image: { src: string; alt?: string; caption?: string }
      badge?: string
      title?: string
      description?: string
      points?: string[]
      link?: { href: string; label: string }
      reverse?: boolean
    }

export interface Post {
  slug: string
  title: string
  browserTitle?: string
  date: string
  image: string
  alt: string
  category: string
  excerpt: string
  content: ContentBlock[]
}
