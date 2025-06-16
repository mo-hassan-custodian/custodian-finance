import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
/**
 * This is a Session Service
 */
@Injectable({
  providedIn: 'root'
})
export class SessionService {
/**
 * @property {any} expirationTime
 *  This is to store the expired time of the token generated 
 */
  private expirationTime :any;
  /**
   * @property {string} currentUser
   * This is use to store the value of the decoded token object stored in local storage
   */
  private currentUser =  localStorage.getItem("cu_acc")
  /**
   *  @property {any} user
   * The value of the user object is stored in this property
   */
  user:any;
    /**
   *  @property {boolean} warningDisplayed
   * This property is use to check when warning message should be prompted to the users.
   * The warning message is shown 5 minutes before token expiration time
   */
  private warningDisplayed = false;
    /**
   *  @property {number} sessionWarningThreshold
   * This property is use to set the warning time before the token actually expires.
   */
  private sessionWarningThreshold = 300000; // 5 minutes before expiration
   /**
   *  @property {boolean} sessionExpiredSubject
   * This property is use to monitor the active countdown happening on the token expiration time.
   */
  private sessionExpiredSubject = new BehaviorSubject<boolean>(false);

/**
 *  a function that returns an observable
 */
  get sessionExpired(): Observable<boolean> {
      /**
   * @returns the status of the session countdown
   */
    return this.sessionExpiredSubject.asObservable();
  }
/**
 * 
 *  A constructor that calls the CheckSession function every seconds
 * @param {ToastrService} _toastr This is to inject the toaster use for displaying messages
 */
  constructor() {
    this.checkSession();
    setInterval(() => this.checkSession(), 1000);
   
  }
/**
 *  This function checks if the user is currently logged in, then checks the decoded token expiration time agains current time to know when it actually expires.
 */
  private checkSession() {
    if(this.currentUser){
      let userString = this.currentUser ? this.currentUser : "";
      this.user =  JSON.parse(this.currentUser);
      let tokenTime=String(this.user.tokenend)
      this.expirationTime=new Date(tokenTime).getTime();
     const currentTime = new Date().getTime();
     if (parseInt(this.expirationTime, 10) < currentTime) {
      // Session has expired
      this.sessionExpiredSubject.next(true);
      // this._toastr.warning('You will be logged out automatically, Kindly sign in again to generate a new token for your activities','Token Expired!!').onHidden.subscribe(() => {
      //   console.log('i wantr to logout');
      //    window.location.href = environment.ssoBaseAppTrayURL
      //    localStorage.clear();
      //  })
    } else if (!this.warningDisplayed && parseInt(this.expirationTime, 10) - currentTime < this.sessionWarningThreshold) {
      // Session is about to expire
      this.warningDisplayed = true;
      this.sessionExpiredSubject.next(false);
      // this._toastr.info('Your session will expire soon!!','Token about to Expire!!')
      // You can emit a warning here or take any other action
    }
    }

  }
}


