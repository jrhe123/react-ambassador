import React, { SyntheticEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

interface formProps {
  email: string;
  password: string;
}

function Login() {
  const [form, setForm] = useState<formProps>({
    email: "",
    password: "",
  });
  const [redirect, setRedirect] = useState<boolean>(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("login", {
        email: form.email.trim(),
        password: form.password,
      });
      if (response) {
        setRedirect(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (redirect) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <form className="form-signin" onSubmit={handleFormSubmit}>
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label className="sr-only">Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Email address"
          name="email"
          required
          value={form.email}
          onChange={handleFormChange}
        />
        <label className="sr-only">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          name="password"
          required
          value={form.password}
          onChange={handleFormChange}
        />

        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
}

export default Login;
