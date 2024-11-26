import { getServerSession } from "next-auth";
import React from "react";

const page = async () => {
  const session = await getServerSession();
  return <div>{JSON.stringify(session)}</div>;
};

export default page;
