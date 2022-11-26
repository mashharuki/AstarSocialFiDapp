import { ApiPromise } from "@polkadot/api";
import { ContractPromise } from "@polkadot/api-contract";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { Dispatch } from "react";

import abi from "../contract/metadata.json";

type PropsBO = {
      api: ApiPromise | undefined;
      actingAccount: InjectedAccountWithMeta;
      setBalance: Dispatch<React.SetStateAction<string>>;
};

type PropsTF = {
      api: ApiPromise | undefined;
      actingAccount: InjectedAccountWithMeta;
      amount: number;
};

type PropsDRL = {
      api: ApiPromise | undefined;
      actingAccount: InjectedAccountWithMeta;
};

// get contract address
const contractAddress: string = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;

/**
 * get balanceOf function
 * @param props 
 */
export const balenceOf = async (props: PropsBO) => {
      // create contract object
      const contract = new ContractPromise(props.api!, abi, contractAddress);
      // call balanceOf function
      const { gasConsumed, result, output } = await contract.query.balanceOf(
            "",
            {
                  value: 0,
                  gasLimit: -1,
            },
            props.actingAccount.address
      );

      if (output !== undefined && output !== null) {
            props.setBalance(output.toHuman()?.toString() || "0");
      }
};

/**
 * transfer function
 * @param props 
 */
export const transfer = async (props: PropsTF) => {
      const { web3FromSource } = await import("@polkadot/extension-dapp");
      // create contract object
      const contract = new ContractPromise(props.api!, abi, contractAddress);
      // get account
      const performingAccount = props.actingAccount;

      const injector = await web3FromSource(performingAccount.meta.source);
      // get date
      const date = new Date();

      // call transfer function
      const transfer = await contract.tx.transfer(
            {
                  value: 0,
                  gasLimit: 31518000000,
            },
            props.amount
      );

      if (injector !== undefined) {
            // sign and send
            transfer.signAndSend(
                  performingAccount.address,
                  { signer: injector.signer },
                  (result) => {}
            );
      }
};

/**
 * distributeReferLikes function
 * @param props 
 */
export const distributeReferLikes = async (props: PropsDRL) => {
  const { web3FromSource } = await import("@polkadot/extension-dapp");
  // create contract object
  const contract = new ContractPromise(props.api!, abi, contractAddress);
  // create contract object
  const performingAccount = props.actingAccount;
  const injector = await web3FromSource(performingAccount.meta.source);
  // get date
  const date = new Date();

  // call distributeReferLikes function
  const transfer = await contract.tx.distributeReferLikes({
      value: 0,
      gasLimit: 31518000000,
  });

  if (injector !== undefined) {
      transfer.signAndSend(
            performingAccount.address,
            { signer: injector.signer },
            (result) => {}
      );
  }
};