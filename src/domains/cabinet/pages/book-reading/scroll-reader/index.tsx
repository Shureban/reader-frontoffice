import './styles.less';
import React, {useEffect, useRef, useState} from 'react';
import {ReadingWordMode} from "domains/cabinet/pages/book-reading/enums";
import Sentence from "domains/cabinet/pages/book-reading/scroll-reader/sentence";
import BookReadingStore from "domains/cabinet/pages/book-reading/store";
import {observer} from "mobx-react";

interface IProps {
    readingWordMode: ReadingWordMode;
    wordsPerMinute: number;
    title: string;
    sentences: string[];
    activeSentenceIndex: number;
    onSentenceEnd: () => void;
}

const DefaultWordIndex = 0;

const ScrollingText: React.FC<IProps> = observer((props) => {
    const store = BookReadingStore.getInstance();

    const containerRef                          = useRef<HTMLDivElement | null>(null);
    const [activeWordIndex, setActiveWordIndex] = useState(DefaultWordIndex);
    const [readingInterval, setReadingInterval] = useState<number | null>(null);

    useEffect(() => {
        const activeWord = containerRef.current?.querySelector('.active-word');

        if (activeWord) {
            activeWord.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    }, [store.activeSentenceIndex, activeWordIndex]);

    useEffect(() => {
        store.isPlaying ? startReading() : stopReading();
    }, [store.isPlaying]);

    useEffect(() => {
        stopReading();
        startReading();
    }, [props.wordsPerMinute]);

    useEffect(() => {
        stopReading();
        setActiveWordIndex(DefaultWordIndex);
        startReading();
    }, [props.sentences]);

    const startReading = (): void => {
        if (!store.isPlaying) {
            return;
        }

        const activeSentence = props.sentences[store.activeSentenceIndex] || '';
        const words          = activeSentence.split(' ');
        const interval       = setInterval(() => {
            setActiveWordIndex((prevIndex) => {
                const newIndex = prevIndex + 1;

                if (newIndex >= words.length) {
                    stopReading();
                    props.onSentenceEnd();
                    return 0;
                }
                return newIndex;
            });
        }, 60000 / props.wordsPerMinute);

        setReadingInterval(interval);
    };

    const stopReading = (): void => {
        console.log('stopReading 1');
        if (readingInterval) {
            console.log('stopReading 2');
            clearInterval(readingInterval);
        }
    };

    return (
        <div className="scroll-reader" ref={containerRef}>
            <div className="scroll-reader__content">
                <div className='page-gap'></div>
                <div className='scroll-reader__content__title'>{props.title}</div>

                {props.sentences.map((sentence, i) => {
                    return (
                        <div className='scroll-reader__content__sentence' key={i}>
                            <Sentence
                                sentence={sentence}
                                readingWordMode={props.readingWordMode}
                                pageSentenceIndex={i}
                                activeSentenceIndex={props.activeSentenceIndex}
                                activeWordIndex={activeWordIndex}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
});

export default ScrollingText;