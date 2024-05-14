import React, { ChangeEvent } from "react";

export type TextareaProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

const Textarea = ({
  label,
  placeholder,
  value,
  onChange,
}: TextareaProps): JSX.Element => {
  const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    onChange && onChange(inputValue);
  };
  return (
    <div className="my-4">
      <label className="block text-primary text-sm font-bold mb-1">
        {label}
      </label>
      <textarea
        className="appearance-none border-2 border-primary rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
      ></textarea>
    </div>
  );
};

export default Textarea;
