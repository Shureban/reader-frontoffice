import './styles.less';
import React, {useEffect, useRef, useState} from 'react';
import Sentence from "domains/cabinet/pages/book-reading/scrolling-reader/sentence";
import BookReadingStore from "domains/cabinet/pages/book-reading/store";
import {observer} from "mobx-react";

const DefaultWordIndex = 0;

const ScrollingReader: React.FC = observer(() => {
    const store                                 = BookReadingStore.getInstance();
    const containerRef                          = useRef<HTMLDivElement | null>(null);
    const [readingInterval, setReadingInterval] = useState<number | null>(null);

    useEffect(() => {
        return () => stopReading();
    }, []);

    useEffect(() => {
        const activeWord = containerRef.current?.querySelector('.active-word');

        if (activeWord) {
            activeWord.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    }, [store.activeSentenceNumber, store.activeWordIndex]);

    useEffect(() => {
        store.isPlaying ? startReading() : stopReading();
    }, [store.isPlaying]);

    useEffect(() => {
        stopReading();
        startReading();
    }, [store.wordsPerMinute]);

    useEffect(() => {
        stopReading();
        store.setActiveWordIndex(DefaultWordIndex);
        startReading();
    }, [store.currentPage]);

    const startReading = (): void => {
        if (!store.isPlaying) {
            return;
        }

        const interval = setInterval(() => {
            const words         = store.getActiveSentence().split(' ');
            const nextWordIndex = store.activeWordIndex + 1;

            if (nextWordIndex >= words.length) {
                store.forceNextSentence();
                store.setActiveWordIndex(DefaultWordIndex);
                return;
            }

            store.setActiveWordIndex(nextWordIndex);
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

                {store.currentPage?.sentences.map((sentence, i) => {
                    return (
                        <div className='scroll-reader__content__sentence' key={i}>
                            <Sentence
                                pageSentenceIndex={i}
                                sentence={sentence}
                                activeWordIndex={store.activeWordIndex}
                            />
                        </div>
                    );
                })}
                <div className='page-gap'></div>
            </div>
        </div>
    );
});

export default ScrollingReader;