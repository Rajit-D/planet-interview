import { PrismaClient } from "@prisma/client";
import React from "react";

const client = new PrismaClient();

const page = async ({
  params,
}: {
  params: { orgId: string; adminId: string };
}) => {
  const { orgId, adminId } = await params;

  const adminInfo: any = await client.admins.findUnique({
    where: {
      id: adminId,
    },
  });
  const orgInfo: any = await client.organisations.findUnique({
    where: {
      id: adminInfo.organisation,
    },
  });
  console.log("Admin: ",adminInfo)
  console.log("Organisation: ",orgInfo)
  return (
    <div>
      Helllo {adminInfo.name} from {orgInfo.name}
    </div>
  );
};

export default page;
