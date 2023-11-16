import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const service = inject(UserService);
  if(service.userLogged && service.userLogged.userRole !== "especialista"){
    return true;
  }
  else
  {
    return false;
  }
};
