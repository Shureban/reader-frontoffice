import React from "react";

interface IProps {
    sentence: string;
    currentWordIndex: number;
}

const TikTokMode: React.FC<IProps> = (props) => {
    return (<>
        {props.sentence.split(' ').map((word, index) => {
            return index === props.currentWordIndex
                ? <span key={index} dangerouslySetInnerHTML={{__html: word + "&nbsp;"}} className={'tiktok-active-word'} />
                : <span key={index} dangerouslySetInnerHTML={{__html: word + '&nbsp;'}} style={{color: 'grey'}} />;
        })}
    </>);
};

export default TikTokMode;