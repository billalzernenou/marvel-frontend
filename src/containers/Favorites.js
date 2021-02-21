import axios from "axios";
import { useState, useEffect } from "react";
import OnLoading from "../components/OnLoading";
import { Link } from "react-router-dom";
import Character from "../components/Character";
import Cookies from "js-cookie";

const Favorites = ({ userIdToken }) => {
  //states
  // const [favoriteCharacters, setfavoriteCharacters] = useState(
  //   JSON.parse(Cookies.get("favoriteCharacters"))
  // );
  const [isLoading, setIsLoading] = useState(false);

  const [favoriteChartacters, setFavoriteCharacters] = useState([]);
  //   Cookies.set("favoriteCharacters", { favoriteChartacters }, { expires: 7 });

  // get favorite characters from api
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://the-marvel.herokuapp.com/characters/favorites?user=${userIdToken}`
      );
      if (response.data) {
        setFavoriteCharacters(response.data);
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
    <div className="characters container">
      {favoriteChartacters.map((item, index) => {
        return (
          <div className="character">
            <Link to={`character/${item._id}`}>
              <Character key={item._id} CharacterItem={item} />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Favorites;
