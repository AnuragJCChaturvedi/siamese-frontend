import React, { Component, Suspense } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { jwtDecode } from 'jwt-decode';

import '../../node_modules/font-awesome/scss/font-awesome.scss';

import Loader from './layout/Loader';
import Aux from '../hoc/_Aux';
import ScrollToTop from './layout/ScrollToTop';
import routes from '../route';
import { validateToken } from '../store/services/auth';
import { loginSuccess } from '../store/actions/auth';
import { setLoader, unsetLoader } from '../store/actions/common';

const AdminLayout = Loadable({
  loader: () => import('./layout/AdminLayout'),
  loading: Loader,
});

const RestrictedRoute = ({ component: Component, authUser, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authUser ? <Component {...props} /> : <Redirect to={'/auth/signin'} />
    }
  />
);

class App extends Component {
  async componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      // try {
      //   await validateToken();
      //   await this.props.unsetLoader();
      //   await this.props.updateUserDetails(
      //     jwtDecode(token.split('Bearer ')[1])
      //   );
      // } catch (err) {
      //   console.log('Error in validate token step', err);
      //   enqueueSnackbar('Invalid Token! Re-login', { variant: 'error' });
      // }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Perform side effects based on props or state changes
    console.log('Component has updated');
  }

  componentWillUnmount() {
    console.log('component unmounted');
  }

  render() {
    const menu = routes.map((route, index) => {
      return route.component ? (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          name={route.name}
          children={(props) => <route.component {...props} />}
        />
      ) : null;
    });

    return (
      <Aux>
        <ScrollToTop>
          <Suspense fallback={<Loader />}>
            <SnackbarProvider />
            <Switch>
              {menu}
              <RestrictedRoute
                path={`/`}
                // authUser={this.props.authUser}  // remember to change
                authUser={true}
                component={AdminLayout}
              />
            </Switch>
          </Suspense>
        </ScrollToTop>
      </Aux>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    validateToken: () => dispatch(validateToken),
    setLoader: () => dispatch(setLoader),
    unsetLoader: () => dispatch(unsetLoader),
    updateUserDetails: (token) => dispatch(loginSuccess(token)),
  };
};

const mapStateToProps = (state) => {
  return {
    authUser: state.auth.authUser,
    loader: state.common.loader,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
