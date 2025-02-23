import './styles.less';
import React, {useEffect} from "react";
import {observer} from "mobx-react";
import {useNavigate, useParams} from "react-router-dom";
import Wrapper from "domains/cabinet/components/wrapper";
import BookResource from "api/resources/book";
import {useRootStore} from "RootStoreContext";
import {BooksApi, UsersBooksApi} from "api/entrypoint";
import BookViewSkeleton from "domains/cabinet/pages/book-view/components/skeleton";
import {Button, Image, Typography} from "antd";
import {TGetProgressRequest, TStartBookReadingRequest} from "api/requests/users-books";
import {SyncOutlined} from '@ant-design/icons';
import {CabinetRoutes} from "routes/cabinet";
import BookProgressResource from "api/resources/book-progress";

const {Title, Text} = Typography;

const BookView: React.FC = observer(() => {
    const {appStore}                          = useRootStore();
    const navigate                            = useNavigate();
    const {authorSlug}                        = useParams() || '';
    const {bookSlug}                          = useParams() || '';
    const [book, setBook]                     = React.useState<BookResource | undefined>();
    const [bookProgress, setBookProgress]     = React.useState<BookProgressResource | undefined>();
    const [bookInProgress, setBookInProgress] = React.useState<boolean>(false);
    const [buttonLoading, setButtonLoading]   = React.useState<boolean>(true);

    useEffect(() => {
        Promise.resolve()
            .then(() => appStore.lockPage())
            .then(() => BooksApi.show(authorSlug, bookSlug)
                .then((book) => setBook(book))
                .then(() => setButtonLoading(false))
            )
            .catch((error) => console.log(error))
            .finally(() => appStore.unlockPage());
    }, []);

    useEffect(() => {
        if (!book) {
            return;
        }

        Promise.resolve()
            .then(() => UsersBooksApi.getBookProgress({book_id: book.id} as TGetProgressRequest))
            .then((bookProgress) => setBookProgress(bookProgress))
            .then(() => setBookInProgress(true))
            .catch(() => setBookInProgress(false));
    }, [book]);

    const onClickStartReading = () => Promise.resolve()
        .then(() => appStore.lockPage())
        .then(() => setButtonLoading(true))
        .then(() => UsersBooksApi.startReading({book_id: book?.id} as TStartBookReadingRequest))
        .then((bookProgress) => navigate(CabinetRoutes.bookReading(bookProgress.uuid)))
        .finally(() => appStore.unlockPage());

    const onClickContinueReading = () => Promise.resolve()
        .then(() => appStore.lockPage())
        .then(() => setButtonLoading(true))
        .then(() => navigate(CabinetRoutes.bookReading(bookProgress?.uuid)))
        .finally(() => appStore.unlockPage());

    if (!book) {
        return (
            <Wrapper>
                <BookViewSkeleton />
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <div className='book-info'>
                <div className='book-info__short-info'>
                    <Title className='book-info__short-info__title'>{book.name}</Title>
                    <Text className='book-info__short-info__subtitle'>
                        {book.author.name}
                    </Text>
                </div>
                <div className='book-info__cover'>
                    <Image src={book.cover_file?.download_link} />
                </div>
                <div className='book-info__description'>{book.description}</div>
                <div className='book-info__progress-action'>
                    {bookInProgress && (
                        <Button loading={buttonLoading ? {icon: <SyncOutlined spin />} : false} size={'large'} type={'primary'} block onClick={onClickContinueReading}>
                            Continue reading
                        </Button>
                    )}
                    {!bookInProgress && (
                        <Button loading={buttonLoading ? {icon: <SyncOutlined spin />} : false} size={'large'} type={'primary'} block onClick={onClickStartReading}>
                            Start reading
                        </Button>
                    )}
                </div>
            </div>
        </Wrapper>
    );
});

export default BookView;