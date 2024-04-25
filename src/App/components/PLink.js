import React from 'react';
import { Link } from 'react-router-dom';

const PLink = ({ isActive = true, text, path = '' }) => {
  return isActive ? <Link to={path}>{text}</Link> : <span>{text}</span>;
};

export default PLink;
