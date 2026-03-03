import { COLORS } from '@/shared/config';
import { ButtonBase, Typography } from '@mui/material';

interface Props {
  genre: string;
  isActive: boolean;
  onClick: () => void;
}

export default function GenreTabs({ genre, isActive, onClick }: Props) {
  return (
    <ButtonBase
      key={genre}
      onClick={onClick}
      sx={{
        position: 'relative',
        '&:hover .label': { color: `${COLORS.accent}` },
        '&::after': {
          content: '""',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: -1,
          height: 2,
          bgcolor: isActive ? COLORS.accent : 'transparent',
        },
      }}
    >
      <Typography
        sx={{
          color: isActive ? `${COLORS.accent} ` : `${COLORS.white}`,
          fontSize: 12,
          textTransform: 'uppercase',
          transition: 'color 150ms ease',
        }}
      >
        {genre}
      </Typography>
    </ButtonBase>
  );
}
