const Comic = ({ comicItem }) => {
  return (
    <div className="comic">
      <div className="comic-image">
        <img
          src={`${comicItem.thumbnail.path}.${comicItem.thumbnail.extension}`}
          alt={comicItem.title}
        />
        <div />
        <div className="comic-details">
          <div>{comicItem.title}</div>
          <div>{comicItem.description}</div>
        </div>
      </div>
    </div>
  );
};

export default Comic;
