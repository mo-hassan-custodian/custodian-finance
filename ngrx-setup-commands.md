# NgRx Setup Commands for Angular 14

## 1. Install NgRx Dependencies

```bash
npm install @ngrx/store@14 @ngrx/effects@14 @ngrx/entity@14 @ngrx/store-devtools@14
```

## 2. Optional: Install NgRx Schematics for Code Generation

```bash
npm install @ngrx/schematics@14 --save-dev
ng config cli.defaultCollection @ngrx/schematics
```

## 3. Generate Store Structure

```bash
# Generate root store
ng generate store State --root --module app.module.ts

# Generate feature stores
ng generate feature store/Auth --module app.module.ts
ng generate feature store/Clients --module app.module.ts  
ng generate feature store/Proposals --module app.module.ts
ng generate feature store/Requisitions --module app.module.ts
```

## 4. Generate Effects (for async operations)

```bash
ng generate effect store/Auth --module app.module.ts
ng generate effect store/Clients --module app.module.ts
ng generate effect store/Proposals --module app.module.ts
```

## Key Benefits for Your Application:

1. **Centralized State Management**: Replace scattered service state with unified store
2. **Predictable State Updates**: Actions and reducers make state changes traceable
3. **Better Testing**: Pure functions (reducers) are easier to test
4. **DevTools Integration**: Time-travel debugging and state inspection
5. **Performance**: OnPush change detection strategy compatibility
6. **Scalability**: Better organization as app grows

## Current Services That Would Benefit:

- **MockServiceService**: Products, Branches, Banks arrays → Store entities
- **SessionService**: User session state → Auth store
- **IdleService**: Timer state → UI store
- **Menu state**: Current active menu → UI store
- **Form state**: Proposal, Client forms → Feature stores
