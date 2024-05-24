import React from "react";
import style from "./style.module.scss";
import clsx from "clsx";
import Link from "next/link";

const TabChildCategory = ({
  category_parent_slug,
  categoryData,
  category_child_slug,
}: any) => {
  return (
    <div className={clsx(style.tab, "animate__animated animate__fadeIn")}>
      {categoryData?.items
        ?.filter((item: any) => item.parent_slug === category_parent_slug)
        .map((item: any, index: number) => (
          <Link
            key={item.slug}
            href={`?category_parent=${item.parent_slug}&category_child=${item.slug}`}
            className={clsx(
              style.item,
              {
                [style.active]: category_child_slug
                  ? item.slug === category_child_slug
                  : index === 0,
              },
              "animate__animated animate__fadeIn"
            )}
          >
            {item.name}
          </Link>
        ))}
    </div>
  );
};

export default TabChildCategory;
