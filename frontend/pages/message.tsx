import { ApiPromise } from "@polkadot/api";
import type { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { useEffect, useState } from "react";

import BottomNavigation from "../components/bottomNavigation";
import MessageRoom from "../components/messageRoom";
import MessageMember from "../components/message_member";
import TopBar from "../components/topBar";
import { connectToContract } from "../hooks/connect";
import { balenceOf } from "../hooks/FT";
import { getLastMessage, getMessageList } from "../hooks/messageFunction";
import type { ProfileType } from "../hooks/profileFunction";
import {
      checkCreatedInfo,
      createProfile,
      getProfileForMessage,
      getSimpleProfileForMessage
} from "../hooks/profileFunction";

/**
 * message component
 * @returns 
 */
export default function message() {
      const [api, setApi] = useState<ApiPromise>();
      const [accountList, setAccountList] = useState<InjectedAccountWithMeta[]>([]);
      const [actingAccount, setActingAccount] = useState<InjectedAccountWithMeta>();

      const [imgUrl, setImgUrl] = useState("");
      const [isCreatedProfile, setIsCreatedProfile] = useState(true);
      const [isCreatedFnRun, setIsCreatedFnRun] = useState(false);
      const [friendList, setFriendList] = useState([]);
      const [messageList, setMessageList] = useState([]);
      const [showMessageModal, setShowMessageModal] = useState(false);
      const [userName, setUserName] = useState("");
      const [userImgUrl, setUserImgUrl] = useState("");
      const [myImgUrl, setMyImgUrl] = useState("");
      const [messageListId, setMessageListId] = useState<string>("");
      const [messageMemberList, setMessageMemberList] = useState([]);
      const [myUserId, setMyUserId] = useState("");
      const [isSetup, setIsSetup] = useState(false);
      const [profile, setProfile] = useState<ProfileType>();
      const [balance, setBalance] = useState<string>("0");

      useEffect(() => {
            //connect to contract
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

            // get profile
            getProfileForMessage({
                  api: api,
                  userId: actingAccount?.address,
                  setImgUrl: setImgUrl,
                  setMyImgUrl: setMyImgUrl,
                  setFriendList: setFriendList,
                  setProfile: setProfile,
            });
            // create message member list UI
            createMessageMemberList();

            balenceOf({
                  api: api,
                  actingAccount: actingAccount!,
                  setBalance: setBalance,
            });

            if (isCreatedFnRun) return;
            checkCreatedInfo({
                  api: api,
                  userId: actingAccount?.address,
                  setIsCreatedProfile: setIsCreatedProfile,
            });
            
            if (isCreatedProfile) return;
            // create profile
            createProfile({ 
                  api: api, 
                  actingAccount: actingAccount! 
            });
            setIsCreatedFnRun(true);
      });

      // create message member list UI
      const createMessageMemberList = async () => {
            let memberList: Array<any> = new Array();

            for (var i = 0; i < friendList.length; i++) {

                  let friendProfile = await getSimpleProfileForMessage({
                        api: api,
                        userId: friendList[i],
                  });

                  let idList = profile?.messageListIdList;
                  let lastMessage: string;

                  let messageList = await getMessageList({
                        api: api,
                        id: idList![i],
                  });

                  if (idList !== null) {
                        lastMessage = await getLastMessage({ api: api, id: idList![i] });
                  }

                  let memberListFactor = (
                        <MessageMember
                              name={friendProfile?.name}
                              img_url={friendProfile?.imgUrl}
                              last_message={lastMessage}
                              setShowMessageModal={setShowMessageModal}
                              setUserName={setUserName}
                              setUserImgUrl={setUserImgUrl}
                              setMyImgUrl={setMyImgUrl}
                              messageListId={idList[i]}
                              setMessageListId={setMessageListId}
                              setMessageList={setMessageList}
                              messageList={messageList}
                              getMessageList={getMessageList}
                              setMyUserId={setMyUserId}
                              myUserId={profile?.userId}
                              api={api}
                        />
                  );
                  memberList.push(memberListFactor);
            }
            setMessageMemberList(memberList);
      };

      return !showMessageModal ? (
            <div className="flex justify-center items-center bg-gray-200 w-screen h-screen relative">
                  <main className="items-center h-screen w-1/3 flex bg-white flex-col">
                        <TopBar
                              idList={accountList}
                              imgUrl={imgUrl}
                              setActingAccount={setActingAccount}
                              balance={balance}
                        />
                        <div className="flex-1 overflow-scroll w-full mt-1">
                              {messageMemberList}
                        </div>
                        <div className="w-full">
                              <BottomNavigation />
                        </div>
                  </main>
            </div>
      ) : (
            <MessageRoom
                  setShowMessageModal={setShowMessageModal}
                  userName={userName}
                  userImgUrl={userImgUrl}
                  myImgUrl={myImgUrl}
                  myUserId={myUserId}
                  api={api!}
                  actingAccount={actingAccount!}
                  messageListId={messageListId!}
                  messageList={messageList!}
            />
      );
}