import { useState, useEffect } from "react";
// import { Table } from '@/components/ui/table';
import "./App.css";
import Navbar from "./components/Navbar";
import Quiz from "./components/Quiz";

function App() {
  return (
    <main className="text-center">
      {/* <Navbar /> */}
      <h1 className="text-primary font-bold py-10">QUIZ-APP</h1>
      <Quiz />
    </main>
  );
}

export default App;
