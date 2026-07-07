"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import React from "react";

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  confirmMessage?: string;
  loadingText?: string;
  icon?: React.ReactNode;
}

export default function SubmitButton({
  children,
  confirmMessage,
  loadingText = "Memproses...",
  icon,
  className,
  onClick,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (confirmMessage) {
      if (!window.confirm(confirmMessage)) {
        e.preventDefault();
        return;
      }
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type="submit"
      disabled={pending || props.disabled}
      onClick={handleClick}
      className={`flex items-center justify-center gap-1.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed ${className || ""}`}
      {...props}
    >
      {pending ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </button>
  );
}
