import React, { Dispatch, FC, useState, useEffect } from "react";
import { User } from "../models/user";
import Header from "./Header";
import { Navigate } from "react-router-dom";
import Nav from "./Nav";
import { connect } from "react-redux";
import { setUser } from "../redux/actions/setUserAction";
import axios from "axios";

interface LayoutProps {
  children: React.ReactNode;
  setUserDispatch: (user: User) => void;
}

const Layout: FC<LayoutProps> = ({ children, setUserDispatch }) => {
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

  return (
    <div>
      <Nav />
      <main role="main">
        <Header />
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
