import {
  MenuItem,
  FormControl,
  type SxProps,
  type Theme,
  FormLabel,
} from '@mui/material';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { COLORS } from '@/shared/config';

type Option = { label: string; value: string };

interface MultiSelectProps {
  label: string;
  name: string;
  value: string[];
  options: Option[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}
export default function MultiSelect({
  label,
  name,
  value,
  options,
  onChange,
  placeholder = 'Select options',
  error = false,
  disabled = false,
  sx,
}: MultiSelectProps) {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const selectedValue = event.target.value;
    onChange(
      typeof selectedValue === 'string'
        ? selectedValue.split(',')
        : selectedValue
    );
  };
  return (
    <FormControl fullWidth disabled={disabled} sx={sx}>
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
      <Select
        id={name}
        name={name}
        multiple
        value={value}
        onChange={handleChange}
        error={error}
        displayEmpty
        renderValue={(selected) => {
          if (!selected?.length) {
            return (
              <span style={{ color: COLORS.muted, fontSize: 14 }}>
                {placeholder}
              </span>
            );
          }
          return selected.join(', ');
        }}
        sx={{
          backgroundColor: COLORS.field,
          color: COLORS.white,
          fontSize: 14,
          '& .MuiSelect-select': {
            padding: '14px',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: error ? COLORS.accent : 'rgba(255,255,255,0.23)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: error ? COLORS.accent : 'rgba(255,255,255,0.4)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: COLORS.accent,
          },
          '& .MuiSvgIcon-root': {
            color: COLORS.accent,
          },
        }}
        MenuProps={{
          disableScrollLock: true,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          PaperProps: {
            sx: {
              backgroundColor: COLORS.field,
              color: COLORS.white,
              maxHeight: 200,

              '& .MuiMenuItem-root': {
                fontSize: 14,
                '&:hover': {
                  backgroundColor: COLORS.field,
                },
                '&.Mui-selected': {
                  backgroundColor: COLORS.accent,
                },
              },
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
