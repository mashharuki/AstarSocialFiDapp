import Image from "next/image";
import { FC } from "react";

export type Id = {
      address: string;
};

type Props = {
      imgUrl: string;
      idList: Id[];
      setActingAccount: (id: Id) => void;
};

/**
 * HeaderProfile component
 * @param props 
 * @returns 
 */
const HeaderProfile: FC<Props> = (props) => {
      return (
            <div className="flex-row flex items-center ml-[30px]">
                  <Image
                        className="w-[70px] h-[70px] rounded-full mr-3"
                        src={props.imgUrl}
                        alt="profile_logo"
                        width={30}
                        height={30}
                  />
                  <div className="mr-3">
                        <div>wallet address</div>
                        <select
                              onChange={(event) => {
                                    props.setActingAccount(props.idList[Number(event.target.value)]);
                              }}
                              className="w-32"
                        >
                              {props.idList ? (
                                    props.idList.map((id, index) => (
                                          <option value={index}> {id.address} </option>
                                    ))
                              ) : (
                                    <option className="text-ellipsis overflow-hidden">
                                          no accounts
                                    </option>
                              )}
                        </select>
                  </div>
            </div>
      );
};

export default HeaderProfile;