import React, { FormEvent, useState } from "react";
import style from "./style.module.scss";
import Modal from "react-modal";
import clsx from "clsx";
import { toast } from "react-toastify";
import useStore from "@/stores/useStore";

const Pay = ({
  isOpen,
  requestClose,
  cartList,
  totalAll,
  totalPriceProduct,
  shippingPrice,
}: {
  isOpen: boolean;
  requestClose: any;
  cartList: any;
  totalAll: any;
  totalPriceProduct: any;
  shippingPrice: any;
}) => {
  const defaultForm = {
    name: "",
    phone: "",
    address: "",
  };
  const [form, setForm] = useState(defaultForm);
  const createOrder = useStore((state) => state.createOrder);
  const isCreateLoadingOrder = useStore((state) => state.isCreateLoadingOrder);

  const onChangeTextInput = (e: any) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSuccessCreateOrder = () => {
    requestClose();
    toast.success("Đặt hàng thành công");
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("storage"));
  };

  const onErrorCreateOrder = () => {
    toast.error("Đặt hàng thất bại, đã có lỗi xảy ra, vui lòng thử lại sau 😣");
  };

  const handleSubmitForm = (e: any) => {
    e.preventDefault();

    const data = {
      client_name: form.name,
      client_phone: form.phone,
      client_address: form.address,
      cart: JSON.stringify(
        cartList?.map((item: any) => ({
          name: item.name,
          slug: item.slug,
          price: item.real_price_raw,
          quantity: item.quantity,
        }))
      ),
      total_price_product: totalPriceProduct.value,
      total_all: totalAll.value,
      shipping_price: shippingPrice.value,
    };

    createOrder(data, onSuccessCreateOrder, onErrorCreateOrder);
  };

  const clearForm = () => {
    setForm(defaultForm);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={requestClose}
      contentLabel="Modal"
      className={{
        base: clsx("modal-base", style.payModal),
        afterOpen: "modal-base_after-open",
        beforeClose: "modal-base_before-close",
      }}
      overlayClassName={{
        base: "overlay-base",
        afterOpen: "overlay-base_after-open",
        beforeClose: "overlay-base_before-close",
      }}
      shouldCloseOnOverlayClick={true}
      closeTimeoutMS={2000}
    >
      <button title="Close" className={style.btnClose} onClick={requestClose}>
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
      <div className={style.title}>Đặt hàng ngay !</div>
      <div className={style.body}>
        <form className={style.payForm} onSubmit={handleSubmitForm}>
          <div className={style.formGroup}>
            <label htmlFor="name">Họ và tên: </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={onChangeTextInput}
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="phone">Số điện thoại: </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={onChangeTextInput}
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="address">Địa chỉ nhận hàng: </label>
            <input
              type="text"
              id="address"
              name="address"
              value={form.address}
              onChange={onChangeTextInput}
            />
          </div>
          <button className={style.submitBtn} type="submit">
            Xác nhận đặt hàng
          </button>
          <button className={style.formResetBtn} onClick={clearForm}>
            Đặt lại thông tin
          </button>
        </form>
        <div className={style.orderInformation}>
          <div className={style.title}>Sản phẩm: </div>
          <div className={style.productList}>
            {cartList?.map((item: any, index: number) => (
              <div key={index} className={style.item}>
                {index + 1}. {item.name} - Số lượng: {item.quantity}
              </div>
            ))}
          </div>

          <div className={style.payment}>
            <div className={style.title}>Tổng tiền: </div>
            <span>{totalAll.display}</span>
          </div>
        </div>
      </div>

      <div
        className={clsx(style.suspense, {
          [style.active]: isCreateLoadingOrder,
        })}
      >
        <div className={style.loader}></div>
      </div>
    </Modal>
  );
};

export default Pay;
