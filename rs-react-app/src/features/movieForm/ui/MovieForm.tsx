import React from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import { Box } from '@mui/material';
import { toast } from 'react-toastify';
import Field from '@/shared/ui/Field/Field';
import MultiSelect from '@/shared/ui/MultiSelect/MultiSelect';
import DatePicker from '@/shared/ui/DatePicker/DatePicker';
import { GENRES as genres } from '../model/genres';
import {
  createMovie,
  editMovie,
  selectCreateStatus,
  selectEditStatus,
  selectMoviesError,
  resetCreateStatus,
  resetEditStatus,
} from '@/shared/model/movieSlice/movieSlice';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  release_date: z.string().min(1, 'Release date is required'),
  poster_path: z.string().url('Poster URL must be a valid url'),
  vote_average: z.number().min(0).max(10),
  runtime: z.number().int().positive('Runtime must be > 0'),
  overview: z.string().min(1, 'Overview is required'),
  genres: z.array(z.string()).min(1, 'at least one genre required'),
});

type MovieFormValues = z.infer<typeof schema>;

export interface MovieFormProps {
  mode?: 'create' | 'edit';
  movieId?: number;
  initialValues?: Partial<MovieFormValues>;
}

export interface MovieFormHandle {
  resetForm: () => void;
}

const MovieForm = React.forwardRef<MovieFormHandle, MovieFormProps>(
  ({ mode = 'create', movieId, initialValues }, ref) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const createStatus = useAppSelector(selectCreateStatus);
    const editStatus = useAppSelector(selectEditStatus);
    const errorMessage = useAppSelector(selectMoviesError);
    const status = mode === 'create' ? createStatus : editStatus;

    const { control, handleSubmit, reset } = useForm<MovieFormValues>({
      resolver: zodResolver(schema),
      defaultValues: initialValues || {
        title: '',
        release_date: '',
        poster_path: '',
        vote_average: 0,
        runtime: 0,
        genres: [],
        overview: '',
      },
    });

    const onSubmit: SubmitHandler<MovieFormValues> = async (data) => {
      const body = {
        title: data.title,
        release_date: data.release_date,
        poster_path: data.poster_path,
        vote_average: data.vote_average,
        runtime: data.runtime,
        overview: data.overview,
        genres: data.genres,
      };

      if (mode === 'edit' && movieId) {
        await dispatch(editMovie({ movieId, movieData: body }));
      } else {
        await dispatch(createMovie(body));
      }
    };

    React.useImperativeHandle(ref, () => ({
      resetForm: () => {
        reset();
      },
    }));

    React.useEffect(() => {
      if (status === 'success') {
        const message =
          mode === 'create'
            ? 'Movie created successfully!'
            : 'Movie updated successfully!';
        toast.success(message);
        reset();
        if (mode === 'create') {
          dispatch(resetCreateStatus());
        } else {
          dispatch(resetEditStatus());
        }
        navigate('/');
      } else if (status === 'error' && errorMessage) {
        toast.error(errorMessage);
      }
    }, [status, mode, errorMessage, reset, dispatch, navigate]);

    return (
      <Box
        component="form"
        id="add-movie-form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 3,
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '0.6fr 0.4fr' },
            gap: 3,
            alignItems: 'start',
          }}
        >
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                {...field}
                label="Title"
                type="text"
                placeholder="Movie title"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="release_date"
            control={control}
            render={({ field, fieldState }) => (
              <DatePicker
                label="Release Date"
                name={field.name}
                value={field.value as string}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="Select date"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="poster_path"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                {...field}
                label="Poster URL"
                type="text"
                placeholder="https://"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="vote_average"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
                value={field.value || ''}
                label="Rating"
                type="number"
                placeholder="7.8"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="genres"
            control={control}
            render={({ field, fieldState }) => (
              <MultiSelect
                name="genre"
                label="genre"
                placeholder="Select Genre"
                options={genres}
                error={!!fieldState.error}
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />

          <Controller
            name="runtime"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
                value={field.value || ''}
                label="Runtime"
                type="number"
                placeholder="in minutes"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Box sx={{ gridColumn: '1/-1' }}>
            <Controller
              name="overview"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  {...field}
                  multiline
                  rows={3}
                  label="Overview"
                  placeholder="Movie description"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Box>
        </Box>
      </Box>
    );
  }
);

MovieForm.displayName = 'MovieForm';

export default MovieForm;
