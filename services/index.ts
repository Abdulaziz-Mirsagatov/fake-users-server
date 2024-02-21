import { REGIONS } from "@/constants";

export const dynamic = "force-dynamic"; // defaults to auto

export const fetchData = async (
  region: REGIONS,
  numErrors: string,
  seed: string,
  page = "1",
  limit = "20"
) => {
  const res = await fetch(
    `${process.env.API_URL}/api/users?` +
      new URLSearchParams({ region, numErrors, seed, page, limit }),
    {
      cache: "no-cache",
      next: { tags: ["data"] },
    }
  );
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
};
