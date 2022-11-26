import type { FC } from "react";
import { BiSend } from "react-icons/bi";

/**
 * SendButton component
 * @returns 
 */
export const SendButton: FC = () => {
      return (
            <button type="submit">
                  <BiSend className="w-11 h-11" />
            </button>
      );
};