import React, { Component, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Fullscreen from 'react-full-screen';
import windowSize from 'react-window-size';

import Navigation from './Navigation';
import NavBar from './NavBar';
import Breadcrumb from './Breadcrumb';
import Loader from '../Loader';
import routes from '../../../routes';
import Aux from '../../../hoc/_Aux';
import * as actionTypes from '../../../store/actions';
import TLoader from '../Loader/TLoader';

import './app.scss';

import './index.css'

import ATM from './atm'


class AdminLayout extends Component {


constructor(props) {
  super(props);
  this.state = {
    screen: null
  }
  this.updateScreen = this.updateScreen.bind(this);

}

updateScreen(screen) {
  this.setState({ screen });
}

  fullScreenExitHandler = () => {
    if (
      !document.fullscreenElement &&
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      this.props.onFullScreenExit();
    }
  };

  componentWillMount() {
    if (
      this.props.windowWidth > 992 &&
      this.props.windowWidth <= 1024 &&
      this.props.layout !== 'horizontal'
    ) {
      this.props.onComponentWillMount();
    }
  }

  mobileOutClickHandler() {
    if (this.props.windowWidth < 992 && this.props.collapseMenu) {
      this.props.onComponentWillMount();
    }
  }

  render() {
    /* full screen exit call */
    document.addEventListener('fullscreenchange', this.fullScreenExitHandler);
    document.addEventListener(
      'webkitfullscreenchange',
      this.fullScreenExitHandler
    );
    document.addEventListener(
      'mozfullscreenchange',
      this.fullScreenExitHandler
    );
    document.addEventListener('MSFullscreenChange', this.fullScreenExitHandler);

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
        <Fullscreen enabled={this.props.isFullScreen}>
          {/* {this.props.loader && <TLoader />}
          <Navigation />
          <NavBar /> */}
          <div
            className="pcoded-main-container"
            onClick={() => this.mobileOutClickHandler}
          >
            {/* <div className="pcoded-wrapper">
              <div className="pcoded-content">
                <div className="pcoded-inner-content">
                  <Breadcrumb />
                  <div className="main-body">
                    <div className="page-wrapper">
                      <Suspense fallback={<Loader />}>
                        <Switch>
                          {menu}
                          <Redirect from="/" to={this.props.defaultPath} />
                          <Redirect to={'/app/notFound'} />
                        </Switch>
                      </Suspense>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div style={{margin: '0px 0px 0px 180px'}}> */}
            <div className="pnc-container">
           <ATM screen={this.state.screen} onUpdateScreen={this.updateScreen}/>
           </div>
           {/* </div> */}


          </div>
        </Fullscreen>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    defaultPath: state.properties.defaultPath,
    isFullScreen: state.properties.isFullScreen,
    collapseMenu: state.properties.collapseMenu,
    configBlock: state.properties.configBlock,
    layout: state.properties.layout,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFullScreenExit: () => dispatch({ type: actionTypes.FULL_SCREEN_EXIT }),
    onComponentWillMount: () => dispatch({ type: actionTypes.COLLAPSE_MENU }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(windowSize(AdminLayout));
