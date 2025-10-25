import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type InputFormProps = {
  label: string;
  inputID: string;
  placeholder: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  helperText?: string;
  isPassword?: boolean;
  children?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function InputForm({
  inputID,
  label,
  helperText,
  error,
  placeholder,
  register,
  isPassword,
  children,
  ...rest
}: InputFormProps) {
  const [passwordView, setPasswordView] = useState(true);

  function togglePasswordView() {
    setPasswordView(!passwordView);
  }

  return (
    <div className="flex flex-col gap-2 relative">
      <div className="flex flex-col-reverse relative">
        {inputID === "value" && (
          <span className="text-base absolute top-[28px]">R$</span>
        )}

        <input
          id={inputID}
          {...register}
          className={`peer transition-colors duration-200 py-3 border-b border-gray-500 focus:outline-none focus:border-blue-200 disabled:bg-transparent ${error && "border-red-500"} ${inputID === "value" && "pl-6"}`}
          placeholder={placeholder}
          type={
            passwordView && isPassword
              ? "password"
              : !passwordView && isPassword
                ? "text"
                : ""
          }
          {...rest}
        />
        <label
          htmlFor={inputID}
          className={`uppercase text-xs ${error && "text-red-500"} peer-focus:text-blue-200`}
        >
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
