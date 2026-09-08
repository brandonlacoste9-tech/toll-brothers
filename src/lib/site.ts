export const SITE = {
  name: "Toll Brothers",
  tagline: "America's Luxury Home Builder",
  live: "https://www.tollbrothers.com/",
  founded: "1967",
  hq: "1140 Virginia Drive",
  hqCity: "Fort Washington, PA 19034",
  nyse: "NYSE: TOL",
  fortune: "#1 Most Admired Home Builder on Fortune magazine's 2026 World's Most Admired Companies list, the ninth year the company has achieved this honor.",
  x: "https://x.com/tollbrothers",
  investors: "https://investors.tollbrothers.com/",
  contact: "https://www.tollbrothers.com/contact",
  privacy: "https://www.tollbrothers.com/privacy",
  openHouse: "https://www.tollbrothers.com/national-open-house",
  openHouseWhen: "September 12-13",
  dac: "https://www.tollbrothers.com/designer-appointed-collections",
  qmi: "https://www.tollbrothers.com/qmi",
  advantage: "https://www.tollbrothers.com/advantage",
};

export const DIVISIONS = [
  { region: "Arizona", office: "Scottsdale", phone: "(480) 951-0782", href: "tel:+14809510782" },
  { region: "California", office: "Porter Ranch", phone: "(844) 700-8655", href: "tel:+18447008655" },
  { region: "California", office: "Orange", phone: "(714) 347-1300", href: "tel:+17143471300" },
  { region: "Texas", office: "Houston", phone: "(281) 894-8655", href: "tel:+12818948655" },
  { region: "New York", office: "City Living", phone: "(212) 742-0835", href: "tel:+12127420835" },
  { region: "New York", office: "Suburban", phone: "(203) 616-4900", href: "tel:+12036164900" },
  { region: "New Jersey", office: "City Living", phone: "(201) 217-6626", href: "tel:+12012176626" },
  { region: "Pennsylvania", office: "Bucks County", phone: "(215) 938-8196", href: "tel:+12159388196" },
] as const;

export function divisionForRegion(region: string) {
  return DIVISIONS.find((d) => d.region === region) ?? DIVISIONS[0];
}

export function money(n: number | null | undefined) {
  if (n == null) return "Price on request";
  return n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 2).replace(/\.00$/, "")}M`
    : `$${n.toLocaleString("en-US")}`;
}

export function moneyExact(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}
