"use client";

import { categoryFilters } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Categories = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get("category");

  const handleRoutingTags = (filter: string) => {
    if (filter === category) {
      router.push("/");
    } else {
      router.push(`${pathname}?category=${filter}`);
    }
  };

  return (
    <div className="flexBetween max-w-[85dvw] flex-wrap gap-5">
      <ul className="flex gap-2 overflow-auto">
        {categoryFilters.map((filter) => (
          <li key={filter}>
            <button
              onClick={() => handleRoutingTags(filter)}
              className={`${
                category === filter
                  ? "bg-light-white-300 font-medium"
                  : "font-normal"
              } whitespace-nowrap rounded-lg px-4 py-3 capitalize`}
            >
              {filter}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
