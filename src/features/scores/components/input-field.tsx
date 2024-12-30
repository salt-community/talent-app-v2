import { Input, Label } from "@/components";

type Props = {
  label: string;
  inputType: "text" | "number";
  defaultValue?: string;
  errorMessage?: string;
  handleChangeInput?: (inputValue: string, label: string) => void;
};

export function InputField({
  label,
  inputType,
  defaultValue,
  errorMessage,
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
      {errorMessage ? <p className="text-red-600 mt-[-0.8rem] h-6">{errorMessage}</p> : <p className="mt-[-0.8rem] h-6"></p>}      
    </>
  );
}
