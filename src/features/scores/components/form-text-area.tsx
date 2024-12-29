import { Label, Textarea } from "@/components";

type Props = {
  label: string;
  defaultValue?: string;
  handleChangeInput?: (inputValue: string, label: string) => void;
};

export function FormTextArea({ 
  label, 
  defaultValue, 
  handleChangeInput 
}: Props) {
  return (
    <>
      <Label htmlFor={label.toLowerCase()}>{label}</Label>
      <Textarea
        name={label.toLowerCase()}
        onChange={(e) => {
          if (handleChangeInput) handleChangeInput(e.target.value, label);
        }}
        rows={3}
        style={{ maxHeight: "150px", overflowY: "auto" }}
        defaultValue={defaultValue}
      />
    </>
  );
}
