import type {FC} from "react";

type PropsType = {
    strokeWidth: number;
    percentage: number;
}

export const Progress: FC<PropsType> = ({ strokeWidth, percentage }) => {
    const radius = (50 - strokeWidth / 2);
    const pathDescription = `
      M 50,50 m 0,-${radius}
      a ${radius},${radius} 0 1 1 0,${2 * radius}
      a ${radius},${radius} 0 1 1 0,-${2 * radius}
    `;

    const diameter = Math.PI * 2 * radius;
    const progressStyle: {[key: string]: string} = {
        stroke: '#D2D531',
        strokeLinecap: 'round',
        strokeDasharray: `${diameter}px ${diameter}px`,
        strokeDashoffset: `${((100 - percentage) / 100 * diameter)}px`,
    };

    return (
        <svg
            className={'CircularProgressbar inline-block rounded-4xl'}
            viewBox="0 0 100 100"
            width={70}
            height={70}
        >
            <path
                className="CircularProgressbar-trail"
                d={pathDescription}
                strokeWidth={strokeWidth}
                fillOpacity={0}
                style={{
                    stroke: '#423D0F',
                }}
            />

            <path
                className="CircularProgressbar-path"
                d={pathDescription}
                strokeWidth={strokeWidth}
                fillOpacity={0}
                style={progressStyle}
            />

            <text
                className="CircularProgressbar-text font-bold"
                x={50}
                y={50}
                style={{
                    fill: 'white',
                    fontSize: '24px',
                    dominantBaseline: 'central',
                    textAnchor: 'middle',
                }}
            >
                {`${percentage}%`}
            </text>
        </svg>
    );
};