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

const CartItem = ({ data }: any) => {
  const [quantity, setQuantity] = useState(1);
  const [isInputQuantity, setIsInputQuantity] = useState(false);

  const handleChangeQuantity = (
    e: any,
    data: any,
    type: "plus" | "minus" | "value"
  ) => {
    e.preventDefault();
    switch (type) {
      case "minus":
        setQuantity((prev) => prev - 1);
        handleChangeCart({ product: data, type });
        break;
      case "plus":
        setQuantity((prev) => prev + 1);
        handleChangeCart({ product: data, type });
        break;
      case "value":
        setQuantity(parseInt(e.target.value));
        handleChangeCart({
          product: data,
          quantity: parseInt(e.target.value),
          type,
        });
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (data && data.quantity) {
      setQuantity(data.quantity);
    }
  }, [data]);

  const quantityRender = useMemo(() => {
    if (isInputQuantity) {
      return (
        <input
          className={style.quantity}
          type="number"
          autoFocus
          defaultValue={quantity}
          onBlur={(e) => {
            setIsInputQuantity(false);
            handleChangeQuantity(e, data, "value");
          }}
        />
      );
    } else {
      return (
        <div
          className={style.quantity}
          onClick={() => {
            setIsInputQuantity(true);
          }}
        >
          {quantity}
        </div>
      );
    }
  }, [isInputQuantity, quantity, data]);

  return (
    <div key={data.slug} className={style.item}>
      <div>
        <div className={style.image}>
          <img src={data.image_url} alt={data.name} />
        </div>
        <div className={style.name}>{data.name}</div>
      </div>
      <div>{data.real_price}</div>
      <div>
        {!isInputQuantity && (
          <button
            className={style.minus}
            onClick={(e) => handleChangeQuantity(e, data, "minus")}
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
                d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        )}
        {quantityRender}
        {!isInputQuantity && (
          <button
            className={style.plus}
            onClick={(e) => handleChangeQuantity(e, data, "plus")}
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
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        )}
      </div>
      <div>{formatCash(String(data.real_price_raw * data.quantity))}</div>
      <button
        className={style.delete}
        onClick={() => removeOutOfCart(data.slug)}
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
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default CartItem;
