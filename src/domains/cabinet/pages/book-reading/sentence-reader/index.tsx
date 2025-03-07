import './styles.less';
import React, {useEffect, useState} from "react";
import {ReadingWordMode} from "domains/cabinet/pages/book-reading/enums";
import KaraokeSentence from "domains/cabinet/pages/book-reading/components/karaoke-sentence";
import TikTokSentence from "domains/cabinet/pages/book-reading/components/tiktok-sentence";
import DefaultSentence from "domains/cabinet/pages/book-reading/components/default-sentence";
import BookReadingStore from "domains/cabinet/pages/book-reading/store";
import {observer} from "mobx-react";

interface IProps {
    readingWordMode: ReadingWordMode;
    wordsPerMinute: number;
    prevSentence?: string;
    sentence: string;
    onSentenceEnd: () => void;
}

const DefaultWordIndex = -1;

const SentenceReader: React.FC<IProps> = observer((props) => {
    const store                                   = BookReadingStore.getInstance();
    const [currentWordIndex, setCurrentWordIndex] = useState(DefaultWordIndex);
    const [readingInterval, setReadingInterval]   = useState<number | null>(null);

    useEffect(() => {
        store.isPlaying ? startReading() : stopReading();
    }, [store.isPlaying]);

    useEffect(() => {
        stopReading();
        startReading();
    }, [props.wordsPerMinute]);

    useEffect(() => {
        stopReading();
        setCurrentWordIndex(DefaultWordIndex);
        startReading();
    }, [props.sentence]);

    const startReading = (): void => {
        if (!store.isPlaying) {
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
                {props.prevSentence && (
                    <div className='sentence-reader__content__prev-sentance'>
                        <DefaultSentence sentence={props.prevSentence || ''} wordColor='gray' />
                    </div>
                )}
                <div className='sentence-reader__content__current-sentance'>
                    {props.readingWordMode === ReadingWordMode.Karaoke && (
                        <KaraokeSentence sentence={props.sentence} currentWordIndex={currentWordIndex} />
                    )}
                    {props.readingWordMode === ReadingWordMode.Tiktok && (
                        <TikTokSentence sentence={props.sentence} currentWordIndex={currentWordIndex} />
                    )}
                </div>
            </div>
        </div>
    );
});

export default SentenceReader;