// @ts-ignore - Prisma client and bcryptjs are provided by project dependencies at runtime.
import { PrismaClient } from "@prisma/client";
// @ts-ignore - Prisma client and bcryptjs are provided by project dependencies at runtime.
import bcrypt from "bcryptjs";
const db=new PrismaClient();
const products=[
["Royal Dal Tadka Tiffin","Comforting dal, seasonal sabzi, rice, roti and salad.",249,"Daily Tiffins"],
["Maharaja Veg Thali","A generous North Indian thali with premium sides.",399,"Premium Tiffins"],
["Premium Paneer Feast","Paneer curry, dal, rice, breads and dessert.",449,"Premium Tiffins"],
["Executive Lunch Box","Balanced office-ready meal with two mains and sides.",299,"Executive Meals"],
["Healthy Protein Tiffin","Protein-forward meal with grains, vegetables and curd.",329,"Healthy Meals"],
["Punjabi Gharana Meal","Homestyle Punjabi flavours with fresh breads.",349,"North Indian"],
["South Indian Deluxe Tiffin","Idli, vada, sambar, chutney and rice special.",279,"South Indian"],
["Luxury Family Combo","Family-sized combination of mains, breads and dessert.",899,"Family Packs"],
["Jain Satvik Tiffin","Thoughtful Jain meal prepared without onion or garlic.",299,"Jain Meals"],
["Mini Comfort Meal","A lighter portion for a satisfying everyday lunch.",199,"Mini Meals"],
["Butter Paneer Combo","Paneer, jeera rice, naan and cooling raita.",389,"Combos"],
["Dal Makhani Royal","Slow-cooked dal with rice and breads.",279,"North Indian"],
["Veg Biryani Feast","Aromatic biryani with raita and salad.",329,"Combos"],
["Curd Rice Delight","South Indian comfort meal with tempering and sides.",229,"South Indian"],
["Garden Fresh Bowl","Seasonal vegetables, grains and house dressing.",289,"Healthy Meals"],
["Gulab Jamun Pair","Warm syrup-soaked dessert.",99,"Desserts"],
["Rice Kheer","Creamy traditional rice pudding.",129,"Desserts"],
["Masala Chaas","Chilled spiced buttermilk.",79,"Beverages"],
["Fresh Lime Cooler","Fresh citrus cooler.",89,"Beverages"],
["Classic Roti Pack","Fresh rotis for sharing.",79,"Daily Tiffins"]
];
async function main(){
 const cats=new Map<string,string>();
 for(const name of [...new Set(products.map(p=>p[3] as string))]){
  const c=await db.category.upsert({where:{slug:name.toLowerCase().replace(/[^a-z0-9]+/g,"-")},update:{},create:{name,slug:name.toLowerCase().replace(/[^a-z0-9]+/g,"-")}});
  cats.set(name,c.id);
 }
 for(const [i,p] of products.entries()){
  const [name,description,price,cat]=p as [string,string,number,string];
  await db.product.upsert({where:{slug:name.toLowerCase().replace(/[^a-z0-9]+/g,"-")},update:{},create:{name,slug:name.toLowerCase().replace(/[^a-z0-9]+/g,"-"),description,price,categoryId:cats.get(cat)!,stock:50,featured:i<4,bestseller:i<6,isNew:i>=16}});
 }
 for(const [name,meals,price] of [["Weekly",7,1299],["Monthly",30,4999],["Premium Monthly",30,6999]] as [string,number,number][]) await db.subscriptionPlan.upsert({where:{id:name.toLowerCase().replaceAll(" ","-")},update:{},create:{id:name.toLowerCase().replaceAll(" ","-"),name,description:`${meals} premium meals`,price,meals}});
 const hash=await bcrypt.hash("ChangeMe123!",12);
 await db.user.upsert({where:{email:"admin@luxurytiffins.local"},update:{},create:{name:"Luxury Tiffins Admin",email:"admin@luxurytiffins.local",phone:"9999999999",passwordHash:hash,role:"SUPER_ADMIN"}});
 console.log("Seed complete. Demo admin: admin@luxurytiffins.local / ChangeMe123! (change immediately).");
}
main().finally(()=>db.$disconnect());