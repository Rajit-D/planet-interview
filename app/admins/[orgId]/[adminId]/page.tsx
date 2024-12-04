import AdminDashboard from "@/components/AdminDashboard";

export default async function page({
  params,
}: {
  params: { orgId: string; adminId: string };
}) {
  const { orgId, adminId } = await params;

  return <AdminDashboard orgID={orgId} adminID={adminId} />;
}
