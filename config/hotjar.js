import { hotjar } from "react-hotjar";

export const hotjarConnect = () => {
  hotjar.initialize(process.env.NEXT_PUBLIC_HOTJAR_ID, 1);

  if (hotjar.initialized()) {
    hotjar.identify("USER_ID", { userProperty: "value" });
  }
};
