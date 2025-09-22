import AdminDashboard from "@/Component/Dashboard/Dashboard";

export default function Page(){
  const token = "Tata Steel";

    return(
        <main>
          <AdminDashboard token={token}/>
        </main>
    );
}