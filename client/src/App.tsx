import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "@/components/Layouts";
import { routes } from "./constants/Route";

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            {routes.map((item) => (
              <Route key={item.id} path={item.path} element={item.element} />
            ))}
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
