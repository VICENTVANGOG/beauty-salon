import React from 'react';
import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  name?: string;
  error?: string;
}

export const Input = ({
  placeholder,
  name,
  error,
  className,
  ...props
}: InputProps) => {
  return (
    <div className="flex flex-col mb-4">
      <input
        type="text" 
        name={name}
        placeholder={placeholder}
        className={`w-full rounded-full border px-4 py-2 
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
          placeholder:text-gray-500 focus:border-[#E75A5A] focus:outline-none 
          transition duration-150 ease-in-out ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};
