import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CharacterComic from "../components/CharacterComic";

const CharacterComics = () => {
  let { characterId } = useParams();
  const [data, setData] = useState();
  const [onLoading, setOnLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://the-marvel.herokuapp.com/comics/${characterId}`
        );
        setData(response.data);
        console.log(response.data);
        setOnLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [characterId]);

  return onLoading ? (
    <p>dsjfnqmsdjfn</p>
  ) : (
    <div>
      {data.comics.map((item, index) => {
        return <CharacterComic key={item._id} itemCharacterComics={item} />;
      })}
    </div>
  );
};

export default CharacterComics;
