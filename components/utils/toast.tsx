import { FC } from "react";
import { Toast, ToastProvider } from "@/components/ui/toast";
import { cn } from "@/lib/utils"; // Utility to combine Tailwind classes if you use one.
import { CheckCircle, AlertCircleIcon } from "lucide-react"; // Lucide icons for styling.

interface ToastComponentProps {
  message: string;
  isError?: boolean;
  onTimeUpdate?: () => void;
  onClickToggle?: () => void;
}

const ToastComponent: FC<ToastComponentProps> = ({
  message,
  isError = false,
  onTimeUpdate,
  onClickToggle,
}) => {
  return (
    <ToastProvider>
      <div className="absolute right-4 top-4 z-50">
        <Toast>
          <div
            className={cn(
              "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
              isError
                ? "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200"
                : "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200"
            )}
          >
            {isError ? (
              <AlertCircleIcon className="h-5 w-5" />
            ) : (
              <CheckCircle className="h-5 w-5" />
            )}
          </div>
          <div className="ml-3 text-sm font-normal">{message}</div>
          <button
            className="ml-auto text-sm text-gray-500 hover:text-gray-700"
            onClick={() => {
              if (onClickToggle) onClickToggle();
            }}
            aria-label="Close"
          >
            ×
          </button>
        </Toast>
      </div>
    </ToastProvider>
  );
};

export default ToastComponent;
