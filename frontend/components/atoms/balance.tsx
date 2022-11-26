import { FC } from "react";

type Props = {
  balance: string;
};

/**
 * Balance component
 * @param props 
 * @returns 
 */
export const Balance: FC<Props> = (props: Props) => {
  return <div className="text-2xl">{props.balance} MASH</div>;
};
