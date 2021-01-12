import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkyClientComponent } from './sky-client.component';

describe('SkyClientComponent', () => {
  let component: SkyClientComponent;
  let fixture: ComponentFixture<SkyClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkyClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkyClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
