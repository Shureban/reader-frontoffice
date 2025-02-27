import './styles.less';
import React from "react";
import PageResource from "api/resources/page";

interface IProps {
    isPlaying: boolean;
    pagesList: PageResource[];
    currentPage?: PageResource;
    onClickCloseButton: () => void;
    onClickPauseButton: () => void;
}

const Reader: React.FC<IProps> = (props) => {

    return (
        'Some text'
    );
};

export default Reader;