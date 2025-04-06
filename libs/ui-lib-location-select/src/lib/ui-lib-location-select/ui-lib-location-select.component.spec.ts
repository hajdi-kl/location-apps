import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiLibLocationSelectComponent } from './ui-lib-location-select.component';

describe('UiLibLocationSelectComponent', () => {
  let component: UiLibLocationSelectComponent;
  let fixture: ComponentFixture<UiLibLocationSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiLibLocationSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiLibLocationSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
