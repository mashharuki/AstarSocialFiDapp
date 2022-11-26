import { ApiPromise } from "@polkadot/api";
import { ContractPromise } from "@polkadot/api-contract";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { Dispatch } from "react";

import abi from "../contract/metadata.json";


export type ProfileType = {
      followingList: Array<string>;
      followerList: Array<string>;
      friendList: Array<string>;
      userId: string;
      name: string;
      imgUrl: string;
      messageListIdList: Array<number>;
      postIdList: Array<number>;
};


type PropsCCI = {
      api: ApiPromise | undefined;
      userId: string | undefined;
      setIsCreatedProfile: Dispatch<React.SetStateAction<boolean>>;
};


type PropsCP = {
      api: ApiPromise | undefined;
      actingAccount: InjectedAccountWithMeta;
};


type PropsGPFH = {
      api: ApiPromise;
      userId: string;
      setImgUrl: Dispatch<React.SetStateAction<string>>;
};


type PropsGPFP = {
      api: ApiPromise | undefined;
      userId: string | undefined;
      setImgUrl: Dispatch<React.SetStateAction<string>>;
      setName: Dispatch<React.SetStateAction<string>>;
};

type PropsGPFM = {
      api: ApiPromise | undefined;
      userId: string | undefined;
      setImgUrl: Dispatch<React.SetStateAction<string | undefined>>;
      setMyImgUrl: Dispatch<React.SetStateAction<string>>;
      setFriendList: Dispatch<React.SetStateAction<never[]>>;
      setProfile: Dispatch<React.SetStateAction<ProfileType | undefined>>;
};

type PropsGSPFM = {
      api: ApiPromise | undefined;
      userId: string | undefined;
};

type PropsF = {
      api: ApiPromise;
      actingAccount: InjectedAccountWithMeta;
      followedId: string;
};

type PropSPI = {
      api: ApiPromise;
      actingAccount: InjectedAccountWithMeta;
      name: string;
      imgUrl: string;
};


type PropsGFIL = {
      api: ApiPromise | undefined;
      userId: string | undefined;
      setFollowingList: Dispatch<React.SetStateAction<string[]>>;
};


type PropsGFEL = {
      api: ApiPromise | undefined;
      userId: string | undefined;
      setFollowerList: Dispatch<React.SetStateAction<string[]>>;
};

// get contract address
const contractAddress: string = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;
// image URL
const imageUrlForUnknown = process.env.NEXT_PUBLIC_UNKNOWN_IMAGE_URL as string;

/**
 *  check if already create profile in contract function 
 * @param props 
 */
export const checkCreatedInfo = async (props: PropsCCI) => {
      // create contract object
      const contract = new ContractPromise(props.api!, abi, contractAddress);
      // call checkCreatedInfo function
      const { gasConsumed, result, output } = await contract.query.checkCreatedInfo(
            "",
            {
                  value: 0,
                  gasLimit: -1,
            },
            props.userId
      );
      
      if (output !== undefined && output !== null) {
            props.setIsCreatedProfile(output.toHuman());
      }
};

/**
 * createProfile function
 * @param props 
 */
export const createProfile = async (props: PropsCP) => {
      console.log(props.actingAccount);
      const { web3FromSource } = await import("@polkadot/extension-dapp");
      // create contract object
      const contract = new ContractPromise(props.api!, abi, contractAddress);
      // get account
      const performingAccount = props.actingAccount;

      const injector = await web3FromSource(performingAccount.meta.source);
      // call create profile function
      const create_profile = await contract.tx.createProfile({
                  value: 0,
                  gasLimit: 18750000000,
            });
            
      if (injector !== undefined) {
            create_profile.signAndSend(
                  performingAccount.address,
                  { signer: injector.signer },
                  (result) => {}
            );
      }
};

/**
 * get profile for home screen function
 * @param props 
 */
export const getProfileForHome = async (props: PropsGPFH) => {
      // create contract object
      const contract = new ContractPromise(props.api, abi, contractAddress);

      const { gasConsumed, result, output } = await contract.query.getProfileInfo(
            "",
            {
                  value: 0,
                  gasLimit: -1,
            },
            props.userId
      );
      
      if (output !== undefined && output !== null) {
            props.setImgUrl(
                  output.toHuman()?.imgUrl == null
                  ? imageUrlForUnknown
                  : output.toHuman()?.imgUrl.toString()
            );
      }
};

/**
 * get profile for profile screen function
 * @param props 
 */
