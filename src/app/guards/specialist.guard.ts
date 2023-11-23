import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const specialistGuard: CanActivateFn = (route, state) => {
  const service = inject(UserService);
  if(service.userLogged?.userRole == 'especialista'){
    return true;
  }
  else
  {
    return false;
  }
};
