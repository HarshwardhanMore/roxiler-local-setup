import "./App.css";
import Home from "./pages/Home";

// import { useEffect, useState } from "react";
// import axios from "axios";

function App() {
  // const [dataSeeded, setDataSeeded] = useState(false);
  // useEffect(() => {
  //   const seedData = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:3000/seed-database`);
  //       if (response.statusCode == 200) {
  //         setDataSeeded(true);
  //       }
  //       console.log("Database Seeded Successfully!");
  //     } catch (error) {
  //       // Handle error
  //       console.error("Error seeding data:", error);
  //     }
  //   };

  //   seedData();

  //   return () => {};
  // });

  // return dataSeeded ? (
  //   <div className=" w-full h-full flex justify-center items-center">
  //     <img src="/loader.gif" alt="" className="h-16 sm:h-32" />
  //   </div>
  // ) : (
  //   <Home />
  // );
  return <Home />;
}

export default App;
