import './styles.less';
import React from "react";

interface IProps {
    wordColor: string;
    sentence: string;
    needParagraph?: boolean;
}

const DefaultSentence: React.FC<IProps> = (props) => {
    return (
        <div
            className={'default-sentence ' + (props.needParagraph ? 'default-sentence_paragraph' : '')}
            style={{color: props.wordColor}}
        >
            {props.sentence}
        </div>
    );
};

export default DefaultSentence;