export async function query({ params }: { params: any }) {
  const { orgId, adminId } = await params;
  return { orgId, adminId };
}

export default query;
