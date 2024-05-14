/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Assets
import NoDisponible from "../../assets/img/no-disponible.jpg";
// Components
import BasicDrawerService from "../../components/Drawer/BasicDrawerService";
import ProfessionalCard from "../../components/ProfessionalCard/ProfessionalCard";
import ScheduleModal from "../../components/ScheduleModal/ScheduleModal";
// Firebase
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
// Types
import { serviceCardData, ServiceCardItem } from "../StartPage/models";

interface RouteParams {
  servicePath: string;
  [key: string]: string;
}

const ServiceDetail: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPersonId, setSelectedPersonId] = useState<string>("");
  const [servicePerson, setServicePerson] = useState<string>("");
  const { servicePath } = useParams<RouteParams>();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [fetchedData, setFetchedData] = useState<
    {
      userId: string;
      nombres: string;
      apellidos: string;
      identificacion: string;
      fecha_nacimiento: string;
      profesion: string;
      correo: string;
      ciudad: string;
      telefono: string;
    }[]
  >([]);

  const selectedService: ServiceCardItem | undefined =
    serviceCardData.items.find(
      (service: { link: string }) => service.link === `/servicio/${servicePath}`
    );

  if (!selectedService) {
    return <div>Servicio no encontrado</div>;
  }
  const { label, imageBanner } = selectedService;

  const handleOpenModal = (personId: string, serviceName: string) => {
    setSelectedPersonId(personId);
    setServicePerson(serviceName);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "proveedores"));
        const providersData = querySnapshot.docs.map(doc => ({
          userId: doc.data().userId || "",
          nombres: doc.data().nombres || "",
          apellidos: doc.data().apellidos || "",
          identificacion: doc.data().identificacion || "",
          fecha_nacimiento: doc.data().fecha_nacimiento || "",
          profesion: doc.data().profesion || "",
          correo: doc.data().correo || "",
          ciudad: doc.data().ciudad || "",
          telefono: doc.data().telefono || "",
        }));
        setFetchedData(providersData);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };

    fetchProviders();
  }, []);

  
  const profesiones = fetchedData.filter(
    (profesion) => profesion.profesion === selectedService.profession
  );

  return (
    <div className="h-screen flex flex-col">
      <BasicDrawerService label={label} onClick={() => navigate(-1)} />
      <div className="flex-1 flex flex-col w-full mt-20">
        <div className="flex">
          <div className="hidden md:block md:w-1/2">
            <img
              src={imageBanner}
              alt={label}
              className="w-screen max-h-screen border border-light-grey ml-4 rounded-lg"
            />
          </div>
          {profesiones.length > 0 ? (
            <div className="w-full md:w-1/2">
              <h3 className="font-bold text-lg ml-10 mb-2 text-primary-blue">
                Estos son los profesionales disponibles
              </h3>
              <div className="w-full h-screen px-8 py-3 mx-auto max-w-xl max-h-screen md:bg-scroll md:overflow-auto">
                {Array.isArray(fetchedData) &&
                  fetchedData.length > 0 &&
                  fetchedData
                    .filter(
                      (detail) =>
                        detail.profesion === selectedService.profession
                    )
                    .map((detail, index) => {
                      return (
                        <div className="mb-4" key={index}>
                          <ProfessionalCard
                            nombre={detail.nombres}
                            apellido={detail.apellidos}
                            horario={"Lunes a Viernes"}
                            hora={"8:00 AM - 3:00 PM"}
                            onclick={() =>
                              handleOpenModal(detail.userId, detail.profesion)
                            }
                          />
                        </div>
                      );
                    })}
                <ScheduleModal
                  isOpen={modalIsOpen}
                  onClose={handleCloseModal}
                  proveedorId={selectedPersonId}
                  service={servicePerson}
                />
              </div>
            </div>
          ) : (
            <div className=" w-full flex flex-col items-center justify-center py-12 h-screen px-8 py-3 mx-auto max-w-xl max-h-screen">
              <h1 className="text-deep-blue font-bold text-h5 text-center">
                ¡Ups! Lo sentimos, en el momento no contamos con profesionales
                disponibles
              </h1>
              <img
                src={NoDisponible}
                alt="profesional no disponible"
                className="w-96 h-80 mt-12"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
