export default function Footer() {
  return (
    <footer className="w-full border-t border-sandstone bg-surface text-xs text-charcoal-light">
      <div className="px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div>© {new Date().getFullYear()} MatrixScribe</div>
        <div className="space-x-4">
          <a href="/privacy" className="hover:text-charcoal">Privacy</a>
          <a href="/terms" className="hover:text-charcoal">Terms</a>
        </div>
      </div>
    </footer>
  );
}
