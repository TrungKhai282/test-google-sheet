"use client";

import React, { useEffect, useState } from "react";
import Header from "./header";
import style from "./style.module.scss";
import useStore from "@/stores/useStore";
import LoadingAllPage from "./loading";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isReadyRender, setIsReadyRender] = useState(false);
  const menu = useStore((state) => state.menu);
  const getMenu = useStore((state) => state.getMenu);

  useEffect(() => {
    getMenu();
  }, []);

  useEffect(() => {
    if (!menu.isLoading && typeof window !== "undefined") {
      setIsReadyRender(true);
    }
  }, [menu]);

  return (
    <body className={style.layout}>
      <Header menu={menu} />
      {isReadyRender ? children : <LoadingAllPage />}
      {/* <Footer /> */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </body>
  );
};

export default Layout;
