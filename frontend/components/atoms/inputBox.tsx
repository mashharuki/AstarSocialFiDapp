import type { FC } from "react";

/**
 * InputBox
 * @returns 
 */
export const InputBox: FC = () => {
      return (
            <input
                  id="message"
                  name="message"
                  type="text"
                  className="flex-1 h-11 bg-white"
            />
      );
};