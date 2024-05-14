import { useState, useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
// Components
import Home from "../modules/Home/Home";
import StartPage from "../modules/StartPage/StartPage";
import LogIn from "../modules/LogIn/LogIn";
import Register from "../modules/Register/Register";
import RegisterDoc from "../modules/Register/RegisterDoc";
import SupplierHome from "../modules/Home/SupplierHome";
import RegisterClient from "../modules/Register/RegisterClient";
import ServiceDetail from "../modules/ServiceDetail/ServiceDetail";
import ProveedorPage from "../modules/ProveedorPage/ProveedorPage";
import LogInClient from "../modules/LogIn/LogInClient";
import Loading from "../components/Loading/Loading";
import RegisterOptions from "../components/RegisterOptions/RegisterOptions";
// Private Route
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
// Context
import { useAuth } from "../context/AuthContext";
// Firebase
import { db } from "../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";

const Routers = () => {
  const [isEmailInProviders, setIsEmailInProviders] = useState(false);
  const [isEmailInClients, setIsEmailInClients] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAuth();  

  useEffect(() => {
    // Simula un tiempo de carga
    setTimeout(() => {
      setIsLoading(false);
    }, 3200);
  }, []);

  useEffect(() => {
    const isEmailInProvidersCollection = async () => {
      if (!currentUser) return false;
      const providersRef = getDocs(
        query(
          collection(db, "proveedores"),
          where("correo", "==", currentUser.email)
        )
      );
      const snapshot = await providersRef;
      return !snapshot.empty;
    };
  
    const isEmailInClientsCollection = async () => {
      if (!currentUser) return false;
      const providersRef = getDocs(
        query(
          collection(db, "clientes"),
          where("correo", "==", currentUser.email)
        )
      );
      const snapshot = await providersRef;
      return !snapshot.empty;
    };
    if (currentUser) {
      isEmailInProvidersCollection().then((result) =>
        setIsEmailInProviders(result)
      );
      isEmailInClientsCollection().then((result) =>
        setIsEmailInClients(result)
      );
    }
  }, [currentUser]);

  return (
    <HashRouter>
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-full">
          <Loading />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home-supplier" element={<SupplierHome />} />
          <Route path="/register-options" element={<RegisterOptions />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/login-client" element={<LogInClient />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-client" element={<RegisterClient />} />
          <Route path="/register-2/:userId" element={<RegisterDoc />} />
          <Route
            path="/start-page"
            element={
              <PrivateRoute
                redirectTo={!!currentUser ? "/proveedor-page/" : "/"}
                isAllowed={!!currentUser && isEmailInClients}
              >
                <StartPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/servicio/:servicePath"
            element={
              <PrivateRoute
                redirectTo={!!currentUser ? "/proveedor-page/" : "/"}
                isAllowed={!!currentUser && isEmailInClients}
              >
                <ServiceDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/proveedor-page/"
            element={
              <PrivateRoute
                redirectTo={!!currentUser ? "/start-page" : "/"}
                isAllowed={!!currentUser && isEmailInProviders}
              >
                <ProveedorPage />
              </PrivateRoute>
            }
          />
        </Routes>
      )}
    </HashRouter>
  );
};

export default Routers;
