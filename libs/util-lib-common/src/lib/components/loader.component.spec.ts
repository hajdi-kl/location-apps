import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibLoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  let component: LibLoaderComponent;
  let fixture: ComponentFixture<LibLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibLoaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LibLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
