import React, { Dispatch, FC } from "react";
import { User } from "../models/user";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

interface NavProps {
  user: User;
}

const Nav: FC<NavProps> = ({ user }) => {
  const handleLogout = async () => {
    await axios.post("logout");
  };

  let menu;
  if (user.id) {
    menu = (
      <div className="col-md-3 text-end">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Link
            onClick={handleLogout}
            className="btn btn-outline-primary me-2"
            to={"/login"}
          >
            Logout
          </Link>
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
            <a href="#" className="nav-link px-2 link-secondary">
              Frontend
            </a>
          </li>
          <li>
            <a href="#" className="nav-link px-2 link-dark">
              Backend
            </a>
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

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
