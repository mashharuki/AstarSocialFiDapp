import { useRouter } from "next/router";

import Header from "./organisms/header";

/**
 * TopBar component
 * @param props 
 * @returns 
 */
export default function TopBar(props: any) {
      // useRouter 
      const router = useRouter();
      // get selectedScreen code
      const selectedScreen = router.pathname.replace(/[/]/g, "");

      return (
            <Header
                  selectedScreen={selectedScreen}
                  imgUrl={props.imgUrl}
                  idList={props.idList}
                  setActingAccount={props.setActingAccount}
                  balance={props.balance}
            />
      );
}