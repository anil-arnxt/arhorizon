import { motion } from "framer-motion";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`mt-24 inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 `}>
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            <span className="text-[#915EFF]">AR</span> Horizon
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            Transform your brand with AR image tracking.{" "}
            <br className="sm:block hidden" />
            Elevate your products with stunning 3D visuals.
          </p>
        </div>
      </div>
      <div className="absolute top-56 h-64 w-full sm:h-[550px] cursor-pointer">
        <ComputersCanvas />
      </div>
    </section>
  );
};

export default Hero;
