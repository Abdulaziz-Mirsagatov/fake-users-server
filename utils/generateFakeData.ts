import { faker as fakerEn } from "@faker-js/faker/locale/en_US";
import { faker as fakerRu } from "@faker-js/faker/locale/ru";
import { faker as fakerDe } from "@faker-js/faker/locale/de";
import { Faker } from "@faker-js/faker";
import { REGIONS } from "@/constants";
import { RandomData } from "@/app/api/users/types";

export const dynamic = "force-dynamic"; // defaults to auto

export default function generateFakeData(
  amount: number,
  region: REGIONS,
  seed: number
) {
  fakerEn.seed(seed);
  fakerRu.seed(seed);
  fakerDe.seed(seed);

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
  for (let i = 0; i < amount; i++) {
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

  return randomData;
}
