import './styles.less';
import React from "react";

interface IProps {
    sentence: string;
    currentWordIndex: number;
}

const TikTokSentence: React.FC<IProps> = (props) => {
    return (
        <div className='tiktok-sentence'>
            {props.sentence.split(' ').map((word, index) => {
                switch (true) {
                    case index < props.currentWordIndex:
                        return <span key={index} className='prev-word'>{word}&nbsp;</span>;
                    case index === props.currentWordIndex:
                        return <><span key={index} className='active-word'>{word}</span>&nbsp;</>;
                    default:
                        return <span key={index} className='next-word'>{word}&nbsp;</span>;
                }
            })}
        </div>
    );
};

export default TikTokSentence;