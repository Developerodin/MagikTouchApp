/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { createContext, useState, useEffect, useContext } from "react";
import { httpService } from "../services";
import { Buffer } from "buffer";

import SessionContext from "./sessionContext";
import CatalogContext from "./catalogContext";

const UserContext = createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [userDetails, setUserDetails] = useState(
    JSON.parse(localStorage.getItem("userDetails"))
  );
  const [UserAddress, setUserAddress] = useState(
    JSON.parse(localStorage.getItem("userAddress")) || null
  );
  const { sessionId } = useContext(SessionContext);
  const{showToast} = useContext(CatalogContext);
  const [log, setLog] = useState(-1);
  const [EditedAddress,setEditedAddress]=useState({})
  useEffect(() => {
    const fecthData = async () => {
      try {
        const loginDetails = Buffer.from(user, "base64").toString("ascii");
        console.log(loginDetails);
        const { data: response } = await httpService.post(
          httpService.apiEndpointLong + "rest/login/login",
          loginDetails,
          { headers: { ...httpService.headers, "X-Oc-Session": sessionId } }
        );
        console.log("auto log resp", response);
        setLog(1);
      } catch (error) {
        if (error.response.status === 403) {
          localStorage.removeItem("user");
          localStorage.removeItem("userDetails");
          setUser(undefined);
          setUserDetails(undefined);
          setLog(0);
        }
        console.log("auto log error", error);
        setLog(0);
      }
    };
    if (!user) {
      setLog(0);
    }
    if (user && sessionId) {
      fecthData();
    }
  }, [sessionId]);

  /* const login = async (loginForm) => {
        try {
            const response = await httpService.post(httpService.apiEndpoint + 'onboarding/login', loginForm);
            if (response.data && ('correct' in response.data) && response.data.correct == 1) {
                const result = { ...response.data };
                delete response.data.correct;
                localStorage.setItem('user', JSON.stringify(response.data));
                setUser(response.data)
                return result;
            }
            else if (response.data && ('correct' in response.data) && response.data.correct == 0) {
                const result = { ...response.data };
                return result;
            }

        } catch (error) {
            console.log('error', error);
            return ({ correct: 0, msg: 'something unexpected occured!!' })

        }

    } */

  const signup = async (registration) => {
    try {
      const { data: response } = await httpService.post(
        httpService.apiEndpointLong + "rest/register/register",
        registration,
        { headers: { ...httpService.headers, "X-Oc-Session": sessionId } }
      );
      console.log(response);
      if (response && "success" in response && response.success === 1) {
        localStorage.setItem(
          "user",
          Buffer.from(
            JSON.stringify({
              telephone: registration.telephone,
            })
          ).toString("base64")
        );

        localStorage.setItem(
          "userDetails",
          JSON.stringify({
            customer_id: response.data.customer_id,
            firstname: response.data.firstname,
            lastname: response.data.lastname,
            email: response.data.email,
            telephone: response.data.telephone,
          })
        );

        setUser(localStorage.getItem("user"));
        setUserDetails(JSON.parse(localStorage.getItem("userDetails")));
        setLog(1);
        return response;
      } else if (response && "success" in response && response.success !== 1) {
        console.log(response);
        return response;
      }
    } catch (error) {
      console.log("error", error);
      if (error.response) {
        return error.response.data;
      } else {
        return { success: 0, error: ["Something went wrong"] };
      }
    }
  };

  const login = async (loginForm) => {
    try {
      const { data: response } = await httpService.post(
        httpService.apiEndpointLong + "rest/login/login",
        loginForm,
        { headers: { ...httpService.headers, "X-Oc-Session": sessionId } }
      );
      console.log(response);
      if (response && "success" in response && response.success === 1) {
        localStorage.setItem(
          "user",
          Buffer.from(
            JSON.stringify({
              telephone: loginForm.telephone,
            })
          ).toString("base64")
        );

        localStorage.setItem(
          "userDetails",
          JSON.stringify({
            customer_id: response.data.customer_id,
            firstname: response.data.firstname,
            lastname: response.data.lastname,
            email: response.data.email,
            telephone: response.data.telephone,
          })
        );

        setUser(localStorage.getItem("user"));
        setUserDetails(JSON.parse(localStorage.getItem("userDetails")));
        setLog(1);
        return response;
      } else if (response && "success" in response && response.success !== 1) {
        console.log(response);
        return response;
      }
    } catch (error) {
      console.log("error", error);
      if (error.response) {
        return error.response.data;
      } else {
        return { success: 0, error: ["Something went wrong"] };
      }
    }
  };

  const updateProfile = async (userForm) => {
    try {
      const { data: response } = await httpService.put(
        httpService.apiEndpointLong + "rest/account/account",
        userForm,
        { headers: { ...httpService.headers, "X-Oc-Session": sessionId } }
      );
      console.log(response);
      if (response && "success" in response && response.success === 1) {


        console.log("update response",response);

        localStorage.setItem(
          "userDetails",
          JSON.stringify({
            firstname: userForm.firstname,
            lastname: userForm.lastname,
            email: userForm.email,
            telephone: userDetails.telephone,
          })
        );

        setUserDetails(JSON.parse(localStorage.getItem("userDetails")));

        return response;
      } else if (response && "success" in response && response.success !== 1) {
        console.log(response);
        return response;
      }
    } catch (error) {
      console.log("error", error);
      if (error.response) {
        return error.response.data;
      } else {
        return { success: 0, error: ["Something went wrong"] };
      }
    }
  };

  const logout = async () => {
    try {
      await httpService.post(
        httpService.apiEndpointLong + "rest/logout/logout",
        {},
        { headers: { ...httpService.headers, "X-Oc-Session": sessionId } }
      );
      localStorage.removeItem("user");
      localStorage.removeItem("userDetails");
      setUser(undefined);
      setUserDetails(undefined);
      setLog(0);
    } catch (error) {
      if (error.response) {
        showToast("error", error.response.data.error[0], "");
      } else {
        showToast("error", "Something went wrong!", "");
      }
    }
  };

  const deleteAccount = async () => {
    try {
      await httpService.post(
        httpService.apiEndpointLong + "rest/logout/delete",
        {},
        { headers: { ...httpService.headers, "X-Oc-Session": sessionId } }
      );
      localStorage.removeItem("user");
      localStorage.removeItem("userDetails");
      setUser(undefined);
      setUserDetails(undefined);
      setLog(0);
    } catch (error) {
      if (error.response) {
        showToast("error", error.response.data.error[0], "");
      } else {
        showToast("error", "Something went wrong!", "");
      }
    }
  };

  return (
    <UserContext.Provider
      value={{  user, login, signup, logout, userDetails, log, updateProfile, deleteAccount,UserAddress, setUserAddress,EditedAddress,setEditedAddress }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
export { UserProvider };
