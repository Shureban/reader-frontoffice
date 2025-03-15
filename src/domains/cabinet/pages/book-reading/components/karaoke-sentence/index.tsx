import './styles.less';
import React from "react";

interface IProps {
    sentence: string;
    currentWordIndex: number;
    needParagraph?: boolean;
}

const KaraokeSentence: React.FC<IProps> = (props) => {
    const words      = props.sentence.split(' ');
    const firstPart  = words.slice(0, props.currentWordIndex).join(' ');
    const secondPart = words[props.currentWordIndex];
    const thirdPart  = words.slice(props.currentWordIndex + 1).join(' ');

    return (
        <>
            <div className='karaoke-sentence'>
                {props.needParagraph && (
                    <>&nbsp;&nbsp;&nbsp;&nbsp;</>
                )}
                {firstPart && (
                    <span>{firstPart} </span>
                )}
                <span className='active-word'>{secondPart} </span>
                <span className='next-word'>{thirdPart}</span>
            </div>
        </>
    );
};

export default KaraokeSentence;