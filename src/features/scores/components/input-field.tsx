import { FormLabel } from "./form-label";

type Props = {
  label: string;
  inputType: "text" | "number"
  handleChangeInput?: (inputValue: string, label: string) => void
};

export function InputField({ label, inputType, handleChangeInput }: Props) {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <FormLabel label={label} />
      <input
        type={inputType}
        name={label.toLowerCase()}
        className="col-span-3 border border-gray-300 rounded-md p-2 text-sm focus:ring focus:ring-gray-200 focus:outline-none"
        onChange={(e) => {
          if (handleChangeInput) handleChangeInput(e.target.value, label)
        }}
        required
      />
    </div>
  );
}