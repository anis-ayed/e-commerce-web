import {catchError, map, Observable, of, throwError} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SNACKBAR_ACTION, SNACKBAR_ERROR_CONFIGURATION, SNACKBAR_SUCCESS_CONFIGURATION} from "./snackbarActions";
import {inject} from "@angular/core";

export type MessageApi = {
  successMessage?: string;
  errorMessage?: string;
}

/**
 * Generic class for handling API operations
 * @template T - Type parameter representing the data type of the API response
 */
export class Api<T> {
  // Observable to track the progress of an API action
  action$!: Observable<T>;

  // Flags to track the progress and status of the API action
  progress: boolean = false;
  isFinished: boolean = true;
  hasError: boolean = false;
  private matSnackbar: MatSnackBar = inject(MatSnackBar);


  /**
   * Execute an API action and return an Observable<boolean> to track its progress
   * @param obs - Observable representing the API action
   * @param messages - Object containing success and error messages for notification
   * @returns Observable<boolean> indicating the progress and completion status of the API action
   */
  public execute(obs: Observable<T>, messages: MessageApi): Observable<T> {
    if (!!obs) {
      this.updateState(true, false);
      this.action$ =  obs.pipe(
        catchError((error) => {
          this.hasError = true;
          const message: string = (error.error?.message)
            ? `${error.error?.message}`
            : messages?.errorMessage;
          this.showNotification(message, SNACKBAR_ACTION.CLOSE, SNACKBAR_ERROR_CONFIGURATION);
          return throwError(error);
        }),
        map(response => {
          // Handle API success
          this.updateState(false, true);
          if (!!messages.successMessage)
          this.showNotification(messages.successMessage, SNACKBAR_ACTION.OK, SNACKBAR_SUCCESS_CONFIGURATION);
          return response;
        })
      );
      return this.action$;
    }

    // Return an Observable with a false value if the provided Observable is null
    return of(null);
  }

  /**
   * Helper method to update the progress and completion state
   * @param progress - Boolean indicating whether the API action is in progress
   * @param isFinished - Boolean indicating whether the API action is finished
   */
  private updateState(progress: boolean, isFinished: boolean) {
    this.progress = progress;
    this.isFinished = isFinished;
  }


  /**
   * Helper method to display a notification using MatSnackBar
   * @param message - Notification message
   * @param action - Notification action
   * @param configuration - Configuration options for MatSnackBar
   */
  private showNotification(message: string, action: string, configuration: any) {
    this.matSnackbar.open(
      message,
      action,
      configuration
    );
  }
}
