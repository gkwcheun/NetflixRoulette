import React from "react";
import HeaderContainer from "../components/HeaderContainer";
import NavBar from "../components/NavBar";
import MovieList from "../components/MovieList";
import DeleteModal from "../components/forms/DeleteModal";
import MovieDetailsForm from "../components/forms/MovieDetailsForm";

function Home() {
  return (
    <>
      <HeaderContainer />
      <NavBar />
      <MovieDetailsForm />
      <DeleteModal />
      <MovieList />
    </>
  );
}

export default Home;
