import React from 'react';
import {
  type TextFieldProps,
  FormControl,
  FormLabel,
  TextField,
} from '@mui/material';

interface FieldProps extends Omit<TextFieldProps, 'label'> {
  label: string;
}
const Field = React.forwardRef<HTMLInputElement, FieldProps>((props, ref) => {
  const { label, ...rest } = props;
  return (
    <FormControl>
      <FormLabel htmlFor={rest.name}>{label}</FormLabel>
      <TextField ref={ref} id={rest.name} {...rest} />
    </FormControl>
  );
});

Field.displayName = 'Field';
export default Field;
