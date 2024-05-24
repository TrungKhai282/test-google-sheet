/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useMemo } from "react";
import style from "./style.module.scss";
import useStore from "@/stores/useStore";
import Link from "next/link";

const FeatureCategory = () => {
  const { data: categoryData, isLoading: isLoadingCategory } = useStore(
    (state) => state.categoryFilter
  );
  const getCategoryFilter = useStore((state) => state.getCategoryFilter);

  useEffect(() => {
    getCategoryFilter({
      feature: "TRUE",
    });
  }, [getCategoryFilter]);

  const featureRender = useMemo(() => {
    if (categoryData && categoryData.items && categoryData.items.length > 0) {
      return categoryData.items.map((item: any, index: number) => (
        <Link
          key={index}
          className={style.item}
          href={`/menu?category_parent=${item.parent_slug}&category_child=${item.slug}`}
        >
          <div className={style.image}>
            <img src={item.image_url} alt={item.name} />
          </div>
          <div className={style.name}>{item.name}</div>
          <div className={style.description}>{item.description}</div>
        </Link>
      ));
    }
    return <></>;
  }, [categoryData]);

  return <div className={style.list}>{featureRender}</div>;
};

export default FeatureCategory;
