"use client";

import { Toaster } from "react-hot-toast";

const ClientProvider = () => {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{ className: "text-xs font-bold" }}
      />
    </>
  );
};

export default ClientProvider;
