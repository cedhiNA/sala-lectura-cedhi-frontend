import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import MenuItem from '@mui/material/MenuItem';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

// project-imports
import RoleGuard from '../../utils/role-guard/RoleGuard';
import useAuth from '../../hooks/useAuth';
import BookModal from './BookModal';
import BookDetailModal from './BookDetailModal';
import BookLoan from './BookLoanModal';
import AlertBookDelete from './AlertBookDelete';
import MainCard from '../../components/MainCard';
import Avatar from '../../components/@extended/Avatar';
import IconButton from '../../components/@extended/IconButton';
import MoreIcon from '../../components/@extended/MoreIcon';
import { useGetUserCedhi } from '../../api/users';
import { addFavoriteBook, removeFavoriteBook } from '../../api/books';

// assets
import defaultCoverBook2 from '../../assets/images/book-covers/book-cover-2.png';
import { Book, Barcode, LanguageCircle, Star1 } from 'iconsax-react';

const mediaSX = {
  width: 120,
  height: 186,
  borderRadius: 1
};

// ==============================|| BOOK - CARD ||============================== //

export default function BookCard({ book, userFavorites }) {

  const { users: userLists } = useGetUserCedhi();
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [bookModal, setBookModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  
  const [detailModal, setDetailModal] = useState(false);
  const [bookLoanModal, setBookLoanModal] = useState(false);
  const [selectedBookLoan, setSelectedBookLoan] = useState(null);

  const [openAlert, setOpenAlert] = useState(false);

  // Función para renderizar valores con fallback consistente
  const renderValue = (value) => {
    if (!value || value === '' || value === 'null' || value === 'undefined') {
      return (
        <Typography component="span" color="text.disabled" fontStyle="italic">
          Sin información
        </Typography>
      );
    }
    return value;
  };

  const handleAlertClose = () => {
    setOpenAlert(!openAlert);
    handleMenuClose();
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const editBookLoan = () => {
    setSelectedBookLoan(book);
    setBookLoanModal(true);
  };

  const editBook = () => {
    setSelectedBook(book);
    setBookModal(true);
  };

  useEffect(() => {
    setIsFavorite(userFavorites.some(fav => fav.registro === book.registro));
  }, [book, userFavorites]);

  const toggleFavorite = async (registro) => {
    try {
      if (isFavorite) {
        await removeFavoriteBook(registro);
      } else {
        await addFavoriteBook(registro);
      }
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  return (
    <>
      <MainCard sx={{ height: 1, '& .MuiCardContent-root': { height: 1, display: 'flex', flexDirection: 'column' } }}>
        <Grid id="print" container spacing={2.25}>
          <Grid item xs={12}>
            <List sx={{ width: 1, p: 0 }}>
              <ListItem
                disablePadding
                secondaryAction={
                  <>
                    {user?.categoria === 4 && (
                      <IconButton
                        edge="end"
                        aria-label="favorito"
                        color="warning"
                        onClick={() => toggleFavorite(book.registro)}
                      >
                        <Star1 variant={isFavorite ? "Bold" : "Outline"} size={24} />
                      </IconButton>
                    )}
                    {[1, 2, 3].includes(user?.categoria) && (
                      <IconButton
                        edge="end"
                        aria-label="comments"
                        color="secondary"
                        onClick={handleMenuClick}
                        sx={{ transform: 'rotate(90deg)' }}
                      >
                        <MoreIcon />
                      </IconButton>
                    )}
                  </>
                }
              >
                <ListItemAvatar>
                  <Avatar alt={book.titulo}>
                    <Book />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{ pr: 6 }} 
                  primary={<Typography variant="subtitle1">{renderValue(book.titulo)}</Typography>}
                  secondary={<Typography color="text.secondary">{renderValue(book.autor)}</Typography>}
                />
              </ListItem>
            </List>
            <Menu
              id="fade-menu"
              MenuListProps={{ 'aria-labelledby': 'fade-button' }}
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleMenuClose}
              TransitionComponent={Fade}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem 
                onClick={() => {
                  setSelectedBook(book); 
                  setDetailModal(true);
                }}
              >
                Ver detalle
              </MenuItem>
              <MenuItem onClick={editBook}>Editar</MenuItem>
              <MenuItem onClick={handleAlertClose}>Eliminar</MenuItem>
            </Menu>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography>{book.abstract}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1} direction={{ xs: 'column', md: 'row' }}>
              <Grid item xs={4} justifyContent="center">
                <CardMedia component="img" image={book.url_cover ? book.url_cover : defaultCoverBook2} title="Book cover" sx={mediaSX} />
              </Grid>
              <Grid item xs={8}>
                <List
                  sx={{
                    p: 0,
                    overflow: 'hidden',
                    '& .MuiListItem-root': { px: 0, py: 0.2 },
                    '& .MuiListItemIcon-root': { minWidth: 28 }
                  }}
                > 
                  <ListItem alignItems="flex-start">
                    <ListItemIcon>
                      <Barcode size={18} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Typography color="text.secondary">
                          Registro: {renderValue(book.registro)}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <ListItemIcon>
                      <Barcode size={18}/>
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Typography color="text.secondary">
                          Código Dewey: {renderValue(book.codigo_dewey)}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <ListItemIcon>
                      <Book size={18} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Typography color="text.secondary">
                          Editorial: {renderValue(book.editorial)}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <ListItemIcon>
                      <Book size={18} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Typography color="text.secondary">
                          Tema: {renderValue(book.tema)}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <ListItemIcon>
                      <LanguageCircle size={18} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Typography color="text.secondary">
                          Idioma: {renderValue(book.idioma)}
                        </Typography>
                      }
                    />
                  </ListItem>
                </List>
                <Grid>
                  <Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', p: 1, m: 0 }} component="ul">
                      <ListItem disablePadding sx={{ width: 'auto', pr: 0.75, pb: 0.75 }}>
                        {book.disponibilidad ? 
                          <Chip label="Disponible" variant="combined" color="success" size="small" />
                          : 
                          <Chip variant="light" color="error" size="small" label="No Disponible" />
                        }
                      </ListItem>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Stack
          direction="row"
          className="hideforPDf"
          alignItems="center"
          spacing={1}
          justifyContent="space-between"
          sx={{ mt: 'auto', mb: 0, pt: 2.25 }}
        >
          <Typography variant="caption" color="text.secondary">
            Tipo de material: {renderValue(book.tipo_material)}
          </Typography>
          
          <RoleGuard roles={[1, 2, 3]} userRole={user?.categoria}>
            {book.disponibilidad ? (
              <Button variant="outlined" size="small" onClick={editBookLoan}>
                Reservar
              </Button>
            ) : (
              <Button color="error" variant="outlined" size="small" disabled>
                No Disponible
              </Button>
            )}
          </RoleGuard>

          <RoleGuard roles={[4]} userRole={user?.categoria}>
            <Button variant="outlined" size="small" onClick={() => {
                  setSelectedBook(book); 
                  setDetailModal(true);
                }}>
              Ver detalle
            </Button>
          </RoleGuard>
        </Stack>
      </MainCard >

      <BookLoan open={bookLoanModal} modalToggler={setBookLoanModal} bookLoan={selectedBookLoan} perfilesCedhi={userLists} />
      <AlertBookDelete registro={book.registro} titulo={book.titulo} open={openAlert} handleClose={handleAlertClose} />
      <BookModal open={bookModal} modalToggler={setBookModal} book={selectedBook} />
      <BookDetailModal 
        open={detailModal} 
        onClose={() => setDetailModal(false)}
        book={selectedBook}
      />

    </>
  );
}

BookCard.propTypes = { book: PropTypes.any };