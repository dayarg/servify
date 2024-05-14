import { ChangeEvent } from "react";

type Props = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const TimeInput = ({ label, placeholder, value, onChange, ...props }: Props) => {

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    onChange && onChange(inputValue);
  }
  return (
    <div className="flex flex-col">
      <label className="text-primary mb-1 font-bold">{label}</label>
      <input
        className="appearance-none border-2 border-primary rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
        type="time"
        placeholder={placeholder}
        value={value}
        onChange={handleOnChange}
        {...props}
      />
    </div>
  );
};

export default TimeInput;
