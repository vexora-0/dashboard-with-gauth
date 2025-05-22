"use client";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

// Define the order status type
type OrderStatus = "Delivered" | "In Transit" | "Preparing" | "Cancelled";

// Define the pizza order type
interface PizzaOrder {
  orderId: string;
  customerName: string;
  pizzaType: string;
  quantity: number;
  orderDate: string;
  status: OrderStatus;
}

// Sample pizza orders data
const pizzaOrders: PizzaOrder[] = [
  {
    orderId: "ORD-001",
    customerName: "John Smith",
    pizzaType: "Pepperoni",
    quantity: 2,
    orderDate: "2023-07-15",
    status: "Delivered",
  },
  {
    orderId: "ORD-002",
    customerName: "Sarah Johnson",
    pizzaType: "Margherita",
    quantity: 1,
    orderDate: "2023-07-15",
    status: "In Transit",
  },
  {
    orderId: "ORD-003",
    customerName: "Michael Brown",
    pizzaType: "Supreme",
    quantity: 3,
    orderDate: "2023-07-14",
    status: "Preparing",
  },
  {
    orderId: "ORD-004",
    customerName: "Emily Davis",
    pizzaType: "Hawaiian",
    quantity: 1,
    orderDate: "2023-07-14",
    status: "Cancelled",
  },
  {
    orderId: "ORD-005",
    customerName: "David Wilson",
    pizzaType: "Vegetarian",
    quantity: 2,
    orderDate: "2023-07-13",
    status: "Delivered",
  },
  {
    orderId: "ORD-006",
    customerName: "Jessica Martinez",
    pizzaType: "BBQ Chicken",
    quantity: 1,
    orderDate: "2023-07-13",
    status: "Delivered",
  },
  {
    orderId: "ORD-007",
    customerName: "Robert Taylor",
    pizzaType: "Meat Lovers",
    quantity: 2,
    orderDate: "2023-07-12",
    status: "In Transit",
  },
];

// Function to determine badge variant based on status
const getStatusBadgeVariant = (status: OrderStatus) => {
  switch (status) {
    case "Delivered":
      return "success";
    case "In Transit":
      return "info";
    case "Preparing":
      return "warning";
    case "Cancelled":
      return "destructive";
    default:
      return "secondary";
  }
};

export default function PizzaOrdersPage() {
  const { data: session, status } = useSession();

  // Show loading state while session is loading
  if (status === "loading") {
    return <PizzaOrdersTableSkeleton />;
  }

  // Redirect if not authenticated
  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Pizza Orders</h1>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableCaption>Pizza orders for the current month.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Pizza Type</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pizzaOrders.length > 0 ? (
              pizzaOrders.map((order) => (
                <TableRow key={order.orderId}>
                  <TableCell className="font-medium">{order.orderId}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.pizzaType}</TableCell>
                  <TableCell className="text-right">{order.quantity}</TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  No orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// Skeleton loader for the table
function PizzaOrdersTableSkeleton() {
  return (
    <div className="container mx-auto p-4">
      <Skeleton className="h-8 w-48 mb-6" />
      <div className="rounded-md border">
        <div className="p-4">
          <div className="flex items-center space-x-4 mb-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-24" />
            ))}
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4 py-4">
              {Array.from({ length: 6 }).map((_, j) => (
                <Skeleton key={j} className="h-6 w-24" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
