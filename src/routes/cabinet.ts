export const CabinetRoutes = {
    home: () => '/',
    bookPreview: (author: string = ':authorSlug', bookName: string = ':bookSlug') => '/books/' + author + '/' + bookName,
    bookReading: (author: string = ':authorSlug', bookName: string = ':bookSlug') => '/books/' + author + '/' + bookName + '/reading',
};