import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkyClientTokenComponent } from './sky-client-token.component';

describe('SkyClientTokenComponent', () => {
  let component: SkyClientTokenComponent;
  let fixture: ComponentFixture<SkyClientTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkyClientTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkyClientTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
