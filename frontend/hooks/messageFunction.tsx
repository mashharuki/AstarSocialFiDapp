import { ApiPromise } from "@polkadot/api";
import { ContractPromise } from "@polkadot/api-contract";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";

import abi from "../contract/metadata.json";

// コントラクトの`Message`構造体の型の定義
export type MessageType = {
      message: string;
      senderId: string;
      createdTime: string;
};

// sendMessage関数用の型定義
type PropsSM = {
      api: ApiPromise | undefined;
      actingAccount: InjectedAccountWithMeta;
      message: string;
      id: string;
};

// getMessage関数用の型定義
type PropsGML = {
      api: ApiPromise | undefined;
      id: number;
};

// lastMessage関数用の型定義
type PropsGLM = {
      api: ApiPromise | undefined;
      id: number;
};

// get contract address 
const contractAddress: string = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;

/**
 * sendMessage function
 * @param props 
 */
export const sendMessage = async (props: PropsSM) => {
      const { web3FromSource } = await import("@polkadot/extension-dapp");
      // create contract object
      const contract = new ContractPromise(props.api!, abi, contractAddress);
      const performingAccount = props.actingAccount;

      const injector = await web3FromSource(performingAccount.meta.source);
      // get data
      const date = new Date();
      
      // call sendMessage function
      const add_likes = await contract.tx.sendMessage(
            {
                  value: 0,
                  gasLimit: 18850000000,
            },
            props.message,
            props.id,
            [date.getMonth() + 1, date.getDate()].join("-") +
                  " " +
                  [
                        date.getHours().toString().padStart(2, "0"),
                        date.getMinutes().toString().padStart(2, "0"),
                  ].join(":")
      );

      if (injector !== undefined) {
            // sign and send
            add_likes.signAndSend(
                  performingAccount.address,
                  { signer: injector.signer },
                  (result) => {}
            );
      }
};

/**
 * get MessageList function
 * @param props 
 * @returns 
 */
export const getMessageList = async (props: PropsGML) => {
      // create contract object
      const contract = new ContractPromise(props.api!, abi, contractAddress);
      // call getMessageList function
      const { gasConsumed, result, output } = await contract.query.getMessageList(
            "",
            {
                  value: 0,
                  gasLimit: -1,
            },
            props.id,
            1
      );

      if (output !== undefined && output !== null) {
            return output;
      }
      return [];
};

/**
 * getLastMessage function
 * @param props 
 * @returns 
 */
export const getLastMessage = async (props: PropsGLM) => {
      // get contract object
      const contract = new ContractPromise(props.api!, abi, contractAddress);
      // call getLsatMessage function
      const { gasConsumed, result, output } = await contract.query.getLastMessage(
            "",
            {
                  value: 0,
                  gasLimit: -1,
            },
            props.id
      );

      if (output !== undefined && output !== null) {
            // 後で要チェック
            console.log("output:", output)
            return output.toHuman()?.toString() || "";
            // message.toString() ?? ""
      }
};