import React, { Dispatch, FC } from "react";
import { IconType } from "react-icons";
import { BiCommentEdit, BiHomeSmile, BiUser } from "react-icons/bi";

import BottomLogo from "../atoms/bottomLogo";

type Props = {
      selectedScreen: string;
      setSelectedScreen: Dispatch<React.SetStateAction<string>>;
};

type Screen = {
      name: string;
      icon: IconType;
};

/**
 * Footer component
 * @param props 
 * @returns 
 */
const Footer: FC<Props> = (props: Props) => {

      const screenInfoList: Array<Screen> = [
            { name: "home", icon: BiHomeSmile },
            { name: "profile", icon: BiUser },
            { name: "message", icon: BiCommentEdit },
      ];

      return (
            <div className="text-xl bg-[#D9D9D9] h-20 space-x-28 flex-row items-center justify-center flex px-10">
                  {screenInfoList.map((screenInfo) => (
                        <BottomLogo
                              selectedScreen={props.selectedScreen}
                              screenName={screenInfo.name}
                              setSelectedScreen={props.setSelectedScreen}
                              icon={screenInfo.icon}
                        />
                  ))}
            </div>
      );
};

export default Footer;