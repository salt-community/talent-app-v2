type Props = {
  children: React.ReactNode;
};

export function CvContainer({ children }: Props) {
  return <section className="border-red-800 border-2">{children}</section>;
}