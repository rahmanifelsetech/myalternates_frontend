import React from "react";
import PageMeta from "../components/common/PageMeta";
import Button from "@/shared/components/ui/button/Button";
import { ArrowRightIcon, ChatIcon } from "@/shared/icons";
import { useNavigate } from "react-router";

export type ErrorType = "400" | "403" | "404" | "500" | "503" | "maintenance";

interface ErrorPageProps {
  type?: ErrorType;
  title?: string;
  description?: string;
  className?: string;
}

const errorConfig: Record<
  ErrorType,
  {
    code?: string;
    // lightImage: string;
    // darkImage: string;
    defaultTitle: string;
    defaultDescription: string;
  }
> = {
  "400": {
    code: "400",
    // lightImage: "/images/error/404.svg", // Fallback to 404 image as 400 specific might not exist
    // darkImage: "/images/error/404-dark.svg",
    defaultTitle: "Bad Request",
    defaultDescription: "The request couldn’t be processed due to missing or incorrect information. Please refresh the page or try again.",
  },
  "403": {
    code: "403",
    // lightImage: "/images/error/404.svg", // Fallback
    // darkImage: "/images/error/404-dark.svg",
    defaultTitle: "Forbidden",
    defaultDescription: "You do not have permission to access this resource.",
  },
  "404": {
    code: "404",
    // lightImage: "/images/error/404.svg",
    // darkImage: "/images/error/404-dark.svg",
    defaultTitle: "Page Not Found",
    defaultDescription: "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
  },
  "500": {
    code: "500",
    // lightImage: "/images/error/500.svg",
    // darkImage: "/images/error/500-dark.svg",
    defaultTitle: "Internal Server Error",
    defaultDescription: "Something went wrong on our end. Please try again later.",
  },
  "503": {
    code: "503",
    // lightImage: "/images/error/503.svg",
    // darkImage: "/images/error/503-dark.svg",
    defaultTitle: "Service Unavailable",
    defaultDescription: "The service is temporarily unavailable. Please check back later.",
  },
  maintenance: {
    // lightImage: "/images/error/maintenance.svg",
    // darkImage: "/images/error/maintenance-dark.svg",
    defaultTitle: "Under Maintenance",
    defaultDescription: "We are currently performing scheduled maintenance. We'll be back shortly.",
  },
};

export default function ErrorPage({
  type = "404",
  title,
  description,
  className = "",
}: ErrorPageProps) {
  const navigate = useNavigate();
  const config = errorConfig[type] || errorConfig["404"];

  const effectiveTitle = title || config.defaultTitle;
  const effectiveDescription = description || config.defaultDescription;

  // Helper to ensure we don't break if images are missing (though we're pointing to existing ones mostly)
  const getImage = (isDark: boolean) => {
    // For 400/403 we reuse 404 images if specific ones don't exist in the file system
    // Based on provided file list, only 404, 500, 503, maintenance exist.
    // if (type === "400" || type === "403") {
      return isDark ? "/images/error/error-dark.png" : "/images/error/error-light.png";
    // }
    // return isDark ? config.darkImage : config.lightImage;
  };

  return (
    <>
      <PageMeta
        title={`${effectiveTitle} | MyAlternates`}
        description={effectiveDescription}
      />
      <div
        className={`bg-[#f6f6f8] dark:bg-[#373736] relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1 ${className}`}
      >
        <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
          {config.code && (
            <h1 className="mb-4 font-normal text-[#C8AB5D] text-title-2xl">
              {config.code}
            </h1>
          )}

          <img
            src={getImage(false)}
            alt={type}
            className="dark:hidden mx-auto mb-8"
          />
          <img
            src={getImage(true)}
            alt={type}
            className="hidden dark:block mx-auto mb-8"
          />

          <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white/90">
            {effectiveTitle}
          </h2>

          <p className="mb-8 text-base text-gray-700 dark:text-gray-400 sm:text-lg">
            {effectiveDescription}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => navigate("/", { replace: true })}
              variant="primary"
              startIcon={<ArrowRightIcon className="rotate-180" />}
            >
              Go back to Dashboard
            </Button>

            <Button
              onClick={() =>
                (window.location.href = "mailto:support@myalternates.com")
              }
              variant="outline"
              startIcon={<ChatIcon />}
            >
              Contact Support
            </Button>
          </div>
        </div>

        {/* <!-- Footer --> */}
        <p className="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2 dark:text-gray-400">
          &copy; {new Date().getFullYear()} MyAlternates All rights reserved
        </p>
      </div>
    </>
  );
}