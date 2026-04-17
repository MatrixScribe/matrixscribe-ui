interface HeaderProps {
  title: string;
  subtitle?: string;
  meta?: string;
}

export default function Header({ title, subtitle, meta }: HeaderProps) {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-semibold text-charcoal">{title}</h1>
      {subtitle && (
        <p className="text-charcoal-light text-sm mt-1">{subtitle}</p>
      )}
      {meta && (
        <p className="text-charcoal-light text-xs mt-1">{meta}</p>
      )}
    </div>
  );
}