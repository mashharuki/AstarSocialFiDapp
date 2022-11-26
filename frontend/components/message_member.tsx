import Image from "next/image";

/**
 * MessageMember component
 * @param props 
 * @returns 
 */
export default function MessageMember(props: any) {
      return (
            <div
                  className="flex flex-row border-b-2 border-[#CECECE] w-full items-center"
                  onClick={() => {
                        props.setShowMessageModal(true);
                        props.setUserName(props.name);
                        props.setUserImgUrl(props.img_url);
                        props.setMessageListId(props.messageListId);
                        props.setMessageList(props.messageList);
                        props.setMyUserId(props.myUserId);
                  }}
            >
                  <Image
                        className="rounded-full h-12 w-12 mx-2"
                        src={props.img_url}
                        alt="profile_logo"
                        width={1000}
                        height={1000}
                        quality={100}
                        onClick={() => props.setShowMessageModal(true)}
                  />
                  <div className="flex items-start justify-center flex-col py-1">
                        <div className="text-xm">{props.name}</div>
                        <div className="text-xl">{props.last_message}</div>
                  </div>
            </div>
      );
}