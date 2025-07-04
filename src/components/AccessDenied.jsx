import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AccessDenied = () => {
  const [countdown, setCountdown] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    const redirectTimeout = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimeout);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Acceso denegado</h1>
        <p className="text-lg text-gray-700">No tienes permiso para ver esta página.</p>
        <p className="text-md text-gray-500 mt-6">
          Se lo retornará a la página principal en {countdown} segundos...
        </p>
      </div>
    </div>
  );
};

export default AccessDenied; 