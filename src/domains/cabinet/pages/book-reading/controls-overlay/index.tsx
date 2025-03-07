import './styles.less';
import React, {useState} from "react";
import {CloseOutlined, MinusOutlined, PauseOutlined, PlayCircleOutlined, PlusOutlined, RedoOutlined, UndoOutlined} from '@ant-design/icons';
import {observer} from "mobx-react";
import BookReadingStore from "domains/cabinet/pages/book-reading/store";
import {CabinetRoutes} from "routes/cabinet";
import {useNavigate} from "react-router-dom";

const ThreeSeconds = 3000;

const Controls: React.FC = observer(() => {
    const store                                                       = BookReadingStore.getInstance();
    const navigate                                                    = useNavigate();
    const [isHiddenPausedControls, setIsHiddenPausedControls]         = useState<boolean>(false);
    const [isHiddenReadingControls, setIsHiddenReadingControls]       = useState<boolean>(true);
    const [timerHidingReadingControls, setTimerHidingReadingControls] = useState<number>(null);

    const onClickCloseButton = () => navigate(CabinetRoutes.bookPreview(
        store.getBookProgress().book.author.url_slug,
        store.getBookProgress().book.url_slug
    ));

    const onClickPlayButton = () => Promise.resolve()
        .then(() => setIsHiddenPausedControls(true))
        .then(() => showReadingControls())
        .then(() => store.setIsPlaying(true));

    const onClickPauseButton = () => Promise.resolve()
        .then(() => setIsHiddenPausedControls(false))
        .then(() => setIsHiddenReadingControls(true))
        .then(() => store.setIsPlaying(false));

    const showReadingControls = () => Promise.resolve()
        .then(() => clearTimeout(timerHidingReadingControls))
        .then(() => setIsHiddenReadingControls(false))
        .then(() => setTimeout(() => setIsHiddenReadingControls(true), ThreeSeconds))
        .then((timer) => setTimerHidingReadingControls(timer));

    return (
        <div className={'controls-overlay'}>
            <div className={'paused-controls ' + (isHiddenPausedControls ? 'hidden' : '')}>
                <div className='top-controls'>
                    <div className='btn btn_30 btn_gray p-20' onClick={onClickCloseButton}>
                        <CloseOutlined />
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

            <div className={'reading-controls ' + (isHiddenReadingControls ? 'hidden' : '')} onClick={() => showReadingControls()}>
                <div className='top-controls'>
                    <div className='btn btn_30 btn_gray p-20' onClick={onClickCloseButton}>
                        <CloseOutlined />
                    </div>
                    <div className={'title'}>
                        {store.pageTitle}
                    </div>
                    <div className='btn btn_30 btn_gray p-20' onClick={onClickPauseButton}>
                        <PauseOutlined />
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

            <div className='empty-controls' onClick={() => showReadingControls()}>
            </div>
        </div>
    );
});

export default Controls;