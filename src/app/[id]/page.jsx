import AdminDashboard from "@/Component/Dashboard/Dashboard";

export default async function Page({ params }) {
  const token = params.id;

  return (
    <main>
      <AdminDashboard token={token} />
    </main>
  );
}
