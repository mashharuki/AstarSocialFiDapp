import { Dispatch, FC } from "react";
import { BsGear } from "react-icons/bs";

type Props = {
      isOpenModal: Dispatch<React.SetStateAction<boolean>>;
      name: string;
};

/**
 * ProfileTitle component
 * @param props 
 * @returns 
 */
export const ProfileTitle: FC<Props> = (props: Props) => {
      return (
            <div className="flex flex-row items-center space-x-2">
                  <div className="text-2xl font-semibold">{props.name}</div>
                  <BsGear
                        onClick={() => props.isOpenModal(true)}
                        className="fill-gray-500 h-7 w-7"
                  />
            </div>
      );
};