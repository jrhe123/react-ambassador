import React, { Dispatch, useState, FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { User } from "../models/user";
import { connect } from "react-redux";

interface formProps {
  title: string;
  description: string;
}

interface HeaderProps {
  user: User;
}

const Header: FC<HeaderProps> = ({ user }) => {
  const [form, setForm] = useState<formProps>({
    title: "Welcome",
    description: "Share links to earn money",
  });

  useEffect(() => {
    if (user.id) {
      setForm({
        title: `$${user.revenue}`,
        description: "You have earned this far",
      });
    } else {
      setForm({
        title: `Welcome`,
        description: "Share links to earn money",
      });
    }
  }, [user]);

  return (
    <section className="jumbotron text-center">
      <div className="container">
        <h1 className="jumbotron-heading">{form.title}</h1>
        <p className="lead text-muted">{form.description}</p>
        {!user.id && (
          <p>
            <Link to={"/login"} className="btn btn-primary my-2">
              Login
            </Link>
            <Link to={"/register"} className="btn btn-secondary my-2">
              Register
            </Link>
          </p>
        )}
      </div>
    </section>
  );
};
const mapStateToProps = (state: { user: User }) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
