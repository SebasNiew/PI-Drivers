import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import { orderDrivers } from "../../redux/actions";

const CardsContainer = ({ currentPage, itemsPerPage }) => {
  const allDrivers = useSelector((state) => state.allDrivers);
  const searchedDriver = useSelector((state) => state.searchedDriver);
  console.log(searchedDriver);
  const filters = useSelector((state) => state.filters);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const dispatch = useDispatch();
  const filteredDriversRef = useRef([]);

  useEffect(() => {
    const applyOrder = (orderType) => {
      dispatch(orderDrivers(orderType));
    };

    if (filters && filters.source) {
      // Aplicar filtro por origen (API o DB)
      const filteredDriversBySource = allDrivers.filter(
        (driver) => driver.source === filters.source
      );
      filteredDriversRef.current = filters.team
        ? filteredDriversBySource.filter((driver) =>
            driver.teams.includes(filters.team)
          )
        : filteredDriversBySource;
    } else {
      if (filters && filters.team) {
        filteredDriversRef.current = allDrivers.filter((driver) => driver.teams.includes(filters.team));
      } else {
        filteredDriversRef.current = allDrivers;
      }
    }

    if (filters && filters.order) {
      applyOrder(filters.order);
    }
  }, [filters, allDrivers, dispatch]);

  return (
    <div className={style.container}>
      {searchedDriver ? (
        <Card
          key={searchedDriver.driverId}
          driverId={searchedDriver.driverId}
          firstName={searchedDriver.firstName}
          lastName={searchedDriver.lastName}
          image={searchedDriver.image}
          birthdate={searchedDriver.birthdate}
          teams={searchedDriver.teams}
        />
      ) : (
        filteredDriversRef.current
          .slice(startIndex, endIndex)
          .map((driver) => (
            <Card
              key={driver.driverId}
              driverId={driver.driverId}
              firstName={driver.firstName}
              lastName={driver.lastName}
              image={driver.image}
              birthdate={driver.birthdate}
              teams={driver.teams ? driver.teams : []}
            />
          ))
      )}
    </div>
  );
};

export default CardsContainer;
