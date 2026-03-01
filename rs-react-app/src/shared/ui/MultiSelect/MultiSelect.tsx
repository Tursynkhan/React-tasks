import {
  MenuItem,
  FormControl,
  type SxProps,
  type Theme,
  FormLabel,
} from '@mui/material';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { COLORS } from '@/shared/config/theme/palette';

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
          marginBottom: 1,
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
        renderValue={(selected) => {
          if (!selected?.length) {
            return <>{placeholder}</>;
          }
          return selected.join(', ');
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
