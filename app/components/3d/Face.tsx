import { clsx } from "clsx";
import { ReactNode } from "react";

interface FaceProps {
  children: ReactNode;
  transform: string;
  className?: string;
  label?: string;
  size?: number;
}

export const Face = ({ children, transform, className, label, size = 300 }: FaceProps) => {
  return (
    <div
      className={clsx(
        "absolute flex flex-col items-center justify-center text-center shadow-2xl backface-hidden border-2 border-white/10",
        "bg-white/5 backdrop-blur-md rounded-xl",
        className
      )}
      style={{
        transform: transform,
        backfaceVisibility: "hidden",
        width: `${size}px`,
        height: `${size}px`,
        padding: size < 300 ? '1rem' : '1.5rem',
      }}
    >
      {label && (
        <span className="absolute top-2 right-4 text-xs font-bold opacity-50 uppercase tracking-widest">
          {label}
        </span>
      )}
      <div className="overflow-y-auto w-full h-full flex flex-col items-center justify-center scrollbar-hide">
        {children}
      </div>
    </div>
  );
};
