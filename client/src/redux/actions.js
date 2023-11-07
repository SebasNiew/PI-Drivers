import axios from "axios";
import {
  GET_ALL_DRIVERS,
  GET_DRIVER_BY_NAME,
  GET_DRIVER_BY_ID,
  GET_ALL_TEAMS,
  ORDER_DRIVERS,
  ORDER_DRIVERS_BY_DOB,
  FILTER_BY_TEAM,
  FILTER_BY_API_OR_DB,
  SET_CURRENT_PAGE,
} from "./actionsTypes";

const BASE_URL = "http://localhost:3001/drivers"; // Define la URL base una vez
export const getAllDrivers = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    dispatch({
      type: GET_ALL_DRIVERS,
      payload: response.data,
    });
  } catch (error) {
    // Maneja errores aquí
    console.error("Error fetching all drivers", error);
  }
};

export const getDriverByName = (name) => {
  return async (dispatch) => {
    console.log(name);
    try {
      const response = await axios.get(
        `http://localhost:3001/drivers/?name=${name}`
      );
      dispatch({
        type: GET_DRIVER_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      // Maneja errores aquí
      console.error("Error fetching driver by name", error);
    }
  };
};

export const getDriversById = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios(`${BASE_URL}/${id}`);

      // Verificar si la respuesta tiene datos
      if (response.data) {
        dispatch({
          type: GET_DRIVER_BY_ID,
          payload: response.data,
        });
      }
    } catch (error) {
      throw Error;
    }
  };
};

export const getTeams = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:3001/teams");
    const teams = response.data; // Asume que los equipos están en un array
    dispatch({
      type: GET_ALL_TEAMS,
      payload: teams,
    });
  } catch (error) {
    console.error("Error fetching teams", error);
  }
};

export const orderDrivers = (value) => {
  let validValues = ["nameAsc", "nameDesc", "dobAsc", "dobDesc"];

  if (validValues.includes(value)) {
    return {
      type: ORDER_DRIVERS,
      payload: value,
    };
  } else {
    throw Error;
  }
};

export const filterDbApi = (source) => {
  return {
    type: FILTER_BY_API_OR_DB,
    payload: source,
  };
};

export const orderByDOB = (order) => {
  //Este codigo ordena los drivers segu su fecha de nacimento, birthday
  return {
    type: ORDER_DRIVERS_BY_DOB,
    payload: order,
  };
};

export const filterByTeam = (drivers) => {
  return {
    type: FILTER_BY_TEAM,
    payload: drivers,
  };
};

export const pagination = (value) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: value,
  };
};

// En la acción orderDrivers, asegúrate de que los valores action.payload sean "nameAsc", "nameDesc", "dobAsc", o "dobDesc" para que la lógica de ordenamiento funcione correctamente.

// En la acción filterDbApi, verifica que estás pasando el origen (API o BD) adecuadamente como action.payload.source. Asegúrate de que los valores coincidan con la lógica de filtrado en el reducer.

//--------Actualiza un conductor--------
// export const updateDriver = (id, updatedDriver) => {
//   return async function (dispatch) {
//     const apiData = await axios.put(`http://localhost:5000/drivers/${id}`, updatedDriver);
//     const driver = apiData.data;
//     dispatch({ type: "UPDATE_DRIVER", payload: driver });
//   };
// };

//------Elimina un conductor------
// export const deleteDriver = (id) => {
//   return async function (dispatch) {
//     await axios.delete(`http://localhost:5000/drivers/${id}`);
//     // Puedes dispatch una acción para indicar que el conductor fue eliminado con éxito
//     dispatch({ type: "DELETE_DRIVER", payload: id });
//   };
// };
