import { Dispatch, SetStateAction } from "react";
import { FormLabel } from "./form-label";

type Props = {
  label: string;
  inputType: "text" | "number"
  handleChangeTitle?: Dispatch<SetStateAction<string>>
};

export function InputField({ label, inputType, handleChangeTitle }: Props) {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <FormLabel label={label} />
      <input
        type={inputType}
        name={label.toLowerCase()}
        className="col-span-3 border border-gray-300 rounded-md p-2 text-sm focus:ring focus:ring-gray-200 focus:outline-none"
        onChange={(e) => {
          if (handleChangeTitle && label === "Title") {
            handleChangeTitle(e.target.value)
          }
        }}
        required
      />
    </div>
  );
}