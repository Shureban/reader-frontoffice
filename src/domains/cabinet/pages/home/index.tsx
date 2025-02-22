import './styles.less';
import React, {useEffect} from "react";
import {observer} from "mobx-react";
import {useRootStore} from "RootStoreContext";
import {BooksApi} from "api/entrypoint";
import {TBooksListRequest} from "api/requests/books";
import {Col, Row} from "antd";
import Wrapper from "domains/cabinet/components/wrapper";
import BookCover from "domains/cabinet/pages/home/components/book-cover";
import {SortType} from "api/enums/sort-type";

const Home: React.FC = observer(() => {
    const {appStore}                            = useRootStore();
    const [availableBooks, setAvailableBooks]   = React.useState([]);
    const [booksInProgress, setBooksInProgress] = React.useState([]);

    useEffect(() => {
        Promise.resolve()
            .then(() => appStore.pageIsLocked())
            .then(() => BooksApi.list({page: 1, per_page: 20, sort_type: SortType.Asc} as TBooksListRequest)
                .then((response) => setAvailableBooks(response.data))
            )
            .catch((error) => console.log(error))
            .finally(() => appStore.unlockPage());
    }, []);

    return (
        <Wrapper>
            <Row>
                <Col span={24}>
                    <div className="scrollable-strip">
                        {availableBooks.map((book, index) => (<div key={index}>
                            <BookCover book={book} />
                        </div>))}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <div className="scrollable-strip">
                        {booksInProgress.map((book, index) => (<div key={index}>
                            <BookCover book={book} />
                        </div>))}
                    </div>
                </Col>
            </Row>
        </Wrapper>
    );
});

export default Home;