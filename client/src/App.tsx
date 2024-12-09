import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Layout from "@/components/Layouts";
import { routes } from "./constants/Route";
import ProtectedRoutes from "./libs/ProtectedRoutes";

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            {routes.map((item) =>
              item.protected ? (
                <Route
                  key={item.id}
                  path={item.path}
                  element={
                    <ProtectedRoutes
                      // isAuthenticated={isAuthenticated}
                      redirectTo={"/login"}
                    >
                      {item.redirect ? (
                        <Navigate to={item.redirect} replace />
                      ) : (
                        item.element
                      )}
                    </ProtectedRoutes>
                  }
                />
              ) : (
                <Route key={item.id} path={item.path} element={item.element} />
              )
            )}
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
