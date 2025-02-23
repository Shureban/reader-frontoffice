import React, {useEffect} from "react";
import {observer} from "mobx-react";
import Wrapper from "domains/cabinet/components/wrapper";
import {useRootStore} from "RootStoreContext";
import {useNavigate, useParams} from "react-router-dom";
import {UsersBooksApi} from "api/entrypoint";
import BookProgressResource from "api/resources/book-progress";

const BookReading: React.FC = observer(() => {
    const {appStore}                      = useRootStore();
    const navigate                        = useNavigate();
    const {uuid}                          = useParams() || '';
    const [bookProgress, setBookProgress] = React.useState<BookProgressResource | undefined>();

    useEffect(() => {
        Promise.resolve()
            .then(() => appStore.lockPage())
            .then(() => UsersBooksApi.show(uuid)
                .then((book) => setBookProgress(book))
            )
            .catch((error) => console.log(error))
            .finally(() => appStore.unlockPage());
    }, []);

    console.log(bookProgress);
    return (
        <Wrapper>

        </Wrapper>
    );
});

export default BookReading;