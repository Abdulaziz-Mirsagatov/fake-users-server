import { RandomData } from "@/app/api/users/types";
import { MersenneTwister19937, Random } from "random-js";

import { faker as fakerEn } from "@faker-js/faker/locale/en_US";
import { faker as fakerRu } from "@faker-js/faker/locale/ru";
import { faker as fakerDe } from "@faker-js/faker/locale/de";
import { Faker } from "@faker-js/faker";
import { REGIONS } from "@/constants";
import removeCharFromStr from "./removeCharFromStr";
import addCharToStr from "./addCharToStr";
import swapCharsInStr from "./swapCharsInStr";

export default function addErrors(
  data: RandomData[],
  numErrors: number,
  seed: number,
  fields: string[],
  region: REGIONS
) {
  for (let i = 0; i < numErrors; i++) {
    // different seed for each error
    let random = new Random(MersenneTwister19937.seed(seed + i));
    const randomError = random.integer(0, 3);

    // delete character in random position
    if (randomError === 0) {
      const randomRow = random.integer(0, data.length - 1);
      const randomField = fields[random.integer(0, fields.length - 1)];
      const randomChar = random.integer(
        0,
        data[randomRow][randomField].length - 1
      );

      const str = data[randomRow][randomField];
      const newStr = removeCharFromStr(str, randomChar);
      data[randomRow][randomField] = newStr;
    } else if (randomError === 1) {
      // add character in random position
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

      // different seed for each error
      faker.seed(seed + i);

      const randomRow = random.integer(0, data.length - 1);
      const randomField = fields[random.integer(0, fields.length - 1)];
      const randomCharPos = random.integer(
        0,
        data[randomRow][randomField].length - 1
      );
      const randomChar = faker.person.firstName().charAt(0);

      const str = data[randomRow][randomField];
      const newStr = addCharToStr(str, randomCharPos, randomChar);
      data[randomRow][randomField] = newStr;
    } else {
      // swap two characters in random position
      const randomRow = random.integer(0, data.length - 1);
      const randomField = fields[random.integer(0, fields.length - 1)];
      const randomCharPos1 = random.integer(
        0,
        data[randomRow][randomField].length - 1
      );
      const randomCharPos2 = random.integer(
        0,
        data[randomRow][randomField].length - 1
      );

      const str = data[randomRow][randomField];
      const newStr = swapCharsInStr(str, randomCharPos1, randomCharPos2);
      data[randomRow][randomField] = newStr;
    }
  }

  return data;
}
