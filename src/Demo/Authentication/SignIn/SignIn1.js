import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { jwtDecode } from 'jwt-decode';

import './../../../assets/scss/style.scss';
import Aux from '../../../hoc/_Aux';
import Breadcrumb from '../../../App/layout/AdminLayout/Breadcrumb';
import { login } from '../../../store/services/auth';
import { loginSuccess } from '../../../store/actions/auth';
import Properties from '../../../properties';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disable, setDisable] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleEmailChange = (e) => {
    const trimVal = e.target.value ? e.target.value.trim() : e.target.value;
    setEmail(trimVal);
  };

  const handlePasswordChange = (e) => {
    const trimVal = e.target.value ? e.target.value.trim() : e.target.value;
    setPassword(trimVal);
  };

  const handleLogin = async () => {
    try {
      setDisable(true);
      console.log(email, password);
      const res = await login({ email, password });
      console.log(res);
      if (
        res &&
        res.data &&
        res.data.payload &&
        (res.data.payload.success == false || res.data.payload.error)
      )
        enqueueSnackbar(res.data.payload.message, {
          variant: 'error',
        });

      if (res && res.data && res.data.payload && res.data.payload.success) {
        const token = res.data.payload.token;
        await dispatch(loginSuccess(jwtDecode(token.split('Bearer ')[1])));
        localStorage.setItem('token', token);
        history.push(Properties.defaultPath);
      }
    } catch (error) {
      console.error('Login failed', error);
      enqueueSnackbar(error.message);
    } finally {
      setDisable(false);
    }
  };

  return (
    <Aux>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-4">
                <i className="feather icon-unlock auth-icon" />
              </div>
              <h3 className="mb-4">Login</h3>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="input-group mb-4">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="form-group text-left">
                <div className="checkbox checkbox-fill d-inline">
                  <input
                    type="checkbox"
                    name="checkbox-fill-1"
                    id="checkbox-fill-a1"
                  />
                  <label htmlFor="checkbox-fill-a1" className="cr">
                    {' '}
                    Save credentials
                  </label>
                </div>
              </div>
              <button
                className="btn btn-primary shadow-2 mb-4"
                onClick={handleLogin}
                disabled={disable}
              >
                Login
              </button>
              <p className="mb-2 text-muted">
                Forgot password?{' '}
                <NavLink to="/auth/reset-password-1">Reset</NavLink>
              </p>
              <p className="mb-0 text-muted">
                Don’t have an account?{' '}
                <NavLink to="/auth/signup">Signup</NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
};

export default SignIn;
