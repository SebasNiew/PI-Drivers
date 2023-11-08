import {
  GET_ALL_DRIVERS,
  GET_DRIVER_BY_NAME,
  GET_DRIVER_BY_ID,
  GET_ALL_TEAMS,
  ORDER_DRIVERS,
  FILTER_BY_TEAM,
  FILTER_BY_API_OR_DB,
  SET_CURRENT_PAGE,
} from "./actionsTypes";

const initialState = {
  allDrivers: [],
  driverDetail: [],
  teams: [],
  order: [],
  driversFilter: [],
  ApiorDb: [],
  currentPage: 1,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_DRIVERS:
      return {
        ...state,
        allDrivers: action.payload,
        allDriversToFilter: action.payload,
      };

      case GET_DRIVER_BY_NAME:
        return {
          ...state,
          searchedDriver: action.payload, // Actualiza searchedDriver con los resultados de la búsqueda.
        };

    case GET_ALL_TEAMS:
      return {
        ...state,
        teams: action.payload,
      };

    case ORDER_DRIVERS:
      return orderDrivers(state, action);

    case GET_DRIVER_BY_ID:
      return {
        ...state,
        driverDetail: action.payload,
        currentPage: 1,
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case FILTER_BY_API_OR_DB:
      return filterDbApi(state, action);

    case FILTER_BY_TEAM:
      return filterByTeam(state, action);

    default:
      return state;
  }
}

function orderDrivers(state, action) {
  const { payload } = action;
  const allDrivers = [...state.allDrivers];
  const validValues = ["nameAsc", "nameDesc", "dobAsc", "dobDesc"];

  if (!validValues.includes(payload)) {
    // Devuelve el estado sin cambios si payload no es uno de los valores esperados.
    return state;
  }

  const sortedDrivers = [...allDrivers];
  if (payload === "nameAsc" || payload === "nameDesc") {
    sortedDrivers.sort((a, b) => {
      const nameA = a.name || "";
      const nameB = b.name || "";
      return payload === "nameAsc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
  } else if (payload === "dobAsc" || payload === "dobDesc") {
    sortedDrivers.sort((a, b) => {
      const dateA = new Date(a.dob || "");
      const dateB = new Date(b.dob || "");
      return payload === "dobAsc" ? dateA - dateB : dateB - dateA;
    });
  }

  return {
    ...state,
    allDrivers: sortedDrivers,
    order: payload,
  };
}

function filterDbApi(state, action) {
  const source = action.payload; // No es necesario action.payload.source
  let filteredDrivers = [...state.allDrivers];

  if (source === "API") {
    filteredDrivers = filteredDrivers.filter(
      (driver) => typeof driver.id === "number"
    );
  } else if (source === "BD") {
    filteredDrivers = filteredDrivers.filter(
      (driver) => typeof driver.id !== "number"
    );
  }
  return {
    ...state,
    driversFilter: filteredDrivers,
  };
}

function filterByTeam(state, action) {
  const { payload } = action;
  const teamToFilter = payload.team;
  const allDrivers = [...state.allDrivers];

  if (teamToFilter === "All Teams") {
    return {
      ...state,
      driversFilter: allDrivers,
    };
  }

  const filteredDrivers = allDrivers.filter((driver) => {
    if (Array.isArray(driver.teams)) {
      // Verifica si "teams" es una matriz
      return driver.teams.includes(teamToFilter);
    }
    return false; // Si "teams" no es una matriz, no se incluye en la filtración.
  });

  return {
    ...state,
    driversFilter: filteredDrivers,
  };
}

export default reducer;