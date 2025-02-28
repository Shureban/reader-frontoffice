import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";
import {useRootStore} from "RootStoreContext";
import {useNavigate, useParams} from "react-router-dom";
import {BookPagesApi, UsersApi, UsersBooksApi} from "api/entrypoint";
import BookProgressResource from "api/resources/book-progress";
import ControlsOverlay from "domains/cabinet/pages/book-reading/controls-overlay";
import Reader from "domains/cabinet/pages/book-reading/reader";
import {CabinetRoutes} from "routes/cabinet";
import PageResource from "api/resources/page";
import {ListRequestSortColumn, TBooksPagesListRequest} from "api/requests/book-pages";
import {SortType} from "api/enums/sort-type";
import {TUpdateProgressRequest} from "api/requests/users-books";
import {TUpdateUserSettingsRequest} from "api/requests/users";

const BookReading: React.FC = observer(() => {
    const {appStore}                                      = useRootStore();
    const navigate                                        = useNavigate();
    const {uuid}                                          = useParams() || '';
    const [bookProgress, setBookProgress]                 = useState<BookProgressResource | undefined>();
    const [pagesList, setPagesList]                       = useState<PageResource[]>([]);
    const [currentPage, setCurrentPage]                   = useState<PageResource | undefined>();
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(0);
    const [isPlaying, setIsPlaying]                       = useState<boolean>(false);
    const [wordsPerMinute, setWordsPerMinute]             = useState<number>(appStore.getUser().settings.words_per_minute);
    const [fontSize, setFontSize]                         = useState<number>(appStore.getUser().settings.font_size);

    useEffect(() => {
        Promise.resolve()
            .then(() => appStore.lockPage())
            .then(() => UsersBooksApi.show(uuid))
            .then((bookProgress) => Promise.resolve()
                .then(() => setBookProgress(bookProgress))
                .then(() => setCurrentPage(bookProgress.page))
                .then(() => setCurrentSentenceIndex(bookProgress.sentence_number))
                .then(() => BookPagesApi.list(
                    bookProgress.book.author.url_slug,
                    bookProgress.book.url_slug,
                    {page: 1, per_page: 10000, sort_column: ListRequestSortColumn.Number, sort_type: SortType.Asc} as TBooksPagesListRequest)
                )
                .then((response) => setPagesList(response.data)))
            .catch((error) => console.log(error))
            .finally(() => appStore.unlockPage());
    }, []);

    const updateProgress = (page: PageResource, sentenceIndex: number) => Promise.resolve()
        .then(() => ({book_id: bookProgress?.book.id, book_page_id: page?.id, sentence_number: sentenceIndex}))
        .then((request: TUpdateProgressRequest) => UsersBooksApi.updateBookProgress(request))
        .catch((error) => console.log(error));

    const forcePrevSentence = () => {
        let newIndex = currentSentenceIndex - 1;
        let page     = currentPage;

        if (newIndex < 0) {
            page     = pagesList.find((page) => page.number === currentPage?.number - 1);
            newIndex = page?.sentences.length - 1;
        }

        if (page) {
            setCurrentPage(page);
            setCurrentSentenceIndex(newIndex);
            updateProgress(page, newIndex);
        }
    }

    const forceNextSentence = () => {
        let newIndex = currentSentenceIndex + 1;
        let page     = currentPage;

        if (newIndex >= currentPage?.sentences.length) {
            page     = pagesList.find((page) => page.number === currentPage?.number + 1);
            newIndex = 0;
        }

        if (page) {
            setCurrentPage(page);
            setCurrentSentenceIndex(newIndex);
            updateProgress(page, newIndex);
        }
    }

    const updateUserSettings = (wordsPerMinute: number, fontSize: number) => {
        wordsPerMinute = wordsPerMinute < 1 ? 1 : wordsPerMinute;
        wordsPerMinute = wordsPerMinute > 1000 ? 1000 : wordsPerMinute;
        fontSize       = fontSize < 1 ? 1 : fontSize;
        fontSize       = fontSize > 100 ? 100 : fontSize;

        return Promise.resolve()
            .then(() => setWordsPerMinute(wordsPerMinute))
            .then(() => setFontSize(fontSize))
            .then(() => {
                const user                     = appStore.getUser();
                user.settings.words_per_minute = wordsPerMinute;
                user.settings.font_size        = fontSize;
                appStore.setUser(user);
            })
            .then(() => UsersApi.updateSettings({words_per_minute: wordsPerMinute, font_size: fontSize} as TUpdateUserSettingsRequest))
            .catch((error) => console.log(error));
    };

    const onClickCloseButton   = () => navigate(CabinetRoutes.bookPreview(bookProgress?.book.author.url_slug, bookProgress?.book.url_slug))
    const onClickPlayButton    = () => setIsPlaying(true)
    const onClickPauseButton   = () => setIsPlaying(false)
    const onClickScrollBack    = () => forcePrevSentence();
    const onClickScrollForward = () => forceNextSentence();
    const onSentenceEnd        = () => forceNextSentence();

    return (<>
        <ControlsOverlay
            isPlaying={isPlaying}
            pageTitle={currentPage?.name || ''}
            wordsPerMinute={wordsPerMinute}
            fontSize={fontSize}
            onClickCloseButton={() => onClickCloseButton()}
            onClickPlayButton={() => onClickPlayButton()}
            onClickPauseButton={() => onClickPauseButton()}
            onClickScrollBack={() => onClickScrollBack()}
            onClickScrollForward={() => onClickScrollForward()}
            onChangeWordsPerMinute={(newWordsPerMinute) => updateUserSettings(newWordsPerMinute, fontSize)}
            onChangeFontSize={(newFontSize) => updateUserSettings(wordsPerMinute, newFontSize)}
        />
        <Reader
            fontSize={fontSize}
            wordsPerMinute={wordsPerMinute}
            isPlaying={isPlaying}
            sentence={currentPage?.sentences[currentSentenceIndex] || ''}
            onSentenceEnd={() => onSentenceEnd()}
        />
    </>);
});

export default BookReading;