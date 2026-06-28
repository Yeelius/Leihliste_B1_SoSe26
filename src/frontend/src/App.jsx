import { useEffect } from "react";
import AppLayout from "./components/layout/AppLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import { getAlleExemplare } from "./api.js";

function App() {
  useEffect(() => {
    getAlleExemplare()
      .then((data) => {
        console.log("Backend erreichbar ✅", data);
      })
      .catch((err) => {
        console.error("Backend nicht erreichbar ❌", err);
      });
  }, []);

  return (
    <AppLayout>
      <HomePage />
    </AppLayout>
  );
}

export default App;