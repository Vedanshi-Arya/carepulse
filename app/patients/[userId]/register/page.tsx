import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'

async function Register({params:{userId}}:SearchParamProps) {

const user=await getUser(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container flex-1 flex-col py-10 max-w-[860px]">
          <Image className="mb-12 h-10 w-fit" src="/assets/icons/logo-full.svg" priority={false} height={1000} width={1000} alt="logo"></Image>

          <RegisterForm user={user}/>

          <div className="text-14-regular flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">© 2024 CarePlus</p>
            <Link href="/?admin=true" className="text-green-500">Admin</Link>
          </div>

        </div>
      </section>
      <Image src="/assets/images/register-img.png" alt="patient" height={1000} width={1000} className="side-img max-w-[390px]"></Image>
    </div>
  )
}

export default Register
