import React from 'react';
import {
  type TextFieldProps,
  FormControl,
  FormLabel,
  TextField,
} from '@mui/material';
import { COLORS } from '@/shared/config/theme/palette';

interface FieldProps extends Omit<TextFieldProps, 'label'> {
  label: string;
}
const Field = React.forwardRef<HTMLInputElement, FieldProps>((props, ref) => {
  const { label, ...rest } = props;
  return (
    <FormControl>
      <FormLabel
        htmlFor={rest.name}
        sx={{
          color: COLORS.accent,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </FormLabel>
      <TextField
        ref={ref}
        id={rest.name}
        {...rest}
        sx={{
          '& .MuiInputBase-root': {
            backgroundColor: COLORS.field,
            borderRadius: 0,
          },
          '& .MuiInputBase-input': {
            color: COLORS.white,
            padding: '14px 14px',
            fontSize: 14,
            '&::placeholder': {
              color: COLORS.muted,
              opacity: 1,
            },
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
            {
              borderColor: COLORS.accent,
            },
          '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline':
            {
              borderColor: COLORS.accent,
            },
        }}
      />
    </FormControl>
  );
});

Field.displayName = 'Field';
export default Field;
