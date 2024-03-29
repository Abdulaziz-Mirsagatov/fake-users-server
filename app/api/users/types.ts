import { REGIONS } from "@/constants";
import { NextRequest } from "next/server";

export interface UsersRequest extends NextRequest {
  query: {
    region: REGIONS;
    numErrors: string;
    seed: string;
    page: string;
    limit: string;
  };
}

export interface RandomData {
  id: string;
  name: string;
  address: string;
  phone: string;
  [key: string]: string;
}
