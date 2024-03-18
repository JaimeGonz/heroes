import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../auth/context";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }) => {
  const { logged } = useContext(AuthContext);

  return logged ? <Navigate to="/" /> : children;
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
