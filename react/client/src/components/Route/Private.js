// to show dashboard only when login is successful

import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
    //   const res = await axios.get("/api/v1/auth/user-auth",{
    //     header:{
    //         "Authorization":auth?.token
    //     }
    //   });
    // the above is also right but now we will set in axios header then we need not to send headers

    const res = await axios.get("/api/v1/auth/user-auth");

      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
