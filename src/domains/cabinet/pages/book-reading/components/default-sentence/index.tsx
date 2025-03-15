import './styles.less';
import React from "react";

interface IProps {
    wordColor: string;
    sentence: string;
    needParagraph?: boolean;
}

const DefaultSentence: React.FC<IProps> = (props) => {
    return (
        <div className='default-sentence' style={{color: props.wordColor}}>
            {props.needParagraph && (
                <>&nbsp;&nbsp;&nbsp;&nbsp;</>
            )}
            {props.sentence}
        </div>
    );
};

export default DefaultSentence;