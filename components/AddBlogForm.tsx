import { createBlogPost } from '@/app/add-blog/actions'

type AddBlogFormProps = {
  totalPosts: number
  status?: string
  message?: string
  slug?: string
}

function StatusMessage({ status, message, slug }: Omit<AddBlogFormProps, 'totalPosts'>) {
  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
        Blog added successfully. View it at <a className="font-semibold underline" href={`/blog/${slug}`}>/blog/{slug}</a>.
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {message || 'Please fill every required field and try again.'}
      </div>
    )
  }

  return null
}

export default function AddBlogForm({ totalPosts, status, message, slug }: AddBlogFormProps) {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">Content Studio</p>
        <h1 className="mt-3 text-3xl font-semibold text-zinc-900 dark:text-white">Add a new blog post</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          This form saves every new post into <code>data/posts.json</code>, so your homepage, all posts list, API,
          and blog detail page all read from the same data file.
        </p>
        <div className="mt-5 inline-flex rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
          Total stored posts: {totalPosts}
        </div>
      </div>

      <StatusMessage status={status} message={message} slug={slug} />

      <form action={createBlogPost} className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Title</span>
            <input name="title" required className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:focus:border-zinc-200" />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Browser title</span>
            <input name="browserTitle" className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:focus:border-zinc-200" />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Slug</span>
            <input name="slug" placeholder="leave blank to auto-create from title" className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:focus:border-zinc-200" />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Date</span>
            <input name="date" type="date" className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:focus:border-zinc-200" />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Category</span>
            <input name="category" required className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:focus:border-zinc-200" />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Image URL or path</span>
            <input name="image" required placeholder="/images/your-post.png" className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:focus:border-zinc-200" />
          </label>
        </div>

        <label className="mt-5 block space-y-2">
          <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Image alt text</span>
          <input name="alt" required className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:focus:border-zinc-200" />
        </label>

        <label className="mt-5 block space-y-2">
          <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Excerpt</span>
          <textarea name="excerpt" required rows={3} className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:focus:border-zinc-200" />
        </label>

        <label className="mt-5 block space-y-2">
          <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Content</span>
          <textarea
            name="content"
            required
            rows={14}
            placeholder="Write your post here. Separate paragraphs with a blank line."
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:focus:border-zinc-200"
          />
        </label>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs leading-5 text-zinc-500 dark:text-zinc-400">
            Saved content is converted into blog paragraphs automatically.
          </p>
          <button
            type="submit"
            className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Save blog post
          </button>
        </div>
      </form>
    </div>
  )
}
