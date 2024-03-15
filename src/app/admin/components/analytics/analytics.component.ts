import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Analytics } from '../../../models/Analytics';
import { Api } from '../../../shared/requests-api';
import { AdminService } from '../../service/admin.service';
import { GET_ITEMS_ERROR } from '../../../shared/messages';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css',
})
export class AnalyticsComponent implements OnInit {
  api: Api<Analytics> = new Api<Analytics>();
  private adminService: AdminService = inject(AdminService);
  analytics: WritableSignal<Analytics> = signal(null);

  ngOnInit(): void {
    this.getAnalytics();
  }

  getAnalytics(): void {
    this.api
      .execute(this.adminService.getAnalytics(), {
        errorMessage: GET_ITEMS_ERROR.replace('#', 'orders analytics'),
        spinner: true,
      })
      .subscribe((analytics: Analytics) => this.analytics.set(analytics));
  }
}
