import { useDispatch, useSelector } from "react-redux";
import {
  orderDrivers,
  filterDbApi,
  filterByTeam,
} from "../../redux/actions";
import style from "./FilterButtons.module.css";

const FilterButtons = () => {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams);

  const handleOrderChange = (value) => {
    if (value === "nameAsc" || value === "nameDesc" || value === "dobAsc" || value === "dobDesc") {
      dispatch(orderDrivers(value));
    }
 console.log(handleOrderChange);
  };
  

  const handleFilterSourceChange = (value) => {
    if (value === "All Drivers" || value === "API" || value === "BD") {
      dispatch(filterDbApi(value));
    }
    console.log(handleFilterSourceChange);
  };
  

  const handleFilterByTeam = (value) => {
    dispatch(filterByTeam(value));
  console.log(handleFilterByTeam);
  };
  

  return (
    <div className={`${style.container} ${style.navbarFilter}`}>
      <select
        onChange={(e) => handleOrderChange(e.target.value)}
        className={`${style.button} ${style.black}`}
      >
        <option value="nameAsc">Driver A-Z</option>
        <option value="nameDesc">Driver Z-A</option>
        <option value="dobAsc">Birthday Asc</option>
        <option value="dobDesc">Birthday Desc</option>
      </select>
      <select
        onChange={(e) => handleFilterSourceChange(e.target.value)}
        className={`${style.button} ${style.gray}`}
      >
        <option value="All Drivers">All Drivers</option>
        <option value="API">API</option>
        <option value="BD">DB</option>
      </select>
      <select
        onChange={(e) => handleFilterByTeam(e.target.value)}
        className={`${style.teamOption} ${style.option}`}
      >
        <option value="All Teams">All Teams</option>
        {teams?.map((team) => (
          <option key={team.id} value={team.teamname}>
            {team.teamname}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterButtons;
