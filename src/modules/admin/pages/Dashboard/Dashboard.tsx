import typographyClasses from "@/shared/utils/typographyUtils";

export default function Blank() {
  return (
    <div>
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[630px] text-center">
          <h3 className={`mb-4 ${typographyClasses.heading.h3} ${typographyClasses.colors.text.primary}`}>
            Dashboard Content Here
          </h3>
        </div>
      </div>
    </div>
  );
}
