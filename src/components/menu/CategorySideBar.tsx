import React from "react";
import style from "./style.module.scss";
import Link from "next/link";
import clsx from "clsx";

const CategorySideBar = ({
  category_parent_slug,
  propose_slug,
  categoryData,
  proposeData,
}: any) => {
  return (
    <div className={style.category}>
      <div className={style.title}>Đề xuất:</div>
      <ul>
        {proposeData?.items.map((item: any) => (
          <li
            key={item.slug}
            className={clsx(
              {
                [style.active]: propose_slug && propose_slug === item.slug,
              },
              "animate__animated animate__fadeIn"
            )}
          >
            <Link href={`?propose=${item.slug}`}>
              <span>{item.name}</span>
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
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </Link>
          </li>
        ))}
      </ul>
      <div className={style.title}>Danh mục:</div>
      <ul>
        <li
          key={"all"}
          className={clsx(
            { [style.active]: !category_parent_slug && !propose_slug },
            "animate__animated animate__fadeIn"
          )}
        >
          <Link href={`/menu`}>
            <span>Tất cả món</span>
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </Link>
        </li>
        {categoryData?.items
          ?.filter((item: any) => parseInt(item.level) === 1)
          .map((item: any) => (
            <li
              key={item.slug}
              className={clsx(
                {
                  [style.active]:
                    category_parent_slug && category_parent_slug === item.slug,
                },
                "animate__animated animate__fadeIn"
              )}
            >
              <Link href={`?category_parent=${item.slug}`}>
                <span>{item.name}</span>
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
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CategorySideBar;
