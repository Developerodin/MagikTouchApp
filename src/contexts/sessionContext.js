/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { Capacitor } from '@capacitor/core';
import { httpService } from "../services";
localStorage.setItem('setCurrentVersionAndroid','1.7');
localStorage.setItem('setCurrentVersionIOS','2.0');

const SessionContext = createContext();

const SessionProvider = (props) => {
    const [sessionId, setSessionId] = useState();
    const [latest, setLatest] = useState(0);

    useEffect(()=>{
        const fetchData = async () => {
            localStorage.removeItem('session');
            localStorage.removeItem("update_link");
            if(Capacitor.getPlatform()==="android"){
            try {
                const { data: sessionData } = await httpService.get(httpService.apiEndpoint + 'session', { headers: httpService.headers })
                if (sessionData && ('success' in sessionData) && sessionData.success === 1) {
                    setSessionId(sessionData.data.session);
                    localStorage.setItem('session', sessionData.data.session)
                }

                  const { data: version } = await httpService.get(
                    httpService.apiEndpointLong + "rest/login/currentVersionAndroid"
                  );
          
                  if (typeof version === "object") {
                    if (
                      version &&
                      "success" in version &&
                      version.success === 1 &&
                      "error" in sessionData &&
                      sessionData.error.length === 0
                    ) {
                     
                      if (version.data.version === localStorage.getItem('setCurrentVersionAndroid')) {
                        
                        setLatest(1);
                        console.log("version ok!");
                      } else {
                       
                        console.log(version.data.version);
                        localStorage.setItem("update_link", version.data.link);
                        setLatest(-1);
                      }
                    } else {
                      setLatest(1);
                     
                      localStorage.removeItem("update_link");
                    }
                  } else {
                    setLatest(1);
                    localStorage.removeItem("update_link");
                  }
            } catch (error) {
                console.log('error starting session', error)
            }
          }else{
            try {
              const { data: sessionData } = await httpService.get(httpService.apiEndpoint + 'session', { headers: httpService.headers })
              if (sessionData && ('success' in sessionData) && sessionData.success === 1) {
                  setSessionId(sessionData.data.session);
                  localStorage.setItem('session', sessionData.data.session)
              }

                const { data: version } = await httpService.get(
                  httpService.apiEndpointLong + "rest/login/currentVersionIOS"
                );
        
                if (typeof version === "object") {
                  if (
                    version &&
                    "success" in version &&
                    version.success === 1 &&
                    "error" in sessionData &&
                    sessionData.error.length === 0
                  ) {
                    if (version.data.version === localStorage.getItem('setCurrentVersionIOS')) {
                      setLatest(1);
                      console.log("version ok!");
                    } else {
                      localStorage.setItem("update_link", version.data.link);
                      setLatest(-1);
                    }
                  } else {
                    setLatest(1);
                    localStorage.removeItem("update_link");
                  }
                } else {
                  setLatest(1);
                  localStorage.removeItem("update_link");
                }
          } catch (error) {
              console.log('error starting session', error)
          }
          }
        }
        fetchData();
    }, [])

    return (
        <SessionContext.Provider value={{ sessionId, latest }}>
            {props.children}
        </SessionContext.Provider>
    )


}

export default SessionContext;
export { SessionProvider };

