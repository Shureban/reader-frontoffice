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
    activeWordIndex: number;
}

const Sentence: React.FC<IProps> = observer(({sentence, pageSentenceIndex, activeWordIndex}) => {
    const store               = BookReadingStore.getInstance();
    const activeSentenceIndex = store.activeSentenceNumber;

    switch (true) {
        case pageSentenceIndex < activeSentenceIndex:
            return <DefaultSentence wordColor={'black'} sentence={sentence} />
        case pageSentenceIndex === activeSentenceIndex:
            return store.readingWordMode === ReadingWordMode.Karaoke
                ? <KaraokeSentence sentence={sentence} currentWordIndex={activeWordIndex} />
                : <TiktokSentence sentence={sentence} currentWordIndex={activeWordIndex} />;
        case pageSentenceIndex > activeSentenceIndex:
            return <DefaultSentence wordColor={'gray'} sentence={sentence} />
    }
});

export default Sentence;