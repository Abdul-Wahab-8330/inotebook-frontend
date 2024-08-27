import React, { createContext, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const showAlert = (message, type) => {
    switch (type) {
      case 'success':
        toast.success(message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        break;
      case 'error':
        toast.error(message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        break;
      case 'info':
        toast.info(message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        break;
      case 'warning':
        toast.warning(message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        break;
        default:
          console.log("error")
          break;
    }
  }

    return (
      <AlertContext.Provider value={showAlert}>
        {children}
        <ToastContainer />
      </AlertContext.Provider>
    );
}