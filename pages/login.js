import React, { useState } from 'react'
import { supabase } from '../utils/supabaseClient';

const Login = () => {
  const [email, setEmail] = useState("");
  // console.log(email);
  const handleSubmint = async(e) =>{
    e.preventDefault();
    const { user } = await supabase.auth.signIn({email: email.trim()});
    alert('Email Has Been Sent Successfully')
  }
  return (
    <div className='w-full min-h-screen'>
        <form onSubmit={handleSubmint} className='md:w-[50%] mx-auto border shadow p-10 mt-20 space-y-7 rounded-md'>
            <div className='space-y-3'>
                <h1 className='text-center text-3xl font-extrabold'>Enter Your <span className='text-[#6317fb]'>Email</span></h1>
                <input className='border border-[#6317fb] w-full py-2 px-3 rounded-md' type="email" name="email" id="email" placeholder='example@example.com' onChange={(e)=>{setEmail(e.target.value)}} value={email} />
            </div>
            <div>
                <button type='submit' className='w-full bg-[#6317fb] text-white py-2 rounded-md'>Sign In</button>
            </div>
        </form>
    </div>
  )
}

export default Login