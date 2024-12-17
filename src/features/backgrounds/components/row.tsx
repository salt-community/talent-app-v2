import { Dot } from "lucide-react";

type Props = {
  title: string;
  content: { id: number; name: string }[];
};

export function Row({ title, content }: Props) {
  return (
    <section className="justify-between mt-1">
      <h3 className="font-semibold">{title}</h3>
      <div className="flex flex-wrap justify-start">
        {content.map((item, index) => (
          <div key={index} className="flex text-sm items-center">
            {index != 0 && <Dot size={12} />}
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
