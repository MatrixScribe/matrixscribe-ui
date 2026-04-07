import Link from "next/link";
import { cookies } from "next/headers";
import Card from "@/app/components/Card";
import Grid from "@/app/components/Grid";
import MiniSparkline from "@/app/components/MiniSparkline";

async function getEntities(token: string | undefined) {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${base}/api/entities`, {
    cache: "no-store",
    next: { revalidate: 0 },
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (!res.ok) return [];
  return res.json();
}

export default async function EntityDirectory() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const entities = await getEntities(token);

  return (
    <main className="p-8 space-y-8">
      <h1 className="text-2xl font-semibold text-charcoal dark:text-neutral-50">
        Entity Intelligence Directory
      </h1>

      <p className="text-sm text-charcoal-light">
        Explore real-time sentiment, risk, and media velocity across key
        institutions, companies, and political actors.
      </p>

      <Grid className="grid-cols-12 gap-6">
        {entities.map((e: any) => (
          <Link key={e.slug} href={`/entity/${e.slug}`} className="col-span-3">
            <Card className="hover:shadow-lg transition-all cursor-pointer">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <div className="font-medium text-charcoal dark:text-neutral-100">
                    {e.name}
                  </div>
                  <div className="text-xs text-charcoal-light">{e.type}</div>
                </div>
                <div className="text-sm font-semibold text-charcoal">
                  {e.sentiment > 0 ? "+" : ""}
                  {e.sentiment.toFixed(2)}
                </div>
              </div>

              <MiniSparkline data={e.sparkline} />

              <div className="mt-3 text-xs text-charcoal-light">
                Updated {e.updatedAt}
              </div>
            </Card>
          </Link>
        ))}
      </Grid>
    </main>
  );
}
