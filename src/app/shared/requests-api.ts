import {catchError, finalize, map, Observable, of, throwError} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SNACKBAR_ACTION, SNACKBAR_ERROR_CONFIGURATION, SNACKBAR_SUCCESS_CONFIGURATION} from "./snackbarActions";
import {inject} from "@angular/core";

export type MessageApi = {
  successMessage: string;
  errorMessage: string;
}
export class Api<T> {
  action$!: Observable<boolean>;
  data: T | T[] | null = null;
  progress: boolean = false;
  isFinished: boolean = true;
  hasError: boolean = false;
  private matSnackbar: MatSnackBar = inject(MatSnackBar);

  public execute(obs: Observable<T>, messages: MessageApi): Observable<boolean> {
    if (!!obs) {
      this.updateState(true, false);
      this.action$ =  obs.pipe(
        catchError((error) => {
          this.hasError = true;
          this.data = null;
          const message: string = (error.error.message)
            ? `${error.error.message}`
            : messages.errorMessage;
          this.showNotification(message, SNACKBAR_ACTION.CLOSE, SNACKBAR_ERROR_CONFIGURATION);
          return throwError(error);
        }),
        map(response => {
          // @ts-ignore
          this.data = response;
          this.updateState(false, true);
          this.showNotification(messages.successMessage, SNACKBAR_ACTION.OK, SNACKBAR_SUCCESS_CONFIGURATION);
          return true;
        })
      );
      return this.action$;
    }
    return of(false);
  }

  private updateState(progress: boolean, isFinished: boolean) {
    this.progress = progress;
    this.isFinished = isFinished;
  }

  private showNotification(message: string, action: string, configuration: any) {
    this.matSnackbar.open(
      message,
      action,
      configuration
    );
  }
}
