import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { useLocation } from 'react-router-dom'; // Agrega useLocation

const NavBar = () => {
  const location = useLocation(); // Agrega useLocation
  return (
    <div className={style.box}>
      <Link to="/home">HOME</Link>
      {location.pathname !== '/form' && location.pathname.indexOf('/detail') === -1 && <SearchBar />}
      <Link to="/create">FORM</Link>
    </div>
    
  );
};

export default NavBar;