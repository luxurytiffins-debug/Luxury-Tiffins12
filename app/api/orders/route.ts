import { db } from "@/lib/db";

interface OrderItem {
 productId: string;
 quantity: number;
}

interface OrderAddress {
 house: string;
 street: string;
 area: string;
 city: string;
 state: string;
 pincode: string;
}

interface OrderBody {
 items: OrderItem[];
 address: OrderAddress;
}

function isOrderBody(value: unknown): value is OrderBody {
 if (!value || typeof value !== "object") return false;
 const body = value as Record<string, unknown>;
 const address = body.address;
 if (!Array.isArray(body.items) || !address || typeof address !== "object") return false;
 const addressRecord = address as Record<string, unknown>;
 return body.items.every((item: unknown) => {
    if (!item || typeof item !== "object") return false;
    const orderItem = item as Record<string, unknown>;
    return typeof orderItem.productId === "string" && typeof orderItem.quantity === "number" && Number.isInteger(orderItem.quantity) && orderItem.quantity > 0;
 }) && ["house", "street", "area", "city", "state"].every((key) => typeof addressRecord[key] === "string") && 
 typeof addressRecord.pincode === "string" && /^\d{6}$/.test(addressRecord.pincode);
}

export async function POST(req:Request){
 try{
    const rawBody: unknown = await req.json();
    if (!isOrderBody(rawBody)) return Response.json({error:"Invalid order request."},{status:400});
    const body = rawBody;
  const ids=body.items.map(i=>i.productId);
  const products=await db.product.findMany({where:{id:{in:ids},active:true}});
  if(products.length!==new Set(ids).size) return Response.json({error:"One or more products are unavailable."},{status:400});
   const lines: Array<{ product: (typeof products)[number]; quantity: number }> = body.items.map((i) => {
const p = products.find(
   (x: (typeof products)[number]) => x.id === Number(i.productId)
);
if (!p) {
  throw new Error(`Couldn't find product: ${i.productId}`);
}

return {
  product: p,
  quantity: i.quantity,
};
      return { product: p, quantity: i.quantity };
   });
      const subtotal = lines.reduce(
         (sum: number, line: (typeof lines)[number]) => sum + Number(line.product.price) * line.quantity,
         0,
      );
  const tax=Math.round(subtotal*0.05*100)/100;
  const delivery=subtotal>=499?0:49;
  const total=subtotal+tax+delivery;
   const order=await db.order.create({data:{status:"PLACED",paymentStatus:"PENDING",subtotal,tax,deliveryFee:delivery,total,address:body.address,items:{create:lines.map((x) => ({productId:x.product.id,quantity:x.quantity,unitPrice:x.product.price}))}}});
  return Response.json({orderId:order.id,subtotal,tax,delivery,total,message:"Order created. Connect Razorpay credentials to complete payment."});
 }catch(e){return Response.json({error:"Invalid order request."},{status:400});}
}