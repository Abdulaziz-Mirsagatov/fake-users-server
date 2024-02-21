"use server";

import { REGIONS } from "@/constants";
import { fetchData } from "@/services";
import { revalidateTag } from "next/cache";

export const fetchDataClient = async ({
  region,
  numErrors,
  seed,
  page = 1,
  limit = 20,
}: {
  region: REGIONS;
  numErrors: string;
  seed: string;
  page?: number;
  limit?: number;
}) => {
  const pageStr = page.toString();
  const limitStr = limit.toString();
  const data = await fetchData(region, numErrors, seed, pageStr, limitStr);
  return data;
};

export const revalidateTagAction = (tag: string) => {
  revalidateTag(tag);
};
