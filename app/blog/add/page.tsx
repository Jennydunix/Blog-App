"use client";

import { useRouter } from "next/navigation";
import React, { Fragment, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

// To add this blog to the database
const postBlog = async ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  // make http request to the backend
  const res = fetch(`http://localhost:3000/api/blog`, {
    method: "POST",
    body: JSON.stringify({ title, description }),
    // @ts-ignore
    "Content-Type": "application/json",
  });
  return (await res).json();
};

const AddBlog = () => {
    const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if(titleRef.current && descriptionRef.current) {
        toast.loading("Uploading🚀",{id:"1"})
        await postBlog({
            title: titleRef.current?.value,
            description: descriptionRef.current?.value,
          });
          toast.success("Blog posted Successfuly ✨",{id:"1"})
          router.push("/")
    }
  };
  return (
    <Fragment>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3 ">
            Create a Blog 🚀
          </p>
          <form onSubmit={handleSubmit}>
            <input
              ref={titleRef}
              placeholder="Enter Title"
              type="text"
              className="rounded-md px-4 py-2 my-2 w-full"
            />
            <textarea
              ref={descriptionRef}
              placeholder="Share your Thoughts..."
              className="rounded-md px-4 py-2 w-full my-2"
            ></textarea>
            <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
              Post
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AddBlog;
