import React from 'react';
import DEMO from './../../../../../store/constant';
import Aux from '../../../../../hoc/_Aux';
import { connect } from 'react-redux';

const navLogo = (props) => {
  let toggleClass = ['mobile-menu'];
  if (props.collapseMenu) {
    toggleClass = [...toggleClass, 'on'];
  }

  return (
    <Aux>
      <div className="navbar-brand header-logo">
        <a href={DEMO.BLANK_LINK} className="b-brand">
          {/* <div className="b-bg">
            <i className="fa-solid fa-magnifying-glass" />
          </div> */}
         <div className="b-bg">
  <img
    src={require("./pnc.png")}
    alt="magnifying glass"
    style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto" }}
  />
</div>


          <div
            style={{
              display: 'block !important',
              fontSize: 'small',
              textAlign: 'left',
              paddingLeft: '10px',
            }}
          >
            <div style={{ textTransform: 'uppercase' }}>PNC</div>
            <div style={{ textTransform: 'capitalize' }}>
              {/* {props.role || 'unknown'} */}
              Pittsburgh
            </div>
          </div>
        </a>
        <a
          href={DEMO.BLANK_LINK}
          className={toggleClass.join(' ')}
          id="mobile-collapse"
          onClick={props.onToggleNavigation}
        >
          <span />
        </a>
      </div>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    layout: state.properties.layout,
    collapseMenu: state.properties.collapseMenu,
    role: state.auth.authUser ? state.auth.authUser.role.toLowerCase() : '',
  };
};

export default connect(mapStateToProps)(navLogo);
