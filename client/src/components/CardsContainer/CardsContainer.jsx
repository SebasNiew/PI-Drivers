import { useSelector, useDispatch } from "react-redux";
import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import { orderDrivers } from "../../redux/actions";

const CardsContainer = ({ currentPage, itemsPerPage }) => {
  const allDrivers = useSelector((state) => state.allDrivers);
  const searchedDriver = useSelector((state) => state.searchedDriver);
  const filters = useSelector((state) => state.filters);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const dispatch = useDispatch();

  // Agregamos una variable para determinar qué conductores se deben renderizar
  const driversToRender = Array.isArray(searchedDriver) && searchedDriver.length > 0 ? searchedDriver : allDrivers;

  // Aplicamos la lógica de filtros y ordenamiento a los conductores a renderizar
  let filteredDrivers = driversToRender.filter((driver) => {
    if (filters && filters.source) {
      return driver.source === filters.source;
    }
    return true; // Si no hay filtro de origen, se muestran todos
  });
 
  if (filters && filters.team) {
    filteredDrivers = filteredDrivers.filter((driver) => driver.teams.includes(filters.team));
  }

  if (filters && filters.order) {
    dispatch(orderDrivers(filters.order));
  }
 
  return (
    <div className={style.container}>
      {filteredDrivers.slice(startIndex, endIndex).map((driver) => (
        <Card
          key={driver.driverId}
          driverId={driver.driverId}
          firstName={driver.firstName}
          lastName={driver.lastName}
          image={driver.image}
          birthdate={driver.birthdate}
          teams={driver.teams ? driver.teams : []}
        />
      ))}
    </div>
  );
}; console.log(CardsContainer);
export default CardsContainer;
