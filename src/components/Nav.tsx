import React, { Dispatch, FC } from "react";
import { User } from "../models/user";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { setUser } from "../redux/actions/setUserAction";

interface NavProps {
  user: User;
  setUserDispatch: (user: User) => void;
}

const Nav: FC<NavProps> = ({ user, setUserDispatch }) => {
  const handleLogout = async () => {
    await axios.post("logout");
    setUserDispatch(new User());
  };

  let menu;
  if (user.id) {
    menu = (
      <div className="col-md-3 text-end">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Link to={"/stats"} className="btn me-2">
            Stats
          </Link>
          <Link to={"/rankings"} className="btn me-2">
            Rankings
          </Link>
          <a
            href="#"
            onClick={handleLogout}
            className="btn btn-outline-primary me-2"
          >
            Logout
          </a>
          <Link className="btn btn-primary" to={"/profile"}>
            {user.first_name} {user.last_name}
          </Link>
        </div>
      </div>
    );
  } else {
    menu = (
      <div className="col-md-3 text-end">
        <Link to={"/login"} className="btn btn-outline-primary me-2">
          Login
        </Link>
        <Link to={"/register"} className="btn btn-primary">
          Sign-up
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <NavLink
              to={"/"}
              className={(navData) =>
                navData.isActive
                  ? "nav-link px-2 link-secondary" + " link-dark"
                  : "nav-link px-2 link-secondary"
              }
            >
              Frontend
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/backend"}
              className={(navData) =>
                navData.isActive
                  ? "nav-link px-2 link-secondary" + " link-dark"
                  : "nav-link px-2 link-secondary"
              }
            >
              Backend
            </NavLink>
          </li>
        </ul>
        {menu}
      </header>
    </div>
  );
};

const mapStateToProps = (state: { user: User }) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setUserDispatch: (user: User) => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
