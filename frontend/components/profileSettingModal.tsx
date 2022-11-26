import { ApiPromise } from "@polkadot/api";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import React, { Dispatch } from "react";
import Modal from "react-modal";

import { getProfileForProfile, setProfileInfo } from "../hooks/profileFunction";

type Props = {
      isOpen: boolean;
      afterOpenFn: Dispatch<React.SetStateAction<boolean>>;
      api: ApiPromise | undefined;
      userId: string | undefined;
      setImgUrl: Dispatch<React.SetStateAction<string>>;
      setName: Dispatch<React.SetStateAction<string>>;
      actingAccount: InjectedAccountWithMeta | undefined;
};

/**
 * ProfileSettingModal component
 * @param props 
 * @returns 
 */
export default function ProfileSettingModal(props: Props) {

      /**
       * submit function
       * @param event 
       */
      const submit = async (event: any) => {
            event.preventDefault();
            // call setProfileInfo function
            await setProfileInfo({
                  api: props.api!,
                  actingAccount: props.actingAccount!,
                  name: event.target.name.value,
                  imgUrl: event.target.img_url.value,
            });
            // call getProfileForProfile function
            await getProfileForProfile({
                  api: props.api,
                  userId: props.actingAccount?.address,
                  setImgUrl: props.setImgUrl,
                  setName: props.setName,
            });

            props.afterOpenFn(false);

            alert(`img_url: ${event.target.img_url.value}\nname: ${event.target.name.value}`);
      };

      return (
            <Modal
                  className="flex items-center justify-center h-screen"
                  isOpen={props.isOpen}
            >
                  <form
                        onSubmit={submit}
                        className="h-1/2 w-1/5 bg-gray-200 flex flex-col items-center justify-center"
                  >
                        <div className="font-bold text-2xl pt-4">input profile info!</div>
                        <div className="flex flex-row justify-start my-4">
                              <div className="mr-2 text-2xl">Image URL:</div>
                              <input
                                    id="img_url"
                                    name="img_url"
                                    type="text"
                                    className="w-24 bg-white"
                              />
                        </div>
                        <div className="flex flex-row justify-start my-4">
                              <div className="mr-2 text-2xl">Name:</div>
                              <input 
                                    id="name" 
                                    name="name" 
                                    type="text" 
                                    className="w-24 bg-white" 
                              />
                        </div>
                        <div className="flex flex-row space-x-1">
                              <button
                                    onClick={() => props.afterOpenFn(false)}
                                    className="rounded-3xl h-10 w-32 bg-[#003AD0] text-white"
                              >
                                    Close
                              </button>
                              <button
                                    className="rounded-3xl h-10 w-32 bg-[#003AD0] text-white"
                                    type="submit"
                              >
                                    Set!
                              </button>
                        </div>
                  </form>
            </Modal>
      );
}