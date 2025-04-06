import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiLibLanguageSelectComponent } from './ui-lib-language-select.component';

describe('UiLibLanguageSelectComponent', () => {
  let component: UiLibLanguageSelectComponent;
  let fixture: ComponentFixture<UiLibLanguageSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiLibLanguageSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiLibLanguageSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
