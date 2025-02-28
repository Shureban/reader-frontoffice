import './styles.less';
import React from "react";

interface IProps {
    fontSize: number;
    wordsPerMinute: number;
    isPlaying: boolean;
    sentence: string;
    onSentenceEnd: () => void;
}

const Reader: React.FC<IProps> = (props) => {
    const [currentWordIndex, setCurrentWordIndex] = React.useState(0);

    React.useEffect(() => {
        if (!props.isPlaying) {
            return;
        }

        const words    = props.sentence.split(' ');
        const interval = setInterval(() => {
            setCurrentWordIndex((prevIndex) => {
                if (prevIndex + 1 >= words.length) {
                    props.onSentenceEnd();
                    return 0;
                }
                return prevIndex + 1;
            });
        }, 60000 / props.wordsPerMinute);

        return () => clearInterval(interval);
    }, [props.isPlaying, props.sentence]);

    return (
        <div className={'reader'}>
            <div className={'reader__content'}>
                {props.sentence.split(' ').map((word, index) => {
                    return index <= currentWordIndex
                        ? <span key={index}>{word}&nbsp;</span>
                        : <span key={index} style={{color: 'grey'}}>{word}&nbsp;</span>;
                })}
            </div>
        </div>
    );
};

export default Reader;