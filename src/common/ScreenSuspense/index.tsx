import React from "react";
import style from "./style.module.scss";
import clsx from "clsx";
const ScreenSuspense = ({
  isLoading,
  children,
  className,
}: {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <main className={clsx(style.mainScreen, className || "")}>
      {children}
      <div className={clsx(style.suspense, { [style.active]: isLoading })}>
        <div className={style.loader}></div>
      </div>
    </main>
  );
};

export default ScreenSuspense;
