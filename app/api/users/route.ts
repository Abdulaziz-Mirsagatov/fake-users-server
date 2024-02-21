import generateFakeData from "@/utils/generateFakeData";
import { UsersRequest } from "./types";
import { REGIONS } from "@/constants";
import addErrors from "@/utils/addErrors";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: UsersRequest) {
  const searchParams = request.nextUrl.searchParams;
  const region = searchParams.get("region");
  const numErrors = Number(searchParams.get("numErrors"));
  const seed = Number(searchParams.get("seed"));
  const page = Number(searchParams.get("page"));
  const limit = Number(searchParams.get("limit"));

  const pageSeed = page + seed;

  const randomData = generateFakeData(limit, region as REGIONS, pageSeed);

  const fields = ["name", "address", "phone"];
  const randomDataWithErrors = addErrors(
    randomData,
    numErrors,
    pageSeed,
    fields,
    region as REGIONS
  );

  return new Response(JSON.stringify(randomData), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
