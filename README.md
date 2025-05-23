# 🍕 PizzaMaster Dashboard

**Frontend AI Engineer Assignment Submission**

**Name**: Bhargav

---

## 📋 Project Overview

PizzaMaster Dashboard is a modern, full-stack web application built with Next.js 15 that demonstrates advanced frontend development skills, secure authentication, and exceptional UI/UX design. The application features a comprehensive pizza order management system with Google OAuth authentication, responsive design, and beautiful animations.

### 🎯 Key Features

- **🔐 Secure Authentication**: Google OAuth integration using NextAuth.js v5
- **📊 Interactive Dashboard**: Comprehensive analytics with charts and real-time statistics
- **📋 Order Management**: Advanced table with sorting, filtering, and search functionality
- **🎨 Modern UI/UX**: Glass-morphism design with Framer Motion animations
- **📱 Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **🔄 Protected Routes**: Middleware-based route protection for authenticated access
- **⚡ Performance Optimized**: Built with Next.js 15 and Turbopack for fast development

---

## 🛠️ Technology Stack

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Framework** | Next.js | 15.3.2 | React framework for production |
| **Authentication** | NextAuth.js | 5.0.0-beta.28 | OAuth and session management |
| **Styling** | Tailwind CSS | 4.x | Utility-first CSS framework |
| **UI Components** | Radix UI | Latest | Accessible, unstyled components |
| **Animations** | Framer Motion | 11.18.2 | Motion library for React |
| **Charts** | Recharts | 2.10.3 | Chart library for data visualization |
| **Icons** | Lucide React | 0.511.0 | Beautiful icon library |
| **Notifications** | Sonner | 2.0.3 | Toast notifications |
| **Language** | TypeScript | 5.x | Type-safe JavaScript |
| **Deployment** | Vercel | - | Cloud platform for frontend frameworks |

---

## 🚀 Live Application

