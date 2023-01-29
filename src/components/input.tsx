import type { InputHTMLAttributes } from "react";
import React from "react";
import FormError from "./form-error";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errors: any;
}

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  label: string;
  errors: any;
}

// eslint-disable-next-line react/display-name
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, errors, name, ...rest }, ref) => {
    console.log(rest);
    return (
      <div className="flex w-full flex-col">
        <p>{label}</p>
        <input
          className="mt-2 mb-2 w-full rounded-md border-2 border-solid border-zinc-300 bg-transparent p-1 outline-none"
          ref={ref}
          name={name}
          {...rest}
        />
        <FormError name={name ?? ""} errors={errors} />
      </div>
    );
  }
);

// eslint-disable-next-line react/display-name
export const Select = React.forwardRef<
  HTMLSelectElement,
  React.PropsWithChildren<SelectProps>
>(({ label, errors, children, name, ...rest }, ref) => {
  return (
    <div className="flex w-full flex-col">
      <p>{label}</p>
      <select
        className="mt-2 mb-2 w-full rounded-md border-2 border-solid border-zinc-300 bg-transparent p-1 outline-none"
        ref={ref}
        name={name}
        {...rest}
      >
        {children}
      </select>
      <FormError name={name ?? ""} errors={errors} />
    </div>
  );
});
