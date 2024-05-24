import React from "react";
import style from "./style.module.scss";

const LoadingAllPage = () => {
  return (
    <div className={style.loadingAllPage}>
      <div className={style.content}>
        <span>Dola Restaurant</span>
        <div className={style.loader}></div>
      </div>
    </div>
  );
};

export default LoadingAllPage;
