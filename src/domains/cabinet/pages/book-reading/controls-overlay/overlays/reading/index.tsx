import {observer} from "mobx-react";
import {MinusOutlined, PauseCircleOutlined, PlusOutlined} from "@ant-design/icons";
import React from "react";
import BookReadingStore from "domains/cabinet/pages/book-reading/store";

interface IProps {
    isVisibleReadingControls: boolean;
    toggleReadingControls: () => void;
    onClickPauseButton: () => void;
}

const ReadingOverlay: React.FC<IProps> = observer((props) => {
    const store = BookReadingStore.getInstance();

    const changeFontSize = (event, value: number) => {
        event.stopPropagation();
        store.setFontSize(value);
    };

    const changeReadingSpeed = (event, value: number) => {
        event.stopPropagation();
        store.setWordsPerMinute(value);
    };

    return (
        <div className={'controls-overlay controls-overlay__reading ' + (props.isVisibleReadingControls ? '' : 'hidden')} onClick={() => props.toggleReadingControls()}>
            <div className='top-controls'>
                <div></div>
                <div className='btn btn_25 btn_gray p-20' onClick={() => props.onClickPauseButton()}>
                    <PauseCircleOutlined />
                </div>
            </div>
            <div className='center-controls center-controls_w-100'>
                <div className={'font-size-controls p-20'}>
                    <div className='btn btn_20 btn_gray' onClick={(event) => changeFontSize(event, store.fontSize + 1)}>
                        <PlusOutlined />
                    </div>
                    <div className={'settings-value'}>
                        {store.fontSize}
                    </div>
                    <div className='btn btn_20 btn_gray' onClick={(event) => changeFontSize(event, store.fontSize - 1)}>
                        <MinusOutlined />
                    </div>
                </div>
                <div className={'text-speed-controls p-20'}>
                    <div className='btn btn_20 btn_gray' onClick={(event) => changeReadingSpeed(event, store.wordsPerMinute + 5)}>
                        <PlusOutlined />
                    </div>
                    <div className={'settings-value'}>
                        {store.wordsPerMinute}
                    </div>
                    <div className='btn btn_20 btn_gray' onClick={(event) => changeReadingSpeed(event, store.wordsPerMinute - 5)}>
                        <MinusOutlined />
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ReadingOverlay;