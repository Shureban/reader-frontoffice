import './styles.less';
import React, {useState} from "react";
import {CloseOutlined, MinusOutlined, PauseOutlined, PlayCircleOutlined, PlusOutlined, RedoOutlined, UndoOutlined} from '@ant-design/icons';

interface IProps {
    isPlaying: boolean;
    pageTitle: string;
    wordsPerMinute: number;
    fontSize: number;
    onClickCloseButton: () => void;
    onClickPlayButton: () => void;
    onClickPauseButton: () => void;
    onClickScrollBack: () => void;
    onClickScrollForward: () => void;
    onChangeWordsPerMinute: (value: number) => void;
    onChangeFontSize: (value: number) => void;
}

const ThreeSeconds = 3000;

const Controls: React.FC<IProps> = (props) => {
    const isPlaying                                                   = props.isPlaying;
    const [isHiddenPausedControls, setIsHiddenPausedControls]         = useState<boolean>(false);
    const [isHiddenReadingControls, setIsHiddenReadingControls]       = useState<boolean>(true);
    const [timerHidingReadingControls, setTimerHidingReadingControls] = useState<number>(null);

    const onClickPlayButton = () => Promise.resolve()
        .then(() => setIsHiddenPausedControls(true))
        .then(() => showReadingControls())
        .then(() => props.onClickPlayButton());

    const onClickPauseButton = () => Promise.resolve()
        .then(() => setIsHiddenPausedControls(false))
        .then(() => setIsHiddenReadingControls(true))
        .then(() => props.onClickPauseButton());

    const showReadingControls = () => {
        Promise.resolve()
            .then(() => console.log('click'))
            .then(() => clearTimeout(timerHidingReadingControls))
            .then(() => setIsHiddenReadingControls(false))
            .then(() => setTimeout(() => setIsHiddenReadingControls(true), ThreeSeconds))
            .then((timer) => setTimerHidingReadingControls(timer));
    };

    const getPreparedTitle = (title: string) => {
        if (!title) {
            return '';
        }

        const isNumber = !isNaN(Number(title));

        return isNumber ? `Page ${title}` : title;
    };

    return (
        <div className={'controls-overlay'}>
            <div className={'paused-controls ' + (isHiddenPausedControls ? 'hidden' : '')}>
                <div className='top-controls'>
                    <div className='btn btn_30 btn_gray p-20' onClick={props.onClickCloseButton}>
                        <CloseOutlined />
                    </div>
                </div>
                <div className='center-controls center-controls_w-70'>
                    <div className='btn btn_60 btn_gray scroll-back' onClick={props.onClickScrollBack}>
                        <UndoOutlined />
                    </div>
                    <div className={'btn btn_60 btn_gray play-button ' + (isPlaying ? 'hidden' : '')} onClick={onClickPlayButton}>
                        <PlayCircleOutlined />
                    </div>
                    <div className='btn btn_60 btn_gray scroll-forward' onClick={props.onClickScrollForward}>
                        <RedoOutlined />
                    </div>
                </div>
            </div>

            <div className={'reading-controls ' + (isHiddenReadingControls ? 'hidden' : '')} onClick={() => showReadingControls()}>
                <div className='top-controls'>
                    <div className='btn btn_30 btn_gray p-20' onClick={props.onClickCloseButton}>
                        <CloseOutlined />
                    </div>
                    <div className={'title'}>
                        {getPreparedTitle(props.pageTitle)}
                    </div>
                    <div className='btn btn_30 btn_gray p-20' onClick={onClickPauseButton}>
                        <PauseOutlined />
                    </div>
                </div>
                <div className='center-controls center-controls_w-100'>
                    <div className={'font-size-controls p-20'}>
                        <div className='btn btn_20 btn_gray' onClick={() => props.onChangeFontSize(props.fontSize + 1)}>
                            <PlusOutlined />
                        </div>
                        <div className={'settings-value'}>
                            {props.fontSize}
                        </div>
                        <div className='btn btn_20 btn_gray' onClick={() => props.onChangeFontSize(props.fontSize - 1)}>
                            <MinusOutlined />
                        </div>
                    </div>
                    <div className={'text-speed-controls p-20'}>
                        <div className='btn btn_20 btn_gray' onClick={() => props.onChangeWordsPerMinute(props.wordsPerMinute + 5)}>
                            <PlusOutlined />
                        </div>
                        <div className={'settings-value'}>
                            {props.wordsPerMinute}
                        </div>
                        <div className='btn btn_20 btn_gray' onClick={() => props.onChangeWordsPerMinute(props.wordsPerMinute - 5)}>
                            <MinusOutlined />
                        </div>
                    </div>
                </div>
            </div>

            <div className='empty-controls' onClick={() => showReadingControls()}>
            </div>
        </div>
    );
};

export default Controls;