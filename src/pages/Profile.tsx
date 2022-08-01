import React, {
  SyntheticEvent,
  useState,
  useEffect,
  Dispatch,
  FC,
} from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { User } from "../models/user";
import { connect } from "react-redux";
import { setUser } from "../redux/actions/setUserAction";

interface infoFormProps {
  firstName: string;
  lastName: string;
  email: string;
}

interface pwdFormProps {
  password: string;
  passwordConfirm: string;
}

interface ProfileProps {
  user: User;
  setUserDispatch: (user: User) => void;
}

const Profile: FC<ProfileProps> = ({
  user,
  setUserDispatch,
}: {
  user: User;
  setUserDispatch: (user: User) => void;
}) => {
  const [infoForm, setInfoForm] = useState<infoFormProps>({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [pwdForm, setPwdForm] = useState<pwdFormProps>({
    password: "",
    passwordConfirm: "",
  });

  useEffect(() => {
    if (user) {
      setInfoForm({
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
      });
    }
  }, [user]);

  const handleInfoFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfoForm({
      ...infoForm,
      [e.target.name]: e.target.value,
    });
  };

  const handlePwdFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwdForm({
      ...pwdForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitInfoForm = async (e: SyntheticEvent) => {
    e.preventDefault();
    const response = await axios.put("users/info", {
      first_name: infoForm.firstName,
      last_name: infoForm.lastName,
      email: infoForm.email,
    });
    const data = response.data;
    setUserDispatch(data);
  };

  const handleSubmitPwdForm = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.put("users/password", {
      password: pwdForm.password,
      password_confirm: pwdForm.passwordConfirm,
    });
    setPwdForm({
      password: "",
      passwordConfirm: "",
    });
  };

  return (
    <Layout>
      <h3>Account Information</h3>
      <form onSubmit={handleSubmitInfoForm}>
        <div className="mb-3">
          <label>First Name</label>
          <input
            className="form-control"
            name="firstName"
            value={infoForm.firstName}
            onChange={handleInfoFormChange}
          />
        </div>
        <div className="mb-3">
          <label>Last Name</label>
          <input
            className="form-control"
            name="lastName"
            value={infoForm.lastName}
            onChange={handleInfoFormChange}
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            className="form-control"
            name="email"
            value={infoForm.email}
            onChange={handleInfoFormChange}
          />
        </div>
        <button
          className="btn btn-outline-secondary"
          color="primary"
          type="submit"
        >
          Submit
        </button>
      </form>

      <h3 className="mt-4">Change Password</h3>
      <form onSubmit={handleSubmitPwdForm}>
        <div className="mb-3">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            value={pwdForm.password}
            onChange={handlePwdFormChange}
          />
        </div>
        <div className="mb-3">
          <label>Password Confirm</label>
          <input
            className="form-control"
            type="password"
            name="passwordConfirm"
            value={pwdForm.passwordConfirm}
            onChange={handlePwdFormChange}
          />
        </div>
        <button
          className="btn btn-outline-secondary"
          color="primary"
          type="submit"
        >
          Submit
        </button>
      </form>
    </Layout>
  );
};

const mapStateToProps = (state: { user: User }) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setUserDispatch: (user: User) => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
