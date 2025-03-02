import './styles.less';
import React, {useEffect, useState} from "react";

interface IProps {
    fontSize: number;
    wordsPerMinute: number;
    isPlaying: boolean;
    sentence: string;
    onSentenceEnd: () => void;
}

const Reader: React.FC<IProps> = (props) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    useEffect(() => {
        if (!props.isPlaying) {
            return;
        }

        const words    = props.sentence.split(' ');
        const interval = setInterval(() => {
            setCurrentWordIndex((prevIndex) => {
                if (prevIndex + 1 >= words.length) {
                    props.onSentenceEnd();
                    return 0;
                }
                return prevIndex + 1;
            });
        }, 60000 / props.wordsPerMinute);

        return () => clearInterval(interval);
    }, [props.isPlaying, props.sentence, props.wordsPerMinute]);

    useEffect(() => {
        setCurrentWordIndex(0);
    }, [props.sentence]);

    return (
        <div className={'reader'}>
            <div className={'reader__content'} style={{fontSize: props.fontSize}}>
                {props.sentence.split(' ').map((word, index) => {
                    return index <= currentWordIndex
                        ? <span key={index} dangerouslySetInnerHTML={{__html: word + "&nbsp;"}} />
                        : <span key={index} dangerouslySetInnerHTML={{__html: word + '&nbsp;'}} style={{color: 'grey'}} />;
                })}
            </div>
        </div>
    );
};

export default Reader;