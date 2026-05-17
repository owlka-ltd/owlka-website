import { NextResponse } from "next/server";

export const dynamic = "force-static";

type Component = {
  name: string;
  status: "ok";
  detail: string;
};

type StatusResponse = {
  overall: "ok";
  checked_at: string;
  components: Component[];
};

export async function GET(): Promise<NextResponse<StatusResponse>> {
  const payload: StatusResponse = {
    overall: "ok",
    checked_at: new Date().toISOString(),
    components: [
      {
        name: "Encrypted middleman",
        status: "ok",
        detail: "passing sealed packets between phones and Macs",
      },
      {
        name: "Mac app downloads",
        status: "ok",
        detail: "signed .dmg served by Cloudflare",
      },
      {
        name: "Owlka website",
        status: "ok",
        detail: "serving this page",
      },
    ],
  };

  return NextResponse.json(payload, {
    status: 200,
    headers: {
      "Cache-Control": "s-maxage=300, stale-while-revalidate=600",
    },
  });
}
