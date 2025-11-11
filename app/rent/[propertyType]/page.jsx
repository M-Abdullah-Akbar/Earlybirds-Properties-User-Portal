import RentClient from "@/components/rent/RentClient";

// Map URL property types (plural) to API property types (singular)
const propertyTypeMap = {
  apartments: "apartment",
  villas: "villa",
  townhouses: "townhouse",
  penthouses: "penthouse",
  offices: "office",
  studios: "studio"
};

export async function generateMetadata({ params }) {
  const { propertyType } = await params;
  const mappedType = propertyTypeMap[propertyType] || propertyType;
  const displayName = mappedType.charAt(0).toUpperCase() + mappedType.slice(1);
  
  return {
    title: `Rent ${displayName}s in UAE | Earlybirds`,
    description: `Find ${displayName.toLowerCase()}s for rent in UAE with Earlybirds Properties. Flexible rental options available.`,
  };
}

export default async function RentPropertyTypePage({ params }) {
  // Await params for Next.js 15 compatibility
  const { propertyType } = await params;
  
  // Map URL property type (plural) to API property type (singular)
  const mappedPropertyType = propertyTypeMap[propertyType] || propertyType;
  
  return <RentClient propertyType={mappedPropertyType} emirate="" />;
}

