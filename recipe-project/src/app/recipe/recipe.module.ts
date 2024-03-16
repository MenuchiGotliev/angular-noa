import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { recipeRoutingModule } from './recipe-routing.module';
import { SmallRecipeComponent } from './components/small-recipe/small-recipe.component';
import { AllRecipesComponent } from './components/all-recipes/all-recipes.component';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { DifficultyLevelPipe } from "../difficulty-level.pipe";
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms'; // Import FormsModule
import {HttpClient, HttpClientModule } from '@angular/common/http';
import { MenuModule } from 'primeng/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import { SidebarModule } from 'primeng/sidebar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { PreparationTimePipe } from '../preparationtime.pipe';
@NgModule({
    declarations: [PreparationTimePipe,AllRecipesComponent, SmallRecipeComponent, EditRecipeComponent, AddRecipeComponent, RecipeDetailsComponent],
    imports: [MatCheckboxModule,MenuModule,MatSidenavModule,MatSliderModule,SidebarModule,HttpClientModule,FormsModule,ReactiveFormsModule,
        CommonModule, MatButtonModule, MatCardModule, recipeRoutingModule, NavBarComponent,NgbPaginationModule, NgbAlertModule,
        DifficultyLevelPipe, NgbCarouselModule
    ]
})
export class RecipeModule { }
