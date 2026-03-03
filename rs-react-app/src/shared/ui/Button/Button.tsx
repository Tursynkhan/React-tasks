import {
  Button as MuiButton,
  type ButtonProps as MuiButtonProps,
} from '@mui/material';
import { COLORS } from '@/shared/config';

type ButtonVariant = 'contained' | 'outlined' | 'admin';

interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: ButtonVariant;
}

const buttonStyles = {
  contained: {
    bgcolor: COLORS.accent,
    color: COLORS.white,
    textTransform: 'uppercase',
    '&:hover': {
      bgcolor: COLORS.accent,
      opacity: 0.9,
    },
  },
  outlined: {
    bgcolor: COLORS.bg,
    color: COLORS.accent,
    border: `1px solid ${COLORS.accent}`,
    textTransform: 'uppercase',
    '&:hover': {
      bgcolor: COLORS.bg,
      opacity: 0.9,
    },
  },
  admin: {
    bgcolor: COLORS.muted,
    color: COLORS.accent,
    textTransform: 'uppercase',
    '&:hover': {
      bgcolor: COLORS.muted,
      opacity: 0.9,
    },
  },
} as const;

const baseStyles = {
  borderRadius: '4px',
  fontSize: 16,
  fontWeight: 500,
};

export default function Button({
  variant = 'contained',
  sx,
  ...props
}: ButtonProps) {
  const variantStyles = buttonStyles[variant];

  return (
    <MuiButton
      disableElevation
      sx={{
        ...baseStyles,
        ...variantStyles,
        ...sx,
      }}
      {...props}
    />
  );
}
