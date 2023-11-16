import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';

export const anyUserGuard: CanActivateFn = (route, state) => {
  const service = inject(UserService);
  if(service.userLogged){
    return true;
  }
  else
  {
    return false;
  }
};
