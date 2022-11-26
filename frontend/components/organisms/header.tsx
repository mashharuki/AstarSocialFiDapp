import type { Dispatch, FC } from "react";

import AppLogo from "../atoms/appLogo";
import { Balance } from "../atoms/balance";
import DisconnectButton from "../atoms/disconnectButton";
import type { Id } from "../molecules/headerProfile";
import HeaderProfile from "../molecules/headerProfile";

type Props = {
      selectedScreen: string;
      imgUrl: string;
      idList: Id[];
      setActingAccount: (id: Id) => Dispatch<React.SetStateAction<string>>;
      balance: string;
};

/**
 * Header component
 * @param props 
 * @returns 
 */
const Header: FC<Props> = (props: Props) => {
      return (
            <div className="bg-[#ADE9F6] h-24 w-full flex items-center justify-center">
                  <AppLogo />
                  <div className="z-30 flex-1 flex items-center justify-center text-xl flex-col text-[#0009DC]">
                        <Balance balance={props.balance} />
                  </div>
                  {props.selectedScreen === "profile" ? (
                        <DisconnectButton />
                  ) : (
                        <HeaderProfile
                              imgUrl={props.imgUrl}
                              idList={props.idList}
                              setActingAccount={props.setActingAccount}
                        />
                  )}
            </div>
      );
};

export default Header;