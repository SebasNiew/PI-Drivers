import { useEffect, useState } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { getTeams } from "../../redux/actions"; // Asegúrate de importar la acción adecuada
import axios from "axios";
import style from "./Form.module.css";

const Form = () => {
  const dispatch = useDispatch();
  const allTeams = useSelector((state) => state.teams);
  const [teamInput, setTeamInput] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (allTeams.length === 0) {
      dispatch(getTeams());
    }
  }, [dispatch, allTeams.length]);

  const [form, setForm] = useState({
    name: "",
    lastname: "",
    description: "",
    image: "",
    nationality: "",
    birthday: "",
    teams: "", // Deja teams como una cadena de texto
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const teamsArray = teamInput.split(",").map((team) => team.trim());

    axios
      .post("http://localhost:3001/drivers", {
        ...form,
        teams: teamsArray.join(", "), // Convierte el arreglo en una cadena
      })
      .then(() => {
        setSuccessMessage("New Driver created successfully");
        setErrorMessage("");
        setForm({
          name: "",
          lastname: "",
          description: "",
          image: "",
          nationality: "",
          birthday: "",
          teams: "",
        });
        setTeamInput(""); // Limpia el campo de entrada de equipos
      })
      .catch(() => {
        setErrorMessage("Error: Driver could not be created");
        setSuccessMessage("");
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <div className={style.fatherContainer}>
      <div>
        <h2 className={style.title}>Create New Driver</h2>
      </div>
      <div className={style.container}>
        <div className={style.sidebar}>
          <img
            src="https://acortar.link/b7ujvc"
            alt="Create Driver Logo"
            className={style.logo}
          />
        </div>
        <div className={style.formContainer}>
          <form onSubmit={handleSubmit}>
            <div className={style.formGroup}>
              <div className={style.formLabel}>
                <label>Name: </label>
              </div>
              <input
                type="text"
                name="name"
                onChange={handleInputChange}
                value={form.name}
              />
            </div>

            <div className={style.formGroup}>
              <div className={style.formLabel}>
                <label>Lastname: </label>
              </div>
              <input
                type="text"
                name="lastname"
                onChange={handleInputChange}
                value={form.lastname}
              />
            </div>
            <div className={style.formGroup}>
              <div className={style.formLabel}>
                <label>Image URL: </label>
              </div>
              <input
                type="text"
                name="image"
                onChange={handleInputChange}
                value={form.image}
              />
            </div>
            <div className={style.formGroup}>
              <div className={style.formLabel}>
                <label>Nationality: </label>
              </div>
              <input
                type="text"
                name="nationality"
                onChange={handleInputChange}
                value={form.nationality}
              />
            </div>
            <div className={style.formGroup}>
              <div className={style.formLabel}>
                <label>Date of Birth: </label>
              </div>
              <input
                type="date"
                name="birthday"
                onChange={handleInputChange}
                value={form.birthday}
              />
            </div>
            <div className={style.formGroup}>
              <div className={style.formLabel}>
                <label>Description: </label>
              </div>
              <textarea
                type="text"
                name="description"
                onChange={handleInputChange}
                value={form.description}
              />
            </div>
            <div className={style.formGroup}>
              <div className={style.formLabel}>
                <label>Teams : </label>
              </div>
              <input
                type="text"
                onChange={(e) => setTeamInput(e.target.value)}
                value={teamInput}
              />
            </div>
            <button
              type="submit"
              className={style.button}
            >
              Create New Driver
            </button>
          </form>
        </div>
      </div>
      {successMessage && (
        <div className={style.alertSuccess}>{successMessage}</div>
      )}
      {errorMessage && <div className={style.alertError}>{errorMessage}</div>}
    </div>
  );
};

export default Form;
