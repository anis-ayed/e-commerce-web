import { HttpHeaders } from '@angular/common/http';
import { UserStorageService } from '../services/storage/user-storage.service';

export const createAuthorizationHeaders = (): HttpHeaders => {
  return new HttpHeaders().set(
    'Authorization',
    'Bearer ' + UserStorageService.getToken(),
  );
};
