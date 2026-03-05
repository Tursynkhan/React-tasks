import { useState } from 'react';
import { Box } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import { COLORS } from '@/shared/config';

interface MoviePosterProps {
  src: string | null | undefined;
  alt: string;
  aspectRatio?: string;
  showIcon?: boolean;
}

export function MoviePoster({
  src,
  alt,
  aspectRatio = '2 / 3',
  showIcon = true,
}: MoviePosterProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(!!src);

  const shouldShowFallback = !src || hasError;

  return (
    <Box
      sx={{
        width: '100%',
        aspectRatio,
        bgcolor: shouldShowFallback ? COLORS.field : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {src && !hasError && (
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: isLoading ? 'none' : 'block',
          }}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
        />
      )}
      {shouldShowFallback && showIcon && (
        <MovieIcon
          sx={{
            fontSize: 80,
            color: COLORS.muted,
            opacity: 0.5,
          }}
        />
      )}
    </Box>
  );
}
