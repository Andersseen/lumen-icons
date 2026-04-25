export type LmnIconSize = 12 | 14 | 16 | 20 | 24 | 32;
export type LmnIconAnimate = 'none' | 'spin' | 'pulse' | 'bounce' | 'ping';

export interface LmnIconProps {
  size?: LmnIconSize;
  strokeWidth?: number;
  ariaLabel?: string;
  animate?: LmnIconAnimate;
}
