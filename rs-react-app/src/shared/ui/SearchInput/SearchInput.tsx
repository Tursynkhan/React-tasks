import { TextField, type TextFieldProps } from '@mui/material';

interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  size?: TextFieldProps['size'];
}

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  size = 'small',
}: SearchInputProps) {
  return (
    <TextField
      placeholder={placeholder}
      variant="outlined"
      size={size}
      onChange={onChange}
      value={value}
    />
  );
}
