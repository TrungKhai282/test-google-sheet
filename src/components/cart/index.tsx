"use client";

import Cart from "./Cart";
import style from "./style.module.scss";
import React, { useEffect, useMemo, useState } from "react";
import useStore from "@/stores/useStore";
import EmptyCart from "./EmptyCart";
import Pay from "../pay";
import { formatCash } from "@/common/utils/interator.util";
import clsx from "clsx";

const CartScreen = () => {
  const [data, setData] = useState<any>([]);
  const [isPay, setIsPay] = useState<boolean>(false);
  const { data: productData, isLoading: isLoadingProduct } = useStore(
    (state) => state.products
  );
  const getAllProduct = useStore((state) => state.getAllProduct);

  const cartList = useMemo(() => {
    if (
      productData &&
      productData.items &&
      productData.items.length > 0 &&
      data
    ) {
      return data.map((item: any) => {
        let find = productData.items.find(
          (product: any) => product.slug === item.product_slug
        );

        return {
          ...find,
          quantity: item.quantity,
        };
      });
    }

    return [];
  }, [data, productData]);

  useEffect(() => {
    getAllProduct();

    if (typeof window !== "undefined") {
      const cartStorage = JSON.parse(localStorage.getItem("cart") || "[]");
      setData(cartStorage ? cartStorage : []);

      window.addEventListener("storage", () => {
        const cartStorage = JSON.parse(localStorage.getItem("cart") || "[]");
        setData(cartStorage ? cartStorage : []);
      });
    }
  }, []);
  const totalPriceProduct = useMemo(() => {
    let result = 0;

    cartList.forEach((item: any) => {
      result = result + item.real_price_raw * item.quantity;
    });

    return {
      display: formatCash(String(result)) + " đ",
      value: result,
    };
  }, [cartList]);

  const shippingPrice = useMemo(() => {
    return {
      display: formatCash(String(30000)) + " đ",
      value: 30000,
    };
  }, []);

  const totalAll = useMemo(() => {
    let result = totalPriceProduct.value + 30000;
    return {
      display: formatCash(String(result)) + " đ",
      value: result,
    };
  }, [totalPriceProduct]);

  return (
    <div className={clsx(style.screen, "animate__animated animate__fadeIn")}>
      <div className={style.title}>Giỏ hàng của bạn</div>
      {cartList && cartList.length > 0 ? (
        <Cart
          cartList={cartList}
          totalPriceProduct={totalPriceProduct}
          totalAll={totalAll}
          setIsPay={setIsPay}
        />
      ) : (
        <EmptyCart />
      )}
      <Pay
        isOpen={isPay}
        requestClose={() => setIsPay(false)}
        totalPriceProduct={totalPriceProduct}
        shippingPrice={shippingPrice}
        cartList={cartList}
        totalAll={totalAll}
      />
    </div>
  );
};

export default CartScreen;
