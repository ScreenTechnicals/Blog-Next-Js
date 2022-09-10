import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '../utils/supabaseClient';

const Card = ({ title, desc, image, slug }) => {
  const {data:image_url} = supabase.storage.from("images").getPublicUrl(image);

  return (
    <Link href={`/posts/${slug}`}>
        <div className='w-[90%] md:w-[400px] h-[450px] border shadow-md m-5 p-5 cursor-pointer hover:scale-[1.1] transition-all overflow-hidden'>
            <div className='h-auto mb-6 overflow-hidden'>
                <img src={image_url.publicURL} alt="" />
            </div>
            <h1 className='text-3xl font-[600] capitalize pb-3'>{title}</h1>
            <p>{desc.slice(0, 200)}...</p>
        </div>
    </Link>
  )
}

export default Card