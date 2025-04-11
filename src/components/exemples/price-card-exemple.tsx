import { basicFeatures, premiumFeatures, standardFeatures } from "data/feature-data";
import { useState } from "react";
import { Button } from "../ui/button";
import { IPriceCardProps, PriceCard } from "../ui/price-card";
import { TBillingCycle } from "../ui/pricing";

type TPricingPlans = Omit<IPriceCardProps, "billingCycle">[];

// Define pricing plan configurations
const pricingPlans: TPricingPlans = [
  {
    title: "Basic Plan",
    description: "Access to a curated selection of abstract images",
    pricing: ["9.99", "6.99"],
    features: basicFeatures,
    buttonVariant: "secondary"
  },
  {
    title: "Standard Plan",
    description: "Next-level Integrations, priced economically",
    pricing: ["19.99", "15.99"],
    features: standardFeatures,
    isFeatured: true,
    headingText: "Most Popular",
    variant: "highlighted"
  },
  {
    title: "Premium Plan",
    description: "Experience limitless living for power users",
    pricing: ["29.99", "25.99"],
    features: premiumFeatures,
    buttonVariant: "secondary"
  }
];

export const PriceCardExample = () => {
  const [billingCycle, setBillingCycle] = useState<TBillingCycle>("monthly" as TBillingCycle);

  const toggleBillingCycle = () => {
    setBillingCycle((prev) => (prev === "monthly" ? "annually" : "monthly"));
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center flex flex-col gap-5">
        <p className="text-indigo-700 font-semibold text-base">Pricing Tiers</p>
        <h2 className="font-semibold text-3xl">Fit for all your needs</h2>
        <p className="text-neutral-600 text-xl">
          Pick the plan that suits you today and step up as your demands grow - our flexible options have your journey mapped out.
        </p>
      </div>
      <div
        className="flex justify-center items-center rounded"
      >
        <Button
          size={"lg"}
          variant={billingCycle === "monthly" ? "secondary" : "linkColor"}
          className="fill-neutral-900 text-neutral-900 min-w-[140px] justify-center"
          onClick={toggleBillingCycle}
          textContent={"Monthly"}
        />
        <Button
          size={"lg"}
          variant={billingCycle === "monthly" ? "linkColor" : "secondary"}
          className="fill-neutral-900 text-neutral-900 min-w-[140px] justify-center"
          onClick={toggleBillingCycle}
          textContent={"Annually"}
        />
      </div>

      <div className="flex flex-col justify-center gap-6 md:flex-row">
        {pricingPlans.map((plan, index) => (
          <PriceCard
            key={index}
            {...plan}
            billingCycle={billingCycle}
          />
        ))}
      </div>
    </div>
  );
};