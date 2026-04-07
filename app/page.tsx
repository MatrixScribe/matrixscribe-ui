export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-sandstone/40 dark:bg-neutral-950">
      <div className="max-w-xl text-center space-y-4">
        <h1 className="text-2xl font-semibold text-charcoal dark:text-neutral-50">
          MatrixScribe Entity Intelligence
        </h1>

        <p className="text-sm text-charcoal-light leading-relaxed">
          Entity dashboards now live under:
        </p>

        <p className="text-sm text-charcoal dark:text-neutral-100">
          <code className="px-2 py-1 rounded bg-black/5 dark:bg-white/5 text-xs">
            /entity/sarb
          </code>
        </p>
      </div>
    </main>
  );
}
