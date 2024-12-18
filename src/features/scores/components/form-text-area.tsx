import { Label, Textarea } from "@/components";

type Props = {
  label: string;
  value?: string | null;
  handleChangeInput?: (inputValue: string, label: string) => void;
};

export function FormTextArea({ label, value, handleChangeInput }: Props) {
  return (
    <>
      <Label htmlFor={label.toLowerCase()}>{label}</Label>
      <Textarea
        name={label.toLowerCase()}
        {...(value ? { value } : {})}
        onChange={(e) => {
          if (handleChangeInput) handleChangeInput(e.target.value, label);
        }}
        rows={3}
        style={{ maxHeight: "150px", overflowY: "auto" }}
      />
    </>
  );
}
