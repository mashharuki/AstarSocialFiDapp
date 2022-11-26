import type { FC } from "react";

type Props = {
  message: string;
};

/**
 * SubmitButton component
 * @param props 
 * @returns 
 */
export const SubmitButton: FC<Props> = (props: Props) => {
      return (
            <button
                  className="rounded-3xl h-10 w-32 bg-[#003AD0] text-white"
                  type="submit"
            >
                  {`${props.message}!`}
            </button>
      );
};