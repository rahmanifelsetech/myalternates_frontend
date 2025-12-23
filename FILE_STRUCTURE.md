# 📋 MyAlternates Frontend - File Structure Index

## 📂 Quick Navigation Guide

### 🔷 Type Definitions
- **`src/types/index.ts`** - All domain types (User, Product, Portfolio, etc.)
- **`src/types/navigation.ts`** - Navigation menu types

### 🔷 State Management (Redux)
- **`src/store/index.ts`** - Store configuration
- **`src/store/slices/authSlice.ts`** - Authentication state
- **`src/store/slices/productSlice.ts`** - Products state
- **`src/store/slices/portfolioSlice.ts`** - Portfolio/Investments state
- **`src/store/slices/transactionSlice.ts`** - Transactions state
- **`src/store/slices/uiSlice.ts`** - UI state (theme, sidebar, notifications)

### 🔷 API Services
- **`src/services/api.ts`** - Axios configuration with interceptors
- **`src/services/authService.ts`** - Authentication endpoints
- **`src/services/productService.ts`** - Product CRUD endpoints
- **`src/services/portfolioService.ts`** - Portfolio endpoints
- **`src/services/transactionService.ts`** - Transaction endpoints

### 🔷 Custom Hooks
- **`src/hooks/useRedux.ts`** - Redux dispatch/selector hooks
- **`src/hooks/useAuth.ts`** - Authentication hook
- **`src/hooks/useProducts.ts`** - Products data hook
- **`src/hooks/usePortfolio.ts`** - Portfolio data hook
- **`src/hooks/useTransactions.ts`** - Transactions data hook
- **`src/hooks/useNotification.ts`** - Notification system hook

### 🔷 Authorization & Guards
- **`src/config/guards/ProtectedRoute.tsx`** - Authentication guard
- **`src/config/guards/RoleBasedRoute.tsx`** - Role-based access guard
- **`src/config/guards/PermissionGuard.tsx`** - Feature-level permission guard

### 🔷 Routing Configuration
- **`src/config/routes.tsx`** - Main routes configuration
- **`src/config/routes/admin.routes.tsx`** - Admin routes
- **`src/config/routes/employee.routes.tsx`** - Employee routes
- **`src/config/routes/distributor.routes.tsx`** - Distributor routes
- **`src/config/routes/investor.routes.tsx`** - Investor routes

### 🔷 Navigation Configuration
- **`src/config/navigation/admin.navigation.tsx`** - Admin menu
- **`src/config/navigation/employee.navigation.tsx`** - Employee menu
- **`src/config/navigation/distributor.navigation.tsx`** - Distributor menu
- **`src/config/navigation/investor.navigation.tsx`** - Investor menu

### 🔷 Constants
- **`src/constants/index.ts`** - All app constants (roles, types, messages, etc.)

### 🔷 Pages
- **`src/pages/Dashboard/Home.tsx`** - Dashboard
- **`src/pages/Products/ProductsList.tsx`** - Products listing
- **`src/pages/Products/ProductDetails.tsx`** - Product details
- **`src/pages/Portfolio/MyPortfolio.tsx`** - Portfolio view
- **`src/pages/Transactions/TransactionHistory.tsx`** - Transaction history
- **`src/pages/Reports/Reports.tsx`** - Reports page
- **`src/pages/Admin/Dashboard.tsx`** - Admin dashboard
- **`src/pages/Admin/Products/ProductsManagement.tsx`** - Product management
- **`src/pages/Admin/Users/UsersManagement.tsx`** - User management
- **`src/pages/Admin/Transactions/TransactionsManagement.tsx`** - Transaction management
- **`src/pages/Admin/Permissions/PermissionsManagement.tsx`** - Permission management
- **`src/pages/Admin/Reports/AdminReports.tsx`** - Admin reports

### 🔷 Documentation
- **`SETUP_COMPLETE.md`** - Complete setup summary
- **`ARCHITECTURE.md`** - System architecture documentation
- **`IMPLEMENTATION_GUIDE.md`** - Step-by-step implementation guide
- **`QUICK_START.md`** - Quick start guide

---

## 🎯 File Count Summary

| Category | Count |
|----------|-------|
| Types | 2 |
| Store/Slices | 6 |
| Services | 5 |
| Hooks | 7 |
| Guards | 3 |
| Routes | 5 |
| Navigation | 4 |
| Constants | 1 |
| Pages | 12 |
| Documentation | 4 |
| **Total** | **49** |

---

## 🗂️ Directory Tree

