import './StarsRatingStyle.css'
import { StarRating } from 'react-flexible-star-rating';
import {useState} from "react";

export const StarsRatingComponent = ({rating, isReadOnly}: {rating: number, isReadOnly: boolean}) => {
    const [rate, setRate] = useState(0)
    return <StarRating starsLength={10} isReadOnly={isReadOnly} dimension={20} initialRating={rate}/>;
};

