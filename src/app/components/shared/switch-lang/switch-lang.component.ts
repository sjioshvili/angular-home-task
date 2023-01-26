import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { LangService } from '../../../services/lang.service';

@Component({
  selector: 'app-switch-lang',
  templateUrl: './switch-lang.component.html',
  styleUrls: ['./switch-lang.component.scss'],
})
export class SwitchLangComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private langService: LangService
  ) {
    translate.addLangs(['en', 'ge']);
  }

  ngOnInit() {
    this.getLang();
    this.registerIcons();
  }

  registerIcons() {
    this.iconRegistry.addSvgIcon(
      'georgia',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        `../assets/icons/georgia.svg`
      )
    );

    this.iconRegistry.addSvgIcon(
      'usa',
      this.sanitizer.bypassSecurityTrustResourceUrl(`../assets/icons/usa.svg`)
    );
  }

  getLang(): void {
    this.translate.use(this.langService.getCurLang());
  }
  switchLanguage(lang: string): void {
    this.translate.use(lang);
    sessionStorage.setItem('language', lang);
  }
}
