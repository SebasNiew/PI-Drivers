import { NavLink } from "react-router-dom";
import style from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={style.landingContainer}>
    
      <NavLink to="/home" className={style.navlink}>
        <button className={style.start}>S T A R T</button>
        <p className={style.paragraph}>Descubre la historia de leyendas de la F1</p>
      </NavLink>
    </div>
  );
};

export default Landing;