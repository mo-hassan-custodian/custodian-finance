import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MockServiceService } from 'src/app/services/mock-service.service';
import { PayeeModalComponent } from './payee-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('PayeeModalComponent', () => {
  let component: PayeeModalComponent;
  let fixture: ComponentFixture<PayeeModalComponent>;
  let mockActiveModal: jasmine.SpyObj<NgbActiveModal>;
  let mockToastrService: jasmine.SpyObj<ToastrService>;
  let mockService: jasmine.SpyObj<MockServiceService>;

  beforeEach(async () => {
    const activeModalSpy = jasmine.createSpyObj('NgbActiveModal', ['close', 'dismiss']);
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    const mockServiceSpy = jasmine.createSpyObj('MockServiceService', ['getBranches']);

    await TestBed.configureTestingModule({
      declarations: [PayeeModalComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: NgbActiveModal, useValue: activeModalSpy },
        { provide: ToastrService, useValue: toastrSpy },
        { provide: MockServiceService, useValue: mockServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PayeeModalComponent);
    component = fixture.componentInstance;
    mockActiveModal = TestBed.inject(NgbActiveModal) as jasmine.SpyObj<NgbActiveModal>;
    mockToastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    mockService = TestBed.inject(MockServiceService) as jasmine.SpyObj<MockServiceService>;

    // Mock the getBranches method
    mockService.getBranches.and.returnValue(of([
      { name: 'Head Office', value: 'HO' },
      { name: 'Lagos', value: 'LAG' }
    ]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.payeeForm).toBeDefined();
    expect(component.payeeForm.get('currency')?.value).toBe('NGN');
  });

  it('should validate required fields', () => {
    const form = component.payeeForm;
    expect(form.valid).toBeFalsy();

    // Test required field validation
    expect(form.get('code')?.hasError('required')).toBeTruthy();
    expect(form.get('payee')?.hasError('required')).toBeTruthy();
    expect(form.get('amount')?.hasError('required')).toBeTruthy();
  });

  it('should validate account number pattern', () => {
    const accountNoControl = component.payeeForm.get('payeeAccountNo');
    
    accountNoControl?.setValue('123');
    expect(accountNoControl?.hasError('pattern')).toBeTruthy();
    
    accountNoControl?.setValue('1234567890');
    expect(accountNoControl?.hasError('pattern')).toBeFalsy();
  });

  it('should call onSave when form is valid', () => {
    // Fill form with valid data
    component.payeeForm.patchValue({
      code: 'PAY001',
      inputChequePayee: 'Test Payee',
      payee: 'Test Payee Name',
      payeeBankBranch: 'HO',
      payeeAccountNo: '1234567890',
      narrative: 'Test narrative',
      invoiceNo: 'INV001',
      invoiceDate: new Date(),
      amount: 1000,
      currency: 'NGN',
      bankAccount: '1234567890',
      type: 'INDIVIDUAL',
      paymentOption: 'BANK_TRANSFER'
    });

    component.onSave();

    expect(mockToastrService.success).toHaveBeenCalledWith('Payee created successfully!');
    expect(mockActiveModal.close).toHaveBeenCalled();
  });

  it('should show error when form is invalid on save', () => {
    component.onSave();

    expect(mockToastrService.error).toHaveBeenCalledWith('Please fill in all required fields correctly');
    expect(mockActiveModal.close).not.toHaveBeenCalled();
  });

  it('should dismiss modal on cancel', () => {
    component.onCancel();
    expect(mockActiveModal.dismiss).toHaveBeenCalled();
  });
});
