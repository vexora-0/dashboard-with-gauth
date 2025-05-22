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
import { PizzaIcon, CalendarIcon, User2Icon } from "lucide-react";

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

// Format date to be more readable
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
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

  const orderMetrics = {
    total: pizzaOrders.length,
    delivered: pizzaOrders.filter((o) => o.status === "Delivered").length,
    inTransit: pizzaOrders.filter((o) => o.status === "In Transit").length,
    preparing: pizzaOrders.filter((o) => o.status === "Preparing").length,
    cancelled: pizzaOrders.filter((o) => o.status === "Cancelled").length,
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <PizzaIcon className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Pizza Orders</h1>
        </div>
        <p className="text-muted-foreground">
          View and manage all pizza orders in one place.
        </p>
      </div>

      {/* Order statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard title="Total Orders" value={orderMetrics.total} />
        <StatCard
          title="Delivered"
          value={orderMetrics.delivered}
          variant="success"
        />
        <StatCard
          title="In Transit"
          value={orderMetrics.inTransit}
          variant="info"
        />
        <StatCard
          title="Preparing"
          value={orderMetrics.preparing}
          variant="warning"
        />
        <StatCard
          title="Cancelled"
          value={orderMetrics.cancelled}
          variant="destructive"
        />
      </div>

      <div className="rounded-xl border shadow-sm overflow-hidden">
        <div className="rounded-t-xl bg-accent/50 px-4 py-3">
          <h2 className="font-semibold">Order Details</h2>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>Pizza orders for the current month.</TableCaption>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-medium">Order ID</TableHead>
                <TableHead className="font-medium">Customer Name</TableHead>
                <TableHead className="font-medium">Pizza Type</TableHead>
                <TableHead className="text-right font-medium">
                  Quantity
                </TableHead>
                <TableHead className="font-medium">Order Date</TableHead>
                <TableHead className="font-medium">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pizzaOrders.length > 0 ? (
                pizzaOrders.map((order) => (
                  <TableRow
                    key={order.orderId}
                    className="hover:bg-muted/40 transition-colors"
                  >
                    <TableCell className="font-medium text-primary">
                      {order.orderId}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User2Icon className="h-3.5 w-3.5 text-muted-foreground" />
                        {order.customerName}
                      </div>
                    </TableCell>
                    <TableCell>{order.pizzaType}</TableCell>
                    <TableCell className="text-right">
                      {order.quantity}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
                        {formatDate(order.orderDate)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusBadgeVariant(order.status) as any}
                        className="font-medium"
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <PizzaIcon className="h-10 w-10" />
                      <p>No orders found</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

// Static card component for metrics
function StatCard({
  title,
  value,
  variant,
}: {
  title: string;
  value: number;
  variant?: "success" | "info" | "warning" | "destructive";
}) {
  const getClassByVariant = () => {
    switch (variant) {
      case "success":
        return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "info":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
      case "warning":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      case "destructive":
        return "bg-red-500/10 text-red-700 dark:text-red-400";
      default:
        return "bg-primary/10 text-primary";
    }
  };

  return (
    <div className={`rounded-xl p-4 border ${getClassByVariant()}`}>
      <div className="font-medium text-sm">{title}</div>
      <div className="text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}

// Skeleton loader for the table
function PizzaOrdersTableSkeleton() {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>

      {/* Skeleton for statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="rounded-xl border p-4">
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-8 w-10" />
          </div>
        ))}
      </div>

      <div className="rounded-xl border">
        <div className="rounded-t-xl bg-accent/50 px-4 py-3">
          <Skeleton className="h-5 w-32" />
        </div>
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
