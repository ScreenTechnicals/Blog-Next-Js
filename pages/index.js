import Head from 'next/head'
import Image from 'next/image'
import Card from '../components/Card'
import styles from '../styles/Home.module.css'
import { supabase } from "../utils/supabaseClient";

export async function getStaticProps() {
  let { data: Posts, error } = await supabase.from('Blog-Post').select('*')
  return {
    props: {
      Posts
    },
    revalidate: 10,
  }
}

export default function Home({ Posts }) {

  return (
   <div className='w-full min-h-screen'>
      <h1 className='text-center p-5 md:text-4xl font-[600]'>All Blog Posts</h1>
      <div className='md:px-10 flex flex-wrap justify-center'>
        {
          Posts && Posts.map((post)=>{
            return(
              <Card key={post.id} title={post.title} desc={post.desc} image={post.image} slug={post.slug} />
            )
          })
        }
      </div>
   </div>
  )
}
