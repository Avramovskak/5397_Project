import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule],
})
export class CampaignsComponent implements OnInit {
  campaigns: any[] = [];
  sortedCampaigns: any[] = [];
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  searchTerm: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchCampaigns();
  }

  deleteCampaign(campaignId: number) {
    if (confirm('Are you sure you want to delete this campaign?')) {
      this.http.delete(`http://localhost:8080/api/campaigns/${campaignId}`).subscribe({
        next: () => {
          alert('Campaign deleted successfully');
          this.campaigns = this.campaigns.filter(campaign => campaign.id !== campaignId);
        },
        error: (err) => console.error('Failed to delete campaign', err),
      });
    }
  }

  fetchCampaigns() {
    this.http.get('http://localhost:8080/api/campaigns').subscribe({
      next: (data: any) => {
        this.campaigns = data;
        this.sortedCampaigns = [...data];
      },
      error: (err) => console.error('Failed to fetch campaigns', err),
    });
  }

  sortCampaigns(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.sortedCampaigns = [...this.campaigns].sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  searchCampaigns() {
    this.sortedCampaigns = this.campaigns.filter((campaign) => {
      return (
        campaign.campaignName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        campaign.campaignDescription.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
  }
}
