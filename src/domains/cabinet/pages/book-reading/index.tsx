import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";
import {useRootStore} from "RootStoreContext";
import {useNavigate, useParams} from "react-router-dom";
import {BookPagesApi, UsersBooksApi} from "api/entrypoint";
import BookProgressResource from "api/resources/book-progress";
import ControlsOverlay from "domains/cabinet/pages/book-reading/controls-overlay";
import Reader from "domains/cabinet/pages/book-reading/reader";
import {CabinetRoutes} from "routes/cabinet";
import PageResource from "api/resources/page";
import {ListRequestSortColumn, TBooksPagesListRequest} from "api/requests/book-pages";
import {SortType} from "api/enums/sort-type";

const WordsPerMinute = 10;

const BookReading: React.FC = observer(() => {
    const {appStore}                            = useRootStore();
    const navigate                              = useNavigate();
    const {uuid}                                = useParams() || '';
    const [bookProgress, setBookProgress]       = useState<BookProgressResource | undefined>();
    const [pagesList, setPagesList]             = useState<PageResource[]>([]);
    const [currentPage, setCurrentPage]         = useState<PageResource | undefined>();
    const [currentSentence, setCurrentSentence] = useState<string>("");
    const [isPlaying, setIsPlaying]             = useState<boolean>(false);

    useEffect(() => {
        Promise.resolve()
            .then(() => appStore.lockPage())
            .then(() => UsersBooksApi.show(uuid))
            .then((bookProgress) => Promise.resolve()
                .then(() => setBookProgress(bookProgress))
                .then(() => setCurrentPage(bookProgress.page))
                .then(() => setCurrentSentence(bookProgress.page.sentences[0]))
                .then(() => BookPagesApi.list(
                    bookProgress.book.author.url_slug,
                    bookProgress.book.url_slug,
                    {page: 1, per_page: 10000, sort_column: ListRequestSortColumn.Number, sort_type: SortType.Asc} as TBooksPagesListRequest)
                )
                .then((response) => setPagesList(response.data)))
            .catch((error) => console.log(error))
            .finally(() => appStore.unlockPage());
    }, []);

    const onClickCloseButton   = () => {
        navigate(CabinetRoutes.bookPreview(bookProgress?.book.author.url_slug, bookProgress?.book.url_slug));
    }
    const onClickPlayButton    = () => {
        setIsPlaying(true);
    }
    const onClickPauseButton   = () => {
        setIsPlaying(false);
    }
    const onClickScrollBack    = () => {
        console.log('scroll-back');
    }
    const onClickScrollForward = () => {
        console.log('scroll-forward');
    }

    return (<>
        <ControlsOverlay
            isPlaying={isPlaying}
            onClickCloseButton={() => onClickCloseButton()}
            onClickPlayButton={() => onClickPlayButton()}
            onClickPauseButton={() => onClickPauseButton()}
            onClickScrollBack={() => onClickScrollBack()}
            onClickScrollForward={() => onClickScrollForward()}
        />
        <Reader
            fontSize={4}
            wordsPerMinute={WordsPerMinute}
            isPlaying={isPlaying}
            sentence={currentSentence}
            onSentenceEnd={() => console.log('onSentenceEnd')}
        />
    </>);
});

export default BookReading;