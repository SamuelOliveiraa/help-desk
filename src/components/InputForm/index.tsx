import { cn } from "@/lib/utils";
import { error } from "console";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { tv } from "tailwind-variants";

type InputFormProps = {
  label: string;
  inputID: string;
  placeholder: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  helperText?: string;
  isPassword?: boolean;
  children?: React.ReactNode;
  className?: string;
  type?: "text" | "password" | "textarea";
};

const InputVariants = tv({
  base: "peer transition-colors duration-200 py-3 border-b border-gray-500 focus:outline-none focus:border-blue-200 disabled:bg-transparent",
  variants: {
    hasError: {
      true: "border bg-red-500",
    },
    hasPrefixValue: {
      true: "pl-6",
    },
  },
  defaultVariants: {
    hasError: false,
    hasPrefixValue: false,
  },
});

const labelVariants = tv({
  base: "uppercase text-xs peer-focus:text-blue-200",
  variants: {
    error: {
      true: "text-red-500",
    },
  },
  defaultVariants: {
    error: false,
  },
});

export default function InputForm({
  inputID,
  label,
  helperText,
  error,
  placeholder,
  register,
  isPassword,
  children,
  className,
  type,
  ...rest
}: InputFormProps) {
  const [passwordView, setPasswordView] = useState(true);

  function togglePasswordView() {
    setPasswordView(!passwordView);
  }

  const inputType = isPassword
    ? passwordView
      ? "password"
      : "text"
    : type || "text";

  return (
    <div className="flex flex-col gap-2 relative">
      <div className="flex flex-col-reverse relative">
        {inputID === "value" && (
          <span className="text-base absolute top-[28px]">R$</span>
        )}

        {type === "textarea" ? (
          <textarea
            id={inputID}
            {...register}
            className={cn(
              InputVariants({ hasError: !!error }),
              "resize-none min-h-24", // impede arrastar
              className,
            )}
            placeholder={placeholder}
            {...rest}
          />
        ) : (
          <input
            id={inputID}
            {...register}
            className={cn(
              InputVariants({
                hasError: !!error,
                hasPrefixValue: inputID === "value",
              }),
              className,
            )}
            placeholder={placeholder}
            type={inputType}
            {...rest}
          />
        )}

        {/* <input
          id={inputID}
          {...register}
          className={cn(
            InputVariants({
              hasError: !!error,
              hasPrefixValue: inputID === "value",
            }),
            className,
          )}
          placeholder={placeholder}
          type={inputType}
          {...rest}
        /> */}

        <label htmlFor={inputID} className={labelVariants({ error: !!error })}>
          {label}
        </label>
      </div>

      {children}

      {passwordView && isPassword && (
        <EyeClosed
          className="absolute right-0 bottom-9 cursor-pointer"
          onClick={togglePasswordView}
        />
      )}

      {!passwordView && isPassword && (
        <Eye
          className="absolute right-0 bottom-9 cursor-pointer"
          onClick={togglePasswordView}
        />
      )}

      {error && <span className="text-sm text-red-500">{error.message}</span>}

      {!error && helperText && (
        <span className="text-sm text-gray-400 italic">{helperText}</span>
      )}
    </div>
  );
}
