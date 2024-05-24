/* eslint-disable @next/next/no-img-element */

import React, { useMemo } from "react";
import style from "./style.module.scss";
import Link from "next/link";
import CartItem from "./CartItem";
import { formatCash } from "@/common/utils/interator.util";

const Cart = ({
  key,
  cartList,
  totalPriceProduct,
  totalAll,
  setIsPay,
}: any) => {
  return (
    <div key={key} className={style.cart}>
      <div className={style.productList}>
        <div className={style.tableHeader}>
          <div>Sản phẩm</div>
          <div>Giá</div>
          <div>Số lượng</div>
          <div>Thành tiền</div>
        </div>
        <div className={style.tableBody}>
          {cartList && cartList.length > 0 ? (
            cartList.map((item: any) => (
              <CartItem key={item.slug} data={item} />
            ))
          ) : (
            <div className={style.item}>
              <div>Loading...</div>
            </div>
          )}
        </div>
      </div>
      <div className={style.payment}>
        <div className={style.totalPriceProduct}>
          <div className={style.label}>Tạm tính:</div>
          <div className={style.value}>{totalPriceProduct.display}</div>
        </div>
        <div className={style.shippingPrice}>
          <div className={style.label}>Phí giao hàng:</div>
          <div className={style.value}>30.000 đ</div>
        </div>
        <div className={style.totalAll}>
          <div className={style.label}>Tổng tiền thanh toán:</div>
          <div className={style.value}>{totalAll.display}</div>
        </div>
        <div className={style.note}>
          <div className={style.label}>Ghi chú (Không bắt buộc):</div>
          <textarea name="" id="" cols={30} rows={10}></textarea>
        </div>
        <div className={style.action}>
          <button className={style.order} onClick={() => setIsPay(true)}>
            Đặt hàng
          </button>
          <Link href={"/dat-ban"}>
            <button>Đặt bàn</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
