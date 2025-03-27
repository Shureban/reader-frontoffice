import './styles.less';
import React, {useState} from "react";
import {observer} from "mobx-react";
import BookReadingStore from "domains/cabinet/pages/book-reading/store";
import {CabinetRoutes} from "routes/cabinet";
import {useNavigate} from "react-router-dom";
import PausedOverlay from "domains/cabinet/pages/book-reading/controls-overlay/overlays/paused";
import ReadingOverlay from "domains/cabinet/pages/book-reading/controls-overlay/overlays/reading";
import EmptyOverlay from "domains/cabinet/pages/book-reading/controls-overlay/overlays/empty";

const ThreeSeconds = 5000;

const Controls: React.FC = observer(() => {
    const store                                                       = BookReadingStore.getInstance();
    const navigate                                                    = useNavigate();
    const [isVisiblePausedControls, setIsVisiblePausedControls]       = useState<boolean>(true);
    const [isVisibleReadingControls, setIsVisibleReadingControls]     = useState<boolean>(false);
    const [timerHidingReadingControls, setTimerHidingReadingControls] = useState<number>(null);

    const onClickCloseButton = () => navigate(CabinetRoutes.bookPreview(
        store.getBookProgress().book.author.url_slug,
        store.getBookProgress().book.url_slug
    ));

    const onClickPlayButton = () => Promise.resolve()
        .then(() => setIsVisiblePausedControls(false))
        .then(() => toggleReadingControls())
        .then(() => store.setIsPlaying(true))
        .then(() => store.setIsOverlayVisible(false));

    const onClickPauseButton = () => Promise.resolve()
        .then(() => setIsVisiblePausedControls(true))
        .then(() => setIsVisibleReadingControls(false))
        .then(() => store.setIsPlaying(false))
        .then(() => store.setIsOverlayVisible(true));

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

    return (
        <div className='controls-overlay'>
            <PausedOverlay
                isVisiblePausedControls={isVisiblePausedControls}
                onClickCloseButton={onClickCloseButton}
                onClickPlayButton={onClickPlayButton}
            />

            <ReadingOverlay
                isVisibleReadingControls={isVisibleReadingControls}
                toggleReadingControls={toggleReadingControls}
                onClickPauseButton={onClickPauseButton}
            />

            <EmptyOverlay
                toggleReadingControls={toggleReadingControls}
            />
        </div>
    );
});

export default Controls;