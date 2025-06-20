# NgRx Implementation Plan for Your Application

## Phase 1: Core Setup (Week 1)

### 1.1 Install and Configure NgRx
- Install NgRx packages
- Set up root store in app.module.ts
- Configure StoreDevtools for development

### 1.2 Create Root State Interface
```typescript
// src/app/store/app.state.ts
export interface AppState {
  auth: AuthState;
  ui: UIState;
  clients: ClientsState;
  proposals: ProposalsState;
  requisitions: RequisitionsState;
}
```

## Phase 2: Authentication Store (Week 1-2)

### 2.1 Auth State Management
Replace SessionService with NgRx store:
- User session state
- Token expiration tracking
- Login/logout actions
- Session timeout effects

### 2.2 Auth Store Structure
```typescript
// Actions: Login, Logout, SessionExpired, RefreshToken
// State: { user, token, isAuthenticated, sessionExpiry }
// Effects: Handle login API calls, token refresh, session monitoring
```

## Phase 3: UI State Store (Week 2)

### 3.1 UI State Management
Replace scattered UI state with centralized store:
- Loading states (replace NgxSpinner scattered usage)
- Menu state (replace MenuService)
- Modal states
- Toast notifications state

### 3.2 Benefits
- Consistent loading indicators
- Better UX with centralized loading management
- Predictable modal state management

## Phase 4: Data Entities (Week 3-4)

### 4.1 Clients Store
Replace MockServiceService client management:
- Client CRUD operations
- Client search and filtering
- Client selection state

### 4.2 Proposals Store
- Proposal CRUD operations
- Proposal authorization workflow
- Search and filtering state

### 4.3 Products & Branches Store
Replace MockServiceService arrays:
- Products entity management
- Branches entity management
- Banks data management

## Phase 5: Form State Management (Week 4-5)

### 5.1 Complex Form State
- Multi-step proposal forms
- Form validation state
- Draft saving and restoration
- Form navigation state

## Implementation Priority:

1. **High Priority**: Auth, UI, Clients (most used)
2. **Medium Priority**: Proposals, Products/Branches
3. **Low Priority**: Complex form state, advanced features

## Migration Strategy:

1. **Gradual Migration**: Implement store alongside existing services
2. **Component-by-Component**: Update components to use store selectors
3. **Service Deprecation**: Remove old services after store is stable
4. **Testing**: Ensure each phase is thoroughly tested

## Expected Benefits:

- **Performance**: Better change detection with OnPush
- **Maintainability**: Centralized state logic
- **Debugging**: DevTools integration
- **Testing**: Easier unit testing with pure functions
- **Scalability**: Better code organization
