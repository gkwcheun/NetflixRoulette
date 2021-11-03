import React from "react";
import { Switch, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./Routes/Home";
import InfoHome from "./Routes/InfoHome";
import NotFound from "./Routes/NotFound";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/search" component={Home} exact />
        <Route path="/search/movie=:movieID" component={InfoHome} exact />
        <Route path="/search/:searchQuery" component={Home} exact />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
