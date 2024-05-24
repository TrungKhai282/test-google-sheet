"use client";

import React, { useEffect } from "react";
import style from "./style.module.scss";
import useStore from "@/stores/useStore";
import { useSearchParams } from "next/navigation";
import CategorySideBar from "./CategorySideBar";
import TabChildCategory from "./TabChildCategory";
import ProductList from "./ProductList";
import clsx from "clsx";

const Menu = () => {
  const searchParams = useSearchParams();
  const category_parent_slug = searchParams.get("category_parent");
  const category_child_slug = searchParams.get("category_child");
  const propose_slug = searchParams.get("propose");

  const { data: categoryData, isLoading: isLoadingCategory } = useStore(
    (state) => state.allCategory
  );
  const { data: proposeData } = useStore((state) => state.allPropose);
  const { data: productData, isLoading: isLoadingProduct } = useStore(
    (state) => state.products
  );
  const getAllCategory = useStore((state) => state.getAllCategory);
  const getAllProduct = useStore((state) => state.getAllProduct);
  const getProductFilter = useStore((state) => state.getProductFilter);
  const getAllPropose = useStore((state) => state.getAllPropose);

  useEffect(() => {
    getAllCategory();
    getAllPropose();
  }, []);

  useEffect(() => {
    if (category_parent_slug) {
      if (category_child_slug) {
        getProductFilter({
          category_slug: category_child_slug,
        });
      } else {
        let firstChild = categoryData?.items?.find(
          (item: any) => item.parent_slug === category_parent_slug
        );
        getProductFilter({
          category_slug: firstChild?.slug,
        });
      }
    } else if (propose_slug) {
      getProductFilter({
        propose_slug,
      });
    } else {
      getAllProduct();
    }
  }, [
    category_parent_slug,
    category_child_slug,
    getAllProduct,
    getProductFilter,
    categoryData,
    propose_slug,
  ]);

  return (
    <div className={clsx(style.screen, "animate__animated animate__fadeIn")}>
      <CategorySideBar
        category_parent_slug={category_parent_slug}
        categoryData={categoryData}
        proposeData={proposeData}
        propose_slug={propose_slug}
      />
      <div className={style.product}>
        {category_parent_slug ? (
          <TabChildCategory
            category_child_slug={category_child_slug}
            category_parent_slug={category_parent_slug}
            categoryData={categoryData}
          />
        ) : (
          <div className={style.title}>Tất cả sản phẩm</div>
        )}
        {isLoadingProduct ? (
          "Loading..."
        ) : (
          <ProductList productData={productData} />
        )}
      </div>
    </div>
  );
};

export default Menu;
