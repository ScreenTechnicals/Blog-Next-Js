import React, { useEffect, useRef, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import { BsArrowRight } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/router";
// export async function getStaticPaths() {
//   let { data: Posts, error } = await supabase.from("Blog-Post").select("*");
//   const paths = Posts.map((post) => {
//     return {
//       params: {
//         slug: post.slug,
//       },
//     };
//   });
//   return {
//     paths,
//     fallback: false, // can also be true or 'blocking'
//   };
// }
export async function getServerSideProps(context) {
  const slug = context.query.slug;
  let { data: Post, error } = await supabase
    .from("Blog-Post")
    .select("*")
    .eq("slug", slug);

  let { data: Feedback } = await supabase
    .from("Feedback")
    .select("*")
    .eq("postId", slug);

  console.log(Feedback);

  return {
    props: {
      Post,
      slug,
      Feedback,
    },
    // revalidate: 10,
  };
}

const Slug = ({ Post, slug, Feedback }) => {
  const router = useRouter();
  const contentRef = useRef(null);
  const [message, setMessage] = useState("");
  const createFeedback = async (e) => {
    e.preventDefault();

    if (localStorage.getItem("supabase.auth.token")) {
      const currentSession = JSON.parse(
        localStorage.getItem("supabase.auth.token")
      ).currentSession;
      const user = currentSession.user;
      const userEmail = user.email;
      const { data, error } = await supabase.from("Feedback").insert([
        {
          userEmail: userEmail,
          postId: slug,
          message: message,
        },
      ]);
      alert("SUBMITED !");
      router.reload();
    }
  };
  useEffect(() => {
    contentRef.current.innerHTML = Post[0].content;
  });
  return (
    <div className="w-full min-h-screen p-5 md:px-20 md:py-10">
      <h1 className="text-4xl font-[700]">{Post[0].title}</h1>
      <div className="mt-5 content" ref={contentRef}></div>
      <div className="w-full mt-10">
        <h1 className="text-3xl font-[600] pb-5">Give Your Feedback Here!</h1>
        <form className="w-[600px] flex items-center" onSubmit={createFeedback}>
          <input
            type="text"
            className="border w-full px-3 py-2 outline-none focus:border-[#005eff]"
            placeholder="Type Here"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
          />
          <button className="bg-[#005eff] text-white px-5 py-2">
            <BsArrowRight className="inline-block text-2xl" />
          </button>
        </form>
      </div>
      <div className="mt-20">
        <h2 className="text-2xl font-[500] pb-10">Comments({Feedback ? Feedback.length : 0})</h2>
        {Feedback
          ? Feedback.map((feed) => {
              return (
                <div className="space-x-4 mb-10" key={feed.id}>
                  <div className="flex items-center space-x-1 px-4">
                    <FaUserCircle className="inline-block text-xl" />
                    <p className="text-red-500">{feed.userEmail}</p>
                  </div>
                  <p className="bg-[#e8e8f0] py-2 px-4 rounded-xl">
                    {feed.message}
                  </p>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default Slug;
