import React from "react";
import {ReadingWordMode} from "domains/cabinet/pages/book-reading/enums";
import KaraokeSentence from "domains/cabinet/pages/book-reading/components/karaoke-sentence";
import TiktokSentence from "domains/cabinet/pages/book-reading/components/tiktok-sentence";
import DefaultSentence from "domains/cabinet/pages/book-reading/components/default-sentence";
import {observer} from "mobx-react";
import BookReadingStore from "domains/cabinet/pages/book-reading/store";

interface IProps {
    sentence: string;
    pageSentenceIndex: number;
}

const Sentence: React.FC<IProps> = observer(({sentence, pageSentenceIndex}) => {
    const store               = BookReadingStore.getInstance();
    const activeSentenceIndex = store.activeSentenceNumber;
    const activeWordIndex     = store.activeWordIndex;
    const sentenceLen         = sentence.split(' ').length;
    const isLongSentence      = sentenceLen > 10;
    const justifyContent      = sentenceLen > 10 ? 'stretch' : 'flex-start';

    switch (true) {
        case pageSentenceIndex < activeSentenceIndex:
            return <DefaultSentence
                wordColor={'black'}
                sentence={sentence}
                justifyContent={justifyContent}
                needParagraph={isLongSentence}
            />
        case pageSentenceIndex === activeSentenceIndex:
            return store.readingWordMode === ReadingWordMode.Karaoke
                ? <KaraokeSentence
                    sentence={sentence}
                    currentWordIndex={activeWordIndex}
                    justifyContent={justifyContent}
                    needParagraph={isLongSentence}
                />
                : <TiktokSentence
                    sentence={sentence}
                    currentWordIndex={activeWordIndex}
                    justifyContent={justifyContent}
                />;
        case pageSentenceIndex > activeSentenceIndex:
            return <DefaultSentence
                wordColor={'gray'}
                sentence={sentence}
                justifyContent={justifyContent}
                needParagraph={isLongSentence}
            />
    }
});

export default Sentence;