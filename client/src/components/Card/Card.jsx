
import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  const { driverId, firstName, lastName, image, birthdate, teams } = props;
  const defaultImg = 'https://i.pinimg.com/originals/95/4f/0f/954f0f8659e2a14db66d50ec4d33df29.jpg';

  return (
    <div className={style.Card}>
      <div className={style.nameContainer}>
        <p>
          <Link to={`/detail/${driverId}`}>{firstName}</Link>
        </p>
        <p>
          <Link to={`/detail/${driverId}`}>{lastName}</Link>
        </p>
      </div>
      <img src={image || defaultImg} alt={`${firstName} ${lastName}`} className={style.image} />
      <p>{birthdate}</p>
      <p>{teams}</p>
    </div>
  );
};

export default Card;
