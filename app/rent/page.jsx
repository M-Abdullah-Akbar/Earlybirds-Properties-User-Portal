import RentClient from "@/components/rent/RentClient";

export const metadata = {
  title: "Rent Properties in UAE | Earlybirds",
  description: "Find apartments, villas & commercial spaces for rent in UAE with Earlybirds Properties. Flexible rental options available.",
};

export default async function RentPage({ searchParams }) {
  // Await searchParams for Next.js 15 compatibility
  const params = await searchParams;
  const propertyType = params?.propertyType || "";
  const emirate = params?.emirate || "";
  
  return <RentClient propertyType={propertyType} emirate={emirate} />;
}
