import { HttpHeaders } from '@angular/common/http';
import { UserStorageService } from '../services/storage/user-storage.service';
import { FormGroup } from '@angular/forms';

export const createAuthorizationHeaders = (): HttpHeaders => {
  return new HttpHeaders().set(
    'Authorization',
    'Bearer ' + UserStorageService.getToken(),
  );
};

export const appendFormDataProduct = (
  form: FormGroup,
  appendImg: boolean,
  img?: any,
): FormData => {
  const formData: FormData = new FormData();
  if (appendImg && img) {
    formData.append('img', img);
  }
  formData.append('categoryId', form.get('categoryId').value);
  formData.append('name', form.get('name').value);
  formData.append('description', form.get('description').value);
  formData.append('price', form.get('price').value);
  return formData;
};
