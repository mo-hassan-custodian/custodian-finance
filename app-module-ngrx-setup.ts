// Updated app.module.ts with NgRx setup
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// NgRx Imports
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Your existing imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { MenuIconComponent } from './shared/menu-icon/menu-icon.component';

// Angular Material Modules
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
// ... other Material modules

// NgRx Store Setup
import { authReducer } from './store/auth/auth.reducer';
import { dataReducer } from './store/data/data.reducer';
import { uiReducer } from './store/ui/ui.reducer';

// NgRx Effects
import { AuthEffects } from './store/auth/auth.effects';
import { DataEffects } from './store/data/data.effects';

// Services
import { AuthguardService } from './services/authguard/authguard.service';
import { SessionService } from './services/session/session.service';

// Other imports
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    MenuIconComponent,
    // ... other components
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    
    // Angular Material
    MatIconModule,
    MatSidenavModule,
    MatExpansionModule,
    // ... other Material modules
    
    // NgRx Store Setup
    StoreModule.forRoot({
      auth: authReducer,
      data: dataReducer,
      ui: uiReducer
    }),
    
    // NgRx Effects
    EffectsModule.forRoot([
      AuthEffects,
      DataEffects
    ]),
    
    // NgRx DevTools (only in development)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when extension window is not open
    }),
    
    // Other modules
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      preventDuplicates: true
    }),
  ],
  providers: [
    AuthguardService,
    SessionService,
    // ... other providers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// Root State Interface
// src/app/store/app.state.ts
export interface AppState {
  auth: AuthState;
  data: DataState;
  ui: UIState;
}

// Example UI State for loading indicators, modals, etc.
// src/app/store/ui/ui.state.ts
export interface UIState {
  loading: {
    global: boolean;
    clients: boolean;
    proposals: boolean;
    products: boolean;
  };
  modals: {
    payeeModal: boolean;
    clientModal: boolean;
    searchModal: boolean;
  };
  activeMenu: {
    menuIndex: number;
    submenuIndex: number;
  };
  notifications: {
    toasts: Array<{
      id: string;
      type: 'success' | 'error' | 'warning' | 'info';
      message: string;
      timestamp: number;
    }>;
  };
}

// Migration Strategy:
/*
1. Install NgRx packages
2. Set up basic store structure
3. Migrate one service at a time:
   - Start with SessionService → AuthStore
   - Then MockServiceService → DataStore
   - Finally UI state → UIStore
4. Update components to use store selectors
5. Remove old services gradually
6. Add comprehensive testing

Benefits you'll see immediately:
- Better debugging with Redux DevTools
- Centralized state management
- Predictable state updates
- Better performance with OnPush change detection
- Easier testing with pure reducer functions
*/
