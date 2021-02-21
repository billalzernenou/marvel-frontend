import axios from "axios";
import { useState, useEffect } from "react";
import OnLoading from "../components/OnLoading";
import Comic from "../components/Comic";
const Comics = () => {
  //states
  const [comics, setComics] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // get Comics from server
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://the-marvel.herokuapp.com/comics?limit=100"
      );
      if (response.data) {
        setComics(response.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return isLoading ? (
    <OnLoading />
  ) : (
    <div className="comics">
      {comics.results.map((item, index) => {
        return <Comic key={item._id} comicItem={item} />;
      })}
    </div>
  );
};

export default Comics;
