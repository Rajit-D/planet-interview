interface RoleData {
  id: string;
  name: string;
  skills: string;
  experience: number;
  minATS: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface AllRolesInfo {
  roles: RoleData[];
}

const RoleAccordion = ({ roles }: AllRolesInfo) => {
  return (
    <ul className="pt-2 ps-2">
      {roles.map((role, ind) => (
        <li key={ind}>
          <a
            className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-neutral-800 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
            href="#"
          >
            {role.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default RoleAccordion;
