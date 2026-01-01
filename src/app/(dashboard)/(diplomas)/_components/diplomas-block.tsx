"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import useDiplomas from "../_hook/use-diplomas";
import { useRouter } from "next/navigation";
import Diploma from "@/lib/types/diploma";
import InfiniteScroll from "react-infinite-scroll-component";

export default function DiplomasBlock() {
  // usediplomas
  const {
    diplomas,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    error,
    isLoading,
  } = useDiplomas();

  // router
  const router = useRouter();

  // get diplomas
  const diplomasAll: Diploma[] =
    diplomas?.pages.flatMap((page) => page.subjects) || [];

  return (
    <InfiniteScroll
      dataLength={diplomasAll.length}
      hasMore={!!hasNextPage}
      next={fetchNextPage}
      loader={
        <p className="flex flex-col text-base items-center my-6 font-light text-gray-600 ">
          Loading more...
        </p>
      }
    >
      {/* loading */}
      {isLoading && (
        <div className="flex items-center justify-center min-h-screen animate-pulse bg-bule-50">
          <h2 className="text-4xl font-bold font-inter text-blue-600">
            <svg
              className="animate-spin h-5 w-5 mr-3 ... text-blue-600 "
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </h2>
        </div>
      )}

      {/* error message  */}
      {error && (
        <div className="bg-transparent p-6 flex items-center justify-center">
          <p className="text-red-600">Error loading diplomas</p>
        </div>
      )}

      {/* diplomas */}
      {diplomasAll && diplomasAll.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5 px-6">
          {diplomasAll.map((diploma) => (
            <div
              key={diploma._id}
              className=" h-[448px] relative cursor-pointer overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              onClick={() => {
                router.push(`/exams/${diploma._id}`);
              }}
            >
              <Image
                src={diploma.icon}
                alt={diploma.name}
                width={100}
                height={0}
                className="w-full object-cover h-full "
              />
              <div className="absolute left-2.5 bottom-2.5 right-2.5 object-fit">
                <h3 className="text-xl font-semibold px-4 py-5 bg-[#155DFC80] text-white text-center backdrop-blur-[6px]">
                  {diploma.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* scroll to view more */}
      {!isFetchingNextPage && !isLoading && (
        <div className="flex flex-col text-base items-center my-6 font-light text-gray-600">
          {hasNextPage ? (
            <>
              <p className="pt-2.5 text-center">Scroll to view more</p>
              <ChevronDown className="w-7 h-7 text-gray-400" />
            </>
          ) : (
            <p className="pt-2.5 text-center">No more diplomas</p>
          )}
        </div>
      )}
    </InfiniteScroll>
  );
}
