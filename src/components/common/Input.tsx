import React, { useState, useEffect } from "react";
import { InputProps } from "../../types";

const Input: React.FC<InputProps> = ({
  value,
  onValueChange,
  placeholder = "",
  ariaLabel,
  className = "",
  name,
  onSubmit,
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && onSubmit) {
      e.preventDefault();
      onValueChange(localValue);
      onSubmit();
    }
  };

  const handleBlur = () => {
    if (localValue !== value) {
      onValueChange(localValue);
    }
  };

  return (
    <input
      type="text"
      value={localValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      placeholder={placeholder}
      className={`input ${className}`}
      aria-label={ariaLabel || placeholder}
      name={name}
    />
  );
};

export default Input;
