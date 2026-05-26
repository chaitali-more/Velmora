type ResultPlaceholderProps = {
  title?: string;
  description: string;
};

export default function ResultPlaceholder({
  title = "Ready to calculate",
  description,
}: ResultPlaceholderProps) {
  return (
    <div className="relative z-10 flex h-full min-h-[300px] rounded-xl border border-cyan-100/80 bg-[radial-gradient(circle_at_8%_94%,rgba(124,58,237,0.14),transparent_30%),radial-gradient(circle_at_96%_0%,rgba(34,211,238,0.18),transparent_34%),linear-gradient(135deg,#ffffff_0%,#f8fafc_100%)] p-0 shadow-none sm:min-h-[520px] sm:rounded-xl sm:p-8 sm:shadow-[0_24px_64px_rgba(15,23,42,0.16)] dark:border-slate-700/70 dark:bg-[radial-gradient(circle_at_8%_94%,rgba(109,40,217,0.34),transparent_30%),radial-gradient(circle_at_96%_0%,rgba(8,145,178,0.36),transparent_34%),linear-gradient(135deg,#0b1020_0%,#101827_100%)] sm:dark:shadow-[0_28px_70px_rgba(2,6,23,0.42)]">
      <div className="flex min-h-full w-full flex-col items-center justify-center rounded-xl border border-dashed border-cyan-300/60 px-4 py-8 text-center dark:border-cyan-400/25 sm:rounded-[1.5rem] sm:px-8 sm:py-16">
        <div className="rounded-xl border px-3 py-2 text-xs font-bold capitalize text-white shadow-[0_10px_22px_rgba(167,139,250,0.38)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(167,139,250,0.55)] sm:py-3 sm:text-sm border-transparent bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500">
          Result Panel
        </div>
        <h2 className="mt-5 text-2xl font-black text-slate-950 sm:mt-7 sm:text-4xl dark:text-white">
          {title}
        </h2>
        <p className="mt-3 max-w-md text-sm font-medium leading-relaxed text-slate-600 sm:mt-5 sm:text-lg dark:text-slate-300">
          {description}
        </p>
      </div>
    </div>
  );
}
