import style from "./Footer.module.css"
import logosinfondo from "../../assets/logo-sin-fondo.png";
import ig from "../../assets/instagram.png";
import linkedin from "../../assets/linkedin.png";
import github from "../../assets/signo-de-github.png";

const Footer = () => {
  return (
    <div className={style.footerScrolled}>
    <div className={style.logoContainer}>
      <img src={logosinfondo} alt="" className={style.logo} />
    </div>
    <h3 className={style.text}>
      Ⓒ All rights reserved 
    </h3>
    <div className={style.contact}>
    <a href="https://www.instagram.com/sebas_niewolski/" target="_blank" rel="noreferrer">
        <img src={ig} alt="" className={style.icon} />
      </a>
      <a href="https://github.com/SebasNiew" target="_blank" rel="noreferrer">
        <img src={github} alt="" className={style.icon} />
      </a>
      <a href="https://www.linkedin.com/in/sebastian niewolski/" target="_blank" rel="noreferrer">
        <img src={linkedin} alt="" className={style.icon} />
      </a>
    </div>
  </div>
  );
};

export default Footer;