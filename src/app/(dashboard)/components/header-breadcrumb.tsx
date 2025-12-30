"use client";

import Link from "next/link";
import { SlashIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function HeaderBreadcrumb() {
  // pathname
  const pathname = usePathname();
  const segments = pathname.split("/").filter((segment) => segment !== "");

  // is account page
  const isAccountPage = segments[0] === "account";

  const breadcrumbs = isAccountPage
    ? ["Account"]
    : segments[0] === "exams"
    ? ["Exams"]
    : segments[0] === "exam"
    ? ["Exams", segments[1].split("-").join(" "), "Questions"]
    : [];

  return (
    <div className="bg-white p-4 text-sm">
      <Breadcrumb>
        <BreadcrumbList>
          {/* home */}
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link className="text-gray-400 hover:text-blue-600" href="/">
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={index}>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>

              <BreadcrumbItem>
                <BreadcrumbPage
                  className={`${
                    index === breadcrumbs.length - 1
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                >
                  {breadcrumb.charAt(0).toUpperCase() + breadcrumb.slice(1)}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
