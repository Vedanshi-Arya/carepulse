"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOptions } from "@/constants"
import { Label } from "@radix-ui/react-label"
import { SelectItem } from "../ui/select"
import Image from "next/image"


export enum FormFieldType{
    INPUT='input',
    TEXTAREA='textarea',
    PHONE_INPUT='phoneInput',
    CHECKBOX='checkbox',
    DATE_PICKER='datePicker',
    SELECT='select',
    SKELETON='skeleton'

}
 

 
export const RegisterForm=({user}:{user:User})=> {
  const router= useRouter()

  const [isLoading,setIsLoading]=useState(false)

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email:"",
      phone:"",
    },
  })
 
  
  async function onSubmit({name,email,phone}: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try{
      const userData={name,email,phone}

      const user= await createUser(userData);

      if(user) router.push(`/patients/${user.$id}/register`)
    


    }catch(error){
      console.log(error)
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className=" space-y-4">
            <h1 className="header">Welcome </h1>
            <p className="text-dark-700">Let us know more about yourself</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
          <h2 className="sub-header">Personal Information</h2>
          </div>
          
        </section>
        <CustomFormField 
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="name"
        label="Full Name"
        placeholder="John Doe"
        iconSrc="/assets/icons/user.svg"
        iconAlt="user"  
        />

        <div className="flex flex-col xl:flex-row">

          <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="JohnDoe@gmail.com"
            iconSrc="/assets/icons/email.svg"
          
            iconAlt="email"  
            />

          <CustomFormField 
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone number"
            placeholder="(+91) 22727 "
            
            />
        </div>

        <div className="flex flex-col xl:flex-row">

          <CustomFormField 
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="birthDate"
            label="Birth Date"
            placeholder="JohnDoe@gmail.com"
            iconSrc="/assets/icons/email.svg"
          
            iconAlt="email"  
            />

          <CustomFormField 
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Gender"
            renderSkeleton={(field)=>(
              <FormControl>
                <RadioGroup className="flex h-11 gap-6 xl:justify-between"
                onValueChange={field.onChange}
                defaultValue={field.value}>
                  {GenderOptions.map((option)=>(
                    <div key={option} className="radio-group">
                      <RadioGroupItem value={option} id={option}></RadioGroupItem>
                      <Label htmlFor={option} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  )
                  
                  )}

                </RadioGroup>
              </FormControl>
            )}
            
            />
        </div>


        <div className="flex flex-col xl:flex-row">
        <CustomFormField 
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="address"
        label="Address"
        placeholder="14 street"
        />

        <CustomFormField 
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="occupation"
        label="Occupation"
        placeholder="Teacher"
        /></div>

    
        <div className="flex flex-col xl:flex-row">
          <CustomFormField 
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="emergencyContactName"
          label="Emergency Contact Name"
          placeholder="Guardian's name"
          />

          <CustomFormField 
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="emergencyContactNumber"
          label="Emergency Contact Number"
          placeholder="(+91) 8686"
          />
        </div>

        
        {/*  section 2 */}

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
          <h2 className="sub-header">Medical Information</h2>
          </div>
        </section>

        <CustomFormField 
        fieldType={FormFieldType.SELECT}
        control={form.control}
        name="primaryPhysician"
        label="Primary Physician"
        placeholder="Select a physician"
        // error
       {...Doctors.map((doctor)=>(
        <SelectItem key={doctor.name} value={doctor.name}>
          <div className="flex cursor-pointer items-center gap-2">
            <Image src={doctor.image} alt={doctor.name} width={32} height={32} className="rounded-full border border-dark-500"></Image>
            <p>{doctor.name}</p>
          </div>
          
        </SelectItem>

       ))}
        />


<div className="flex flex-col xl:flex-row"></div>
<div className="flex flex-col xl:flex-row"></div>
<div className="flex flex-col xl:flex-row"></div>
<div className="flex flex-col xl:flex-row"></div>
<div className="flex flex-col xl:flex-row"></div>
<div className="flex flex-col xl:flex-row"></div>
        
        
       



      
      <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
    </form>
  </Form>
  )
}

export default RegisterForm