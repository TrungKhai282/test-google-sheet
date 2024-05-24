/* eslint-disable @next/next/no-img-element */
import React, {
  InputHTMLAttributes,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import style from "./style.module.scss";
import { handleChangeCart, removeOutOfCart } from "@/common/utils/cart.util";
import { formatCash } from "@/common/utils/interator.util";

const ProductItem = ({ data }: any) => {
  return (
    <div key={data.slug} className={style.item}>
      <div>
        <div className={style.name}>{data.name}</div>
      </div>
      <div>{formatCash(data.price)} đ</div>
      <div>{data.quantity}</div>
      <div>
        {formatCash(
          String(parseFloat(data.price || "") * parseFloat(data.quantity || ""))
        )}{" "}
        đ
      </div>
    </div>
  );
};

export default ProductItem;
