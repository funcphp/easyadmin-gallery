<?php

namespace Func\EasyAdminGalleryBundle\Controller\Traits;

trait ListMosaic
{
    // templates
    // todo: viewAction()

    public function listAction()
    {
        $this->entity['templates']['list'] = '@FuncEasyAdminGallery/list.html.twig';
        return parent::listAction();
    }

    public function searchAction()
    {
        $this->entity['templates']['list'] = '@FuncEasyAdminGallery/list.html.twig';
        return parent::searchAction();
    }
}
