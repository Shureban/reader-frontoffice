import './styles.less';
import React, {useEffect} from "react";
import {observer} from "mobx-react";
import {useNavigate, useParams} from "react-router-dom";
import Wrapper from "domains/cabinet/components/wrapper";
import BookResource from "api/resources/book";
import {useRootStore} from "RootStoreContext";
import {BooksApi, UsersBooksApi} from "api/entrypoint";
import BookViewSkeleton from "domains/cabinet/pages/book-view/components/skeleton";
import {Button, Image, Progress, Typography} from "antd";
import {TGetProgressRequest, TStartBookReadingRequest} from "api/requests/users-books";
import {ArrowLeftOutlined, PlayCircleOutlined, SyncOutlined} from '@ant-design/icons';
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
                <div className='book-info__cover'>
                    <div className='book-info__cover__arrow-back' onClick={() => navigate(CabinetRoutes.home())}>
                        <ArrowLeftOutlined />
                    </div>
                    <div className='book-info__cover__image'>
                        <Image src={book.cover_file?.download_link} />
                    </div>
                </div>
                <div className='book-info__metadata'>
                    <div className='book-info__short-info'>
                        <Title level={2} className='book-info__short-info__title'>{book.name}</Title>
                        <Text className='book-info__short-info__subtitle'>{book.author.name}</Text>
                    </div>

                    <hr className="hr-text" />

                    <div className='book-info__description'>{book.description}</div>
                </div>
                <div className='play-button'>
                    <Progress type="dashboard" percent={bookProgress?.progress || 0} gapDegree={1} strokeColor={{
                        '0%': '#87d068',
                        '50%': '#ffe58f',
                        '100%': '#ffccc7',
                    }} />
                    <Button loading={buttonLoading ? {icon: <SyncOutlined spin />} : false} size='small' type={'primary'} block onClick={onClickContinueReading}>
                        <PlayCircleOutlined />
                    </Button>
                </div>
            </div>
        </Wrapper>
    );
});

export default BookView;