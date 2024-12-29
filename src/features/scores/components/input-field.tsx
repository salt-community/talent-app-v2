import { Input, Label } from "@/components";

type Props = {
  label: string;
  inputType: "text" | "number";
  defaultValue?: string;
  handleChangeInput?: (inputValue: string, label: string) => void;
};

export function InputField({
  label,
  inputType,
  defaultValue,
  handleChangeInput,
}: Props) {
  return (
    <>
      <Label htmlFor={label.toLowerCase()}>{label}</Label>
      <Input
        type={inputType}
        name={label.toLowerCase()}
        defaultValue={defaultValue}
        {...(label === "Score" ? { min: 0, max: 100 } : {})}
        onChange={(e) => {
          if (handleChangeInput) handleChangeInput(e.target.value, label);
        }}
        required
      />
    </>
  );
}
