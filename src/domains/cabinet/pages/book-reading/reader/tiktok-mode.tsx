import React from "react";

interface IProps {
    sentence: string;
    currentWordIndex: number;
}

const TikTokMode: React.FC<IProps> = (props) => {
    return (<>
        {props.sentence.split(' ').map((word, index) => {
            return index === props.currentWordIndex
                ? <><span key={index} className={'tiktok-active-word'}>{word}</span>&nbsp;</>
                : <span key={index} style={{color: 'grey'}}>{word}&nbsp;</span>;
        })}
    </>);
};

export default TikTokMode;