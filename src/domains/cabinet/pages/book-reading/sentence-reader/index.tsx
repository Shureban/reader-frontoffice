import './styles.less';
import React, {useEffect, useState} from "react";
import {ReadingWordMode} from "domains/cabinet/pages/book-reading/enums";
import KaraokeSentence from "domains/cabinet/pages/book-reading/components/karaoke-sentence";
import TikTokSentence from "domains/cabinet/pages/book-reading/components/tiktok-sentence";
import DefaultSentence from "domains/cabinet/pages/book-reading/components/default-sentence";
import BookReadingStore from "domains/cabinet/pages/book-reading/store";
import {observer} from "mobx-react";

const DefaultWordIndex = -1;

const SentenceReader: React.FC = observer(() => {
    const store                                 = BookReadingStore.getInstance();
    const [readingInterval, setReadingInterval] = useState<number | null>(null);

    useEffect(() => {
        return () => stopReading();
    }, []);

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
        setTimeout(() => startReading(), 500);
    }, [store.activeSentenceNumber]);

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
        <div className='sentence-reader'>
            <div className='sentence-reader__content'>
                {store.getPrevSentence() && (
                    <div className='sentence-reader__content__prev-sentance'>
                        <DefaultSentence sentence={store.getPrevSentence()} wordColor='gray' justifyContent={'center'} />
                    </div>
                )}
                <div className='sentence-reader__content__current-sentance'>
                    {store.readingWordMode === ReadingWordMode.Karaoke && (
                        <KaraokeSentence sentence={store.getActiveSentence()} currentWordIndex={store.activeWordIndex} justifyContent={'center'} />
                    )}
                    {store.readingWordMode === ReadingWordMode.Tiktok && (
                        <TikTokSentence sentence={store.getActiveSentence()} currentWordIndex={store.activeWordIndex} justifyContent={'center'} />
                    )}
                </div>
            </div>
        </div>
    );
});

export default SentenceReader;