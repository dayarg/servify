import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../assets/img/logo.png";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { homeServices } from "./models";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../Button/Button";

export type DrawerMobileProps = {
  careers: 'supplier' | 'client';
}

const DrawerMobile = ({careers}: DrawerMobileProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickLogIn = () => {
    careers === "supplier"
      ? navigate("/login")
      : careers === "client" && navigate("/login-client");
  };

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const handleContactClick = () => {
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-auto">
      <div className="flex justify-between items-center bg-white shadow-md py-4 px-6">
        <img src={Logo} alt="Logo" className="w-28 h-14 min-w-28 min-h-14" />
        <button
          type="button"
          className="text-gray-600 focus:outline-none"
          onClick={handleMenuClick}
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
      </div>
      <div
        className={`bg-white shadow-md transform transition-transform ease-in-out duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } h-full w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 px-6 py-4 fixed top-0 left-0 z-50`}
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center text-primary">
              Menú
            </h2>
            <div className="ml-5">
              <DropdownMenu
                id="dropdownMobile"
                label="Servicios"
                options={homeServices}
              />
            </div>
            <div className="mb-6 text-primary">
              {/* <button
                type="button"
                className="block w-full text-center py-4 text-sm font-medium hover:text-secondary"
                onClick={handleHelpClick}
              >
                Ayuda
              </button> */}
              <button
                type="button"
                className={`block w-full text-center py-4 text-sm font-medium hover:text-secondary ${location.pathname === '/' && 'text-secondary'}`}
                onClick={() => navigate('/')}
              >
                Quiero solicitar un servicio
              </button>
              <button
                type="button"
                className={`block w-full text-center py-4 text-sm font-medium hover:text-secondary ${location.pathname === '/home-supplier' && 'text-secondary'}`}
                onClick={() => navigate('/home-supplier')}
              >
                Quiero ofrecer un servicio
              </button>
              <button
                type="button"
                className="block w-full text-center py-4 text-sm font-medium hover:text-secondary"
                onClick={handleContactClick}
              >
                Contacto
              </button>
              <div className="py-4">
              <Button
                id="btnLoginMobile"
                children="Ingresar"
                onClick={handleClickLogIn}
              />
              </div>
            </div>
          </div>
          <div className="text-center mb-6"></div>
        </div>
      </div>
    </div>
  );
};

export default DrawerMobile;
