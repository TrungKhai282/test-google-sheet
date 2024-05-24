import clsx from "clsx";
import React from "react";
import Modal from "react-modal";
import style from "./style.module.scss";

const SearchBox = ({
  isOpen,
  requestClose,
}: {
  isOpen: boolean;
  requestClose: any;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={requestClose}
      contentLabel="Modal"
      className={{
        base: clsx("modal-base", style.searchBox),
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
      {/* <button title="Close" className={style.btnClose} onClick={requestClose}>
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
      </button> */}
      <div className={style.inputSearch}>
        <input type="text" placeholder="Nhập để tìm kiếm..." />
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
    </Modal>
  );
};

export default SearchBox;
