import React, { createContext, useContext } from "react";
import useQuery from "./services/useQuery";
import { Redirect, Switch, Route } from "react-router-dom";
import useAuth from "./services/useAuth";
import Portalpage from "./pages/PortalPage";
import Userprofile from "./components/UserProfile";
import Antrianmainpage from "./pages/AntrianMainPage";
import StepIsiBiodata from "./components/StepIsiBiodata";
import AntrianDetail from "./components/AntrianDetail";
import Login from "./components/Login";
import Mainpage from "./pages/officers/MainPage";
export const AppContext = createContext();

function ProtectedPage({ admin = false, ...props }) {
  const { user, isLoggedIn } = useContext(AppContext);
  if (
    isLoggedIn &&
    (admin ? ["admin", "admin_kpp", "pegawai"].includes(user.role) : true)
  ) {
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
      <div className="container mx-auto px-4">
        <Switch>
          <Route exact path="/v">
            V.1.1
          </Route>
          <Route exact path="/">
            {["pegawai", "admin", "admin_kpp"].includes(user.role) && (
              <Redirect to="/siap" />
            )}
            <Portalpage />
          </Route>
          <Route path="/siap">
            <ProtectedPage admin>
              <Mainpage />
            </ProtectedPage>
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <div className="md:flex my-10">
            {isLoggedIn && (
              <div className="border rounded-lg p-4 shadow bg-blue-800 text-white w-full md:w-1/3">
                <Userprofile user={user} />
              </div>
            )}
            <div className="w-full mt-10 md:mt-0 md:w-2/3 md:ml-4">
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
