import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  CardMedia, 
  Stack, 
  Chip, 
  Button, 
  IconButton,
  Box,
  Divider,
  CircularProgress
} from "@mui/material";
import { 
  Book, 
  Barcode, 
  DocumentText, 
  Hashtag, 
  Calendar, 
  BookSquare, 
  SliderHorizontal1, 
  LanguageCircle, 
  Star1,
  Location,
  Buildings
} from "iconsax-react";
import defaultCoverBook2 from '../../assets/images/book-covers/book-cover-2.png';
import { useTheme } from '@mui/material/styles';

export default function BookFullDetailModal({ 
  open, 
  onClose, 
  book, 
  bookLoading,
  isFavorite, 
  toggleFavorite 
}) {
  
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

  const theme = useTheme();

  const fields = [
    { icon: <Hashtag size={20} variant="Bulk" />, label: "N° Edición", value: book?.num_edicion },
    { icon: <Barcode size={20} variant="Bulk" />, label: "ISBN", value: book?.isbn },
    { icon: <Book size={20} variant="Bulk" />, label: "Notación Interna", value: book?.notacion_interna },
    { icon: <Barcode size={20} variant="Bulk" />, label: "Código", value: book?.codigo },
    { icon: <SliderHorizontal1 size={20} variant="Bulk" />, label: "N° Páginas", value: book?.num_paginas },
    { icon: <Calendar size={20} variant="Bulk" />, label: "Año", value: book?.ano },
    { icon: <Location size={20} variant="Bulk" />, label: "Ciudad", value: book?.ciudad },
    { icon: <BookSquare size={20} variant="Bulk" />, label: "Ubicación en estantería", value: book?.ubicacion_estanteria },
    { icon: <Buildings size={20} variant="Bulk" />, label: "Editorial", value: book?.editorial },
    { icon: <Book size={20} variant="Bulk" />, label: "Tema", value: book?.tema },
    { icon: <LanguageCircle size={20} variant="Bulk" />, label: "Idioma", value: book?.idioma },
    { icon: <DocumentText size={20} variant="Bulk" />, label: "Tipo de Material", value: book?.tipo_material },
  ];

  return (
    <Dialog open={open} fullWidth maxWidth="md" onClose={onClose}>
      <DialogTitle>
          <Stack direction="row" spacing={1.5} alignItems="center" flex={1}>
            <Book size={28} variant="Bold" color={theme.palette.primary.main} />
            <Typography variant="h5" fontWeight="bold" sx={{ wordBreak: 'break-word' }}>
              {book?.titulo || 'Cargando...'}
            </Typography>
          </Stack>
      </DialogTitle>

      <DialogContent dividers>
        {bookLoading ? (
          <Stack alignItems="center" justifyContent="center" sx={{ py: 8 }}>
            <CircularProgress />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Cargando detalles del libro...
            </Typography>
          </Stack>
        ) : !book ? (
          <Stack alignItems="center" justifyContent="center" sx={{ py: 8 }}>
            <Typography variant="body1" color="error">
              No se pudo cargar la información del libro
            </Typography>
          </Stack>
        ) : (
          <Stack spacing={3}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CardMedia
                  component="img"
                  image={book.url_cover || defaultCoverBook2}
                  alt={`Portada de ${book.titulo}`}
                  sx={{ 
                    width: 160, 
                    height: 240, 
                    borderRadius: 2,
                    boxShadow: 3,
                    objectFit: 'cover'
                  }}
                />
              </Box>

              <Stack spacing={2} flex={1}>
                <Box>
                  <Typography variant="overline" color="text.secondary" fontWeight="bold">
                    Autor
                  </Typography>
                  <Typography variant="h6" fontWeight="medium">
                    {renderValue(book.autor)}
                  </Typography>
                </Box>

                <Divider />

                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body2" color="text.secondary" fontWeight="bold">
                    Estado:
                  </Typography>
                  {book.disponibilidad ? (
                    <Chip 
                      label="Disponible" 
                      color="success" 
                      size="small" 
                      sx={{ fontWeight: 'bold' }}
                    />
                  ) : (
                    <Chip 
                      label="No Disponible" 
                      color="error" 
                      size="small"
                      sx={{ fontWeight: 'bold' }}
                    />
                  )}
                </Stack>

                {book.codigo_dewey && (
                  <Box>
                    <Typography variant="body2" color="text.secondary" fontWeight="bold">
                      Código Dewey
                    </Typography>
                    <Typography variant="body1">
                      {book.codigo_dewey}
                    </Typography>
                  </Box>
                )}
              </Stack>
            </Stack>

            <Divider />

            <Box>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Detalles del Libro
              </Typography>
              <List sx={{ p: 0 }}>
                {fields.map((item, i) => (
                  <ListItem 
                    key={i} 
                    sx={{ 
                      py: 1,
                      px: 0,
                      '&:hover': { bgcolor: 'action.hover' },
                      borderRadius: 1
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{ 
                        color: "text.secondary", 
                        fontWeight: "600",
                        fontSize: '0.875rem'
                      }}
                      secondary={renderValue(item.value)}
                      secondaryTypographyProps={{
                        fontSize: '0.95rem',
                        color: 'text.primary'
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>

         {book.tabla_contenido && (
              <>
                <Divider />
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                    <DocumentText size={24} variant="Bulk" color={theme.palette.primary.main} />
                    <Typography variant="h6" fontWeight="bold">
                      Tabla de Contenido
                    </Typography>
                  </Stack>
                  <Box 
                    sx={{ 
                      bgcolor: 'action.hover', 
                      p: 2, 
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider'
                    }}
                  >
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        whiteSpace: 'pre-wrap',
                        fontFamily: 'monospace',
                        fontSize: '0.875rem',
                        color: 'text.primary'
                      }}
                    >
                      {book.tabla_contenido}
                    </Typography>
                  </Box>
                </Box>
              </>
            )}
          </Stack>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button 
          onClick={onClose} 
          variant="contained"
          size="large"
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}