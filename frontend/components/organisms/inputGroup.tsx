import type { Dispatch, FC } from "react";

import { BigInput } from "../atoms/bigInput";
import { CloseButton } from "../atoms/closeButton";
import { SmallInput } from "../atoms/smallInput";
import { SubmitButton } from "../atoms/submitButton";

type Props = {
      message: string;
      submit: (event: any) => Promise<void>;
      afterOpenFn: Dispatch<React.SetStateAction<boolean>>;
};

/**
 * InputGroup component
 * @param props 
 * @returns 
 */
export const InputGroup: FC<Props> = (props: Props) => {
      return (
            <form
                  onSubmit={props.submit}
                  className="h-1/2 w-1/5 bg-gray-200 flex flex-col items-center justify-start"
            >
                  <div className="font-bold text-2xl pt-4">input post info!</div>
                  <SmallInput title="Image URL" name="imgUrl" />
                  <BigInput title="Description" name="description" />
                  <div className="flex flex-row space-x-1">
                        <CloseButton afterOpenFn={props.afterOpenFn} />
                        <SubmitButton message="Post" />
                  </div>
            </form>
      );
};