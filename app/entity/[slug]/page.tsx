export const dynamic = "force-dynamic";

export default async function EntityPage({
  params,
}: {
  params: { slug: string };
}) {
  console.log("ENTITY PAGE PARAMS:", params);
  const slug = params?.slug;
  console.log("SLUG:", slug);

  if (!slug) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Invalid Entity</h1>
        <p>No slug was provided.</p>
      </div>
    );
  }

  // Fetch entity data from backend
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/entity/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Entity Not Found</h1>
        <p>Backend returned an error for slug: {slug}</p>
      </div>
    );
  }

  const entity = await res.json();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{entity.name}</h1>
      <pre className="bg-black/20 p-4 rounded text-sm">
        {JSON.stringify(entity, null, 2)}
      </pre>
    </div>
  );
}
