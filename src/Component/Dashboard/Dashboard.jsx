import DashboardLayout from "../DashboardLayout/DashboardLayout";
import StockData from "../Data/Data";

export default function AdminDashboard({ token: name }) {
  return (
    <DashboardLayout>
      <StockData name={name} />
    </DashboardLayout>
  );
}
