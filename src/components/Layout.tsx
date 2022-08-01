import React, { Dispatch, FC, useState, useEffect } from "react";
import { User } from "../models/user";
import Header from "./Header";
import Nav from "./Nav";
import { connect } from "react-redux";
import { setUser } from "../redux/actions/setUserAction";
import axios from "axios";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
  setUserDispatch: (user: User) => void;
}

const Layout: FC<LayoutProps> = ({ children, setUserDispatch }) => {
  const location = useLocation();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("user");
        setUserDispatch(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  let header;
  if (location.pathname === "/" || location.pathname === "/backend") {
    header = <Header />;
  }

  return (
    <div>
      <Nav />
      <main role="main">
        {header}
        <div className="album py-5 bg-light">
          <div className="container">{children}</div>
        </div>
      </main>
    </div>
  );
};

const mapStateToProps = (state: { user: User }) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setUserDispatch: (user: User) => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
