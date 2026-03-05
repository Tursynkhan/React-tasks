import React from 'react';
import { FormControl, FormLabel, TextField } from '@mui/material';
import { COLORS } from '@/shared/config';

interface DatePickerProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  placeholder?: string;
}

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  (props, ref) => {
    const {
      label,
      name,
      value,
      onChange,
      onBlur,
      error = false,
      helperText,
      disabled = false,
      placeholder,
    } = props;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    };

    return (
      <FormControl fullWidth>
        <FormLabel
          htmlFor={name}
          sx={{
            color: COLORS.accent,
            textTransform: 'uppercase',
            mb: 0.5,
          }}
        >
          {label}
        </FormLabel>
        <TextField
          ref={ref}
          id={name}
          name={name}
          type="date"
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          error={error}
          helperText={helperText}
          disabled={disabled}
          placeholder={placeholder}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{
            '& .MuiInputBase-root': {
              backgroundColor: COLORS.field,
              borderRadius: '4px',
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
  }
);

DatePicker.displayName = 'DatePicker';

export default DatePicker;
