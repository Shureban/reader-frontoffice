export const CabinetRoutes = {
    home: () => '/',
    bookPreview: (author: string = ':authorSlug', bookName: string = ':bookSlug') => '/books/' + author + '/' + bookName,
    bookReading: (uuid: string = ':uuid') => '/books/reading/' + uuid,
};