import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';

import { HomeGuard } from './home.guard';

describe('HomeGuard', () => {
  let guard: HomeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CookieService],
      imports: [RouterTestingModule]
    });
    guard = TestBed.inject(HomeGuard);
    
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
