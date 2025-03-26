import './styles.less';
import React, {useState} from "react";
import {CloseCircleOutlined, MinusOutlined, PauseCircleOutlined, PlayCircleOutlined, PlusOutlined, RedoOutlined, UndoOutlined} from '@ant-design/icons';
import {observer} from "mobx-react";
import BookReadingStore from "domains/cabinet/pages/book-reading/store";
import {CabinetRoutes} from "routes/cabinet";
import {useNavigate} from "react-router-dom";

const ThreeSeconds = 300000;

const Controls: React.FC = observer(() => {
    const store                                                       = BookReadingStore.getInstance();
    const navigate                                                    = useNavigate();
    const [isVisiblePausedControls, setIsVisiblePausedControls]       = useState<boolean>(true);
    const [isVisibleReadingControls, setIsVisibleReadingControls]     = useState<boolean>(false);
    const [timerHidingReadingControls, setTimerHidingReadingControls] = useState<number>(null);
    const [clickDelay, setClickDelay]                                 = useState<number>(0);

    const onClickCloseButton = () => navigate(CabinetRoutes.bookPreview(
        store.getBookProgress().book.author.url_slug,
        store.getBookProgress().book.url_slug
    ));

    const onClickPlayButton = () => Promise.resolve()
        .then(() => setIsVisiblePausedControls(false))
        .then(() => toggleReadingControls())
        .then(() => store.setIsPlaying(true));

    const onClickPauseButton = () => Promise.resolve()
        .then(() => setIsVisiblePausedControls(true))
        .then(() => setIsVisibleReadingControls(false))
        .then(() => store.setIsPlaying(false));

    const toggleReadingControls = () => {
        if (isVisibleReadingControls) {
            clearTimeout(timerHidingReadingControls);
            setIsVisibleReadingControls(false);
        } else {
            Promise.resolve()
                .then(() => setTimeout(() => setIsVisibleReadingControls(false), ThreeSeconds))
                .then((timer) => setTimerHidingReadingControls(timer))
                .then(() => setIsVisibleReadingControls(true));
        }
    };

    const onClickDown = (event: React.MouseEvent) => {
        console.log('down');
        console.log(event);
        event.preventDefault();
        setClickDelay(Date.now());
        store.setIsPlaying(false);
        return false;
    };

    const onClickUp = (event: React.MouseEvent) => {
        event.preventDefault();
        console.log('up');
        if (Date.now() - clickDelay < 200) {
            toggleReadingControls();
        }

        store.setIsPlaying(true);
    };

    return (
        <div className='controls-overlay'>
            <div className={'controls-overlay controls-overlay__paused ' + (isVisiblePausedControls ? '' : 'hidden')}>
                <div className='top-controls'>
                    <div></div>
                    <div className='btn btn_25 btn_gray p-20' onClick={onClickCloseButton}>
                        <CloseCircleOutlined />
                    </div>
                </div>
                <div className='center-controls center-controls_w-70'>
                    <div className='btn btn_60 btn_gray scroll-back' onClick={store.forcePrevSentence}>
                        <UndoOutlined />
                    </div>
                    <div className={'btn btn_60 btn_gray play-button ' + (store.isPlaying ? 'hidden' : '')} onClick={onClickPlayButton}>
                        <PlayCircleOutlined />
                    </div>
                    <div className='btn btn_60 btn_gray scroll-forward' onClick={store.forceNextSentence}>
                        <RedoOutlined />
                    </div>
                </div>
            </div>

            <div className={'controls-overlay controls-overlay__reading ' + (isVisibleReadingControls ? '' : 'hidden')} onClick={() => toggleReadingControls()}>
                <div className='top-controls'>
                    <div></div>
                    <div className='btn btn_25 btn_gray p-20' onClick={onClickPauseButton}>
                        <PauseCircleOutlined />
                    </div>
                </div>
                <div className='center-controls center-controls_w-100'>
                    <div className={'font-size-controls p-20'}>
                        <div className='btn btn_20 btn_gray' onClick={() => store.setFontSize(store.fontSize + 1)}>
                            <PlusOutlined />
                        </div>
                        <div className={'settings-value'}>
                            {store.fontSize}
                        </div>
                        <div className='btn btn_20 btn_gray' onClick={() => store.setFontSize(store.fontSize - 1)}>
                            <MinusOutlined />
                        </div>
                    </div>
                    <div className={'text-speed-controls p-20'}>
                        <div className='btn btn_20 btn_gray' onClick={() => store.setWordsPerMinute(store.wordsPerMinute + 5)}>
                            <PlusOutlined />
                        </div>
                        <div className={'settings-value'}>
                            {store.wordsPerMinute}
                        </div>
                        <div className='btn btn_20 btn_gray' onClick={() => store.setWordsPerMinute(store.wordsPerMinute - 5)}>
                            <MinusOutlined />
                        </div>
                    </div>
                </div>
            </div>

            <div
                className='controls-overlay controls-overlay__empty'
                onClick={() => toggleReadingControls()}
                // onTouchStart={(event: React.TouchEvent) => {
                //     console.log(event);
                //     event.preventDefault();
                //     console.log(12);
                // }}
                // onMouseDown={(event: React.MouseEvent) => onClickDown(event)}
                // onMouseUp={(event: React.MouseEvent) => onClickUp(event)}
            >
            </div>
        </div>
    );
});

export default Controls;