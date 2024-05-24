"use client";

import Link from "next/link";
import React, { FormEvent, useState } from "react";

const CreatePost = () => {
  const [form, setForm] = useState({
    title: "",
    sub_description: "",
    main_description: "",
  });
  const onChangeTextInput = (e: any) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = fetch("/api/post/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    console.log("response :>> ", response);
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <p>
          <label htmlFor="">Title</label> <br />
          <input
            name="title"
            value={form.title}
            onChange={onChangeTextInput}
            type="text"
            placeholder="Input title..."
          />
        </p>
        <p>
          <label htmlFor="">Sub description</label> <br />
          <input
            name="sub_description"
            value={form.sub_description}
            onChange={onChangeTextInput}
            type="text"
            placeholder="Input Sub description..."
          />
        </p>
        <p>
          <label htmlFor="">Main description</label> <br />
          <input
            name="main_description"
            value={form.main_description}
            onChange={onChangeTextInput}
            type="text"
            placeholder="Input Main description..."
          />
        </p>
        <p>
          <button type="submit">Submit</button> <br />
          <Link href={"/posts"}>Back to Posts</Link>
        </p>
      </form>
    </div>
  );
};

export default CreatePost;
