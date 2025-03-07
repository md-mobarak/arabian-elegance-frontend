// import DashboardLayout from "../../components/DashboardLayout";
// import OrdersTable from "../../components/OrdersTable";
"use client";
import DashboardLayout from "@/components/layout/DashboarLayouts";
import OrderTable from "@/components/layout/OrderTable";

const OrdersPage = () => {
  return (

    <DashboardLayout>
      <h2 className="text-2xl font-bold">All Orders</h2>
      <OrderTable></OrderTable>
      </DashboardLayout>
  );
};

export default OrdersPage;
