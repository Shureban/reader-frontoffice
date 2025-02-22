import React from "react";
import {observer} from "mobx-react";
import {useParams} from "react-router-dom";

const BookView: React.FC = observer(() => {
    const {author} = useParams();
    const {book}   = useParams();
    console.log(author, book);

    return ('');
});

export default BookView;