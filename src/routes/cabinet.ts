export const CabinetRoutes = {
    home: () => '/',
    bookPreview: (author: string = ':author', bookName: string = ':bookName') => '/books/' + author + '/' + bookName,
};