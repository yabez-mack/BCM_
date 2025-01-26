import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
 
  ngOnInit(): void {
    window.location.replace('https://schoolknot.com/logout.php');

  }

}
