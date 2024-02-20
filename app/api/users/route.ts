import { faker as fakerEn } from "@faker-js/faker/locale/en_US";
import { faker as fakerRu } from "@faker-js/faker/locale/ru";
import { faker as fakerDe } from "@faker-js/faker/locale/de";
import { RandomData, UsersRequest } from "./types";
import { Faker } from "@faker-js/faker";
import { REGIONS } from "@/constants";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: UsersRequest) {
  const searchParams = request.nextUrl.searchParams;
  const region = searchParams.get("region");
  const numErrors = searchParams.get("numErrors");
  const seed = searchParams.get("seed");

  let faker: Faker;
  switch (region) {
    case REGIONS.RUSSIA:
      faker = fakerRu;
      break;
    case REGIONS.DEUTSCHLAND:
      faker = fakerDe;
      break;
    case REGIONS.USA:
      faker = fakerEn;
      break;
    default:
      faker = fakerEn;
  }

  const randomData: RandomData[] = [];
  for (let i = 0; i < 20; i++) {
    let address;
    switch (region) {
      case REGIONS.RUSSIA:
        address = `${faker.location.zipCode()}, ${faker.location.state()}, ${faker.location.streetAddress()}, ${faker.location.buildingNumber()}`;
        break;
      case REGIONS.DEUTSCHLAND:
        address = `${faker.location.streetAddress()}, ${faker.location.buildingNumber()}, ${faker.location.zipCode()}, ${faker.location.city()}`;
        break;
      case REGIONS.USA:
        address = `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.state()}, ${faker.location.zipCode()}`;
        break;
      default:
        address = faker.location.streetAddress() + ", " + faker.location.city();
    }

    randomData.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      phone: faker.phone.number(),
      address,
    });
  }

  return new Response(JSON.stringify(randomData), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
