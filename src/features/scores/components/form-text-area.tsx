import { FormLabel } from "./form-label";

type Props = {
  label: string;
  value?: string | null;
  handleChangeInput?: (inputValue: string, label: string) => void;
};

export function FormTextArea({ label, value, handleChangeInput }: Props) {
  return (
    <div className="grid grid-cols-4 items-start gap-4">
      <FormLabel label={label} />
      <textarea
        name={label.toLowerCase()}
        {...(value ? { value } : {})}
        onChange={(e) => {
          if (handleChangeInput) handleChangeInput(e.target.value, label);
        }}
        className="col-span-3 border border-gray-300 rounded-md p-2 text-sm focus:ring focus:ring-gray-200 focus:outline-none resize-none"
        rows={3}
        style={{ maxHeight: "150px", overflowY: "auto" }}
      />
    </div>
  );
}
