import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrReaderComponent } from './ocr-reader.component';

describe('OcrReaderComponent', () => {
  let component: OcrReaderComponent;
  let fixture: ComponentFixture<OcrReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OcrReaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OcrReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
