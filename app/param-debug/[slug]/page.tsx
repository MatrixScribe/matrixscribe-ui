export default async function ParamDebugPage({
  params,
}: {
  params: { slug: string };
}) {
  const resolved = params;

  console.log("PARAM-DEBUG PARAMS:", resolved);

  return (
    <div style={{ padding: 20 }}>
      <h1>Param Debug</h1>
      <pre>{JSON.stringify(resolved, null, 2)}</pre>
    </div>
  );
}
