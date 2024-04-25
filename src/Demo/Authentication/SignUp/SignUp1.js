import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import './../../../assets/scss/style.scss';
import Aux from '../../../hoc/_Aux';
import Breadcrumb from '../../../App/layout/AdminLayout/Breadcrumb';

import { signUp } from '../../../store/services/auth';
import { signUpSuccess } from '../../../store/actions/auth';

const ERRMSG = '*All fields are mandatory. Also, make sure password matches!';
const ROLE_ENUM = { USER: 'USER', COLLABORATOR: 'COLLABORATOR' };

const SignUp1 = () => {
  const [errText, setErrText] = useState();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: ROLE_ENUM.USER,
  });

  const setErrorText = () => {
    setErrText(ERRMSG);
    setTimeout(() => {
      setErrText('');
    }, 4500);
  };

  const [enable, setEnable] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const validateForm = () => {
    if (formData.name && formData.email && formData.password && enable)
      return true;
    else {
      setErrorText();
      return false;
    }
  };

  const handleSignUp = async () => {
    try {
      setEnable(false);
      const res = await signUp(formData);
      console.log(res);
      if (res && res.data && res.data.payload && !res.data.payload.success)
        enqueueSnackbar(res.data.payload.message, {
          variant: 'error',
        });

      // if (res && res.data && res.data.payload && res.data.payload.success) {
      //   const token = res.data.payload.token;
      //   await dispatch(loginSuccess(jwtDecode(token.split('Bearer: ')[1])));
      //   localStorage.setItem('token', token);
      //   history.push(Properties.defaultPath);
      // }
    } catch (err) {
      console.error('Login failed', err);
      enqueueSnackbar(err.message || err.statusText, {
        variant: 'error',
      });
    } finally {
      setEnable(true);
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
                <i className="feather icon-user-plus auth-icon" />
              </div>
              <h3 className="mb-4">Sign up</h3>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="input-group mb-4">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => {
                    if (!(e.target.value && e.target.value.trim()) && enable)
                      setEnable(false);
                    setFormData({ ...formData, password: e.target.value });
                  }}
                />
              </div>
              <div className="input-group mb-4">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  onChange={(e) => {
                    if (e.target.value == formData.password) {
                      setEnable(true);
                    } else if (enable) {
                      setEnable(false);
                    }
                  }}
                />
              </div>
              <div className="form-group text-left">
                <div className="checkbox checkbox-fill d-inline">
                  <input
                    type="checkbox"
                    name="checkbox-fill-1"
                    id="checkbox-fill-a1"
                    onClick={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          role: ROLE_ENUM.COLLABORATOR,
                        });
                      } else {
                        setFormData({ ...formData, role: ROLE_ENUM.USER });
                      }
                    }}
                  />
                  <label htmlFor="checkbox-fill-a1" className="cr">
                    {' '}
                    I want to be a 'Contributor'{' '}
                    <b style={{ color: 'blue' }}>?</b>
                  </label>
                </div>
              </div>
              <p className="mb-0 text" style={{ color: 'red' }}>
                {errText}
              </p>
              <button
                className="btn btn-primary shadow-2 mb-4"
                onClick={() => {
                  if (validateForm()) handleSignUp();
                }}
                disabled={!enable}
              >
                Sign up
              </button>
              <p className="mb-0 text-muted">
                Already have an account?{' '}
                <NavLink to="/auth/signin">Login</NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
};

export default SignUp1;
