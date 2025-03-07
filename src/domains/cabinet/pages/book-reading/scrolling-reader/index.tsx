import './styles.less';
import React, {useEffect, useRef, useState} from 'react';
import Sentence from "domains/cabinet/pages/book-reading/scrolling-reader/sentence";
import BookReadingStore from "domains/cabinet/pages/book-reading/store";
import {observer} from "mobx-react";

interface IProps {
    sentences: string[];
}

const DefaultWordIndex = 0;

const ScrollingReader: React.FC<IProps> = observer((props) => {
    const store = BookReadingStore.getInstance();

    const containerRef                          = useRef<HTMLDivElement | null>(null);
    const [activeWordIndex, setActiveWordIndex] = useState(DefaultWordIndex);
    const [readingInterval, setReadingInterval] = useState<number | null>(null);

    useEffect(() => {
        return () => startReading();
    }, []);

    useEffect(() => {
        const activeWord = containerRef.current?.querySelector('.active-word');

        if (activeWord) {
            activeWord.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    }, [store.activeSentenceNumber, activeWordIndex]);

    useEffect(() => {
        store.isPlaying ? startReading() : stopReading();
    }, [store.isPlaying]);

    useEffect(() => {
        stopReading();
        startReading();
    }, [store.wordsPerMinute]);

    useEffect(() => {
        stopReading();
        setActiveWordIndex(DefaultWordIndex);
        startReading();
    }, [props.sentences]);

    const startReading = (): void => {
        if (!store.isPlaying) {
            return;
        }

        const activeSentence = props.sentences[store.activeSentenceNumber] || '';
        const words          = activeSentence.split(' ');
        const interval       = setInterval(() => {
            setActiveWordIndex((prevIndex) => {
                const newIndex = prevIndex + 1;

                if (newIndex >= words.length) {
                    stopReading();
                    store.forceNextSentence();
                    return 0;
                }
                return newIndex;
            });
        }, 60000 / store.wordsPerMinute);

        setReadingInterval(interval);
    };

    const stopReading = (): void => {
        if (readingInterval) {
            clearInterval(readingInterval);
        }
    };

    return (
        <div className="scroll-reader" ref={containerRef}>
            <div className="scroll-reader__content">
                <div className='page-gap'></div>
                <div className='scroll-reader__content__title'>{store.pageTitle}</div>

                {props.sentences.map((sentence, i) => {
                    return (
                        <div className='scroll-reader__content__sentence' key={i}>
                            <Sentence
                                sentence={sentence}
                                pageSentenceIndex={i}
                                activeWordIndex={activeWordIndex}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
});

export default ScrollingReader;