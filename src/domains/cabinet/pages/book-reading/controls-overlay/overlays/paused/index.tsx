import {observer} from "mobx-react";
import {CloseCircleOutlined, PlayCircleOutlined, RedoOutlined, UndoOutlined} from "@ant-design/icons";
import React from "react";
import BookReadingStore from "domains/cabinet/pages/book-reading/store";

interface IProps {
    isVisiblePausedControls: boolean;
    onClickCloseButton: () => void;
    onClickPlayButton: () => void;
}

const PausedOverlay: React.FC<IProps> = observer((props) => {
    const store = BookReadingStore.getInstance();

    return (
        <div className={'controls-overlay controls-overlay__paused ' + (props.isVisiblePausedControls ? '' : 'hidden')}>
            <div className='top-controls'>
                <div></div>
                <div className='btn btn_25 btn_gray p-20' onClick={props.onClickCloseButton}>
                    <CloseCircleOutlined />
                </div>
            </div>
            <div className='center-controls center-controls_w-70'>
                <div className='btn btn_60 btn_gray scroll-back' onClick={store.forcePrevSentence}>
                    <UndoOutlined />
                </div>
                <div className='btn btn_60 btn_gray play-button' onClick={props.onClickPlayButton}>
                    <PlayCircleOutlined />
                </div>
                <div className='btn btn_60 btn_gray scroll-forward' onClick={store.forceNextSentence}>
                    <RedoOutlined />
                </div>
            </div>
        </div>
    );
});

export default PausedOverlay;