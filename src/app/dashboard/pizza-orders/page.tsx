"use client";

import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  PizzaIcon,
  CalendarIcon,
  User2Icon,
  Search,
  Filter,
  ArrowUpDown,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/glass-card";
import { StatsCard } from "@/components/ui/stats-card";
import { ExpandableProfileMenu } from "@/components/ui/expandable-profile-menu";
import { useIsMobile } from "@/hooks/use-mobile";

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
  price: number;
}

// Enhanced sample pizza orders data
const pizzaOrders: PizzaOrder[] = [
  {
    orderId: "ORD-001",
    customerName: "John Smith",
    pizzaType: "Pepperoni",
    quantity: 2,
    orderDate: "2023-07-15",
    status: "Delivered",
    price: 28.5,
  },
  {
    orderId: "ORD-002",
    customerName: "Sarah Johnson",
    pizzaType: "Margherita",
    quantity: 1,
    orderDate: "2023-07-15",
    status: "In Transit",
    price: 16.99,
  },
  {
    orderId: "ORD-003",
    customerName: "Michael Brown",
    pizzaType: "Supreme",
    quantity: 3,
    orderDate: "2023-07-14",
    status: "Preparing",
    price: 45.75,
  },
  {
    orderId: "ORD-004",
    customerName: "Emily Davis",
    pizzaType: "Hawaiian",
    quantity: 1,
    orderDate: "2023-07-14",
    status: "Cancelled",
    price: 19.25,
  },
  {
    orderId: "ORD-005",
    customerName: "David Wilson",
    pizzaType: "Vegetarian",
    quantity: 2,
    orderDate: "2023-07-13",
    status: "Delivered",
    price: 32.5,
  },
  {
    orderId: "ORD-006",
    customerName: "Jessica Martinez",
    pizzaType: "BBQ Chicken",
    quantity: 1,
    orderDate: "2023-07-13",
    status: "Delivered",
    price: 21.99,
  },
  {
    orderId: "ORD-007",
    customerName: "Robert Taylor",
    pizzaType: "Meat Lovers",
    quantity: 2,
    orderDate: "2023-07-12",
    status: "In Transit",
    price: 38.5,
  },
];

// Function to determine badge variant based on status
const getStatusBadgeVariant = (
  status: OrderStatus
): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case "Delivered":
      return "default"; // Green-ish primary color for delivered
    case "In Transit":
      return "outline"; // Outlined for in transit
    case "Preparing":
      return "secondary"; // Secondary color for preparing
    case "Cancelled":
      return "destructive"; // Red for cancelled
    default:
      return "secondary";
  }
};

// Get color for chart based on status
const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case "Delivered":
      return "#10b981"; // Emerald Green
    case "In Transit":
      return "#3b82f6"; // Blue
    case "Preparing":
      return "#f59e0b"; // Amber Orange
    case "Cancelled":
      return "#ef4444"; // Red
    default:
      return "#6b7280"; // Gray
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

