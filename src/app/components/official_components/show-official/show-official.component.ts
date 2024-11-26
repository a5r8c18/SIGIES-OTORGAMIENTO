import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfficialService } from 'src/app/services/official.service';
import { Official } from 'src/app/shared/models/Official';

@Component({
  selector: 'app-show-official',
  standalone: true,
  imports: [],
  templateUrl: './show-official.component.html',
  styleUrl: './show-official.component.css',
})
export class ShowOfficialComponent implements OnInit {
  official!: Official;
  constructor(
    officialService: OfficialService,
    private router: Router,
    activatedRoute: ActivatedRoute,
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params.officialId)
        officialService
          .getAllOfficialsById(params.officialId)
          .subscribe((serverOfficial) => {
            this.official = serverOfficial;
          });
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  modifyOfficial(officialId: string) {
    this.router.navigateByUrl(
      '/assignment/grant/modify-official/' + officialId,
    );
  }
  includeOfficial() {
    this.router.navigateByUrl('/assignment/grant/include-official');
  }
  officialList(): void {
    this.router.navigateByUrl('/assignment/grant/official');
  }
}
