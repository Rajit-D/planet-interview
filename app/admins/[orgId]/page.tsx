import axios from "axios";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { Key } from "react";
import AdminInfoElement from "@/components/AdminInfoElement";

interface OrgData {
  name: string;
  id: string;
}

interface Admin {
  orgId: string;
  name: string;
}

const client = new PrismaClient();

const Page = async ({ params }: { params: Promise<{ orgId: string }> }) => {
  const { orgId } = await params;
  const org: OrgData | null = await client.organisations.findUnique({
    where: {
      id: orgId,
    },
  });

  const response = await axios.get(`http://localhost:3000/api/${orgId}`);
  const admins = response.data.admins.filter(
    (ad: { organisation: string }) => ad.organisation === orgId
  );
  if (!org) {
    return <div>Organization not found</div>;
  }

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <p className="text-xl">Organisation: {org.name}</p>
      <ul role="list" className="divide-y divide-gray-100">
        {admins.map(
          (admin: {
            [x: string]: Key | null | undefined;
            email: string;
            avatar: string;
            organisation: Key | null | undefined;
            name: any;
          }) => (
            <AdminInfoElement
              key={admin.id}
              name={admin.name}
              email={admin.email}
              adminAvatarImg={admin.avatar}
            />
          )
        )}
      </ul>
      <Link href={`/admins/${org.id}/adminSignup`}>
        <button className="bg-yellow-200 py-2 px-3 text-black rounded-lg mt-4">
          Create Admin
        </button>
      </Link>
    </div>
  );
};

export default Page;
