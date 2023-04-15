import React from "react";
import "./App.css";
import { ProjectListScreen } from "screens/project-list/index";
import { TsReactTest } from "__test__/try-use-array"
import { LoginScreen } from "screens/login";
import { loadDevTools } from "jira-dev-tool";
// import {Login} from "authenticated-app"
function App() {
  return (
    <div className="App">
      {/* <ProjectListScreen /> */}
      {/* <TsReactTest /> */}
      {/* <LoginScreen onSubmit={function (username: string, password: string): void {
        throw new Error("Function not implemented.");
        
      }} /> */}
      <LoginScreen />
    </div>
  );
}

export default App;