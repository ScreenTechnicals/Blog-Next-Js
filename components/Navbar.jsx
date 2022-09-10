import React, { useEffect, useState } from 'react'
import Link from "next/link"
import { supabase } from '../utils/supabaseClient'
import {useRouter} from "next/router"

const Navbar = () => {
    const router = useRouter();
    const [session, setSession] = useState(null)

    useEffect(()=>{
        setSession(supabase.auth.session())
        supabase.auth.onAuthStateChange((_event, session)=>{
            setSession(session);
        })
    });
  return (
    <div className='w-full py-5 px-20 flex justify-between items-center bg-[#6317fb]'>
        <div>
            <Link href={"/"}>
                <a className='text-white font-[800] text-3xl'>Blog</a>
            </Link>
        </div>
        <div>
           {
               session ?
               <button className='text-[#6317fb] bg-[#fff] py-1 px-5 rounded font-[600] hover:bg-[#000] hover:text-[#fff] transition-colors' onClick={()=>{supabase.auth.signOut(); router.reload()}}>Sign Out</button> : <Link href={'/login'}>
            <button className='text-[#6317fb] bg-[#fff] py-1 px-5 rounded font-[600] hover:bg-[#000] hover:text-[#fff] transition-colors'>Sign In</button>
        </Link>
           }
        </div>
    </div>
  )
}

export default Navbar