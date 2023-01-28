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
    <div className="flex w-full flex-col">
      <p>{label}</p>
      <input
        className="mt-2 mb-4 w-full rounded-md border-2 border-solid border-zinc-300 bg-transparent p-1 outline-none"
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
    <div className="flex w-full flex-col">
      <p>{label}</p>
      <select
        className="mt-2 mb-4 w-full rounded-md border-2 border-solid border-zinc-300 bg-transparent p-1 outline-none"
        {...rest}
      >
        {children}
      </select>
    </div>
  );
};
