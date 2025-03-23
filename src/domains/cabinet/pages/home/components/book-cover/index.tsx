import './styles.less';
import React from "react";
import {observer} from "mobx-react";
import BookResource from "api/resources/book";
import {Image} from "antd";
import {Link} from "react-router-dom";
import {CabinetRoutes} from "routes/cabinet";

interface IProps {
    book: BookResource,
}

const BookCover: React.FC<IProps> = observer((props) => {
    const book = props.book;

    return (
        <Link to={CabinetRoutes.bookPreview(book.author.url_slug, book.url_slug)}>
            <div className="book-cover mr-10">
                {props.book.cover_file && (
                    <Image src={props.book.cover_file?.download_link} preview={false} />
                )}
                {!props.book.cover_file && (
                    <Image src={'/empty-book-cover.png'} preview={false} />
                )}
            </div>
        </Link>
    );
});

export default BookCover;