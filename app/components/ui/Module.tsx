export default function Module({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-medium text-charcoal">{title}</h2>
      <div>{children}</div>
    </div>
  );
}
