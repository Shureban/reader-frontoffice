import './styles.less';
import React from "react";

interface IProps {
    wordColor: string;
    sentence: string;
}

const DefaultSentence: React.FC<IProps> = (props) => {
    return (
        <div className='default-sentence'>
            {props.sentence.split(' ').map((word, index) => (
                <span key={index} style={{color: props.wordColor}}>{word}&nbsp;</span>
            ))}
        </div>
    );
};

export default DefaultSentence;