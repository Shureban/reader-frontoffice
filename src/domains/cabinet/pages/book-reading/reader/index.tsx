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
    const words                                   = props.sentence.split(' ');

    React.useEffect(() => {
        if (!props.isPlaying) {
            return;
        }

        const interval = setInterval(() => {
            setCurrentWordIndex((prev) => {
                if (prev + 1 >= words.length) {
                    props.onSentenceEnd();
                    return 0;
                }
                return prev + 1;
            });
        }, 10000);

        return () => clearInterval(interval);
    }, [props.isPlaying, words.length]);

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