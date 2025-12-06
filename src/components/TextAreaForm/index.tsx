import { cn } from "@/lib/utils";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { tv } from "tailwind-variants";

type TextAreaFormProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  inputID: string;
  placeholder: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  children?: React.ReactNode;
  className?: string;
  defaultValue?: string | number;
};

const TextAreaVariants = tv({
  base: "peer transition-colors duration-200 py-3 border-b border-gray-500 focus:outline-none focus:border-blue-200 disabled:bg-transparent",
  variants: {
    hasError: {
      true: "border-red-500",
    },
  },
  defaultVariants: {
    hasError: false,
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

export default function TextAreaForm({
  inputID,
  label,
  error,
  placeholder,
  register,
  children,
  className,
  defaultValue,
  ...rest
}: TextAreaFormProps) {
  return (
    <div className="flex flex-col gap-2 relative">
      <div className="flex flex-col-reverse relative">
        <textarea
          id={inputID}
          {...register}
          className={cn(
            TextAreaVariants({ hasError: !!error }),
            "resize-none min-h-24",
            className,
          )}
          defaultValue={defaultValue}
          placeholder={placeholder}
          {...rest}
        />

        <label htmlFor={inputID} className={labelVariants({ error: !!error })}>
          {label}
        </label>
      </div>

      {children}

      {error && <span className="text-sm text-red-500">{error.message}</span>}
    </div>
  );
}
