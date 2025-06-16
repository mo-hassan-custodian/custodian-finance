import { Component } from '@angular/core';
import MenuIcon from 'src/app/model/menu-icon';
import { MenuService } from 'src/app/services/menu/menu.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  showProgressBar = false
  userProfile:any;
  myDate = new Date();
  hrs = this.myDate.getHours();
  mins = this.myDate.getMinutes();
  greet:string = '';
  userId:String='';
  
  public menuitems:MenuIcon[] = [];
  public activeSubMenu?:MenuIcon;

  constructor(public _menuservice:MenuService,) {
    
    this.showProgressBar = true;
    
    
  }
  ngOnInit(): void {
    this._menuservice.setMenuInfo().then(
      (menuResponse:MenuIcon[]) => {
        this.menuitems = menuResponse;
          this.showProgressBar = false;
      }       
   ); 
   this.getTimeStatus();
  }

  getTimeStatus () {
    if (this.hrs >= 5 && ((this.hrs == 5 && this.mins >= 30) || (this.hrs > 5 && this.hrs < 12))){
      this.greet = 'Good Morning';
    
    }

else if (this.hrs >= 12 && this.hrs < 16) {
  this.greet = 'Good Afternoon';
 
}

else if ((this.hrs >= 16 && this.hrs < 24) || this.hrs > 0) {
  this.greet = 'Good Evening';

}

else {
 this.greet = 'Welcome';
}
  
  }


  logout() {

    localStorage.clear();
  }
}
