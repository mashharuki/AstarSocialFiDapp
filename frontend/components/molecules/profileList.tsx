import { ApiPromise } from "@polkadot/api";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import type { Dispatch, FC } from "react";

import { ProfileTitle } from "../atoms/profileTitle";
import { WalletAddressSelection } from "../atoms/walletAddressSelection";

type Props = {
      name: string;
      isOpenModal: Dispatch<React.SetStateAction<boolean>>;
      setActingAccount: Dispatch<React.SetStateAction<InjectedAccountWithMeta | undefined>>;
      idList: InjectedAccountWithMeta[];
      setIsCreatedFnRun: Dispatch<React.SetStateAction<boolean>>;
      api: ApiPromise;
      actingAccount: InjectedAccountWithMeta;
      followingList: Array<string>;
      followerList: Array<string>;
};

/**
 * ProfileList component
 * @param props 
 * @returns 
 */
export const ProfileList: FC<Props> = (props: Props) => {
      return (
      <div className="flex items-center flex-col">
            <ProfileTitle name={props.name} isOpenModal={props.isOpenModal} />
            <WalletAddressSelection
                  isOpenModal={props.isOpenModal}
                  name={props.name}
                  setActingAccount={props.setActingAccount}
                  idList={props.idList}
                  setIsCreatedFnRun={props.setIsCreatedFnRun}
            />
            <div className="">{`${props.followingList.length} following ${props.followerList.length} follower `}</div>
      </div>
      );
};