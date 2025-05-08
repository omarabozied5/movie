import { useState, useEffect } from "react";
import { SelectProps } from "../../types";

const Select: React.FC<SelectProps> = ({
  value,
  onValueChange,
  options,
  placeholder,
  ariaLabel,
  className = "",
  name,
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onValueChange(newValue);
  };

  return (
    <select
      value={localValue}
      onChange={handleChange}
      className={`input ${className}`}
      aria-label={ariaLabel || placeholder}
      name={name}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
