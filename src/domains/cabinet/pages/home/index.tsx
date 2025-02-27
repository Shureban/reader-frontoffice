import './styles.less';
import React, {useEffect} from "react";
import {observer} from "mobx-react";
import {useRootStore} from "RootStoreContext";
import {BooksApi, UsersBooksApi} from "api/entrypoint";
import {TBooksListRequest} from "api/requests/books";
import {Col, Row} from "antd";
import Wrapper from "domains/cabinet/components/wrapper";
import BookCover from "domains/cabinet/pages/home/components/book-cover";
import {SortType} from "api/enums/sort-type";
import {ListRequestSortColumn, TBooksProgressListRequest} from "api/requests/users-books";
import BookResource from "api/resources/book";
import BookProgressResource from "api/resources/book-progress";

const Home: React.FC = observer(() => {
    const {appStore}                            = useRootStore();
    const [availableBooks, setAvailableBooks]   = React.useState<BookResource[]>([]);
    const [booksInProgress, setBooksInProgress] = React.useState<BookProgressResource[]>([]);

    useEffect(() => {
        Promise.resolve()
            .then(() => appStore.lockPage())
            .then(() => BooksApi.list({page: 1, per_page: 20, sort_type: SortType.Desc} as TBooksListRequest)
                .then((response) => setAvailableBooks(response.data))
            )
            .catch((error) => console.log(error))
            .finally(() => appStore.unlockPage());
        Promise.resolve()
            .then(() => appStore.lockPage())
            .then(() => UsersBooksApi.list({page: 1, per_page: 20, sort_column: ListRequestSortColumn.UpdatedAt, sort_type: SortType.Desc} as TBooksProgressListRequest)
                .then((response) => setBooksInProgress(response.data))
            )
            .catch((error) => console.log(error))
            .finally(() => appStore.unlockPage());
    }, []);

    return (
        <Wrapper>
            {availableBooks.length > 0 && (
                <Row className='mb-10'>
                    <Col span={24}>
                        <div className="scrollable-strip">
                            {availableBooks.map((book, index) => (<div key={index}>
                                <BookCover book={book} />
                            </div>))}
                        </div>
                    </Col>
                </Row>
            )}

            {booksInProgress.length > 0 && (
                <Row>
                    <Col span={24}>
                        <div className="scrollable-strip">
                            {booksInProgress.map((bookProgress, index) => (<div key={index}>
                                <BookCover book={bookProgress.book} />
                            </div>))}
                        </div>
                    </Col>
                </Row>
            )}
        </Wrapper>
    );
});

export default Home;