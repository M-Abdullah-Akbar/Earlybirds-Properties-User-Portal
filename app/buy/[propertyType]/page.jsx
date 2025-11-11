import BuyClient from "@/components/buy/BuyClient";

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
    title: `Buy ${displayName}s in UAE | Earlybirds`,
    description: `Find ${displayName.toLowerCase()}s for sale in UAE with Earlybirds Properties. Your dream property awaits!`,
  };
}

export default async function BuyPropertyTypePage({ params }) {
  // Await params for Next.js 15 compatibility
  const { propertyType } = await params;
  
  // Map URL property type (plural) to API property type (singular)
  const mappedPropertyType = propertyTypeMap[propertyType] || propertyType;
  
  return <BuyClient propertyType={mappedPropertyType} emirate="" />;
}

