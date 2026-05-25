type ResultPlaceholderProps = {
  title?: string;
  description: string;
};

export default function ResultPlaceholder({
  title = "Ready to calculate",
  description,
}: ResultPlaceholderProps) {
  return (
    <div className="relative z-10 flex h-full min-h-[420px] rounded-[1.75rem] border border-cyan-100/80 bg-[radial-gradient(circle_at_8%_94%,rgba(124,58,237,0.14),transparent_30%),radial-gradient(circle_at_96%_0%,rgba(34,211,238,0.18),transparent_34%),linear-gradient(135deg,#ffffff_0%,#f8fafc_100%)] p-7 shadow-[0_24px_64px_rgba(15,23,42,0.16)] sm:min-h-[520px] sm:p-8 dark:border-slate-700/70 dark:bg-[radial-gradient(circle_at_8%_94%,rgba(109,40,217,0.34),transparent_30%),radial-gradient(circle_at_96%_0%,rgba(8,145,178,0.36),transparent_34%),linear-gradient(135deg,#0b1020_0%,#101827_100%)] dark:shadow-[0_28px_70px_rgba(2,6,23,0.42)]">
      <div className="flex min-h-full w-full flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-cyan-300/60 px-5 py-16 text-center dark:border-cyan-400/25 sm:px-8">
        <div className="rounded-xl border px-3 py-3 text-sm font-bold capitalize text-white shadow-[0_14px_28px_rgba(167,139,250,0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(167,139,250,0.55)] border-transparent bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500">
          Result Panel
        </div>
        <h2 className="mt-7 text-3xl font-black text-slate-950 sm:text-4xl dark:text-white">
          {title}
        </h2>
        <p className="mt-5 max-w-md text-base font-medium leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
          {description}
        </p>
      </div>
    </div>
  );
}
