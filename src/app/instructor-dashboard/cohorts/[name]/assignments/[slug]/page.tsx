type Params = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Params) {
  const { slug } = await params;

  console.log({ slug: name });

  return (
    <div>
      <h1>{slug}</h1>
    </div>
  );
}
