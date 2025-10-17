import BuyClient from "@/components/buy/BuyClient";

export const metadata = {
  title: "Buy Properties in UAE | Earlybirds",
  description: "Find villas, apartments & townhouses for sale in UAE with Earlybirds Properties. Your dream home awaits!",
};

export default async function BuyPage({ searchParams }) {
  // Await searchParams for Next.js 15 compatibility
  const params = await searchParams;
  const propertyType = params?.propertyType || "";
  const emirate = params?.emirate || "";
  
  return <BuyClient propertyType={propertyType} emirate={emirate} />;
}
