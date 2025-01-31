import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ad } from '../model/ad.model';
import { AdService } from '../services/ad.service';
import { User } from 'libs/shared/data-access-user/src/lib/user.model';
import { Token } from '@angular/compiler';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ng-mf-list-ad',
  imports: [CommonModule, RouterModule],
  templateUrl: './list-ad.component.html',
  styleUrl: './list-ad.component.css',
})

export class ListAdComponent {
  @Input() userConnected!: User;
  listAds!: Ad[];

  constructor(private adService: AdService) {}

  ngOnInit() {
    console.log("--------------------" + this.userConnected);
    let token_api = localStorage.getItem("token_api");

    if (token_api !== null) {
      this.adService.getAllAds(token_api).subscribe((ads) => {
        this.listAds = ads;
        console.log(this.listAds);
        
      });
    }
  }

}
