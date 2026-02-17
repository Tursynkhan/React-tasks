import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import Field from '@/shared/ui/Field/Field';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
type LoginFormValues = z.infer<typeof schema>;

export default function LoginForm() {
  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    console.log(data);
  };

  return (
    <Box
      component="form"
      id="login-form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 3,
      }}
    >
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field
            {...field}
            label="email"
            type="email"
            placeholder="enter email"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Field
            {...field}
            label="password"
            type="password"
            placeholder="enter password"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
    </Box>
  );
}
