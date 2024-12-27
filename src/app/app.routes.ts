import { Routes } from '@angular/router';
import { CampaignsComponent } from './components/campaigns/campaigns.component';
import { EditCampaignComponent } from './components/edit-campaign/edit-campaign.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'campaigns', component: CampaignsComponent },
    { path: 'campaign/create', component: EditCampaignComponent },
    { path: 'campaign/:id', component: EditCampaignComponent },
];
