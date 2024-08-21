import Image from "next/image";
import Link from "next/link";
import PatientForm from "@/components/forms/PatientForm";

export default function Home() {
  return(
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image className="mb-12 h-10 w-fit" src="/assets/icons/logo-full.svg" priority={false} height={1000} width={1000} alt="logo"></Image>

          <PatientForm/>

          <div className="text-14-regular flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">© 2024 CarePlus</p>
            <Link href="/?admin=true" className="text-green-500">Admin</Link>
          </div>

        </div>
      </section>
      <Image src="/assets/images/onboarding-img.png" alt="patient" height={1000} width={1000} className="side-img max-w-[50%]"></Image>
    </div>
  )
}
