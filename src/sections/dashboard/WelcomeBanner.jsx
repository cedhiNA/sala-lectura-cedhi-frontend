// material-ui
import { useTheme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { lighten } from '@mui/material/styles';

// project import
import MainCard from '../../components/MainCard';
import { ThemeMode } from '../../config';
import { useNavigate } from 'react-router-dom';

//asset
import WelcomeImage from '../../assets/images/analytics/3d-book-04.webp';
import cardBack from '../../assets/images/widget/img-dropbox-bg.svg';

// ==============================|| ANALYTICS - WELCOME ||============================== //

export default function WelcomeBanner() {
  const theme = useTheme();
  const navigate = useNavigate();
  const irABusqueda = () => {
    navigate('/library/books');
  };
  return (
    <MainCard
      border={false}
      sx={{
        color: 'common.white',
        bgcolor: theme.palette.mode === ThemeMode.DARK ? 'primary.400' : 'primary.darker',
        '&:after': {
          content: '""',
          background: `url("${cardBack}") 100% 100% / cover no-repeat`,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          opacity: 0.5
        }
      }}
    >
      <Grid container>
        <Grid item md={8} sm={6} xs={12}>
          <Stack spacing={2} sx={{ padding: 3, paddingRight: 4 }}>
            <Typography variant="h2" color={theme.palette.background.paper}>
              Sala de Lectura CEDHI
            </Typography>
            <Typography variant="h6" color={theme.palette.background.paper}>
              Bienvenido a la Sala de Lectura del CEDHI. Busca entre cientos de libros disponibles y encuentra el título que necesitas.
              Haz clic aquí para iniciar tu búsqueda.
            </Typography>
            <Box>
    <Button
      variant="contained"
      onClick={irABusqueda}
      sx={{
        color: 'white',
        bgcolor: lighten(theme.palette.primary.main, 0.5),
        border: '2px solid rgba(255,255,255,0.6)',
        px: 3,
        py: 1.2,
        borderRadius: 3,
        fontWeight: 700,
        textTransform: 'none',
        textShadow: '1px 1px 2px rgba(0,0,0,0.4)',
        boxShadow: '0px 6px 20px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        '&:hover': {
          bgcolor: lighten(theme.palette.primary.main, 0.45),
          boxShadow: '0px 8px 25px rgba(0,0,0,0.35)',
          transform: 'translateY(-3px)',
        },
        zIndex: 2
      }}
    >
      Buscar Libros
    </Button>
            </Box>
          </Stack>
        </Grid>
        <Grid item md={4} sm={5} xs={12} sx={{ display: { xs: 'none', sm: 'initial' } }}>
          <Stack sx={{ position: 'relative', pr: { sm: 3, md: 8 }, zIndex: 2 }} justifyContent="center" alignItems="flex-end">
            <img src={WelcomeImage} alt="Welcome" width="200px" />
          </Stack>
        </Grid>
      </Grid>
    </MainCard>
  );
}