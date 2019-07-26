<?php

namespace Func\EasyAdminGalleryBundle\Controller;

use EasyCorp\Bundle\EasyAdminBundle\Controller\AdminController as BaseAdminController;

class GalleryController extends BaseAdminController
{
    use Traits\DragDrop;
    use Traits\ListMosaic;
}
