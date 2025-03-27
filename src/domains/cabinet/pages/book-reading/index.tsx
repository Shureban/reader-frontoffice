import React, {useEffect} from "react";
import {observer} from "mobx-react";
import {useRootStore} from "RootStoreContext";
import {useParams} from "react-router-dom";
import {BookPagesApi, UsersApi, UsersBooksApi} from "api/entrypoint";
import {ListRequestSortColumn, TBooksPagesListRequest} from "api/requests/book-pages";
import {SortType} from "api/enums/sort-type";
import {TUpdateProgressRequest} from "api/requests/users-books";
import {TUpdateUserSettingsRequest} from "api/requests/users";
import BookReadingStore from "domains/cabinet/pages/book-reading/store";

const BookReading: React.FC = observer(() => {
    const {appStore} = useRootStore();
    const {uuid}     = useParams() || '';
    const store      = BookReadingStore.getInstance();

    useEffect(() => {
        processBookProgress();

        store.setFontSize(appStore.getUser().settings.font_size);
        store.setWordsPerMinute(appStore.getUser().settings.words_per_minute);

        // When the component is unmounted, we need to reinitialize the store to avoid memory leaks
        return () => BookReadingStore.reinitializeInstance();
    }, []);

    useEffect(() => {
        if (!store.bookProgress) {
            return;
        }

        Promise.resolve()
            .then(() => ({book_id: store.getBookProgress().book.id, book_page_id: store.getCurrentPage().id, sentence_number: store.activeSentenceNumber}))
            .then(async (request: TUpdateProgressRequest) => UsersBooksApi.updateBookProgress(request)
                .catch((error) => console.log(error))
            );
    }, [store.currentPage, store.activeSentenceNumber]);

    useEffect(() => {
        Promise.resolve()
            .then(async () => UsersApi.updateSettings({words_per_minute: store.wordsPerMinute, font_size: store.fontSize} as TUpdateUserSettingsRequest)
                .then((userSettings) => appStore.setUserSettings(userSettings))
                .catch((error) => console.log(error))
            );
    }, [store.fontSize, store.wordsPerMinute]);

    const processBookProgress = () => Promise.resolve()
        .then(() => appStore.lockPage())
        .then(() => UsersBooksApi.show(uuid))
        .then((bookProgress) => Promise.resolve()
            .then(() => store.setBookProgress(bookProgress))
            .then(() => BookPagesApi.list(
                bookProgress.book.author.url_slug,
                bookProgress.book.url_slug,
                {page: 1, per_page: 10000, sort_column: ListRequestSortColumn.Number, sort_type: SortType.Asc} as TBooksPagesListRequest)
            )
            .then((response) => store.setPagesList(response.data)))
        .catch((error) => console.log(error))
        .finally(() => appStore.unlockPage());

    return (<>
        {/*<ControlsOverlay />*/}
        {/*<ScrollingReader />*/}
    </>);
});

export default BookReading;