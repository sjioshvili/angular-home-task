import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SwitchLangComponent } from './switch-lang/switch-lang.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [NavbarComponent, DeleteDialogComponent, SwitchLangComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,

    RouterModule,
    MatDialogModule,
    TranslateModule,
    MatTooltipModule,
  ],
  exports: [NavbarComponent, DeleteDialogComponent, SwitchLangComponent],
})
export class SharedModule {}
