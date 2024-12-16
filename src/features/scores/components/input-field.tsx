import { FormLabel } from "./form-label";

type Props = {
  label: string;
  inputType: "text" | "number";
  value?: string | number;
  handleChangeInput?: (inputValue: string, label: string) => void;
};

export function InputField({ label, inputType, value, handleChangeInput }: Props) {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <FormLabel label={label} />
      <input
        type={inputType}
        name={label.toLowerCase()}
        value={value}
        {...(label === "Score" ? { min: 0, max: 100 } : {})}
        className="col-span-3 border border-gray-300 rounded-md p-2 text-sm focus:ring focus:ring-gray-200 focus:outline-none"
        onChange={(e) => {
          if (handleChangeInput) handleChangeInput(e.target.value, label);
        }}
        required
      />
    </div>
  );
}