export const getProfileForProfile = async (props: PropsGPFP) => {
      // create contract object
      const contract = new ContractPromise(props.api!, abi, contractAddress);
      // call getProfileInfo function
      const { gasConsumed, result, output } = await contract.query.getProfileInfo(
            "",
            {
                  value: 0,
                  gasLimit: -1,
            },
            props.userId
      );

      if (output !== undefined && output !== null) {
            props.setImgUrl(
                  output.toHuman()?.imgUrl == null
                  ? imageUrlForUnknown
                  : output.toHuman()?.imgUrl.toString()
            );
            props.setName(
                  output.toHuman()?.name == null
                  ? "unknown"
                  : output.toHuman()?.name.toString()
            );
      }
};

/**
 * get profile for message screen function
 * @param props 
 */
export const getProfileForMessage = async (props: PropsGPFM) => {
      // create contract object
      const contract = new ContractPromise(props.api!, abi, contractAddress);
      // call getProfileInfo function
      const { gasConsumed, result, output } = await contract.query.getProfileInfo(
            "",
            {
                  value: 0,
                  gasLimit: -1,
            },
            props.userId
      );

      if (output !== undefined && output !== null) {
            props.setMyImgUrl(
                  output.toHuman()?.imgUrl == null
                  ? imageUrlForUnknown
                  : output.toHuman()?.imgUrl.toString()
            );
            props.setImgUrl(
                  output.toHuman()?.imgUrl == null
                  ? imageUrlForUnknown
                  : output.toHuman()?.imgUrl.toString()
            );
            props.setFriendList(
                  output.toHuman()?.friendList == null ? [] : output.toHuman()?.friendList
            );
            props.setProfile(output.toHuman());
      }
};

/**
 * get simple profile for message screen function
 * @param props 
 * @returns 
 */
export const getSimpleProfileForMessage = async (props: PropsGSPFM) => {
      // create contract object
      const contract = new ContractPromise(props.api!, abi, contractAddress);
      // call getProfileInfo function
      const { gasConsumed, result, output } = await contract.query.getProfileInfo(
            "",
            {
                  value: 0,
                  gasLimit: -1,
            },
            props.userId
      );

      if (output !== undefined && output !== null) {
            return output.toHuman();
      }
      return;
};

// follow another account function
export const follow = async (props: PropsF) => {
      const { web3FromSource } = await import("@polkadot/extension-dapp");
      // create contract object
      const contract = new ContractPromise(props.api, abi, contractAddress);
      // get account
      const performingAccount = props.actingAccount;
      const injector = await web3FromSource(performingAccount!.meta.source);
      
      // call follow function
      const follow = await contract.tx.follow(
            {
                  value: 0,
                  gasLimit: 200000000000,
            },
            props.followedId
      );

      if (injector !== undefined) {
      follow.signAndSend(
            performingAccount!.address,
            { signer: injector.signer },
            (result) => {}
      );
      }
};

/**
 * setProfileInfo function
 * @param props 
 */
export const setProfileInfo = async (props: PropSPI) => {
      const { web3FromSource } = await import("@polkadot/extension-dapp");
      // create contract object
      const contract = new ContractPromise(props.api!, abi, contractAddress!);
      // get account
      const performingAccount = props.actingAccount;

      const injector = await web3FromSource(performingAccount!.meta.source);
      // call setProfileInfo function
      const set_profile_info = await contract.tx.setProfileInfo(
            {
                  value: 0,
                  gasLimit: 187500000000,
            },
            props.name,
            props.imgUrl
      );

      if (injector !== undefined) {
            set_profile_info.signAndSend(
                  performingAccount!.address,
                  { signer: injector.signer },
                  (result) => {}
            );
      }
};

/**
 * get following list function
 * @param props 
 * @returns 
 */
export const getFollowingList = async (props: PropsGFIL) => {
      // create contract object
      const contract = new ContractPromise(props.api!, abi, contractAddress);
      // call getFollowingList function
      const { gasConsumed, result, output } = await contract.query.getFollowingList(
            "",
            {
                  value: 0,
                  gasLimit: -1,
            },
            props.userId
      );

      if (output !== undefined && output !== null) {
            props.setFollowingList(output.toHuman());
            console.log(output.toHuman());
      }
      return;
};

/**
 * get follower list function
 * @param props 
 * @returns 
 */
export const getFollowerList = async (props: PropsGFEL) => {
      // create contract object
      const contract = new ContractPromise(props.api!, abi, contractAddress);
      // call getFollowerList function
      const { gasConsumed, result, output } = await contract.query.getFollowerList(
            "",
            {
                  value: 0,
                  gasLimit: -1,
            },
            props.userId
      );

      if (output !== undefined && output !== null) {
            props.setFollowerList(output.toHuman());
      }
      return;
};