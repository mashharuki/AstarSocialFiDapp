import Image from "next/image";
import type { Dispatch, FC } from "react";
import { BsArrowLeft } from "react-icons/bs";

type Props = {
      userImgUrl: string;
      userName: string;
      setShowMessageModal: Dispatch<React.SetStateAction<boolean>>;
};

/**
 * MessageBar component 
 * @param props 
 * @returns 
 */
export const MessageBar: FC<Props> = (props: Props) => {
      return (
            <>
                  <div className="bg-[#ADE9F6] h-24 w-full flex flex-row items-center justify-center">
                        <Image
                              className="rounded-full h-16 w-16 mx-2"
                              src={props.userImgUrl}
                              alt="profile_logo"
                              width={30}
                              height={30}
                              quality={100}
                        />
                        <div className="font-semibold text-4xl text-ellipsis overflow-hidden w-[200px]  items-center  justify-center">
                              {props.userName}
                        </div>
                  </div>
                  <BsArrowLeft
                        className="absolute top-8 left-[500px] h-12 w-12"
                        onClick={() => props.setShowMessageModal(false)}
                  />
            </>   
      );
};