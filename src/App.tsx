import React from "react";
import "./App.css";
import { ProjectListScreen } from "screens/project-list/index";
import { TsReactTest } from "__test__/try-use-array"
import { UnauthenticatedApp } from "unauthenticated-app/index";
import { AuthenticatedApp } from "authenticated-app";
import { useAuth } from "context/auth-context";
// import {Login} from "authenticated-app"
function App() {
  const { user } = useAuth();
  return (

    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;