"use client";

import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

type UpdateBlogParams = {
  title: string;
  description: string;
  id: string;
};

// To update this blog to the database
const updateBlog = async (data: UpdateBlogParams) => {
  // make http request to the backend
  const res = fetch(`http://localhost:3000/api/blog/${data.id}`, {
    method: "PUT",
    body: JSON.stringify({ title: data.title, description: data.description }),
    //@ts-ignore
    "Content-Type": "application/json",
  });
  return (await res).json();
};

// To delete a blog from the database
const deleteBlog = async (id: string) => {
  const res = fetch(`http://localhost:3000/api/blog/${id}`, {
    method: "DELETE",
    //@ts-ignore
    "Content-Type": "application/json",
  });
  return (await res).json();
};

// Define a function to get a blog by it's Id
const getBlogById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`);
  const data = await res.json();
  return data.post;
};

const EditBlog = ({ params }: { params: { id: string } }) => {
    // using useRouter from next.js to route the blog after editing and deleting blog post
    const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    toast.loading("Fetching Blog Details 🚀", { id: "1" });
    getBlogById(params.id)
      .then((data) => {
        if (titleRef.current && descriptionRef.current) {
          titleRef.current.value = data.title;
          descriptionRef.current.value = data.description;
          toast.success("Fetching Complete", { id: "1" });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error fetching blog", { id: "1" });
      });
  }, []);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (titleRef.current && descriptionRef.current) {
      toast.loading("Uploading🚀", { id: "1" });
      await updateBlog({
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
        id: params.id,
      });
      toast.success("Blog posted Successfuly ✨", { id: "1" });
    //   To route the application to the home page after successful blog post
      router.push("/")
    }
  };
  //   function to handle delete
  const handleDelete = async () => {
    toast.loading("Deleting Blog", { id: "2" });
    await deleteBlog(params.id);
    toast.success("Blog deleted Successfuly", { id: "2" });
    //   To route the application to the home page after deleting a blog post
    router.push("/")
  };
  return (
    <Fragment>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3 ">
            Edit Blog Post🚀
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
            <div className="flex justify-between ">
              <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
                Update Post
              </button>
            </div>
          </form>
          <button
                onClick={handleDelete}
                className="font-semibold px-4 py-2 my-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-red-500"
              >
                Delete Post
              </button>
        </div>
      </div>
    </Fragment>
  );
};

export default EditBlog;
