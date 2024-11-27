import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { NextRequest } from "next/server";
import React from "react";

const client = new PrismaClient();

const page = async ({
  params,
}: {
  params: { orgId: string; adminId: string };
}) => {
  const { orgId, adminId } = await params;

  const adminInfo: any = await client.orgadmin.findUnique({
    where: {
      id: adminId,
    },
  });
  const orgInfo: any = await client.organisation.findUnique({
    where: {
      id: orgId,
    },
  });
  return (
    <div>
      Helllo {adminInfo.name} from {orgInfo.name}
    </div>
  );
};

export default page;
