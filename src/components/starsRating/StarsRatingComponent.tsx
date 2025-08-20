import './StarsRatingStyle.css'
import { StarRating } from 'react-flexible-star-rating';
import type {FC} from "react";

type PropsType = {
    isReadOnly: boolean;
}

export const StarsRatingComponent: FC<PropsType> = ({isReadOnly}) => {
    return <StarRating starsLength={10} isReadOnly={isReadOnly} dimension={20} initialRating={0}/>;
};

