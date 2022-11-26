import Image from "next/image";
import { AiFillHeart } from "react-icons/ai";

import { addLikes } from "../hooks/postFunction";
import { SmallerProfileIcon } from "./atoms/smallerProfileIcon";

/**
 * Post component
 * @param props 
 * @returns 
 */
export default function Post(props: any) {
      
      return (
            <div className="px-3 items-center border-b-2 py-1 ">
                  <div className="flex flex-row justify-center">
                        <SmallerProfileIcon
                              imgUrl={props.user_img_url}
                              api={props.api}
                              actingAccount={props.actingAccount}
                              userId={props.userId}
                        />
                        <div className="flex items-center flex-col w-[400px]">
                              <div className="flex flex-row items-center w-full ">
                                    <div className="mr-3 font-semibold text-xl">{props.name}</div>
                                    <div className="text-gray-400">{props.time}</div>
                              </div>
                              <div className="text-xl w-full">{props.description}</div>
                              <Image
                                    className="mr-3"
                                    src={props.post_img_url}
                                    alt="profile_logo"
                                    width={250}
                                    height={250}
                                    quality={100}
                              />
                              <div className="flex flex-row w-full pl-[85px] items-center">
                                    <div className="text-xl mr-1">{props.num_of_likes}</div>
                                    <AiFillHeart
                                          onClick={() => {
                                                // call addLikes function
                                                addLikes({
                                                      api: props.api,
                                                      actingAccount: props.actingAccount,
                                                      postId: props.postId,
                                                });
                                          }}
                                          className="fill-[#FD3509] h-[30px] w-[30px]"
                                    />
                              </div>
                        </div>
                  </div>
            </div>
      );
}