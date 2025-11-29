import { useState } from 'react';
import { Box, Stack, Typography, IconButton } from '@mui/material';
import { Star1 } from 'iconsax-react';
import { useFavoriteBooks, useBook } from '../../../api/books';
import MainCard from '../../../components/MainCard';
import SimpleBar from '../../../components/third-party/SimpleBar';
import BookFullDetailModal from '../../book/BookFullDetailModal';
import { useToggleFavorite } from '../../../hooks/useToggleFavorite';

export default function FavoritesBooksList() {
    const { favoriteBooksLoading, favoriteBooks } = useFavoriteBooks();
    const { books: favoriteBooksList, toggleFavorite } = useToggleFavorite(favoriteBooks);
    
    const [selectedBookRegistro, setSelectedBookRegistro] = useState(null);
    const [detailModalOpen, setDetailModalOpen] = useState(false);

    const { book: selectedBookDetails, bookLoading } = useBook(selectedBookRegistro);

    const handleOpenDetail = (book) => {
        setSelectedBookRegistro(book.registro);
        setDetailModalOpen(true);
    };

    const handleCloseDetail = () => {
        setDetailModalOpen(false);
        setSelectedBookRegistro(null);
    };

    return (
        <>
        <MainCard sx={{ p: 2, minHeight: 200 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                Mis Libros Favoritos
            </Typography>

            {favoriteBooksLoading && (
                <Typography variant="body2" color="textSecondary">
                    Cargando libros favoritos...
                </Typography>
            )}

            {!favoriteBooksLoading && (!favoriteBooksList  || favoriteBooksList .length === 0) && (
                <Stack
                direction="column"
                alignItems="center"
                justifyContent="center"
                spacing={1}
                sx={{ py: 6 }}
                >
                    <Star1 size={48} variant="Bulk" color="#FFC107" />
                    <Typography variant="h6" color="textSecondary">
                        No tienes libros favoritos
                    </Typography>
                </Stack>
            )}

            {!favoriteBooksLoading && favoriteBooksList  && favoriteBooksList .length > 0 && (
                <SimpleBar sx={{ maxHeight: 270 }}>
                    {favoriteBooksList.map((book) => (
                        <Box
                        key={book.registro}
                        sx={{
                            p: 1.5,
                            borderRadius: 2,
                            transition: 'all 0.2s',
                            '&:hover': { bgcolor: 'action.selected', cursor: 'pointer' }
                        }}
                        onClick={() => handleOpenDetail(book)}
                        >
                            <Stack direction="row" spacing={2} alignItems="center" sx={{ flexShrink: 0 }}>
                                <IconButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(book.registro);
                                    }}
                                    sx={{ p: 0 }}
                                    >
                                    <Star1
                                        size={24}
                                        variant={book.isFavorite ? "Bold" : "Outline"}
                                        color={book.isFavorite ? "#FFC107" : "grey"}
                                    />
                                </IconButton>
                                <Stack spacing={0.3}>
                                    <Typography variant="subtitle1">{book.titulo}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {book.autor} &middot; {book.tema}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Box>
                    ))}
                </SimpleBar>
            )}
        </MainCard>
        {selectedBookRegistro && (
            <BookFullDetailModal
                open={detailModalOpen}
                onClose={handleCloseDetail}
                book={selectedBookDetails}
                bookLoading={bookLoading}
                isFavorite={selectedBookDetails?.isFavorite}
                toggleFavorite={() => toggleFavorite(selectedBookRegistro)}
                />
        )}
        </>
    );
    
}
