import type { FC } from "react";

import { InputBox } from "../atoms/inputBox";
import { SendButton } from "../atoms/sendButton";

type Props = {
      submit: (event: any) => Promise<void>;
};

/**
 * FormBox component
 * @param props 
 * @returns 
 */
export const FormBox: FC<Props> = (props: Props) => {
      return (
            <div className="bottom-0 h-20 w-full bg-gray-300 items-center flex justify-center flex-row ">
                  <form
                        onSubmit={props.submit}
                        className="flex flex-row space-x-3 px-3 w-full"
                  >
                        <InputBox />
                        <SendButton />
                  </form>
            </div>
      );
};