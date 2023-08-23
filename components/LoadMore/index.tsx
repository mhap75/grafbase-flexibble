"use client";

import { useRouter } from "next/navigation";
import { Button } from "..";

type LoadMoreProps = {
  startCursor: string;
  endCursor: string;
  hasPrevious: boolean;
  hasNext: boolean;
};

const LoadMore = ({
  startCursor,
  endCursor,
  hasNext,
  hasPrevious,
}: LoadMoreProps) => {
  const router = useRouter();

  const handleNavigation = (dir: string) => {
    const currentParams = new URLSearchParams(window.location.search);

    if (dir === "next" && hasNext) {
      currentParams.delete("startcursor");
      currentParams.set("endcursor", endCursor);
    } else if (dir === "first" && hasPrevious) {
      currentParams.delete("endcursor");
      currentParams.set("startcursor", startCursor);
    }

    const newSearchParams = currentParams.toString();
    const newPathname = `${window.location.pathname}?${newSearchParams}`;

    router.push(newPathname);
  };

  return (
    <div className="flexCenter mt-10 w-full gap-5">
      {hasPrevious && (
        <Button
          className="w-1/2 bg-purple-500 text-white"
          onClick={() => handleNavigation("first")}
        >
          First
        </Button>
      )}
      {hasNext && (
        <Button
          className="w-1/2 bg-purple-500 text-white"
          onClick={() => handleNavigation("next")}
        >
          Next
        </Button>
      )}
    </div>
  );
};

export default LoadMore;
