import React from 'react'
import Image from 'next/image'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import {E164Number} from 'libphonenumber-js/core'
import DatePicker from "react-datepicker"
import 'react-date-picker/dist/DatePicker.css';
import { Input } from "@/components/ui/input"
import {
    
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Control } from 'react-hook-form'
import { FormFieldType } from './forms/PatientForm'
import { Select, SelectContent, SelectValue } from './ui/select'

  interface CustomProps{
    control : Control<any>,
    fieldType: FormFieldType,
    name:string,
    label?:string,
    placeholder?:string,
    iconSrc?:string,
    iconAlt?:string,
    disabled?:boolean,
    dateFormat?:string,
    showTimeSelect?:boolean,
    children?:React.ReactNode,
    renderSkeleton?:(field:any)=> React.ReactNode,
  }


  const RenderField= ({field,props}:{field:any; props : CustomProps})=>{
    const{ fieldType,iconSrc,iconAlt,placeholder,showTimeSelect ,dateFormat, renderSkeleton}=props
    
      switch(fieldType){
        case FormFieldType.INPUT:
          return (
            <div className='flex rounded-md border border-dark-500 bg-dark-400 '>
              {iconSrc && (
                <Image src={iconSrc} height={24} width={24} className='ml-2' alt={iconAlt || 'icon'}></Image>

              )}
              <FormControl>
                <Input
                placeholder={placeholder}
                {...field}
                className='shad-input border-0'/>
              </FormControl>
            </div>
          )
        case FormFieldType.PHONE_INPUT:
          return(
            <FormControl>
              <PhoneInput
              defaultCountry="IN"
              placeholder={placeholder}
              international
              withCountryCallingCode
              value={field.value as E164Number | undefined }
              // error
              onChange={field.onChange}
              className='input-phone'
              />
            </FormControl>

          )
        case FormFieldType.DATE_PICKER:
          return (
            <div className='flex rounded-md border border-dark-500 bg-dark-400'>
              <Image src="/assets/icons/calender.svg" alt="calender" height={24} width={24} className='ml-2'></Image>
              <FormControl>
                <DatePicker selected={field.value} 
                onChange={(date)=> field.onChange(date)}
                showTimeSelect={showTimeSelect ?? false}
                dateFormat={dateFormat ?? 'MM/dd/yyyy'}
                timeInputLabel='Time'
                wrapperClassName='date-picker'

                ></DatePicker>

              </FormControl>
            </div>
          )
        case FormFieldType.SELECT:
          return (<FormControl>
            <Select onValueChange={field.onChange}
            defaultValue={field.value}>
              <FormControl className='shad-select-trigger'>
                <SelectValue placeholder={placeholder}></SelectValue>
              </FormControl>
              <SelectContent className='shad-select-content'>
                {props.children}
              </SelectContent>
              
            </Select>
          </FormControl>)
        case FormFieldType.SKELETON:
          return renderSkeleton? renderSkeleton(field ):null
        default:
          break;

      }
    
  }

const CustomFormField = ( props:CustomProps) => {

  const{ control, fieldType, name,label}=props

  return (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className='flex-1'>
            {fieldType !==FormFieldType.CHECKBOX && label &&(
              <FormLabel>{label}</FormLabel>
            )}

              <RenderField field={field} props={props}></RenderField>
              <FormMessage className='shad-error'/>

          </FormItem>
        )}
      />
  )
}

export default CustomFormField