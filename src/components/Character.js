const Character = ({ CharacterItem }) => {
  return (
    <>
      <div className="character-img">
        <img
          src={`${CharacterItem.thumbnail.path}.${CharacterItem.thumbnail.extension}`}
          alt="marvel-character"
        />
      </div>
      <div className="character-details">
        <div className="character-details-name"> {CharacterItem.name}</div>
        <div className="character-details-description">
          {CharacterItem.description &&
            CharacterItem.description.slice(0, 20) + "..."}
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Character;
