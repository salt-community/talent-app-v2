export function HeroPost({name, headline}: {name: string, headline: string}) {
  return (
    <>
      <section className="flex flex-col justify-center h-44 md:h-80 bg-muted p-3 md:px-16 lg:px-32">
        <h1 className="text-4xl font-semibold md:text-5xl">{`I am ${name}`}</h1>
        <p className="text-paragraphLight md:text-lg md:pt-1 ">{headline}</p>
      </section>
    </>
  );
}
