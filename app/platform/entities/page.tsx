import Link from "next/link";

export default async function EntitiesPage() {
  // Replace with real backend call later
  const entities = [
    { slug: "israel", name: "Israel", category: "Country" },
    { slug: "iran", name: "Iran", category: "Country" },
    { slug: "south-africa", name: "South Africa", category: "Country" },
    { slug: "usa", name: "United States", category: "Country" },
    { slug: "china", name: "China", category: "Country" },
    { slug: "russia", name: "Russia", category: "Country" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-charcoal">Entities</h1>

      <input
        placeholder="Search entities…"
        className="w-full max-w-md px-4 py-2 border border-surface-border rounded-md bg-surface-muted text-sm outline-none"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {entities.map((e) => (
          <Link
            key={e.slug}
            href={`/entity/${e.slug}`}
            className="p-4 border border-surface-border rounded-lg bg-surface hover:bg-surface-muted transition"
          >
            <div className="font-medium text-charcoal">{e.name}</div>
            <div className="text-xs text-charcoal-light mt-1">{e.category}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
