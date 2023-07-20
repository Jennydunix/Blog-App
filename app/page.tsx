import Link from "next/link";

// fetch all the blogs from the database and return the jsx part
async function fetchBlogs() {
  // Fetch API
  // After 10 seconds, it will fetch all the blogs from the database
  const res = await fetch(`http://localhost:3000/api/blog`, {
    next: {
      revalidate: 10, // 10 seconds (using revalidate means the cache won't be stored in the app)
    },
  });
  // Convert response to JSON
  const data = await res.json();
  return data.posts;
}

export default async function Home() {
  const posts = await fetchBlogs();
  console.log(posts);
  return (
    <main className="w-full h-full">
      <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-4 rounded-lg bg-slate-800 drop-shadow-xl">
        <h1 className="text-slate-200 text-center text-2x font-extrabold font-[verdana]">
          BLOG POST
        </h1>
      </div>
      {/* Link */}
      <div className="flex my-5">
        <Link
          href={"/blog/add"}
          className="md:w-1/6 sm:w-2/4 text-center rounded-md p-2 m-auto bg-slate-200 font-semibold"
        >
          {/* Add new Blog */}
          Add new Blog 🚀
        </Link>
      </div>
      {/* Blogs */}
      <div className="w-full flex flex-col justify-center items-center">
        {posts?.map((post: any) => {
          return (
            <div
              className="w-3/4 p-4 rounded-md mx-3 my-3 bg-slate-200 flex flex-col justify-center"
              key={post.id}
            >
              {/* Title and Action Button */}
              <div className="flex items-center my-3">
                <div className="mr-auto">
                  <h2 className="mr-auto font-semibold">{post.title}</h2>
                </div>
                <Link
                  href={`/blog/edit/${post.id}`}
                  className="px-4 py-1 text-center text-xl bg-slate-900 rounded-md font-semibold text-slate-200"
                >
                  Edit
                </Link>
              </div>
              {/* Date and Description */}
              <div className="mr-auto my-1 ">
                <blockquote className="font-bold text-slate-700 ">
                  {new Date(post.date).toDateString()}
                </blockquote>
              </div>
              <div className="mr-auto my-1">
                <h2>{post.description}</h2>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
