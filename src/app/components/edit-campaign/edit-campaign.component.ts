import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-campaign',
  templateUrl: './edit-campaign.component.html',
  styleUrls: ['./edit-campaign.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule], 
})
export class EditCampaignComponent {
  campaignId: number | null = null;
  campaignForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.campaignId = id ? +id : null;
    this.initializeForm();

    if (this.campaignId !== null) {

      this.loadCampaignData();
    }
  }

  initializeForm() {
    this.campaignForm = this.fb.group({
      campaignName: [''],
      campaignDescription: [''],
      campaignLocation: [''],
      campaignCity: [''],
      campaignCountry: [''],
      campaignGoalAmount: [0],
    });
  }

  loadCampaignData() {
    this.http
      .get(`http://localhost:8080/api/campaigns/${this.campaignId}`)
      .subscribe({
        next: (data: any) => this.campaignForm.patchValue(data),
        error: (err) => console.error('Failed to load campaign data', err),
      });
  }

  saveCampaign() {
    if (this.campaignId) {
      this.http
        .put(`http://localhost:8080/api/campaigns/${this.campaignId}`, this.campaignForm.value)
        .subscribe({
          next: () => {
            alert('Campaign updated successfully');
            this.router.navigate(['/campaigns']);
          },
          error: (err) => console.error('Failed to update campaign', err),
        });
    } else {
      this.http
        .post(`http://localhost:8080/api/campaigns`, this.campaignForm.value)
        .subscribe({
          next: () => {
            alert('Campaign created successfully');
            this.router.navigate(['/campaigns']);
          },
          error: (err) => console.error('Failed to create campaign', err),
        });
    }
  }

  goBack() {
    this.router.navigate(['/campaigns']);
  }
}
