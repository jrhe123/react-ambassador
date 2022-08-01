import React, { SyntheticEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

interface formProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

function Register() {
  const [form, setForm] = useState<formProps>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
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
      const response = await axios.post("register", {
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        email: form.email.trim(),
        password: form.password,
        password_confirm: form.passwordConfirm,
      });
      if (response) {
        setRedirect(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (redirect) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <form className="form-signin" onSubmit={handleFormSubmit}>
        <h1 className="h3 mb-3 font-weight-normal">Please register</h1>

        <label className="sr-only">First name</label>
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          name="firstName"
          required
          value={form.firstName}
          onChange={handleFormChange}
        />

        <label className="sr-only">Last name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Last name"
          name="lastName"
          required
          value={form.lastName}
          onChange={handleFormChange}
        />

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

        <label className="sr-only">Password confirm</label>
        <input
          type="password"
          className="form-control"
          placeholder="Password confirm"
          name="passwordConfirm"
          required
          value={form.passwordConfirm}
          onChange={handleFormChange}
        />

        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
