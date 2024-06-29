import React from "react";
import { auth, signOut } from "../../../auth";
import { Button } from "../../../components/ui/button";
const SettingPage = async () => {
  const session = await auth();

  return <div>{JSON.stringify(session)}</div>;
};

export default SettingPage;
