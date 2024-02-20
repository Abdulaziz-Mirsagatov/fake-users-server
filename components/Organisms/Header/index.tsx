"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";
import { FormData } from "./types";
import { REGIONS } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Header = () => {
  const [formData, setFormData] = useState<FormData>({
    region: "usa",
    numErrors: 0,
    seed: 0,
  });
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.name === "numErrors" &&
      (Number(e.target.value) > 1000 || Number(e.target.value) < 0)
    )
      return;
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const newParams = new URLSearchParams(searchParams);
    newParams.set(e.target.name, e.target.value);
    if (e.target.value !== "") newParams.set(e.target.name, e.target.value);
    else newParams.set(e.target.name, "0");
    router.push(`${pathname}?${newParams.toString()}`);
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, region: e.target.value }));

    const newParams = new URLSearchParams(searchParams);
    if (e.target.value !== "") newParams.set(e.target.name, e.target.value);
    else newParams.set(e.target.name, "0");
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const shuffleSeed = () => {
    setFormData((prev) => ({
      ...prev,
      seed: Math.floor(Math.random() * 100000),
    }));
    const newParams = new URLSearchParams(searchParams);
    newParams.set("seed", Math.floor(Math.random() * 100000).toString());
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <header className="p-4 bg-medium-dark flex flex-wrap gap-y-4 justify-between justify-items-center items-center font-bold">
      <div className="flex gap-2 items-center">
        <label htmlFor="region" className="text-lg">
          Region:
        </label>
        <select
          name="region"
          id="region"
          className="input select"
          value={formData.region}
          onChange={handleSelectChange}
        >
          {[
            { name: "USA", value: REGIONS.USA },
            { name: "Deutschland", value: REGIONS.DEUTSCHLAND },
            { name: "Russia", value: REGIONS.RUSSIA },
          ].map((region) => (
            <option key={region.value} value={region.value}>
              {region.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-2 items-center">
        <label htmlFor="error-range" className="text-lg">
          Errors:
        </label>
        <input
          type="range"
          name="numErrors"
          id="error-range"
          className="input"
          min={0}
          max={10}
          value={formData.numErrors}
          onChange={handleChange}
        />
        <input
          type="number"
          name="numErrors"
          id="error"
          className="input"
          value={formData.numErrors}
          max={1000}
          min={0}
          onChange={handleChange}
        />
      </div>
      <div className="flex gap-2 items-center">
        <label htmlFor="seed" className="text-lg">
          Seed:
        </label>
        <input
          type="number"
          name="seed"
          id="seed"
          className="input"
          value={formData.seed}
          onChange={handleChange}
        />
        <Icon
          icon="mdi:shuffle-variant"
          className="text-2xl cursor-pointer"
          onClick={shuffleSeed}
        />
      </div>
      <button className="button regular">Export</button>
    </header>
  );
};

export default Header;
