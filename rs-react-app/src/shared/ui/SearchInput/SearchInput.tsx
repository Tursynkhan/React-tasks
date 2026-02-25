import {
  TextField,
  type TextFieldProps,
  type SxProps,
  type Theme,
} from '@mui/material';
import { COLORS } from '@/shared/config/theme/palette';
interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  size?: TextFieldProps['size'];
  sx?: SxProps<Theme>;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  size = 'small',
  sx,
}: SearchInputProps) {
  return (
    <TextField
      placeholder={placeholder}
      variant="outlined"
      size={size}
      onChange={onChange}
      value={value}
      sx={{
        width: { xs: '100%', sm: 'auto' },
        minWidth: { sm: 250 },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
          {
            borderColor: COLORS.accent,
          },
        '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
          borderColor: COLORS.accent,
        },
        ...sx,
      }}
    />
  );
}
