import React from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import Field from '@/shared/ui/Field/Field';
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import { login, selectStatus } from '@/shared/model/authSlice/authSlice';
import { useNavigate } from 'react-router-dom';
const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string(),
});
type LoginFormValues = z.infer<typeof schema>;

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);

  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    await dispatch(login(data));
  };

  React.useEffect(() => {
    if (status === 'success') {
      navigate('/');
    }
  }, [status]);

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
