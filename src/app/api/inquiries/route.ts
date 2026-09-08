import { NextResponse } from "next/server";
import { routeInquiry, storeInquiry, type InquiryInput } from "@/lib/inquiries";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as InquiryInput;
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const region = String(body.region || "").trim();
    const interest = String(body.interest || "").trim();
    if (!name || !email || !region) {
      return NextResponse.json({ error: "Name, email, and region are required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
    }
    const input: InquiryInput = {
      name,
      email,
      phone: body.phone,
      region,
      interest,
      communitySlug: body.communitySlug,
      homeSlug: body.homeSlug,
      message: body.message,
    };
    const route = routeInquiry(input);
    await storeInquiry(input);
    return NextResponse.json({ ok: true, route });
  } catch {
    return NextResponse.json({ error: "Could not route this inquiry." }, { status: 500 });
  }
}
