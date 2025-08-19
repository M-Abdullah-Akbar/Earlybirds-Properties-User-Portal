import React from "react";
import CommonAbout from "../common/CommonAbout";

export default function OffPlanAbout() {
  const offPlanData = {
    title: "Off-Plan Properties for Sale in Dubai through Early Birds Properties",
    description: [
      "Off-plan property in Dubai has become extremely popular in recent years with the city's property market continuing to grow and flourish. With new projects appearing in all the different neighborhoods of the emirate, many investors and would-be homebuyers are searching for the ideal opportunity to invest or buy their dream home.",
      "At Early Birds Properties, we have numerous years of experience in the Dubai off-plan real estate market, so you can be confident to select the perfect property that meets all your needs even before completion. We also assist with each aspect of your property purchase to give you a smooth experience from start to completion."
    ],
    sections: [
      {
        title: "What Are Off-Plan Properties?",
        description: "Off-plan properties are properties in construction or not yet begun. For the purpose of helping buyers imagine the ultimate product, developers use devices such as floor plans, computer-generated images (CGIs), and accurate architectural drawings to present how the finished property will look."
      },
      {
        title: "Types of Off-Plan Properties in Dubai",
        description: "Those who would like to buy off-plan properties in Dubai can get access to an extensive variety of options, which include: Apartments Villas Townhouses Duplexes Commercial Spaces Most of the off-plan developments in Dubai provide a vast array of configurations, including various numbers of bedrooms, property sizes, and designs to suit diversified needs and preferences."
      },
      {
        title: "Advantages and Disadvantages of Off-Plan Property Investment",
        description: "Just like any investment option, off-plan property purchase has its advantages and disadvantages. The following is a summary of the key advantages and disadvantages to consider:",
        subsections: [
          {
            title: "Advantages:",
            listItems: [
              "<strong>Cheaper Prices:</strong> Off-plan property is generally cheaper than ready apartments, and with the chances to generate more value in the long term when it's still under construction.",
              "<strong>Flexible Payment Arrangements:</strong> There are payment-based installment arrangements coming from the developers, facilitating things with your finances.",
              "<strong>Personalization:</strong> Off-plan property for a new home has the option of personalizing and decorating to your liking.",
              "<strong>Potential for High ROI:</strong> The real estate market in Dubai is characterized by high demand and appreciation, providing investors with high returns in the long term."
            ]
          },
          {
            title: "Risks:",
            listItems: [
              "<strong>Developer Reputation:</strong> Research must be conducted on the developer's history to ensure they possess experience and credibility to complete the project within schedule and to the expected specifications.",
              "<strong>Limited Project Information:</strong> There is a possibility that there might not be adequate information to form a clear picture of the final output. Ensure you have complete information about the project's features and facilities.",
              "<strong>Postponed Completion:</strong> Off-plan development is normally delayed and could affect your financial planning or result in legal problems.",
              "<strong>Market Fluctuations:</strong> The market can change and affect off-plan properties, hence the need to know about changes in property prices.",
              "<strong>Additional Costs:</strong> The purchase price aside, there are some added costs like registration fees, transfer fees, and other costs that you should factor into your budget."
            ]
          }
        ]
      },
      {
        title: "Top Off-Plan Property Locations in Dubai in 2025",
        description: "Dubai offers a surplus of off-plan property options, ranging across budgets and tastes. Among the most sought-after zones for off-plan properties are:",
        subsections: [
          {
            title: "",
            listItems: [
              "<strong>Arjan:</strong> Located in Dubai land, Arjan boasts a mix of residential, commercial, and retail developments.",
              "<strong>Dubai Creek Harbour:</strong> An eco-friendly mega-complex with a mix of homes and business space.",
              "<strong>Downtown Dubai:</strong> The city's central business district, offering luxury apartments, penthouses, villas, and office buildings.",
              "<strong>Business Bay:</strong> Residential and commercial towers define Business Bay, a lively area along Dubai Canal.",
              "<strong>Rashid Yachts & Marina:</strong> A marinafront project offering luxury residences, hotels, and retail units.",
              "<strong>Emaar South:</strong> An Emaar Properties master development offering a range of apartments, villas, and townhouses.",
              "<strong>Dubai Hills Estate:</strong> High-end, gated community comprising high-rise apartments, villas, and townhouses.",
              "<strong>Jumeirah Village Circle (JVC):</strong> Residential community best for families with many apartment, villa, and townhouse choices."
            ]
          }
        ]
      },
      {
        title: "Iconic Off-Plan Developments in Dubai in 2025",
        description: "Following are some of the most eagerly awaited off-plan developments in Dubai that will give the cityscape a new shape in 2025:",
        subsections: [
          {
            title: "",
            listItems: [
              "<strong>Fairmont Residences Solara Tower:</strong> This is a luxury development by SOL Properties, which features 1- to 5-bedroom apartments and duplex penthouses with private areas. Payment plan: 60/40",
              "<strong>Helvetia Residences:</strong> Situated at Jumeirah Village Circle, this development features luxurious studios and 1- to 3-bedroom apartments. Payment plan: 50/50",
              "<strong>Rixos Financial Center Road Dubai Residences:</strong> This project provides diversified apartments and penthouses with luxurious amenities. Payment plan: 60/40",
              "<strong>St. Regis Residences:</strong> Luxury development providing 1- to 5-bedroom apartments and penthouses. Payment plan: 20/80",
              "<strong>MAG 777:</strong> Residential tower with studio, 1-, and 2-bedroom apartments. Payment plan: 50/50",
              "<strong>Damac Islands:</strong> Tropical resort-themed project with luxury townhouses and villas. Payment plan: 75/25",
              "<strong>Eden House, Dubai Hills:</strong> Luxury residential project with 32 villas in 5- to 6-bedroom layouts. Payment schedule: 50/50"
            ]
          }
        ]
      },
      {
        title: "Start Your Investment Journey with Early Birds Properties",
        description: "When you're ready to dive into Dubai's property market, off-plan buildings are an excellent place to begin. Early Birds Properties has experienced and trained staff that can be your trusted partner. It can help you find the perfect property that matches your needs and expectations. We'll walk you through every step of the way. Our expertise will provide you with a hassle- and stress-free property buying experience."
      }
    ]
  };

  return (
    <CommonAbout 
      title={offPlanData.title}
      description={offPlanData.description}
      sections={offPlanData.sections}
      parentClass="section-pre-approved"
    />
  );
}