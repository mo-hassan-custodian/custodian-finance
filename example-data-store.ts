// Example Data Store Implementation (replacing MockServiceService)
// src/app/store/data/data.state.ts

export interface Product {
  id: string;
  name: string;
  description?: string;
}

export interface Branch {
  id: string;
  name: string;
  address?: string;
}

export interface Bank {
  id: string;
  name: string;
  code: string;
}

export interface DataState {
  products: {
    entities: { [id: string]: Product };
    ids: string[];
    loading: boolean;
    error: string | null;
  };
  branches: {
    entities: { [id: string]: Branch };
    ids: string[];
    loading: boolean;
    error: string | null;
  };
  banks: {
    entities: { [id: string]: Bank };
    ids: string[];
    loading: boolean;
    error: string | null;
  };
}

// src/app/store/data/data.actions.ts
import { createAction, props } from '@ngrx/store';
import { Product, Branch, Bank } from './data.state';

// Products Actions
export const loadProducts = createAction('[Data] Load Products');
export const loadProductsSuccess = createAction(
  '[Data] Load Products Success',
  props<{ products: Product[] }>()
);
export const loadProductsFailure = createAction(
  '[Data] Load Products Failure',
  props<{ error: string }>()
);

// Branches Actions
export const loadBranches = createAction('[Data] Load Branches');
export const loadBranchesSuccess = createAction(
  '[Data] Load Branches Success',
  props<{ branches: Branch[] }>()
);
export const loadBranchesFailure = createAction(
  '[Data] Load Branches Failure',
  props<{ error: string }>()
);

// Banks Actions
export const loadBanks = createAction('[Data] Load Banks');
export const loadBanksSuccess = createAction(
  '[Data] Load Banks Success',
  props<{ banks: Bank[] }>()
);
export const loadBanksFailure = createAction(
  '[Data] Load Banks Failure',
  props<{ error: string }>()
);

// src/app/store/data/data.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import * as DataActions from './data.actions';
import { DataState, Product, Branch, Bank } from './data.state';

// Entity Adapters
const productAdapter: EntityAdapter<Product> = createEntityAdapter<Product>();
const branchAdapter: EntityAdapter<Branch> = createEntityAdapter<Branch>();
const bankAdapter: EntityAdapter<Bank> = createEntityAdapter<Bank>();

const initialDataState: DataState = {
  products: {
    ...productAdapter.getInitialState(),
    loading: false,
    error: null
  },
  branches: {
    ...branchAdapter.getInitialState(),
    loading: false,
    error: null
  },
  banks: {
    ...bankAdapter.getInitialState(),
    loading: false,
    error: null
  }
};

export const dataReducer = createReducer(
  initialDataState,
  // Products
  on(DataActions.loadProducts, (state) => ({
    ...state,
    products: { ...state.products, loading: true, error: null }
  })),
  on(DataActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products: {
      ...productAdapter.setAll(products, state.products),
      loading: false,
      error: null
    }
  })),
  on(DataActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    products: { ...state.products, loading: false, error }
  })),
  
  // Branches
  on(DataActions.loadBranches, (state) => ({
    ...state,
    branches: { ...state.branches, loading: true, error: null }
  })),
  on(DataActions.loadBranchesSuccess, (state, { branches }) => ({
    ...state,
    branches: {
      ...branchAdapter.setAll(branches, state.branches),
      loading: false,
      error: null
    }
  })),
  on(DataActions.loadBranchesFailure, (state, { error }) => ({
    ...state,
    branches: { ...state.branches, loading: false, error }
  })),
  
  // Banks
  on(DataActions.loadBanks, (state) => ({
    ...state,
    banks: { ...state.banks, loading: true, error: null }
  })),
  on(DataActions.loadBanksSuccess, (state, { banks }) => ({
    ...state,
    banks: {
      ...bankAdapter.setAll(banks, state.banks),
      loading: false,
      error: null
    }
  })),
  on(DataActions.loadBanksFailure, (state, { error }) => ({
    ...state,
    banks: { ...state.banks, loading: false, error }
  }))
);

// src/app/store/data/data.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { createEntityAdapter } from '@ngrx/entity';
import { DataState, Product, Branch, Bank } from './data.state';

const productAdapter = createEntityAdapter<Product>();
const branchAdapter = createEntityAdapter<Branch>();
const bankAdapter = createEntityAdapter<Bank>();

export const selectDataState = createFeatureSelector<DataState>('data');

// Product Selectors
export const selectProductsState = createSelector(
  selectDataState,
  (state) => state.products
);

export const {
  selectIds: selectProductIds,
  selectEntities: selectProductEntities,
  selectAll: selectAllProducts,
  selectTotal: selectProductsTotal
} = productAdapter.getSelectors(selectProductsState);

export const selectProductsLoading = createSelector(
  selectProductsState,
  (state) => state.loading
);

// Branch Selectors
export const selectBranchesState = createSelector(
  selectDataState,
  (state) => state.branches
);

export const {
  selectAll: selectAllBranches
} = branchAdapter.getSelectors(selectBranchesState);

// Bank Selectors
export const selectBanksState = createSelector(
  selectDataState,
  (state) => state.banks
);

export const {
  selectAll: selectAllBanks
} = bankAdapter.getSelectors(selectBanksState);

// Usage in Component:
/*
@Component({
  selector: 'app-proposal',
  template: `
    <mat-select formControlName="product">
      <mat-option *ngFor="let product of products$ | async" [value]="product.id">
        {{ product.name }}
      </mat-option>
    </mat-select>
  `
})
export class ProposalComponent {
  products$ = this.store.select(selectAllProducts);
  branches$ = this.store.select(selectAllBranches);
  
  constructor(private store: Store) {
    // Load data on component init
    this.store.dispatch(loadProducts());
    this.store.dispatch(loadBranches());
  }
}
*/
