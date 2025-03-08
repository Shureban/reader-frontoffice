import './styles.less';
import React from "react";

interface IProps {
    wordColor: string;
    sentence: string;
    justifyContent: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'stretch';
    needParagraph?: boolean;
}

const DefaultSentence: React.FC<IProps> = (props) => {
    return (
        <div className='default-sentence' style={{justifyContent: props.justifyContent}}>
            {props.needParagraph && (
                <span className='paragraph' />
            )}
            {props.sentence.split(' ').map((word, index) => (
                <span key={index} style={{color: props.wordColor}}>{word}&nbsp;</span>
            ))}
        </div>
    );
};

export default DefaultSentence;