import { getDriverByName } from "../../redux/actions"; // Asegúrate de importar la acción correcta.
import { useDispatch } from "react-redux";
import { useState } from "react";
import style from "./SearchBar.module.css";

export default function SearchBar() {
  const [driverName, setDriverName] = useState("");

  const onChangeHandler = (event) => {
    setDriverName(event.target.value);
  };

  const dispatch = useDispatch();

  const searchDrivers = () => {
    dispatch(getDriverByName(driverName));
    setDriverName("");
  };

  return (
    <div className={`${style.container} ${style.navbarSearch}`}>
      <input
        autoComplete="off"
        className={style.input}
        onChange={onChangeHandler}
        type="search"
        placeholder="Driver Name"
        name="name"
        value={driverName}
      />
      <button className={style.buttons} onClick={searchDrivers}>
        Search
      </button>
    </div>
  );
}
