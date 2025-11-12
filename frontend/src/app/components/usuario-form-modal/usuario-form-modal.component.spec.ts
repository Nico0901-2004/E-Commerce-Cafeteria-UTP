import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioFormModalComponent } from './usuario-form-modal.component';

describe('UsuarioFormModalComponent', () => {
  let component: UsuarioFormModalComponent;
  let fixture: ComponentFixture<UsuarioFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioFormModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
