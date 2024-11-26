import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const client = new PrismaClient();

const page = async ({ params }: { params: { orgId: string } }) => {
  const { orgId } = await params;
  const org: any = await client.organisation.findUnique({
    where: {
      id: orgId,
    },
  });
  return (
    <div className="h-screen flex justify-center items-center flex-col">
      Organisation: {org.name}
      <Link href={`/admins/${orgId}/adminSignup`}>
        <button className="bg-yellow-200 py-2 px-3 text-black rounded-lg mt-4">
          Create Admin
        </button>
      </Link>
    </div>
  );
};

export default page;
