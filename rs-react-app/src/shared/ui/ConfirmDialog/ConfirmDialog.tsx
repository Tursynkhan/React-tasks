import React from 'react';
import { COLORS } from '@/shared/config';
import { useToggleState } from '@/shared/lib';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
} from '@mui/material';
import Button from '../Button/Button';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  children: (onClick: (event: React.MouseEvent) => void) => React.ReactNode;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onClose?: () => void;
  loading?: boolean;
};

export default function ConfirmDialog({
  children,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onClose,
  loading,
}: Props) {
  const [open, toggle] = useToggleState();
  return (
    <>
      {children(toggle)}
      <Dialog
        open={open}
        PaperProps={{
          sx: {
            bgcolor: COLORS.bg,
          },
        }}
        slotProps={{ backdrop: { sx: { bgcolor: 'rgba(0,0,0,0.65)' } } }}
      >
        <DialogTitle sx={{ color: COLORS.white, textTransform: 'uppercase' }}>
          {title}
        </DialogTitle>
        <IconButton
          onClick={toggle}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: COLORS.white,
          }}
        >
          <CloseIcon />
        </IconButton>
        {description && (
          <DialogContent>
            <Typography sx={{ color: COLORS.white }}>{description}</Typography>
          </DialogContent>
        )}

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={() => {
              toggle();
              onClose?.();
            }}
            disabled={loading}
            variant="outlined"
          >
            {cancelText}
          </Button>

          <Button
            onClick={() => {
              onConfirm();
              toggle();
            }}
            disabled={loading}
            variant="contained"
          >
            {confirmText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
