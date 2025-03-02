import './styles.less';
import React, {useEffect, useState} from "react";
import {ReadingMode} from "domains/cabinet/pages/book-reading/enums";
import DefaultMode from "domains/cabinet/pages/book-reading/reader/default-mode";
import TikTokMode from "domains/cabinet/pages/book-reading/reader/tiktok-mode";

interface IProps {
    readingMode: ReadingMode;
    fontSize: number;
    wordsPerMinute: number;
    isPlaying: boolean;
    prevSentence?: string;
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
            <div className='reader__content' style={{fontSize: props.fontSize}}>
                <div className='reader__content__prev-sentance'>
                    <DefaultMode sentence={props.prevSentence || ''} currentWordIndex={1000000} />
                </div>
                <div className='reader__content__current-sentance'>
                    {props.readingMode === ReadingMode.Default && (
                        <DefaultMode sentence={props.sentence} currentWordIndex={currentWordIndex} />
                    )}
                    {props.readingMode === ReadingMode.Tiktok && (
                        <TikTokMode sentence={props.sentence} currentWordIndex={currentWordIndex} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reader;