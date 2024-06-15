'use client'
import { setLoading } from "@/redux/features/loadingSlice";
import { useAppDispatch } from "@/redux/hooks";
import { makeToast } from "@/utils/helper";
import axios from "axios";
import Image from "next/image";
import { FormEvent, useState } from "react";

interface IPayload {
    imgSrc: null | string;
    filekey:null | string;
    name:string;
    category:string;
    price:string;
}

const ProductForm = () => {

    const [payload,setpayload] = useState<IPayload>({
        imgSrc:null,
        filekey:null,
        name:"",
        category:"",
        price:""
    });

    const dispatch = useAppDispatch();

    const handleSubmit = (e:FormEvent) =>{
        e.preventDefault();
        dispatch(setLoading(true))
        axios.post("/api/add_product",payload).then((res)=>{
            makeToast("Product added Successfully");
            setpayload({
                imgSrc:null,
                filekey:null,
                name:"",
                category:"",
                price:""
            })
        })
        .catch((err)=>console.log(err))
        .finally(()=>dispatch(setLoading(false)));
    };
    
    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Image src={payload.imgSrc ? payload.imgSrc : "/Placeholder.png"} className="max-h-[300px] w-auto object-contain round" width={800} height={500} alt="product_image">
            </Image>
        </form>
    )
}

export default ProductForm
