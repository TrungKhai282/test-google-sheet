"use client";

import clsx from "clsx";
import React, { useEffect, useMemo } from "react";
import style from "./style.module.scss";
import ProductList from "./ProductList";
import useStore from "@/stores/useStore";
import { formatCash } from "@/common/utils/interator.util";

const Order = ({ id }: { id: string }) => {
  const orderDetail = useStore((state) => state.orderDetail);
  const getOrderDetail = useStore((state) => state.getOrderDetail);

  useEffect(() => {
    getOrderDetail(id);
  }, []);

  const productList = useMemo(() => {
    if (orderDetail && orderDetail.data && orderDetail.data.cart) {
      return JSON.parse(orderDetail.data.cart);
    }
    return [];
  }, [orderDetail]);
  console.log("orderDetail :>> ", orderDetail);
  return (
    <div className={clsx(style.screen, "animate__animated animate__fadeIn")}>
      <div className={style.title}>Chi tiết đơn hàng: </div>
      <ProductList data={productList} />
      <div className={style.infomation}>
        <div className={style.payment}>
          <div className={style.totalPriceProduct}>
            <div className={style.label}>Tạm tính:</div>
            <div className={style.value}>
              {formatCash(
                String(orderDetail?.data?.total_price_product_raw || "0")
              )}{" "}
              đ
            </div>
          </div>
          <div className={style.shippingPrice}>
            <div className={style.label}>Phí giao hàng:</div>
            <div className={style.value}>
              {formatCash(String(orderDetail?.data?.shipping_price_raw || "0"))}{" "}
              đ
            </div>
          </div>
          <div className={style.totalAll}>
            <div className={style.label}>Tổng tiền thanh toán:</div>
            <div className={style.value}>
              {formatCash(String(orderDetail?.data?.total_all_raw || "0"))} đ
            </div>
          </div>
        </div>
        <div className={style.client}>
          <div className={style.item}>
            <div className={style.label}>Tên khách hàng:</div>
            <div className={style.value}>{orderDetail?.data?.client_name}</div>
          </div>
          <div className={style.item}>
            <div className={style.label}>Số điện thoại:</div>
            <div className={style.value}>
              +84{orderDetail?.data?.client_phone}
            </div>
          </div>
          <div className={style.item}>
            <div className={style.label}>Địa chỉ giao hàng:</div>
            <div className={style.value}>
              {orderDetail?.data?.client_address}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
