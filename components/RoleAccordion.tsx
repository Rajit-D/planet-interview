import Link from "next/link";

type RoleType = {
  id: string;
  name: string;
  skills: string;
  experience: number;
  minATS: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

type PayloadInfoType = {
  adminId: string;
  adminName: string;
  adminEmail: string;
  adminAvatar: string;
  adminPosition: string;
  rolesByAdmin: RoleType[];
  orgId: string;
  orgName: string;
  orgEmail: string;
  orgAvatar: string;
};

type PayloadType = {
  payload: PayloadInfoType;
};

const RoleAccordion = ({ payload }: PayloadType) => {
  return (
    <ul className="pt-2 ps-2">
      {payload.rolesByAdmin.map((role: any) => (
        <li key={role.id}>
          <Link
            href={`/admins/${payload?.orgId}/${payload?.adminId}/${role.id}`}
          >
            <p className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-neutral-800 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300">
              {role.name}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default RoleAccordion;
