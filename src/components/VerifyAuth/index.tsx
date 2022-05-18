import { useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { TokenType, ContextType } from "./VerifyAuthTypes";

export const VerifyAuth: React.FC = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkIfUserIsAuthenticated = async () => {
      if (localStorage.getItem("access_token")) {
        const access_token = localStorage.getItem("access_token");
        if (access_token !== null) {
          const tokenDecoded: TokenType = jwt_decode(access_token);
          const tokenExpInDate = new Date(tokenDecoded.exp * 1000);
          const currentDate = new Date();
          if (currentDate > tokenExpInDate) {
            setAuthenticated(false);
            return;
          }
        }

        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    };

    checkIfUserIsAuthenticated();
  }, []);

  return <Outlet context={{ isAuthenticated }} />;
};

export function useAuthenticated() {
  return useOutletContext<ContextType>();
}
