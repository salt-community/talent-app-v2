type Props = {
  label: string;
};

export function FormTextArea({ label }: Props) {
  return (
    <div className="grid grid-cols-4 items-start gap-4">
      <label
        htmlFor={label.toLowerCase()}
        className="text-right text-sm text-gray-700 mt-1"
      >
        {label}
      </label>
      <textarea
        name={label.toLowerCase()}
        className="col-span-3 border border-gray-300 rounded-md p-2 text-sm focus:ring focus:ring-gray-200 focus:outline-none resize-none"
        rows={3}
        style={{ maxHeight: "150px", overflowY: "auto" }}
      />
    </div>
  )

}