**[🌐 Live Demo](https://dashboard-with-gauth.vercel.app)**

> **⚠️ Important Notice**: To access the deployed application, your email address must be added to the Google OAuth allowed users list. Please email me your Gmail address to be granted access.

---

## 📁 Project Structure

```
dashboard-with-gauth/
├── src/
│   ├── app/
│   │   ├── api/auth/[...nextauth]/     # NextAuth.js API route
│   │   ├── auth/
│   │   │   ├── signin/                 # Custom sign-in page
│   │   │   └── error/                  # Authentication error page
│   │   ├── dashboard/
│   │   │   ├── pizza-orders/           # Pizza orders management page
│   │   │   └── page.tsx                # Main dashboard page
│   │   ├── layout.tsx                  # Root layout with providers
│   │   ├── page.tsx                    # Landing page
│   │   └── globals.css                 # Global styles with custom CSS variables
│   ├── components/
│   │   ├── auth/                       # Authentication components
│   │   └── ui/                         # Reusable UI components
│   ├── hooks/                          # Custom React hooks
│   ├── lib/                            # Utility functions
│   └── auth.ts                         # NextAuth.js configuration
├── public/                             # Static assets
├── middleware.ts                       # Route protection middleware
└── package.json                        # Dependencies and scripts
```

---

## 🏃‍♂️ Quick Start

### Prerequisites

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher
- **Google Cloud Project**: For OAuth credentials

### 1. Clone the Repository

```bash
git clone https://github.com/vexora-0/dashboard-with-gauth.git
cd dashboard-with-gauth
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here(tested with JiMRAFM40FNJv9Ln6y+m7NwnWv13Vp5BBvjPkzbhSo0=)

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 4. Google OAuth Setup

1. **Create a Google Cloud Project**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one

2. **Enable Google+ API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it

3. **Create OAuth 2.0 Credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Set application type to "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (development)
     - `https://your-domain.vercel.app/api/auth/callback/google` (production)

4. **Generate NextAuth Secret**:
   ```bash
   npx auth secret
   ```

### 5. Run the Application

```bash
# Development mode with Turbopack
npm run dev

# Production build
npm run build
npm start

```

The application will be available at `http://localhost:3000`

---

## 🔑 Authentication System

### Google OAuth Flow

1. **Unauthenticated Access**: Users are redirected to the landing page
2. **Authentication**: Click "Continue with Google" to initiate OAuth flow
3. **Authorization**: Google prompts for user consent
4. **Session Creation**: NextAuth.js creates a secure session
5. **Dashboard Access**: Users are redirected to the protected dashboard

### Security Features

- **Protected Routes**: Middleware-based protection for `/dashboard/*` routes
- **Session Management**: JWT-based sessions with secure storage
- **CSRF Protection**: Built-in CSRF protection via NextAuth.js
- **Error Handling**: Comprehensive error pages for authentication failures

---

## 📊 Dashboard Features

### Main Dashboard (`/dashboard`)

- **Personalized Welcome**: Dynamic greeting with user's name
- **Statistics Overview**: Order count, revenue, active orders, customer ratings
- **Quick Actions**: Navigation cards to different sections
- **Recent Activity**: Timeline of recent order activities
- **Responsive Design**: Optimized for all device sizes

### Pizza Orders Page (`/dashboard/pizza-orders`)

- **Interactive Table**: Sortable columns (Order ID, Date, Status)
- **Advanced Filtering**: Filter by order status (All, Delivered, In Transit, Preparing, Cancelled)
- **Search Functionality**: Real-time search across all order fields
- **Visual Status Indicators**: Color-coded badges for order statuses
- **Data Visualization**: Pie charts showing order distribution by status
- **Mock Data**: 7 sample pizza orders with realistic data

#### Order Table Columns

| Column | Description | Features |
|--------|-------------|----------|
| Order ID | Unique identifier (e.g., ORD-001) | Sortable |
| Customer Name | Full customer name | Searchable |
| Pizza Type | Pizza variety (Pepperoni, Margherita, etc.) | Filterable |
| Quantity | Number of pizzas ordered | Sortable |
| Order Date | Date and time of order | Sortable, formatted |
| Status | Current order status | Filterable, color-coded |

---

## 🎨 UI/UX Highlights

### Design System

- **Glass Morphism**: Modern frosted glass effect throughout the application
- **Consistent Color Palette**: Carefully selected colors with dark/light mode support
- **Typography**: Custom font hierarchy using Poppins and Inter
- **Spacing**: Consistent spacing scale for visual harmony
- **Responsive Breakpoints**: Mobile-first design approach

### Animation Features

- **Page Transitions**: Smooth transitions between routes
- **Micro-interactions**: Hover effects, button animations
- **Loading States**: Skeleton components for better perceived performance
- **Background Effects**: Animated morphing blobs and floating particles
- **Staggered Animations**: Sequential component appearances

### Accessibility

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: WCAG compliant color combinations
- **Focus Management**: Clear focus indicators

---

## 🧪 Data Management

### Mock Data Structure

```typescript
interface PizzaOrder {
  orderId: string;      // Unique identifier
  customerName: string; // Customer full name
  pizzaType: string;    // Pizza variety
  quantity: number;     // Number of pizzas
  orderDate: string;    // ISO date string
  status: OrderStatus;  // Order status enum
  price: number;        // Order total price
}

type OrderStatus = "Delivered" | "In Transit" | "Preparing" | "Cancelled";
```

### State Management

- **Client-side State**: React hooks for component state
- **Session State**: NextAuth.js session provider
- **Form State**: Controlled components with TypeScript validation
- **URL State**: Search parameters for filters and sorting

---

## 🔄 Deployment

### Vercel Deployment

The application is automatically deployed to Vercel with the following configuration:

1. **Environment Variables**: Set in Vercel dashboard
2. **Domain Configuration**: Custom domain setup with SSL
3. **Build Optimization**: Automatic optimization and caching
4. **Preview Deployments**: Branch-based preview URLs

### Production Considerations

- **Environment Variables**: Secure storage of sensitive credentials
- **Performance Monitoring**: Built-in analytics and performance tracking
- **Error Tracking**: Comprehensive error logging and monitoring
- **SEO Optimization**: Meta tags, sitemap, and structured data

---

## 🛡️ Error Handling

### Global Error Boundaries

- **Authentication Errors**: Redirect to error page with helpful messages
- **Network Errors**: Toast notifications with retry mechanisms
- **Route Errors**: 404 and 500 error pages with navigation options
- **Form Validation**: Real-time validation with clear error messages

### Loading States

- **Page Loading**: Full-page loading indicators
- **Component Loading**: Skeleton components for individual sections
- **Button Loading**: Loading states for interactive elements
- **Data Loading**: Graceful loading states for asynchronous operations

---

## 📈 Performance Optimizations

### Next.js Optimizations

- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic route-based code splitting
- **Turbopack**: Fast development builds with Turbopack
- **Static Generation**: Optimized builds for production

### Bundle Analysis

- **Tree Shaking**: Automatic removal of unused code
- **Dynamic Imports**: Lazy loading for non-critical components
- **Compression**: Gzip and Brotli compression
- **Caching**: Aggressive caching strategies

---

## 🧪 Quality Assurance

### Code Quality

- **TypeScript**: Full type safety throughout the application
- **ESLint**: Comprehensive linting rules for code consistency
- **Prettier**: Automatic code formatting
- **Git Hooks**: Pre-commit hooks for code quality

### Testing Strategy

- **Component Testing**: Unit tests for individual components
- **Integration Testing**: End-to-end user flow testing
- **Authentication Testing**: OAuth flow validation
- **Responsive Testing**: Cross-device compatibility testing

---

## 🔮 Future Enhancements

### Planned Features

- [ ] **Real-time Updates**: WebSocket integration for live order updates
- [ ] **Advanced Analytics**: More detailed business intelligence dashboards
- [ ] **Multi-user Support**: Role-based access control
- [ ] **Payment Integration**: Stripe or PayPal payment processing
- [ ] **Mobile App**: React Native mobile application
- [ ] **API Documentation**: OpenAPI/Swagger documentation

### Technical Improvements

- [ ] **Database Integration**: PostgreSQL or MongoDB integration
- [ ] **Caching Layer**: Redis for improved performance
- [ ] **CDN Integration**: CloudFront for global content delivery
- [ ] **Monitoring**: Application performance monitoring
- [ ] **Testing Suite**: Comprehensive test coverage

---

## 🤝 Third-Party Libraries

### Core Dependencies

| Library | Version | Purpose | License |
|---------|---------|---------|---------|
| `next` | 15.3.2 | React framework | MIT |
| `next-auth` | 5.0.0-beta.28 | Authentication | ISC |
| `tailwindcss` | 4.x | CSS framework | MIT |
| `framer-motion` | 11.18.2 | Animations | MIT |
| `recharts` | 2.10.3 | Charts | MIT |
| `lucide-react` | 0.511.0 | Icons | ISC |

### UI Components

| Library | Purpose | Documentation |
|---------|---------|---------------|
| `@radix-ui/react-*` | Accessible components | [Radix UI](https://radix-ui.com) |
| `class-variance-authority` | Component variants | [CVA](https://cva.style) |
| `clsx` | Conditional classes | [clsx](https://github.com/lukeed/clsx) |
| `tailwind-merge` | Tailwind class merging | [tailwind-merge](https://github.com/dcastil/tailwind-merge) |

---

## 🐛 Known Issues & Limitations

### Current Limitations

1. **OAuth Whitelist**: Google OAuth requires email whitelisting for demo purposes
2. **Mock Data**: Using hardcoded data instead of a real database
3. **Single Tenant**: Currently designed for single-user/organization use
4. **Limited Offline Support**: Requires internet connection for full functionality

### Resolved Issues

- ✅ **Mobile Navigation**: Fixed responsive navigation issues
- ✅ **Authentication Flow**: Resolved NextAuth.js configuration problems
- ✅ **Build Errors**: Fixed all TypeScript and ESLint issues
- ✅ **Performance**: Optimized bundle size and loading times

---

## 📞 Contact & Support

**Developer**: Bhargav  
**Email**: bhargav13132@gmail.com
**GitHub**: [vexora-0](https://github.com/vexora-0)  
**Project Repository**: [dashboard-with-gauth](https://github.com/vexora-0/dashboard-with-gauth)

---