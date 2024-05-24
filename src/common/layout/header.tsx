import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import Link from "next/link";
import useStore from "@/stores/useStore";
import Image from "next/image";
import clsx from "clsx";
import { getAllQuantityCart } from "../utils/cart.util";
import SearchBox from "@/components/search";

const Header = ({ menu }: any) => {
  const { data, isLoading } = menu;
  const [cartQuantity, setCartQuantity] = useState(0);
  const [isOpenSearchBox, setIsOpenSearchBox] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCartQuantity(getAllQuantityCart());

      window.addEventListener("storage", () => {
        setCartQuantity(getAllQuantityCart());
      });
    }
  }, []);

  return (
    <>
      <SearchBox
        isOpen={isOpenSearchBox}
        requestClose={() => setIsOpenSearchBox(false)}
      />
      <header
        className={clsx(style.header, "animate__animated animate__slideInDown")}
      >
        <Link href={"/"} className={style.logo}>
          <Image src={"/logo.png"} width={145} height={65} alt="Logo" />
        </Link>
        <div className={style.menu}>
          <div className={style.list}>
            {data?.items?.map((item: any, index: number) => (
              <div key={index} className={style.item}>
                <Link href={item.url}>{item.name}</Link>
              </div>
            ))}
          </div>
          <button className={style.mobileMenuIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
              />
            </svg>
          </button>
        </div>
        <div className={style.actionHeader}>
          <div
            className={style.iconItem}
            onClick={() => setIsOpenSearchBox(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
          <Link href={"/cart"} className={style.iconItem}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            {cartQuantity > 0 && (
              <span className={style.prefix}>{cartQuantity}</span>
            )}
          </Link>
          <div className={style.iconItem}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </div>
          <div className={style.iconItem}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
          </div>
          <div className={style.buttonItem}>
            <button type="button">Đặt bàn</button>
          </div>
        </div>
      </header>
      {/* <div className={style.menuSM}>
        {data?.items?.map((item: any, index: number) => (
          <div key={index} className={style.item}>
            <Link href={item.url}>{item.name}</Link>
          </div>
        ))}
      </div> */}
    </>
  );
};

export default Header;
