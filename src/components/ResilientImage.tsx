import { useState } from 'react';
import { Layers } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  className?: string;
}

export function ResilientImage({
  src,
  alt,
  fallbackTitle,
  className = '',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#DBEAFE] via-[#E8EDFA] to-[#EDE9FE] p-6 text-center text-[#1E293B] dark:from-[#1E293B] dark:via-[#1E1B4B] dark:to-[#0F172A] dark:text-[#E2E8F0] ${className}`}
      >
        <Layers className="h-7 w-7 text-[#2563EB] dark:text-[#60A5FA]" />
        <span className="text-xs font-medium">{fallbackTitle}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
