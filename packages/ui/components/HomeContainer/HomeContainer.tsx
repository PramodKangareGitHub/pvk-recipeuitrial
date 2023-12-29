"use client";
import classNames from "classnames";
import { useContext, useEffect } from "react";
import { useDarkMode } from "usehooks-ts";
import { ZiplyAuthenticationContext } from "../../context/ZiplyAuthContext";
import { useRouter } from "next/navigation";

interface Icon {
  className?: string;
}

export function HomeContainer() {
  const { data, error, loading, } = useContext(ZiplyAuthenticationContext);
  const router = useRouter();
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    if (!loading) {
      if(data){
        router.push("/editor");
      }
    }
  }, [data, error, loading]);


  return (
    <div
      className={classNames(
        "min-h-screen sm:flex sm:flex-col lg:grid grid-cols-5",
        "2xl:flex 2xl:flex-row 2xl:justify-center"
      )}
    >
      <div
        className={classNames(
          "m-6 sm:m-8 lg:text-base lg:m-12 col-span-2 flex flex-col justify-center items-center relative text-sm sm:text-lg",
          "2xl:flex-1 2xl:items-end"
        )}
      >
        <div className="rounded-md mb-4 dark:text-white h-fit space-y-4 2xl:max-w-2xl">
          <h1 className="font-bold text-xl lg:text-3xl">Recipe UI - Ziply Version</h1>
          <p className="my-2 ">
            RecipeUI is the open source Postman alternative with{" "}
            <span className="font-bold underline-offset-2 underline">
              type safety
            </span>{" "}
            built in.
          </p>
        </div>
      </div>
    </div>
  );
}
