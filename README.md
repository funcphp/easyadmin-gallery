 # Func/EasyAdminGalleryBundle

Mosaic listing, drag and drop upload and more for EasyAdminBundle

![Demo](https://raw.githubusercontent.com/funcphp/EasyAdminGalleryBundle/master/src/Func/EasyAdminGalleryBundle/Resources/doc/preview.gif)

* Mosaic / mason listing
* Drag and drop file upload and create records


## install

#### download repo via composer

    composer require funcphp/easyadmin-gallery "dev-master"

#### enable bundle from `app/AppKernel.php`

```php
    $bundles = [
        ...
        new Func\EasyAdminGalleryBundle\FuncEasyAdminGalleryBundle(),
        ...
    ];
```

#### install assets

    php bin/console assets:install --symlink

## usage

#### 1.

set your gallery entitiy controller as `Func\EasyAdminGalleryBundle\Controller\GalleryController`

or

use this trait in your **gallery admin controller**: `Func\EasyAdminGalleryBundle\Controller\Traits\ListMosaic`

#### 2.1. mosaic view

```yml
easy_admin:
    entities:
        Gallery:
            class: AppBundle\Entity\Gallery # an entity
            controller: Func\EasyAdminGalleryBundle\Controller\GalleryController
            list:
                fields:
                    
                    # thumbnail field
                    -
                        property: 'image'
                        type: 'image'
                        base_path: '%path.gallery%'
                        thumbnail: true ##
                    
                    # thumbnail text field
                    -
                        property: 'title'
                        thumbnail_text: true ##
                    
                    # other fields
                    - 'id'
                    - 'enabled'
                    
                    ...
                ...
            ...
        ...
    ...
...
```
ready to mosaic listing.

#### 2.2. drag and drop upload

set your gallery entitiy controller as `Func\EasyAdminGalleryBundle\Controller\GalleryController`

or

use this trait in your **gallery admin controller**: `Func\EasyAdminGalleryBundle\Controller\Traits\DragDrop`


```yml
easy_admin:
    entities:
        Gallery:
            class: AppBundle\Entity\Gallery # an entity
            controller: Func\EasyAdminGalleryBundle\Controller\GalleryController
            dragDrop:
            
                #backend values
                values:
                   #column: "value"
                    imageFile: "%%file%%"
                    title: "%%file.name%%"
                    enabled: true
                    description: "This record created by drag'n drop!"
                    
                #frontend values
                fields:
                   #form fields to overwrite values
                    - 'enabled'
                    - 'description'
                    
            list:
                fields:
                    ...
            form:
                fields:
                    ...
                ...
            ...
        ...
    ...
...
```
ready to drag and drop uploading.

## todo list

- [x] custom list action: mosaic / mason listing
- [x] custom list action: drag and drop file upload and create records
- [ ] custom show action: gallery viewing - prev / curr / next
- [ ] custom edit action: drag and drop