import React from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { Field } from '@/shared/ui';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { selectAuthError, selectStatus, login } from '@/shared/model/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});
type LoginFormValues = z.infer<typeof schema>;

export interface LoginFormRef {
  reset: () => void;
}

const LoginForm = React.forwardRef<LoginFormRef>((_props, ref) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const errorMessage = useAppSelector(selectAuthError);

  const { control, handleSubmit, reset } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  React.useImperativeHandle(ref, () => ({
    reset,
  }));

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    await dispatch(login(data));
  };

  React.useEffect(() => {
    if (status === 'success') {
      navigate('/');
    }
    if (status === 'error') {
      toast.error(errorMessage);
    }
  }, [status, navigate]);

  return (
    <Box
      component="form"
      id="login-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
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
});

LoginForm.displayName = 'LoginForm';

export default LoginForm;
