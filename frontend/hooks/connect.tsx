import { ApiPromise, WsProvider } from "@polkadot/api";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { Dispatch } from "react";


// typeの定義
type Props = {
      api: ApiPromise | undefined;
      accountList: InjectedAccountWithMeta[];
      actingAccount: InjectedAccountWithMeta;
      isSetup: boolean;
      setApi: Dispatch<React.SetStateAction<ApiPromise | undefined>>;
      setAccountList: Dispatch<React.SetStateAction<InjectedAccountWithMeta[]>>;
      setActingAccount: Dispatch<React.SetStateAction<InjectedAccountWithMeta | undefined>>;
      setIsSetup: React.Dispatch<React.SetStateAction<boolean>>;
};

// rpcURL
const blockchainUrl = "ws://127.0.0.1:9944";

/**
 * connectToContract component
 * @param props 
 */
export const connectToContract = async (props: Props) => {

      /**
       * extensionSetup function
       * @returns 
       */
      const extensionSetup = async () => {
            const { web3Accounts, web3Enable } = await import("@polkadot/extension-dapp");
            const extensions = await web3Enable("Polk4NET");

            if (extensions.length === 0) {
                  return;
            }
            // get accounts
            const accounts = await web3Accounts();

            props.setAccountList(accounts);
            props.setActingAccount(accounts[0]);
            props.setIsSetup(true);
      };

      // この部分でコントラクトに接続
      const wsProvider = new WsProvider(blockchainUrl);
      const connectedApi = await ApiPromise.create({ provider: wsProvider });
      props.setApi(connectedApi);
      // call function
      await extensionSetup();

};