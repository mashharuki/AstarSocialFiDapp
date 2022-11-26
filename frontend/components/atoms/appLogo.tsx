import Image from "next/image";
import type { FC } from "react";

/**
 * AppLogo component
 * @returns 
 */
const AppLogo: FC = () => {
      return (
            <div className="flex-row flex items-center ml-[5px]">
                  <Image
                        className="w-[50px] h-[50px]"
                        src="/unchain_logo.png"
                        alt="unchain_logo"
                        width={30}
                        height={30}
                  />
                  <Image
                        className="w-[40px] h-[25px]"
                        src="/cross_mark_2_logo-removebg.png"
                        alt="cross_logo"
                        width={30}
                        height={30}
                  />
                  <Image
                        className="w-[50px] h-[50px]"
                        src="/Astar_logo.png"
                        alt="astar_logo"
                        width={30}
                        height={30}
                  />
            </div>
      );
};
    
export default AppLogo;
    