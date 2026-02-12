import React from 'react';
import { type SxProps, Box, Typography } from '@mui/material';

interface InfoFieldProps {
  label: string;
  children: React.ReactNode;
  sx?: SxProps;
}

export default function InfoField({ label, children, sx }: InfoFieldProps) {
  return (
    <Box
      component="div"
      display="flex"
      alignItems="center"
      gap={1}
      sx={{ minWidth: 0, width: '100%' }}
    >
      <Typography sx={{ fontWeight: 600 }}>{label}</Typography>
      <Typography
        variant="body1"
        noWrap
        sx={{
          flex: 1,
          minWidth: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          ...sx,
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}
