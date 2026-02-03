import React from 'react';
import { type SxProps, Box, Typography } from '@mui/material';

interface InfoFieldProps {
  label: string;
  children: React.ReactNode;
  className?: SxProps;
}

export default function InfoField({
  label,
  children,
  className,
}: InfoFieldProps) {
  return (
    <Box component="div" display="flex" alignItems="center" gap={1}>
      <Typography sx={{ fontWeight: 600 }}>{label}</Typography>
      <Typography variant="body1" sx={className}>
        {children}
      </Typography>
    </Box>
  );
}
