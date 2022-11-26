import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { Dispatch, FC } from "react";

type Props = {
      isOpenModal: Dispatch<React.SetStateAction<boolean>>;
      name: string;
      setActingAccount: Dispatch<React.SetStateAction<InjectedAccountWithMeta | undefined>>;
      idList: InjectedAccountWithMeta[];
      setIsCreatedFnRun: Dispatch<React.SetStateAction<boolean>>;
};

/**
 * WalletAddressSelection component
 * @param props 
 * @returns 
 */
export const WalletAddressSelection: FC<Props> = (props: Props) => {
      return (
            <>
                  <div>Wallet Address</div>
                        <div className="text-ellipsis overflow-hidden w-44 items-center flex justify-center">
                        <select
                              onChange={(event) => {
                                    props.setActingAccount(
                                          props.idList[Number.parseInt(event.target.value)]
                                    );
                                    props.setIsCreatedFnRun(false);
                              }}
                              className="w-32 items-center flex"
                        >
                              {props.idList !== undefined ? (
                                    props.idList.map((id, index) => (
                                          <option value={index}>{id.address}</option>
                                    ))
                              ) : (
                                    <option className="text-ellipsis overflow-hidden">
                                          no accounts
                                    </option>
                              )}
                        </select>
                  </div>
            </>
      );
};