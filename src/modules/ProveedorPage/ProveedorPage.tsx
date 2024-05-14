import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// Assets
import NoDisponible from "../../assets/img/no-disponible.jpg";
// Components
import Drawer from "../../components/Drawer/Drawer";
import InformationCard from "../../components/InformationCard/InformationCard";
import CalificationCard from "../../components/CalificationCard/CalificationCard";
import ModalAccept from "../../components/ModalAccept/ModalAccept";
// Context
import { useAuth } from "../../context/AuthContext";
// Firebase
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
// Types
import { peopleCalification } from "./model";

const ProveedorPage: React.FC = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const userName = location.state?.userName || "";
  const userId = location.state?.userId || "";
  const message = location.state?.message || "";

  const [fetchedData, setFetchedData] = useState<
    {
      clientId: string;
      proveedorId: string;
      correo: string;
      direccion: string;
      descripcion: string;
      fecha: string;
      hora: string;
    }[]
  >([]);

  const saveLoginDataToLocalStorage = (data: any) => {
    localStorage.setItem("loginData", JSON.stringify(data));
  };

  useEffect(() => {
    const loginData = {
      message: message,
      user: userName,
      id: userId,
    };

    saveLoginDataToLocalStorage(loginData);
  }, [userName, userId, message]);

  const storedLoginDataJSON = localStorage.getItem("loginData");
  const storedLoginData = storedLoginDataJSON
    ? JSON.parse(storedLoginDataJSON)
    : {};
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "servicios"));
        
        const providersData = querySnapshot.docs.map((doc) => ({
          clientId: doc.data().clientId || "",
          proveedorId: doc.data().proveedorId || "",
          correo: doc.data().correo || "",
          direccion: doc.data().direccion || "",
          descripcion: doc.data().descripcion || "",
          hora: doc.data().hora || "",
          fecha: doc.data().fecha || "",
        }));
        setFetchedData(providersData);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };

    fetchProviders();
  }, []);
  

  const clientes = fetchedData.filter(
    (cliente) => cliente.proveedorId === currentUser?.uid
  );

  console.log(clientes);
  
  

  return (
    <div className="h-screen flex flex-col">
      <Drawer userName={currentUser?.email || storedLoginData.user} />
      <div className="flex-1 flex flex-col w-full mt-20">
        <div className="flex-none md:flex">
          <div className="md:block md:w-1/2">
            <h3 className="font-bold text-lg ml-10 mb-2">
              Estas personas necesitan tu servicio
            </h3>
            {clientes.length > 0 ? (
              <div className="w-full h-screen px-8 py-3 mx-auto max-w-xl max-h-screen md:bg-scroll md:overflow-auto">
                {fetchedData &&
                  fetchedData.length > 0 &&
                  fetchedData
                    .filter((detail) => detail.proveedorId === currentUser?.uid)
                    .map((person, index) => (
                      <div className="mb-4" key={`service-${index}`}>
                        <InformationCard
                          key={person.clientId}
                          nombre={person.correo}
                          direccion={person.direccion}
                          fecha={person.fecha}
                          hora={person.hora}
                          onClick={handleOpenModal}
                        />
                      </div>
                    ))}
                <ModalAccept
                  isOpen={modalIsOpen}
                  onClose={handleCloseModal}
                  title={"¿Quieres aceptar el servicio?"}
                  label={
                    "Recuerda que entre más servicios aceptes, mejores oportunidades tendrás de mejorar tus ganancias."
                  }
                  btnAccept={"Aceptar"}
                  btnCancel={"Rechazar"}
                />
              </div>
            ) : (
              <div className=" w-full flex flex-col items-center justify-center py-12 h-screen px-8 py-3 mx-auto max-w-xl max-h-screen">
                <h1 className="text-deep-blue font-bold text-h5 text-center">
                  Por el momento no hay clientes que necesiten tu servicio
                </h1>
                <img
                  src={NoDisponible}
                  alt="profesional no disponible"
                  className="w-96 h-80 mt-12"
                />
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2 mt-4">
            <h3 className="font-bold text-lg ml-10 mb-2">
              Calificaciones de tus servicios
            </h3>
            <div className="w-full h-screen px-8 py-3 mx-auto max-w-xl max-h-screen md:bg-scroll md:overflow-auto">
              {peopleCalification &&
                peopleCalification.length > 0 &&
                peopleCalification.map((person, index) => (
                  <div className="mb-4" key={`calification-${index}`}>
                    <CalificationCard
                      key={person.id}
                      userName={person.nombre}
                      rating={person.calificacion}
                      comment={person.opinion}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProveedorPage;
