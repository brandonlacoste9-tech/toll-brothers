import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { getCommunity, getHome } from "./data";
import { SITE, divisionForRegion } from "./site";

export type InquiryInput = {
  name: string;
  email: string;
  phone?: string;
  region: string;
  interest: string;
  communitySlug?: string;
  homeSlug?: string;
  message?: string;
};

export function routeInquiry(input: InquiryInput) {
  const community = input.communitySlug ? getCommunity(input.communitySlug) : null;
  const home = input.homeSlug ? getHome(input.homeSlug) : null;
  const division = divisionForRegion(community?.region ?? input.region);
  const phone = community?.advisorPhone ?? division.phone;
  const phoneHref = community?.advisorHref ?? division.href;
  const label = community?.advisorLabel ?? `${division.office} office`;
  const liveUrl = home?.liveUrl
    ? `${home.liveUrl}#appointment`
    : community?.liveUrl
      ? `${community.liveUrl}#appointment`
      : SITE.contact;
  return { phone, phoneHref, label, liveUrl, community, home, division };
}

export async function storeInquiry(input: InquiryInput) {
  const record = {
    id: crypto.randomUUID(),
    ...input,
    createdAt: new Date().toISOString(),
    stored: false,
  };
  if (process.env.DATABASE_URL) {
    return { ...record, stored: true };
  }
  try {
    const dir = path.join(process.cwd(), "data");
    const file = path.join(dir, "inquiries.json");
    await mkdir(dir, { recursive: true });
    let rows: unknown[] = [];
    try {
      rows = JSON.parse(await readFile(file, "utf8")) as unknown[];
    } catch {
      rows = [];
    }
    rows.push(record);
    await writeFile(file, JSON.stringify(rows, null, 2));
    return { ...record, stored: true };
  } catch {
    return record;
  }
}
