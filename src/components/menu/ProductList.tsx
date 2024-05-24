import React from "react";
import style from "./style.module.scss";
import ProductItem from "./ProductItem";

const ProductList = ({ productData }: any) => {
  return (
    <div className={style.list}>
      {productData?.items?.map((item: any) => (
        <ProductItem data={item} key={item.slug} />
      ))}
    </div>
  );
};

export default ProductList;
