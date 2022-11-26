import { Dispatch, FC } from "react";
import { BsPlusLg } from "react-icons/bs";

type Props = {
      setShowNewPostModal: Dispatch<React.SetStateAction<boolean>>;
};

/**
 * PostButton component
 * @param props 
 * @returns 
 */
export const PostButton: FC<Props> = (props: Props) => {
      return (
            <button
                  onClick={() => {
                        props.setShowNewPostModal(true);
                  }}
                  className="rounded-full h-14 w-14 bg-[#003AD0] absolute bottom-24 right-1/3 mr-5 items-center flex justify-center"
            >
                  <BsPlusLg className="h-9 w-9" />
            </button>
      );
};