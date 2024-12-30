export function HeroPost({name, headline}: {name: string, headline: string}) {
  return (
    <>
      <section className="flex flex-col justify-center  h-44">
        <h1 className="text-4xl font-semibold ">
          {`I am ${name}`}
        </h1>
        <p className="text-paragraphLight">{headline}</p>
      </section>
    </>
  );
}
