import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import SkillPage from "./skill/SkillPage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import EmployeesPage from "./employees/EmployeesPage";
import ManageEmployeePage from "./employees/ManageEmployeePage";
import ManageSkillPage from "./skill/ManageSkillPage";
import AboutPage from "./AboutPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/skills" component={SkillPage} />
        <Route path="/employees" component={EmployeesPage} />
        <Route path="/employee/:slug" component={ManageEmployeePage} />
        <Route path="/employee" component={ManageEmployeePage} />
        <Route path="/skill/:id" component={ManageSkillPage} />
        <Route path="/skill/" component={ManageSkillPage} />
        <Route path="/about/" component={AboutPage} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
