
"use client"
import Link from "next/link";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { fetchTemp2 } from './../utils'
import { useState, useEffect } from "react";





const page = () => {
    const [allTemp, setTemp] = useState()
    const router = useRouter()

    const a = async () => {
        const b = await fetchTemp2()
        console.log(allTemp);
        
        setTemp(b)
    }
    useEffect(() => {
        a()
    }, [])


 









    return (
        <>
             
        </>

    )
}

export default page