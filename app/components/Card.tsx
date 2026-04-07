export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="surface shadow-subtle p-5 rounded-xl">
      {children}
    </div>
  );
}
