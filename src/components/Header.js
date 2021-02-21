import { Link, useHistory } from "react-router-dom";
import Logo from "../assets/images/Marvel-comics-logo.png";

const Header = ({ userToken, setUser, setUserId }) => {
  const History = useHistory();
  const handleLogout = () => {
    setUser(null);
    setUserId(null);
    History.push("/login");
  };
  return (
    <div className="header container">
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="logo-marvel" />
        </Link>
      </div>
      <div className="header-nav">
        <div>
          <Link to="/characters">Personnage</Link>
        </div>
        <div>
          <Link to="/comics">Comics</Link>
        </div>
        <div>
          <Link to="/favorites">Favoris</Link>
        </div>
        {!userToken ? (
          <>
            <Link to="/login">
              <button>Se connecter</button>
            </Link>
            <Link to="/signup">
              <button>S'inscrire</button>
            </Link>
          </>
        ) : (
          <Link to="/">
            <button onClick={handleLogout}>Se déconnecter</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