```
src/
├── types/
│   ├── index.ts .......................... Domain types
│   └── navigation.ts ..................... Navigation types
│
├── store/
│   ├── index.ts .......................... Store configuration
│   └── slices/
│       ├── authSlice.ts
│       ├── productSlice.ts
│       ├── portfolioSlice.ts
│       ├── transactionSlice.ts
│       └── uiSlice.ts
│
├── services/
│   ├── api.ts ............................ Axios client
│   ├── authService.ts
│   ├── productService.ts
│   ├── portfolioService.ts
│   └── transactionService.ts
│
├── hooks/
│   ├── useRedux.ts ....................... Redux hooks
│   ├── useAuth.ts
│   ├── useProducts.ts
│   ├── usePortfolio.ts
│   ├── useTransactions.ts
│   ├── useNotification.ts
│   ├── useGoBack.ts ...................... Pre-existing
│   └── useModal.ts ....................... Pre-existing
│
├── config/
│   ├── routes.tsx ........................ Main routes
│   ├── routes/
│   │   ├── admin.routes.tsx
│   │   ├── employee.routes.tsx
│   │   ├── distributor.routes.tsx
│   │   └── investor.routes.tsx
│   ├── guards/
│   │   ├── ProtectedRoute.tsx
│   │   ├── RoleBasedRoute.tsx
│   │   └── PermissionGuard.tsx
│   └── navigation/
│       ├── admin.navigation.tsx
│       ├── employee.navigation.tsx
│       ├── distributor.navigation.tsx
│       └── investor.navigation.tsx
│
├── constants/
│   └── index.ts .......................... App constants
│
├── pages/
│   ├── Products/
│   │   ├── ProductsList.tsx
│   │   └── ProductDetails.tsx
│   ├── Portfolio/
│   │   └── MyPortfolio.tsx
│   ├── Transactions/
│   │   └── TransactionHistory.tsx
│   ├── Reports/
│   │   └── Reports.tsx
│   ├── Admin/
│   │   ├── Dashboard.tsx
│   │   ├── Products/
│   │   │   └── ProductsManagement.tsx
│   │   ├── Users/
│   │   │   └── UsersManagement.tsx
│   │   ├── Transactions/
│   │   │   └── TransactionsManagement.tsx
│   │   ├── Permissions/
│   │   │   └── PermissionsManagement.tsx
│   │   └── Reports/
│   │       └── AdminReports.tsx
│   └── ... (other pre-existing pages)
│
├── components/ ........................... Pre-existing structure
├── layout/ ............................. Pre-existing structure
├── context/ ............................ Pre-existing structure
│
├── App.tsx ............................. Updated with Redux
├── main.tsx ............................ Entry point
└── index.css ........................... Styles
```

---

## 🚀 Quick Reference: Where to Find Things

### I need to...

**Authenticate users**
→ `src/services/authService.ts` + `src/hooks/useAuth.ts`

**Display products**
→ `src/pages/Products/ProductsList.tsx` + `src/hooks/useProducts.ts`

**Show user portfolio**
→ `src/pages/Portfolio/MyPortfolio.tsx` + `src/hooks/usePortfolio.ts`

**List transactions**
→ `src/pages/Transactions/TransactionHistory.tsx` + `src/hooks/useTransactions.ts`

**Protect routes**
→ `src/config/guards/RoleBasedRoute.tsx` or `ProtectedRoute.tsx`

**Add menu items**
→ `src/config/navigation/[role].navigation.tsx`

**Update state**
→ `src/store/slices/[name]Slice.ts`

**Make API calls**
→ `src/services/[name]Service.ts`

**Show notifications**
→ `src/hooks/useNotification.ts`

**Define types**
→ `src/types/index.ts`

**Add constants**
→ `src/constants/index.ts`

**Configure admin panel**
→ `src/pages/Admin/` + `src/config/routes/admin.routes.tsx`

---

## 📖 Documentation Structure

### For System Design
→ Read `ARCHITECTURE.md`

### For Getting Started
→ Read `QUICK_START.md`

### For Implementation Details
→ Read `IMPLEMENTATION_GUIDE.md`

### For Project Overview
→ Read `SETUP_COMPLETE.md`

---

## ✨ Key Features by File

### Authentication (`authService.ts` + `useAuth.ts`)
- Signin/Signup
- Token management
- Current user loading
- Logout

### Products (`productService.ts` + `useProducts.ts`)
- List products
- Filter by type/risk/status
- Search functionality
- Get product details
- Pagination support

### Portfolio (`portfolioService.ts` + `usePortfolio.ts`)
- Get user portfolio
- List investments
- Create investments
- Redeem investments
- Portfolio summary

### Transactions (`transactionService.ts` + `useTransactions.ts`)
- List transactions
- Filter by status/date/type
- Get transaction details
- Transaction statistics

### Notifications (`useNotification.ts`)
- Success messages
- Error messages
- Warning messages
- Info messages
- Custom durations

### Authorization (`ProtectedRoute.tsx`, `RoleBasedRoute.tsx`, `PermissionGuard.tsx`)
- Authentication checks
- Role-based access
- Feature-level permissions
- Redirect handling

---

## 🔄 Data Flow Example

```
User logs in
    ↓
authService.signin() called
    ↓
Token received and stored
    ↓
setToken() and setUser() dispatched to Redux
    ↓
Navigate to role-based dashboard
    ↓
Component loads data with useProducts()
    ↓
productService.getAll() called
    ↓
setProducts() dispatched
    ↓
Component re-renders with data
```

---

## ✅ Implementation Checklist

### Before Starting
- [ ] Read `QUICK_START.md`
- [ ] Install dependencies
- [ ] Create `.env` file

### Development
- [ ] Update `AppLayout` components
- [ ] Create page components
- [ ] Create UI components
- [ ] Test authentication flow
- [ ] Test role-based routing
- [ ] Test API integration

### Testing
- [ ] Test all user roles
- [ ] Test all routes
- [ ] Test error handling
- [ ] Test notifications
- [ ] Test responsive design
- [ ] Test API calls

### Before Production
- [ ] Build succeeds
- [ ] No console errors
- [ ] All features work
- [ ] Performance optimized
- [ ] Security reviewed
- [ ] Environment variables set

---

## 🎓 Learning Path

1. **Understand Types** → `src/types/index.ts`
2. **Learn State** → `src/store/slices/`
3. **Explore Services** → `src/services/`
4. **Use Hooks** → `src/hooks/`
5. **Build Pages** → `src/pages/`
6. **Implement Guards** → `src/config/guards/`
7. **Configure Routes** → `src/config/routes/`

---

**Everything is organized, documented, and ready to build! 🚀**
