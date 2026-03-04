import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { COLORS } from '@/shared/config';

interface SuccessDialogProps {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

export default function SuccessDialog({
  open,
  title,
  message,
  onClose,
}: SuccessDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          bgcolor: COLORS.bg,
          minWidth: 400,
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: COLORS.white,
        }}
      >
        <CloseIcon />
      </IconButton>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 4,
        }}
      >
        <CheckCircleIcon
          sx={{
            width: 66,
            height: 66,
            color: COLORS.accent,
            mb: 2,
          }}
        />

        <DialogTitle
          sx={{
            color: COLORS.white,
            textTransform: 'uppercase',
            textAlign: 'center',
            fontSize: '40px',
            fontWeight: '300',
            pb: 1,
          }}
        >
          {title}
        </DialogTitle>

        <DialogContent>
          <Typography
            sx={{
              color: COLORS.white,
              textAlign: 'center',
              opacity: 0.8,
              fontSize: '20px',
              fontWeight: '400',
            }}
          >
            {message}
          </Typography>
        </DialogContent>
      </Box>
    </Dialog>
  );
}
