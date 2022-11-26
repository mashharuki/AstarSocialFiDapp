import { ApiPromise } from "@polkadot/api";
import type { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { useEffect, useState } from "react";

import BottomNavigation from "../components/bottomNavigation";
import Post from "../components/post";
import ProfileSettingModal from "../components/profileSettingModal";
import ProfileSubTopBar from "../components/profileSubTopBar";
import TopBar from "../components/topBar";
import { connectToContract } from "../hooks/connect";
import { balenceOf } from "../hooks/FT";
import type { PostType } from "../hooks/postFunction";
import { getIndividualPost } from "../hooks/postFunction";
import {
      checkCreatedInfo,
      createProfile,
      getFollowerList,
      getFollowingList,
      getProfileForProfile
} from "../hooks/profileFunction";

/**
 * profile component
 * @param props 
 */
export default function profile(props: any) {
      const [imgUrl, setImgUrl] = useState("");
      const [isCreatedProfile, setIsCreatedProfile] = useState(true);
      const [isCreatedFnRun, setIsCreatedFnRun] = useState(false);
      const [name, setName] = useState("");
      const [individualPostList, setIndividualPostList] = useState<PostType[]>([]);
    
      const [showSettingModal, setShowSettingModal] = useState(false);
      const [isSetup, setIsSetup] = useState(false);
      const [api, setApi] = useState<ApiPromise>();
      const [accountList, setAccountList] = useState<InjectedAccountWithMeta[]>([]);
      const [actingAccount, setActingAccount] = useState<InjectedAccountWithMeta>();
      const [followingList, setFollowingList] = useState<Array<string>>([]);
      const [followerList, setFollowerList] = useState<Array<string>>([]);
      const [balance, setBalance] = useState<string>("0");

      useEffect(() => {
            connectToContract({
                  api: api,
                  accountList: accountList,
                  actingAccount: actingAccount!,
                  isSetup: isSetup,
                  setApi: setApi,
                  setAccountList: setAccountList,
                  setActingAccount: setActingAccount!,
                  setIsSetup: setIsSetup,
            });
            if (!isSetup) return;

            getProfileForProfile({
                  api: api,
                  userId: actingAccount?.address,
                  setImgUrl: setImgUrl,
                  setName: setName,
            });

            getIndividualPost({
                  api: api,
                  actingAccount: actingAccount,
                  setIndividualPostList: setIndividualPostList,
            });

            getFollowingList({
                  api: api,
                  userId: actingAccount?.address,
                  setFollowingList: setFollowingList,
            });

            getFollowerList({
                  api: api,
                  userId: actingAccount?.address,
                  setFollowerList: setFollowerList,
            });

            balenceOf({
                  api: api,
                  actingAccount: actingAccount!,
                  setBalance: setBalance,
            });

            if (isCreatedFnRun) return;
            checkCreatedInfo({
                  api: api,
                  userId: actingAccount?.address!,
                  setIsCreatedProfile: setIsCreatedProfile,
            });

            if (isCreatedProfile) return;
            createProfile({ 
                  api: api, 
                  actingAccount: actingAccount! 
            });

            setIsCreatedFnRun(true);
      });

      return (
            <div className="flex justify-center items-center bg-gray-200 w-screen h-screen relative">
                  <main className="items-center h-screen w-1/3 flex bg-white flex-col">
                        <ProfileSettingModal
                              isOpen={showSettingModal}
                              afterOpenFn={setShowSettingModal}
                              api={api}
                              userId={actingAccount?.address}
                              setImgUrl={setImgUrl}
                              setName={setName}
                              actingAccount={actingAccount}
                        />
                        <TopBar
                              idList={accountList}
                              imgUrl={imgUrl}
                              setActingAccount={setActingAccount}
                              balance={balance}
                        />
                        <ProfileSubTopBar
                              imgUrl={imgUrl}
                              name={name}
                              followingList={followingList}
                              followerList={followerList}
                              isOpenModal={setShowSettingModal}
                              setActingAccount={setActingAccount}
                              idList={accountList}
                              api={api!}
                              actingAccount={actingAccount!}
                              setIsCreatedFnRun={setIsCreatedFnRun}
                        />
                        <div className="flex-1 overflow-scroll">
                              {individualPostList.map((post) => (
                                    <Post
                                          name={post.name}
                                          time={post.createdTime}
                                          description={post.description}
                                          num_of_likes={post.numOfLikes}
                                          user_img_url={imgUrl}
                                          post_img_url={post.imgUrl}
                                    />
                              ))}
                        </div>
                        <div className="w-full">
                              <BottomNavigation />
                        </div>
                  </main>
            </div>
      );
}    