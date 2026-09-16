// @ts-ignore React types may be unavailable in the editor's current project configuration.
'use client';
// @ts-ignore React types may be unavailable in the editor's current project configuration.
import { useState } from "react";
export default function CheckoutPage(){
 const [loading,setLoading]=useState(false);
  const [message,setMessage]=useState("");
 async function submit(e:any){e.preventDefault();
    setLoading(true);setMessage("Creating secure checkout...");
    const items=JSON.parse(localStorage.getItem("luxury-cart")||"[]");
    const r=await fetch("/api/orders",{
        method:"POST",headers:{"content-type":"application/json"},
        body:JSON.stringify({items,address:{
            house:e.target.house.value,
            street:e.target.street.value,area:e.target.area.value,
            city:e.target.city.value,state:e.target.state.value,
            pincode:e.target.pincode.value}})});
        const d=await r.json();setMessage(d.message||d.error||"Unable to create order.");
        setLoading(false);}
 return <main className="container-x max-w-3xl py-16">
    <h1 className="text-4xl font-bold">Checkout</h1>
    <p className="mt-2 text-white/50">Secure server-side order calculation.</p>
    <form onSubmit={submit} className="card mt-8 grid gap-4 p-6 sm:grid-cols-2">
        {["house","street","area","city","state","pincode"]
        .map(x=><input key={x} name={x}
            required placeholder={x[0].toUpperCase()+x.slice(1)} 
        className="rounded-xl border border-white/10 
        bg-black p-3 outline-none focus:border-[#D4AF37]"/>)}
        <button disabled={loading} className="gold-bg rounded-full 
        p-3 font-semibold sm:col-span-2">{loading?"Processing...":"Create Order"}
            </button>{message&&<p className="text-sm text-white/60 sm:col-span-2">{message}
            </p>}
            </form>
            </main>;
}