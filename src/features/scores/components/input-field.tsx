
import { Input, Label } from "@/components";

type Props = {
  label: string;
  inputType: "text" | "number";
  value?: string | number;
  handleChangeInput?: (inputValue: string, label: string) => void;
};

export function InputField({
  label,
  inputType,
  value,
  handleChangeInput,
}: Props) {
  return (
    <>
      <Label htmlFor={label.toLowerCase()}>{label}</Label>
      <Input
        type={inputType}
        name={label.toLowerCase()}
        value={value}
        {...(label === "Score" ? { min: 0, max: 100 } : {})}
        onChange={(e) => {
          if (handleChangeInput) handleChangeInput(e.target.value, label);
        }}
        required
      />
    </>
  );
}