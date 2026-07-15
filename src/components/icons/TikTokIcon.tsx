import type { SVGProps } from "react";

type TikTokIconProps = SVGProps<SVGSVGElement> & { size?: number };

export function TikTokIcon({ size = 16, className, ...props }: TikTokIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M16.6 5.82c-.9-.94-1.44-2.16-1.52-3.47V2h-3.44v14.34a2.6 2.6 0 1 1-1.84-2.49v-3.5a6.05 6.05 0 0 0-1.16-.11 6.09 6.09 0 1 0 6.09 6.09V9.03a8.06 8.06 0 0 0 4.71 1.5V7.1a4.83 4.83 0 0 1-2.84-1.28Z" />
    </svg>
  );
}
