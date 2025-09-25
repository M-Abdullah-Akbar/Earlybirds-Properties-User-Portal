import BuyClient from "@/components/buy/BuyClient";

export const metadata = {
  title: "Buy Properties in UAE | Earlybirds",
  description: "Find villas, apartments & townhouses for sale in UAE with Earlybirds Properties. Your dream home awaits!",
};

export default function BuyPage({ searchParams }) {
  return <BuyClient searchParams={searchParams} />;
}
