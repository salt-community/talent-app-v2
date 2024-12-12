import { Tag } from "emblor";

type Props = {
  title: string;
  content: Tag[];
};

export function Row({ title, content }: Props) {
  return (
    <section className="flex justify-between mt-1">
      <h3 className="font-semibold">{title}:</h3>
      <div className="space-x-2 ">
        {content.map((item, index) => (
          <span className="text-end" key={index}>
            {item.text}
          </span>
        ))}
      </div>
    </section>
  );
}
