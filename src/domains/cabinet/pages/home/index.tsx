import './styles.less';
import React, {useEffect} from "react";
import {observer} from "mobx-react";
import {useRootStore} from "RootStoreContext";
import {BooksApi} from "api/entrypoint";
import {TBooksListRequest} from "api/requests/books";
import {Col, Row} from "antd";
import Wrapper from "domains/cabinet/components/wrapper";

const Home: React.FC = observer(() => {
    const {appStore}                            = useRootStore();
    const [availableBooks, setAvailableBooks]   = React.useState([]);
    const [booksInProgress, setBooksInProgress] = React.useState([]);

    useEffect(() => {
        Promise.resolve()
            .then(() => appStore.pageIsLocked())
            .then(() => BooksApi.list({page: 1, per_page: 20} as TBooksListRequest)
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
                        {availableBooks.map((book, index) => (
                            <div
                                key={index}
                                className="book-cover"
                                style={{backgroundImage: `url(${book.coverUrl})`}}
                            />
                        ))}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <div className="scrollable-strip">
                        {availableBooks.map((book, index) => (
                            <div
                                key={index}
                                className="book-cover"
                                style={{backgroundImage: `url(${book.coverUrl})`}}
                            />
                        ))}
                    </div>
                </Col>
            </Row>
        </Wrapper>
    );
});

export default Home;