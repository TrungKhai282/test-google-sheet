import useStore from "@/stores/useStore";
import React from "react";
import style from "./style.module.scss";
import ProductItem from "./ProductItem";

const ProductList = ({ data }: any) => {
  console.log("data :>> ", data);
  return (
    <div className={style.productList}>
      <div className={style.tableHeader}>
        <div>Sản phẩm</div>
        <div>Giá</div>
        <div>Số lượng</div>
        <div>Thành tiền</div>
      </div>
      <div className={style.tableBody}>
        {data && data.length > 0 ? (
          data.map((item: any) => <ProductItem key={item.slug} data={item} />)
        ) : (
          <div className={style.item}>
            <div>Loading...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
