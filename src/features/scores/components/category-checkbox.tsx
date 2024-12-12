import { capitalizeFirstLetter } from "@/lib/utils";
import React from "react";

type Props = {
    label: string;
}

export function CategoryCheckbox({ label }: Props) {

    return (
        <div className="flex items-center space-x-2">
            <input
                type="checkbox"
                name={label}
                value={label}
                id={label}
                className="focus:ring focus:ring-gray-200"
            />
            <label
                htmlFor={label}
                className="text-sm text-gray-700 cursor-pointer"
            >
                {capitalizeFirstLetter(label)}
            </label>
        </div>
    )
}
