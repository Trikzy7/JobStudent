import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ad } from '../model/ad.model';
import { AdService } from '../services/ad.service';
import { ActivatedRoute } from '@angular/router';
import { ChatComponent } from '../chat/chat.component';


@Component({
  selector: 'ng-mf-detail-ad',
  imports: [CommonModule, ChatComponent],
  templateUrl: './detail-ad.component.html',
  styleUrl: './detail-ad.component.css',
})
export class DetailAdComponent implements OnInit {
  ad!: Ad;

  constructor(
    private adService: AdService,
    private route: ActivatedRoute,
  ) {} 
  
  ngOnInit() {
    this.route.params.subscribe(() => {
      let adId = this.route.snapshot.params["id"];

      this.adService.getAdById(adId).subscribe((ad) => {
        this.ad = ad;
        console.log(" AD Detaiiiiiiil:" + this.ad);
        
      });
    });
  }

}
