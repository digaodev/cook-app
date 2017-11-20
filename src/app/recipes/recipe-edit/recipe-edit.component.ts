import { UploadedImage } from './../../shared/uploadedImage.model';
import { AfterContentInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { RecipeService } from './../recipe.service';
import { ScriptService } from './../../shared/script.service';
import { AuthService } from '../../auth/auth.service';

declare const cloudinary: any;
declare const $: any;

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
  providers: [ScriptService]
})
export class RecipeEditComponent implements OnInit, AfterContentInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  imagesUploadResponse = [];

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private scriptService: ScriptService,
    private authService: AuthService) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] ? true : false;
        this.initForm();
      });
  }

  ngAfterContentInit() {
    // the order of import matters in this case: JQuery first
    this.scriptService.load( 'jQuery', 'cloudinary')
      .then(() => {
        const folder = this.authService.getFullEmail();
        cloudinary.setCloudName('dwrqw2e4u');
        cloudinary.applyUploadWidget(
          document.getElementById('upload-widget-btn'),
          {
            // cloud_name: 'dwrqw2e4u',
            api_key: '514982885216574',
            upload_preset: 'cpgu2jvp',
            sources: ['local'],
            max_files: 4,
            folder: folder,
            resource_type: 'image',
            tags: ['user'],
            stylesheet: `
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

            `,
            button_caption: 'Upload de Imagens',
            text: {
              // 'powered_by_cloudinary': 'Powered by Cloudinary - Image management in the cloud',
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
              'progress.failed_note': 'Houve um problema com algumas das imagens'
            },
            max_file_size: 10000000 // (10 MB),
          },
          function (error, result) {
            console.log('afterOnInit');
            console.log(error, result);
          }
        );
      }).catch(error => console.log(error));
  }

  private initForm() {
    let recipeName = '';
    // let recipeImagePaths = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      this.imagesUploadResponse = recipe.images;

      if (recipe['ingredients']) {
        recipe['ingredients'].forEach((ingredient) => {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        });
      }

    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      // 'imagePath': new FormControl(recipeImagePaths, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // );
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    // this.recipeForm.reset();
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
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
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  // openUploadWidget() {
  //   const folder = this.authService.getFullEmail();
  //   // cloudinary.openUploadWidget({
  //   //   cloud_name: 'dwrqw2e4u',
  //   //   upload_preset: 'cpgu2jvp',
  //   //   sources: ['local'],
  //   //   max_files: 6,
  //   //   folder: folder,
  //   //   resource_type: 'image',
  //   //   max_file_size: 10000000, // (10 MB)
  //   //   theme: 'purple'
  //   // }, (error, result) => {
  //   //     if (error) {
  //   //       console.log(error);
  //   //     }
  //   //     this.imagesUploadResponse = result;
  //   //   });
  //   cloudinary.openUploadWidget({
  //     cloud_name: 'dwrqw2e4u',
  //     api_key: '514982885216574',
  //     upload_preset: 'cpgu2jvp',
  //     sources: ['local'],
  //     max_files: 8,
  //     folder: folder,
  //     resource_type: 'image',
  //     max_file_size: 10000000 // (10 MB)
  //     // theme: 'purple' // too slow -> 80kb background by default
  //   }, (error, result) => {
  //     if (error) {
  //       console.log(error);
  //     }
  //     result.map(element => {
  //       this.imagesUploadResponse.push(new UploadImage(
  //         element.url,
  //         element.thumbnail_url,
  //         element.original_filename,
  //         element.delete_token,
  //         element.format,
  //         element.public_id,
  //         element.bytes
  //       ));
  //     });
  //     // this.imagesUploadResponse = result;
  //     console.log(this.imagesUploadResponse);
  //   });
  // }

  // onDeleteImage(delete_token) {
  //   // console.log(delete_token);
  //   // console.log(cloudinary);
  //   $.cloudinary.delete_by_token(delete_token);
  //   // curl https://api.cloudinary.com/v1_1/demo/delete_by_token -X POST --data 'token=delete_token'

  // }

}
