import type { InputHTMLAttributes } from "react";
import React from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  label: string;
}

// eslint-disable-next-line react/display-name
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...rest }, ref) => {
    return (
      <div className="flex w-full flex-col">
        <p>{label}</p>
        <input
          className="mt-2 mb-4 w-full rounded-md border-2 border-solid border-zinc-300 bg-transparent p-1 outline-none"
          ref={ref}
          {...rest}
        />
      </div>
    );
  }
);

// eslint-disable-next-line react/display-name
export const Select = React.forwardRef<
  HTMLSelectElement,
  React.PropsWithChildren<SelectProps>
>(({ label, children, ...rest }, ref) => {
  return (
    <div className="flex w-full flex-col">
      <p>{label}</p>
      <select
        className="mt-2 mb-4 w-full rounded-md border-2 border-solid border-zinc-300 bg-transparent p-1 outline-none"
        ref={ref}
        {...rest}
      >
        {children}
      </select>
    </div>
  );
});
