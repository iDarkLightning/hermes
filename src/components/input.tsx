import type { InputHTMLAttributes } from "react";
import React from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, ...rest }) => {
  return (
    <div className="flex flex-row">
      <p>{label}</p>
      <input
        className="ml-2 rounded border-2 border-solid border-zinc-300 bg-transparent"
        {...rest}
      />
    </div>
  );
};

export const Select: React.FC<React.PropsWithChildren<SelectProps>> = ({
  label,
  children,
  ...rest
}) => {
  return (
    <div className="flex flex-row">
      <p>{label}</p>
      <select
        className="ml-2 rounded border-2 border-solid border-zinc-300 bg-transparent"
        {...rest}
      >
        {children}
      </select>
    </div>
  );
};
