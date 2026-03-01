import React from 'react';
import {
  Dialog as MUIDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  type DialogProps,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { COLORS } from '@/shared/config/theme/palette';

type Props = Omit<DialogProps, 'title'> & {
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  onClose?: () => void;
};
export default function Dialog({
  title,
  children,
  actions,
  onClose,
  ...rest
}: Props) {
  return (
    <MUIDialog {...rest} onClose={onClose}>
      <DialogTitle
        sx={{
          bgcolor: COLORS.bg,
          color: COLORS.white,
          textTransform: 'uppercase',
        }}
      >
        {title}
      </DialogTitle>
      {onClose && (
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 18,
            right: 18,
            color: COLORS.muted,
            '&:hover': { color: COLORS.white },
          }}
        >
          <CloseIcon />
        </IconButton>
      )}

      <DialogContent
        sx={{
          bgcolor: COLORS.bg,
        }}
      >
        {children}
      </DialogContent>
      {actions && (
        <DialogActions sx={{ bgcolor: COLORS.bg }}>{actions}</DialogActions>
      )}
    </MUIDialog>
  );
}
