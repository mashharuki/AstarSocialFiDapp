import { FC } from "react";

type Props = {
      title: string;
      name: string;
};

/**
 * BigInput component
 * @param props 
 * @returns 
 */
export const BigInput: FC<Props> = (props: Props) => {
      return (
            <div className="flex flex-col items-start w-full my-4">
                  <div className="mr-2 text-2xl ml-[32px]">{`${props.title}:`}</div>
                  <input
                        id={props.name}
                        name={props.name}
                        type="text"
                        className="w-64 h-32 bg-white flex ml-4"
                  />
            </div>
      );
};