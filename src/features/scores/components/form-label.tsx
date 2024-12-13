type Props = {
  label: string;
}

export function FormLabel({ label }: Props) {
  return (
    <label
      htmlFor={label.toLowerCase()}
      className="text-right text-sm text-gray-700"
    >
      {label}
    </label>
  );
}
