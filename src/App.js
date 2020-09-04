import React, { createContext, useContext } from "react";
import useQuery from "./services/useQuery";
import { Redirect, Switch, Route } from "react-router-dom";
import useAuth from "./services/useAuth";
import Portalpage from "./pages/PortalPage";
import Userprofile from "./components/UserProfile";
import Antrianmainpage from "./pages/AntrianMainPage";
import StepIsiBiodata from "./components/StepIsiBiodata";
import AntrianDetail from "./components/AntrianDetail";
export const AppContext = createContext();

function ProtectedPage(props) {
  const { user, isLoggedIn } = useContext(AppContext);
  if (isLoggedIn) {
    return props.children;
  } else {
    return "Not authorized.";
  }
}

function App() {
  const query = useQuery();
  const { user, isLoggedIn } = useAuth();

  if (query.get("token")) {
    localStorage.setItem("token", query.get("token"));
    return <Redirect to="/" />;
  }

  return (
    <AppContext.Provider value={{ user, isLoggedIn }}>
      <div className="container mx-auto p-4">
        <Switch>
          <Route exact path="/">
            <Portalpage />
          </Route>
          <div className="flex my-10">
            {isLoggedIn && (
              <div className="border rounded-lg p-4 shadow bg-blue-800 text-white w-1/3">
                <Userprofile user={user} />
              </div>
            )}
            <div className="w-2/3 ml-4">
              <Switch>
                <Route exact path="/">
                  <Portalpage />
                </Route>
                <Route path="/antrian/result/:jwt">
                  <ProtectedPage>
                    <AntrianDetail />
                  </ProtectedPage>
                </Route>
                <Route path="/daftar-antrian">
                  <ProtectedPage>
                    <Antrianmainpage />
                  </ProtectedPage>
                </Route>
                <Route exact path="/test">
                  <ProtectedPage>
                    <StepIsiBiodata />
                  </ProtectedPage>
                </Route>
              </Switch>
            </div>
          </div>
        </Switch>
      </div>
    </AppContext.Provider>
  );
}

export default App;
