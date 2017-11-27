import {
  AfterContentInit,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from './../../shared/recipe.model';
import { UploadedImage } from './../../shared/uploadedImage.model';

import { RecipeService } from './../recipe.service';
import { AuthService } from '../../auth/auth.service';
// import { CloudinaryService } from '../../shared/cloudinary.service';

declare const cloudinary: any;
declare const $: any;

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, AfterContentInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  imagesUploaded = [];
  imagesUploadedSaved = [];
  imagesUploadedResponse = [];

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] ? true : false;
      this.initForm();
    });
  }

  ngAfterContentInit() {
    const folder = this.authService.getFullEmail();
    const tags = ['user'];
    const buttonCaption = 'Clique para fazer upload de imagens';
    const sources = ['local'];
    const maxFiles = 4;
    const maxFileSize = 10000000; // (10 MB);
    const resourceType = 'image';

    const buttonText = {
      'sources.local.title': 'Meus Arquivos',
      'sources.local.drop_file': 'Arraste e solte a imagem aqui',
      'sources.local.drop_files': 'Arraste e solte as imagens aqui',
      'sources.local.drop_or': 'ou',
      'sources.local.select_file': 'Selecione a imagem',
      'sources.local.select_files': 'Selecione as imagens',
      'progress.uploading': 'Transferindo...',
      'progress.upload_cropped': 'Upload',
      'progress.processing': 'Processando...',
      'progress.retry_upload': 'Tente Novamente',
      'progress.use_succeeded': 'OK',
      'progress.failed_note': 'Houve um problema com uma ou mais imagens'
    };

    const cssStylesheet = `
             #cloudinary-widget .button, #cloudinary-widget .button.small_button {
               background: #4a2f65;
             }

             #cloudinary-widget .button:hover, #cloudinary-widget .button.small_button:hover, #cloudinary-widget .upload_button_holder:hover .button {
               background: #845aad;
             }

             #cloudinary-widget .panel.progress .thumbnails .thumbnail .error {
               color: #4a2f65;
             }

             .widget .header .sources .source.active {
               background-color: #4a2f65;
             }

             .widget .header {
               border-color: #4a2f65;
             }
             `;
    cloudinary.applyUploadWidget(
      document.getElementById('upload-widget-btn'),
      {
        cloud_name: 'dwrqw2e4u',
        api_key: '514982885216574',
        upload_preset: 'hrxjoxko',
        folder: folder,
        tags: tags,
        sources: sources,
        max_files: maxFiles,
        max_file_size: maxFileSize,
        resource_type: resourceType,
        button_caption: buttonCaption,
        text: buttonText,
        stylesheet: cssStylesheet
      },
      (error, result) => {
        if (result) {
          for (const image of result) {
            this.imagesUploadedResponse.push(
              new UploadedImage(
                image.secure_url,
                image.thumbnail_url,
                image.original_filename,
                image.format,
                image.public_id,
                image.bytes
              )
            );
          }
        }
        // console.log('error', error);
        // console.log('result', result);
        // console.log('imagesUploadedResponse => ', this.imagesUploadedResponse);
      }
    );
  }

  private initForm() {
    let recipeName = '';
    let recipeDescription = '';
    let recipeImageURL = '';
    // const recipeUploadedImages = new FormArray([]);
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImageURL = recipe.imageURL;

      if (recipe.images) {
        this.imagesUploadedSaved = recipe.images.slice();
      } else {
        this.imagesUploadedSaved = [];
      }

      if (recipe['ingredients']) {
        recipe['ingredients'].forEach(ingredient => {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        });
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
      imageURL: new FormControl(recipeImageURL)
      // 'images': recipeUploadedImages
    });

  }

  onSubmit() {
    const imagesUploadedMerged = this.imagesUploadedSaved.concat(
      this.imagesUploadedResponse
    );

    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['ingredients'],
      this.recipeForm.value['imageURL'],
      imagesUploadedMerged
    );

    if (this.editMode) {
      // this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      // this.recipeService.addRecipe(this.recipeForm.value);
      this.recipeService.addRecipe(newRecipe);
    }
    // this.recipeForm.reset();
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.imagesUploadedSaved = null;
    this.imagesUploadedResponse = null;

    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteImageUploadResponse(public_id) {
    for (let i = 0; i < this.imagesUploadedResponse.length; i++) {
      if (this.imagesUploadedResponse[i].public_id === public_id) {
        this.imagesUploadedResponse.splice(i, 1);
      }
    }
  }

  onDeleteImageUploadSaved(public_id) {
    for (let i = 0; i < this.imagesUploadedSaved.length; i++) {
      if (this.imagesUploadedSaved[i].public_id === public_id) {
        this.imagesUploadedSaved.splice(i, 1);
      }
    }
  }
}
