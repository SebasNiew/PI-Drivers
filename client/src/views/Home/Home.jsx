import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDrivers } from "../../redux/actions";
import FilterButtons from "../../components/FilterButtons/FilterButtons";
import Pagination from "../../components/Pagination/Paginado";
import "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDrivers());
  }, [dispatch]);
  const totalDrivers = useSelector((state) => state.allDrivers.length);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="home">
      <FilterButtons />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalDrivers / 9)}
        onPageChange={handlePageChange}
      />
      <CardsContainer currentPage={currentPage} itemsPerPage={9} />
    </div>
  );
};

export default Home;
