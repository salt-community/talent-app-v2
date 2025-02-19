type Params = {
  params: Promise<{ name: string }>;
};

export default async function Page({ params }: Params) {
  const { name } = await params;

  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
}
