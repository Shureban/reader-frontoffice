import './styles.less';
import React, {useEffect, useState} from "react";

interface IProps {
    width: number;
    height: number;
    thickness: number;
    startColor: string;
    endColor: string;
    defaultColor: string;
    value: number
}

const Progressbar: React.FC<IProps> = ({value, width, height, thickness, startColor, endColor, defaultColor}) => {
    const [progress, setProgress] = useState(0);
    const fromDeg                 = 180;
    const gradient                = `conic-gradient(from ${fromDeg}deg, #${startColor} 0%, #${endColor} ${progress}%, #${defaultColor} ${progress}% 100%)`;

    useEffect(() => {
        let increment       = value / 100;
        let currentProgress = 0;

        const interval = setInterval(() => {
            currentProgress += increment;
            if (currentProgress >= value) {
                currentProgress = value;
                clearInterval(interval);
            }
            setProgress(currentProgress);
        }, 10);

        return () => clearInterval(interval);
    }, [value]);


    return (
        <div
            className="circular-progress"
            style={{
                width: `${width}px`,
                height: `${height}px`,
                background: gradient,
            }}
        >
            <span
                className="progress-value"
                style={{
                    width: `${width - thickness}px`,
                    height: `${height - thickness}px`,
                }}
            >
                {value}
            </span>
        </div>
    );
}

export default Progressbar;