import './styles.less';
import React, {useState} from "react";
import {CloseOutlined, PauseOutlined, PlayCircleOutlined, RedoOutlined, UndoOutlined} from '@ant-design/icons';

interface IProps {
    isPlaying: boolean;
    onClickCloseButton: () => void;
    onClickPlayButton: () => void;
    onClickPauseButton: () => void;
    onClickScrollBack: () => void;
    onClickScrollForward: () => void;
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
        .then(() => setIsHiddenReadingControls(() => true))
        .then(() => props.onClickPauseButton());

    const showReadingControls = () => {
        Promise.resolve()
            .then(() => console.log('click'))
            .then(() => clearTimeout(timerHidingReadingControls))
            .then(() => setIsHiddenReadingControls(false))
            .then(() => setTimeout(() => setIsHiddenReadingControls(true), ThreeSeconds))
            .then((timer) => setTimerHidingReadingControls(timer));
    };

    return (
        <div className={'controls-overlay'}>
            <div className={'paused-controls ' + (isHiddenPausedControls ? 'hidden' : '')}>
                <div className='top-controls'>
                    <div className='btn btn_40 btn_gray m-20' onClick={props.onClickCloseButton}>
                        <CloseOutlined />
                    </div>
                </div>
                <div className='center-controls'>
                    <div className='btn btn_60 btn_gray scroll-back' onClick={props.onClickScrollBack}>
                        <RedoOutlined />
                    </div>
                    <div className={'btn btn_60 btn_gray play-button ' + (isPlaying ? 'hidden' : '')} onClick={onClickPlayButton}>
                        <PlayCircleOutlined />
                    </div>
                    <div className='btn btn_60 btn_gray scroll-forward' onClick={props.onClickScrollForward}>
                        <UndoOutlined />
                    </div>
                </div>
            </div>

            <div className={'reading-controls ' + (isHiddenReadingControls ? 'hidden' : '')} onClick={() => showReadingControls()}>
                <div className='top-controls'>
                    <div className='btn btn_40 btn_gray m-20' onClick={props.onClickCloseButton}>
                        <CloseOutlined />
                    </div>
                    <div className='btn btn_40 btn_gray m-20' onClick={onClickPauseButton}>
                        <PauseOutlined />
                    </div>
                </div>
            </div>

            <div className='empty-controls' onClick={() => showReadingControls()}>
            </div>
        </div>
    );
};

export default Controls;