// Get status icon
const getStatusIcon = (status: OrderStatus) => {
  switch (status) {
    case "Delivered":
      return <CheckCircle className="w-4 h-4" />;
    case "In Transit":
      return <TrendingUp className="w-4 h-4" />;
    case "Preparing":
      return <Clock className="w-4 h-4" />;
    case "Cancelled":
      return <XCircle className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

export default function PizzaOrdersPage() {
  const { data: session, status } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "All">("All");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof PizzaOrder | null;
    direction: "ascending" | "descending" | null;
  }>({
    key: null,
    direction: null,
  });
  const isMobile = useIsMobile();

  // Calculate enhanced metrics - moved before early returns
  const orderMetrics = useMemo(() => {
    const total = pizzaOrders.length;
    const delivered = pizzaOrders.filter(
      (order) => order.status === "Delivered"
    ).length;
    const inTransit = pizzaOrders.filter(
      (order) => order.status === "In Transit"
    ).length;
    const preparing = pizzaOrders.filter(
      (order) => order.status === "Preparing"
    ).length;
    const cancelled = pizzaOrders.filter(
      (order) => order.status === "Cancelled"
    ).length;
    const totalRevenue = pizzaOrders
      .filter((order) => order.status === "Delivered")
      .reduce((sum, order) => sum + order.price, 0);
    const averageOrderValue = totalRevenue / delivered || 0;

    return {
      total,
      delivered,
      inTransit,
      preparing,
      cancelled,
      totalRevenue,
      averageOrderValue,
    };
  }, []);

  // Filter and sort orders - moved before early returns
  const filteredOrders = useMemo(() => {
    let filtered = [...pizzaOrders];

    // Apply search filter
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.orderId.toLowerCase().includes(lowerCaseSearch) ||
          order.customerName.toLowerCase().includes(lowerCaseSearch) ||
          order.pizzaType.toLowerCase().includes(lowerCaseSearch)
      );
    }

    // Apply status filter
    if (statusFilter !== "All") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    // Apply sorting
    if (sortConfig.key && sortConfig.direction) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key!] < b[sortConfig.key!]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key!] > b[sortConfig.key!]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [searchTerm, statusFilter, sortConfig]);

  // Show loading state while session is loading
  if (status === "loading") {
    return <PizzaOrdersTableSkeleton />;
  }

  // Redirect if not authenticated
  if (!session) {
    redirect("/auth/signin");
  }

  // Chart data for status distribution
  const chartData = [
    {
      name: "Delivered",
      value: orderMetrics.delivered,
      color: getStatusColor("Delivered"),
    },
    {
      name: "In Transit",
      value: orderMetrics.inTransit,
      color: getStatusColor("In Transit"),
    },
    {
      name: "Preparing",
      value: orderMetrics.preparing,
      color: getStatusColor("Preparing"),
    },
    {
      name: "Cancelled",
      value: orderMetrics.cancelled,
      color: getStatusColor("Cancelled"),
    },
  ].filter((item) => item.value > 0);

  // Daily orders chart data with colors
  const dailyOrdersData = [
    { date: "Jul 12", orders: 2, revenue: 38.5, color: "#3b82f6" }, // Blue
    { date: "Jul 13", orders: 2, revenue: 54.49, color: "#10b981" }, // Green
    { date: "Jul 14", orders: 2, revenue: 65.0, color: "#f59e0b" }, // Orange
    { date: "Jul 15", orders: 2, revenue: 45.49, color: "#8b5cf6" }, // Purple
  ];

  const requestSort = (key: keyof PizzaOrder) => {
    let direction: "ascending" | "descending" | null = "ascending";
    if (sortConfig.key === key) {
      if (sortConfig.direction === "ascending") {
        direction = "descending";
      } else if (sortConfig.direction === "descending") {
        direction = null;
      }
    }

    setSortConfig({ key, direction });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-8 mt-6"
    >
      {/* Enhanced Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gradient">
                Pizza Orders
              </h1>
              <p className="text-lg text-muted-foreground mt-1">
                Comprehensive order management and analytics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="glass">
              <Filter className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button
              size="sm"
              className="gradient-primary text-black hover:text-white"
            >
              New Order
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Stats Grid */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatsCard
          title="Total Orders"
          value={orderMetrics.total}
          change={{ value: 15, type: "increase" }}
          icon={<PizzaIcon className="w-5 h-5" />}
          description="this month"
          variant="info"
        />
        <StatsCard
          title="Revenue"
          value={`$${orderMetrics.totalRevenue.toFixed(2)}`}
          change={{ value: 12, type: "increase" }}
          icon={<TrendingUp className="w-5 h-5" />}
          description="from delivered orders"
          variant="success"
        />
        <StatsCard
          title="Avg Order Value"
          value={`$${orderMetrics.averageOrderValue.toFixed(2)}`}
          icon={<TrendingUp className="w-5 h-5" />}
          description="per order"
          variant="info"
        />
        <StatsCard
          title="Active Orders"
          value={orderMetrics.inTransit + orderMetrics.preparing}
          icon={<Clock className="w-5 h-5" />}
          description="in progress"
          variant="warning"
        />
      </motion.div>

      {/* Enhanced Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <GlassCard className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Order Status Distribution
              </h3>
              <p className="text-sm text-muted-foreground">
                Current breakdown of all orders by status
              </p>
            </div>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} orders`, "Count"]}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                      backdropFilter: "blur(16px)",
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                    }}
                  />
                  <Legend
                    wrapperStyle={{
                      paddingTop: "20px",
                      fontSize: "14px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>

        {/* Daily Orders Trend */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <GlassCard className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Daily Orders Trend
              </h3>
              <p className="text-sm text-muted-foreground">
                Orders and revenue over the past few days
              </p>
            </div>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyOrdersData}>
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 12,
                      fill: "hsl(var(--muted-foreground))",
                    }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 12,
                      fill: "hsl(var(--muted-foreground))",
                    }}
                  />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "orders" ? `${value} orders` : `$${value}`,
                      name === "orders" ? "Orders" : "Revenue",
                    ]}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                      backdropFilter: "blur(16px)",
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                    }}
                  />
                  <Bar dataKey="orders" radius={[4, 4, 0, 0]} name="orders">
                    {dailyOrdersData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Enhanced Search and Filters */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders by ID, customer, or pizza type..."
              className="pl-11 h-11 glass"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {["All", "Delivered", "In Transit", "Preparing", "Cancelled"].map(
            (status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status as OrderStatus | "All")}
                className={cn(
                  "transition-all duration-200",
                  statusFilter !== status && "glass hover:scale-105"
                )}
              >
                {status !== "All" && (
                  <div className="mr-2">
                    {getStatusIcon(status as OrderStatus)}
                  </div>
                )}
                {status}
                {status !== "All" && (
                  <span className="ml-2 px-1.5 py-0.5 bg-muted/50 rounded text-xs">
                    {
                      orderMetrics[
                        status
                          .toLowerCase()
                          .replace(" ", "") as keyof typeof orderMetrics
                      ] as number
                    }
                  </span>
                )}
              </Button>
            )
          )}
        </div>
      </motion.div>

      {/* Enhanced Orders Table */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <GlassCard className="overflow-hidden">
          <div className="p-6 border-b border-border/50">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">
                Order Details
              </h3>
              <span className="text-sm text-muted-foreground">
                {filteredOrders.length} of {pizzaOrders.length} orders
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent">
                  {[
                    { key: "orderId", label: "Order ID" },
                    { key: "customerName", label: "Customer" },
                    { key: "pizzaType", label: "Pizza Type" },
                    { key: "quantity", label: "Qty", align: "right" },
                    { key: "price", label: "Price", align: "right" },
                    { key: "orderDate", label: "Date" },
                    { key: "status", label: "Status" },
                  ].map(({ key, label, align }) => (
                    <TableHead
                      key={key}
                      className={cn(
                        "font-semibold",
                        align === "right" && "text-right"
                      )}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => requestSort(key as keyof PizzaOrder)}
                        className="flex items-center gap-1 -ml-3 hover:bg-transparent hover:text-primary transition-colors"
                      >
                        {label}
                        {sortConfig.key === key && (
                          <ArrowUpDown className="h-3 w-3" />
                        )}
                      </Button>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order, index) => (
                    <motion.tr
                      key={order.orderId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * (index % 10), duration: 0.3 }}
                      className="hover:bg-muted/30 transition-all duration-200 group"
                    >
                      <TableCell className="font-mono text-primary font-medium">
                        {order.orderId}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <User2Icon className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium">
                            {order.customerName}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <PizzaIcon className="h-4 w-4 text-muted-foreground" />
                          <span>{order.pizzaType}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {order.quantity}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ${order.price.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {formatDate(order.orderDate)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={getStatusBadgeVariant(order.status)}
                          className="font-medium flex items-center gap-1.5"
                        >
                          {getStatusIcon(order.status)}
                          {order.status}
                        </Badge>
                      </TableCell>
                    </motion.tr>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12">
                      <div className="flex flex-col items-center gap-4 text-muted-foreground">
                        <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center">
                          <PizzaIcon className="h-8 w-8" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium">No orders found</p>
                          <p className="text-sm">
                            Try adjusting your search or filters
                          </p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </GlassCard>
      </motion.div>

      {/* Expandable Profile Menu */}
      <ExpandableProfileMenu
        clickToOpen={true}
        showQuickActions={true}
        showNavigation={true}
      />
    </motion.div>
  );
}

function PizzaOrdersTableSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-5 w-96" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-80" />
        <Skeleton className="h-80" />
      </div>

      <Skeleton className="h-96" />
    </div>
  );
}
