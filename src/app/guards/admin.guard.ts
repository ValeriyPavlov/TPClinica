import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const service = inject(UserService);
  if(service.userLogged && service.userLogged.userRole === "admin"){
    return true;
  }
  else
  {
    return false;
  }
};
