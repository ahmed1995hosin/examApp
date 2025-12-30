"use client";

import { Timer, ChevronDown } from "lucide-react";
import useExams from "../_hook/use-exams";
import InfiniteScroll from "react-infinite-scroll-component";
import Exam from "@/lib/types/exam";
import { useRouter } from "next/navigation";

export default function ExamsList({ subjectId }: { subjectId: string }) {
  // state
  const router = useRouter();

  // useExams
  const {
    exams,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useExams(subjectId);
  const examsAll: Exam[] = exams?.pages.flatMap((page) => page.exams) || [];

  // function slugify
  function slugify(text: string) {
    return text
      .trim()
      .replace(/[\s_]+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-+/g, "-");
  }
  return (
    <InfiniteScroll
      dataLength={examsAll.length}
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
          <p className="text-red-600">Error loading Exams</p>
        </div>
      )}

      {/* Exams list */}
      <div className="mx-12">
        {examsAll.length > 0 &&
          examsAll.map((exam) => (
            <div
              key={exam._id}
              onClick={() => {
                const slug = slugify(exam.title);
                router.push(`/exam/${slug}/${exam._id}`);
              }}
              className="bg-blue-50 p-4 my-4 hover:bg-blue-100 duration-75 cursor-pointer flex justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-blue-600">
                  {exam.title}
                </h3>
                <p className="text-gray-500 text-sm">
                  {exam.numberOfQuestions} Questions
                </p>
              </div>

              <p className="text-gray-800 text-sm flex items-center">
                <Timer className="h-6 w-6 mr-1 text-gray-400" />
                Duration: {exam.duration} minutes
              </p>
            </div>
          ))}

        {/* scroll to view more */}
        {!isFetchingNextPage && !isLoading && !error && (
          <div className="flex flex-col text-base items-center my-6 font-light text-gray-600">
            {hasNextPage ? (
              <>
                <p className="pt-2.5 text-center">Scroll to view more</p>
                <ChevronDown className="w-7 h-7 text-gray-400" />
              </>
            ) : (
              <p className="pt-2.5 text-center">No more exams</p>
            )}
          </div>
        )}
      </div>
    </InfiniteScroll>
  );
}
