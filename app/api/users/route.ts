import { UsersRequest } from "./types";
import { generateFakeData } from "@/utils/generateFakeData";
import { addErrors } from "@/utils/addErrors";
import { REGIONS } from "@/constants";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: UsersRequest) {
  const searchParams = request.nextUrl.searchParams;
  const region = searchParams.get("region");
  const numErrors = Number(searchParams.get("numErrors"));
  const seed = Number(searchParams.get("seed"));

  const randomData = generateFakeData(20, region as REGIONS, seed);

  const fields = ["name", "address", "phone"];
  const randomDataWithErrors = addErrors(
    randomData,
    numErrors,
    seed,
    fields,
    region as REGIONS
  );

  return new Response(JSON.stringify(randomData), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
