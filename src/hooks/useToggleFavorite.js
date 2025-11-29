import { useState, useEffect } from "react";
import { addFavoriteBook, removeFavoriteBook } from "../api/books";

export const useToggleFavorite = (initialBooks = []) => {
    const [books, setBooks] = useState(initialBooks);

    useEffect(() => {
        const booksWithFavoriteFlag = initialBooks.map(book => ({
            ...book,
            isFavorite: true
        }));
        setBooks(booksWithFavoriteFlag);
    }, [initialBooks]);

    const toggleFavorite = async (registro) => {
        const book = books.find((b) => b.registro === registro);

        if (!book) return;

        setBooks((prev) =>
            prev.map((b) =>
                b.registro === registro ? { ...b, isFavorite: !b.isFavorite } : b
            )
        );

        try {
            if (book.isFavorite) {
                await removeFavoriteBook(registro);
            } else {
                await addFavoriteBook(registro);
            }
        } catch (err) {
            console.error(err);
            setBooks((prev) =>
                prev.map((b) =>
                    b.registro === registro ? { ...b, isFavorite: !b.isFavorite } : b
                )
            );
        }
    };

    return { books, setBooks, toggleFavorite };
};
