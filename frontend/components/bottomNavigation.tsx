import { useRouter } from "next/router";
import { useState } from "react";

import Footer from "./organisms/footer";

/**
 * BottomNavigation component
 * @param props 
 * @returns 
 */
export default function BottomNavigation(props: any) {
      // useRouter
      const router = useRouter();
      // state variable
      const [witchScreen, setWitchScreen] = useState(router.pathname.replace(/[/]/g, ""));

      return (
            <Footer 
                  selectedScreen={witchScreen} 
                  setSelectedScreen={setWitchScreen} 
            />
      );
}