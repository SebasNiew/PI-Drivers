import style from "./DetailDrivers.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getDriversById } from "../../redux/actions";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDriversById(`${id}`));
  }, [dispatch, id]);

  const driver = useSelector((state) => state.driverDetail);

  console.log(driver);
  return (
    <div className={style.container}>
      <h2 className={style.title}>Drivers Detail</h2>
      <div className={style.detail}>
        <div className={style.leftColumn}>
          <div className={style.specialFont}>
            <h1>{`${driver.name} ${driver.lastname}`}</h1>
          </div>
          <div className={style.infoDriver}>
            <p
              className={style.negrita}
            >{`Nacionalidad: ${driver.nationality}`}</p>
            <p
              className={style.negrita}
            >{`DESCRIPCION: ${driver.description}`}</p>
            <p
              className={style.negrita}
            >{`Fecha de Nacimiento: ${driver.birthdate}`}</p>
            <p className={style.negrita}>{`Equipos: ${
              driver.teams || "N/A"
            }`}</p>
            <p className={style.negrita}>{`ID: ${driver.id || "N/A"}`}</p>
          </div>
        </div>
        <div className={style.rightColumn}>
          <img
            src={driver.image}
            alt={
              driver.name && driver.lastName
                ? `${driver.name} ${driver.lastname}`
                : "Imagen"
            }
            className={style.circularImage}
          />
        </div>
      </div>
    </div>
  );
}

export default Detail;
