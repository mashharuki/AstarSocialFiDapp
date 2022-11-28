import { ApiPromise } from "@polkadot/api";
import type { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { useEffect, useState } from "react";
import { PostButton } from "../components/atoms/postButton";
import BottomNavigation from "../components/bottomNavigation";
import Post from "../components/post";
import PostModal from "../components/postModal";
import TopBar from "../components/topBar";
import { connectToContract } from "../hooks/connect";
import {
      balenceOf,
      distributeReferLikes
} from "../hooks/FT";
import type { PostType } from "../hooks/postFunction";
import { getGeneralPost } from "../hooks/postFunction";
import {
      checkCreatedInfo,
      createProfile,
      getProfileForHome
} from "../hooks/profileFunction";

/**
 * home component
 */
export default function home() {
      const [api, setApi] = useState<ApiPromise>();
      const [isCreatedProfile, setIsCreatedProfile] = useState(true);
      const [isCreatedFnRun, setIsCreatedFnRun] = useState(false);
      const [showNewPostModal, setShowNewPostModal] = useState(false);
      const [isSetup, setIsSetup] = useState(false);
      const [isDistributed, setIsDistributed] = useState(false);
      const [imgUrl, setImgUrl] = useState("");
      const [accountList, setAccountList] = useState<InjectedAccountWithMeta[]>([]);
      const [actingAccount, setActingAccount] = useState<InjectedAccountWithMeta>();
      const [generalPostList, setGeneralPostList] = useState<PostType[]>([]);
      const [balance, setBalance] = useState<string>("0");

      /**
       * 待ち時間用の関数
       */
      const sleep = (waitTime: number) => { 
            var startMsec = new Date().getTime();
            while (new Date().getTime() - startMsec < waitTime);
      };

      useEffect(() => {
            // sleep
            sleep(30);
            
            // call connectToContract function
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
            // cal getProfileForHome function
            getProfileForHome({
                  api: api!,
                  userId: actingAccount?.address!,
                  setImgUrl: setImgUrl,
            });
            // call balanceOf function
            balenceOf({
                  api: api,
                  actingAccount: actingAccount!,
                  setBalance: setBalance,
            });
            // call getGeneralPost function
            getGeneralPost({ 
                  api: api!, 
                  setGeneralPostList: setGeneralPostList 
            });

            if (isDistributed) return;
            // call distributeReferLikes function
            distributeReferLikes({
                  api: api,
                  actingAccount: actingAccount!,
            });
            setIsDistributed(true);

            if (isCreatedFnRun) return;
            // call checkCreatedInfo function
            checkCreatedInfo({
                  api: api,
                  userId: actingAccount?.address!,
                  setIsCreatedProfile: setIsCreatedProfile,
            });
            if (isCreatedProfile) return;
            // call craateProfile function
            createProfile({ 
                  api: api, 
                  actingAccount: actingAccount! 
            });
            setIsCreatedFnRun(true);
      });

      return (
            <div className="flex justify-center items-center bg-gray-200 w-screen h-screen relative">
                  <main className="items-center justify-center h-screen w-1/3 flex bg-white flex-col">
                        <PostModal
                              isOpen={showNewPostModal}
                              afterOpenFn={setShowNewPostModal}
                              api={api!}
                              actingAccount={actingAccount!}
                        />
                        <TopBar
                              idList={accountList}
                              imgUrl={imgUrl}
                              setActingAccount={setActingAccount}
                              balance={balance}
                        />
                        <div className="flex-1 overflow-scroll">
                              {generalPostList.map((post) => (
                                    <Post
                                          name={post.name}
                                          time={post.createdTime}
                                          description={post.description}
                                          num_of_likes={post.numOfLikes}
                                          user_img_url={post.userImgUrl}
                                          post_img_url={post.imgUrl}
                                          userId={post.userId}
                                          postId={post.postId}
                                          actingAccount={actingAccount}
                                          api={api}
                                    />
                              ))}
                        </div>
                        <div className="w-full">
                              <BottomNavigation api={api} />
                        </div>
                        <PostButton setShowNewPostModal={setShowNewPostModal} />
                  </main>
            </div>
      );
}    