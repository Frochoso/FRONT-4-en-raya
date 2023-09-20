import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableGamesComponent } from './available-games.component';

describe('AvailableGamesComponent', () => {
  let component: AvailableGamesComponent;
  let fixture: ComponentFixture<AvailableGamesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvailableGamesComponent]
    });
    fixture = TestBed.createComponent(AvailableGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
