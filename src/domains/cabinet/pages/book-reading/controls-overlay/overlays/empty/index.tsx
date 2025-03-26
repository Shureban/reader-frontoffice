import {observer} from "mobx-react";
import React, {useState} from "react";
import BookReadingStore from "domains/cabinet/pages/book-reading/store";

interface IProps {
    toggleReadingControls: () => void;
}

const DefaultClicksNumber       = 0;
const SlowClickDelay            = 200;
const ReadingMenuClickNumber    = 1;
const ChangeSentenceClickNumber = 2;

const EmptyOverlay: React.FC<IProps> = observer((props) => {
    const store                           = BookReadingStore.getInstance();
    const [clickTime, setClickTime]       = useState<number>(0);
    const [clicksNumber, setClicksNumber] = useState<number>(DefaultClicksNumber);
    const [clickTimer, setClickTimer]     = useState<number>(null);

    const onClickDown = (event: React.TouchEvent) => setClickTime(Date.now());

    const onClickUp = (event: React.TouchEvent) => {
        event.preventDefault();

        const currentTime     = Date.now();
        const newClicksNumber = clicksNumber + 1;
        const isFastClick     = currentTime - clickTime < SlowClickDelay;

        setClicksNumber(newClicksNumber);

        switch (true) {
            case isFastClick && newClicksNumber === ReadingMenuClickNumber:
                handleOneClick();
                break;
            case isFastClick && newClicksNumber === ChangeSentenceClickNumber:
                handleDoubleClick(event);
                break;
        }
    };

    const handleOneClick = () => {
        const timer = setTimeout(() => Promise.resolve()
            .then(() => setClicksNumber(DefaultClicksNumber))
            .then(() => props.toggleReadingControls()), SlowClickDelay);
        setClickTimer(timer);
    };

    const handleDoubleClick = (event: React.TouchEvent) => {
        const element         = event.currentTarget as HTMLElement;
        const rect            = element.getBoundingClientRect();
        const touch           = event.changedTouches[0];
        const clickX          = touch.clientX - rect.left;
        const midpoint        = rect.width / 2;
        const clickOnLeftSide = clickX < midpoint;

        Promise.resolve()
            .then(() => clickOnLeftSide ? store.forcePrevSentence() : store.forceNextSentence())
            .then(() => clearTimeout(clickTimer))
            .then(() => setClicksNumber(DefaultClicksNumber));
    };

    return (
        <div
            className='controls-overlay controls-overlay__empty'
            onContextMenu={(event) => event.preventDefault()}
            onTouchStart={(event) => onClickDown(event)}
            onTouchEnd={(event) => onClickUp(event)}
        >
        </div>
    );
});

export default EmptyOverlay;