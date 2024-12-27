import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class HomeComponent {
  campaigns = [
    {
      id: 1,
      imageUrl: 'https://www.slobodenpecat.mk/wp-content/uploads/2023/05/SOS-Detsko-Selo-Logo-NEW-04.jpg',
      name: 'SOS Detsko Selo',
    },
    {
      id: 2,
      imageUrl: 'https://everyday.gr/wp-content/uploads/2021/06/ED_ACTGREEN_824x520_12.jpg',
      name: 'Feed The Children',
    },
    {
      id: 3,
      imageUrl: 'https://everyday.gr/wp-content/uploads/2021/06/ED_ACTGREEN_824x520_12.jpg',
      name: 'Save The Earth',
    },
  ];

  constructor(private router: Router) { }

  navigateToCampaigns(): void {
    this.router.navigate(['/campaigns']);
  }
}
