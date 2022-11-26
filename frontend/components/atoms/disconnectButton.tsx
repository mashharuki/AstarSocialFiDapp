import { useRouter } from "next/router";
import { FC } from "react";

/**
 * DisconnectButton component
 * @returns 
 */
const DisconnectButton: FC = () => {
      // useRouter
      const router = useRouter();

      return (
            <button
                  onClick={() => {
                        router.push("/");
                  }}
                  className="z-10 text-xl text-white items-center flex justify-center h-14 bg-[#003AD0] hover:bg-blue-700  py-2 px-4 rounded-full mr-4"
            >
                  Disconnect Wallet
            </button>
      );
};

export default DisconnectButton;