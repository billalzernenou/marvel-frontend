import axios from "axios";
import { useState, useEffect } from "react";
import OnLoading from "../components/OnLoading";
import { Link } from "react-router-dom";
import Character from "../components/Character";
import Cookies from "js-cookie";

const Characters = ({ userIdToken }) => {
  //states
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteCharacters, setfavoriteCharacters] = useState([]);
  Cookies.set("favoriteCharacters", favoriteCharacters, { expires: 7 });
  // get characters from server
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/characters");
      if (response.data) {
        setData(response.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  // add Character to favorites cookies
  const addToFavotites = async (item) => {
    // let newFavoriteCharacters = [...favoriteCharacters];
    // newFavoriteCharacters.push(item);
    // setfavoriteCharacters(newFavoriteCharacters);
    // const favoritesStringified = JSON.stringify(newFavoriteCharacters);
    // Cookies.set("favoriteCharacters", favoritesStringified, { expires: 7 });
    try {
      const response = await axios.post(
        "https://the-marvel.herokuapp.com/character/add",
        {
          name: item.name,
          description: item.description,
          path: item.thumbnail.path,
          extension: item.thumbnail.extension,
          // comics: item.comics,
          user: userIdToken,
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return isLoading ? (
    <OnLoading />
  ) : (
    <div className="characters container">
      {data.map((item, index) => {
        return (
          <div className="character">
            <Link to={`character/${item._id}`}>
              <Character key={item._id} CharacterItem={item} />
            </Link>
            <button
              onClick={() => {
                addToFavotites(item);
              }}
            >
              Ajouter aux favoris
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Characters;
