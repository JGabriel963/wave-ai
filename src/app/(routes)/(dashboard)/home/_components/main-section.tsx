import { RiEmotionHappyFill } from "@remixicon/react";

import Header from "../../_components/header";

const MainSection = () => {
  return (
    <>
      <Header />
      <div className="relative w-full">
        <div className="w-full max-w-2xl max-auto space-y-5">
          <div className="w-full flex items-center justify-center mt-16">
            <h1
              className="flex items-center gap-2 font-semibold text-pretty text-center
              tracking-tighter text-gray-800 dark:text-white sm:text-[30px]
              md:text-[35px] text-[24px]
             opacity-0 fade-in-up [animation-delay:200ms] z-0"
            >
              <RiEmotionHappyFill className="size-6 md:size-10 lg:mt-2" />
              How can I help you today?
            </h1>
          </div>

          {/* Chat Interface */}
          <div className="w-full pt-7">
            <div className="w-full">
              <span className="text-sm dark:text-white/50">Recent notes</span>
            </div>
            {/* {Recent Notes} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainSection;
