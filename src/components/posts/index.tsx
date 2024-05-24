"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState<any>(null);
  useEffect(() => {
    const params = {
      slug: "san-pham-1",
    };
    const getPosts = async () => {
      const response = await fetch(`/api/product/detail`, {
        method: "POST",
        body: JSON.stringify(params),
      }).then((res) => res.json());
      setPosts(response?.data);
    };
    getPosts();
  }, []);
  console.log("posts :>> ", posts);
  return (
    <div>
      <Link href={"/posts/create"}>
        <button type="button">Create New Post</button>
      </Link>{" "}
      <br />
      <h4>Post: </h4>
      {/* <div>
        {posts?.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid black",
              padding: "8px 8px",
              marginBottom: 12,
            }}
          >
            title: {item.title} <br />
            sub desciption: {item.sub_description} <br />
            main desciption: {item.main_description} <br />
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Posts;
