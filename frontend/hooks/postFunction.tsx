import { ApiPromise } from "@polkadot/api";
import { ContractPromise } from "@polkadot/api-contract";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { Dispatch } from "react";

import abi from "../contract/metadata.json";


export type PostType = {
      name: string;
      userId: string;
      createdTime: string;
      imgUrl: string;
      userImgUrl: string;
      description: string;
      numOfLikes: number;
      postId: number;
};


type PropsRP = {
      api: ApiPromise;
      actingAccount: InjectedAccountWithMeta;
      description: string;
      imgUrl: string;
};


type PropsGGP = {
      api: ApiPromise;
      setGeneralPostList: Dispatch<React.SetStateAction<PostType[]>>;
};


type PropsAL = {
      api: ApiPromise;
      actingAccount: InjectedAccountWithMeta;
      postId: number;
};


type PropsGIP = {
      api: ApiPromise | undefined;
      actingAccount: InjectedAccountWithMeta | undefined;
      setIndividualPostList: Dispatch<React.SetStateAction<PostType[]>>;
};

// get contract address
const contractAddress: string = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;

/**
 * release post function
 * @param props
 */
export const releasePost = async (props: PropsRP) => {
  const { web3FromSource } = await import("@polkadot/extension-dapp");
  // create contract object
  const contract = new ContractPromise(props.api, abi, contractAddress);
  // get account
  const performingAccount = props.actingAccount;

  const injector = await web3FromSource(performingAccount.meta.source);
  // get date
  const date = new Date();

  // releasePost function
  const release_post = await contract.tx.releasePost(
      {
            value: 0,
            gasLimit: 50000000000,
      },
      props.description,
      [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-") +
            " " +
            [
                  date.getHours().toString().padStart(2, "0"),
                  date.getMinutes().toString().padStart(2, "0"),
            ].join(":"),
      props.imgUrl
  );

  if (injector !== undefined) {
      release_post.signAndSend(
            performingAccount.address,
            { signer: injector.signer },
            (result) => {}
      );
  }
};

/**
 * get general post function
 * @param props 
 */
export const getGeneralPost = async (props: PropsGGP) => {
      // create contract object
      const contract = new ContractPromise(props.api, abi, contractAddress);
      const { gasConsumed, result, output } = await contract.query.getGeneralPost(
            "",
            {
                  value: 0,
                  gasLimit: -1,
            },
            1
      );
      if (output !== undefined && output !== null) {
            if (output !== undefined && output !== null) {
                  props.setGeneralPostList(
                        output.toHuman() == null ? [] : output.toHuman()
                  );
            }
      }
};

/**
 * add like to post function
 * @param props 
 */
export const addLikes = async (props: PropsAL) => {
      const { web3FromSource } = await import("@polkadot/extension-dapp");
      // create contract object
      const contract = new ContractPromise(props.api, abi, contractAddress);
      // get account
      const performingAccount = props.actingAccount;
      const injector = await web3FromSource(performingAccount!.meta.source);
      // add likes
      const add_likes = await contract.tx.addLikes(
            {
                  value: 0,
                  gasLimit: 18850000000,
            },
            props.postId
      );

      if (injector !== undefined) {
            add_likes.signAndSend(
                  performingAccount!.address,
                  { signer: injector.signer },
                  (result) => {}
            );
      }
};

/**
 * get individual post function
 * @param props 
 */
export const getIndividualPost = async (props: PropsGIP) => {
      // create contract object
      const contract = new ContractPromise(props.api!, abi, contractAddress!);
      // get indiviual post
      const { gasConsumed, result, output } =
            await contract.query.getIndividualPost(
                  "",
                  {
                        value: 0,
                        gasLimit: -1,
                  },
                  1,
                  props.actingAccount?.address
            );
      if (output !== undefined && output !== null) {
            props.setIndividualPostList(
                  output.toHuman() == null ? [] : output.toHuman()
            );
      }
};