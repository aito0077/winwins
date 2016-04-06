<?php

namespace Winwins\Http\Controllers\Admin;

use Winwins\Http\Requests;
use Winwins\Http\Controllers\Controller;
use \Serverfireteam\Panel\CrudController;

use Illuminate\Http\Request;

class SponsorController extends CrudController{

    public function all($entity){
        parent::all($entity);

        $this->filter = \DataFilter::source(new \Winwins\Sponsor);
        $this->filter->add('name', 'Sponsor Name', 'text');
        $this->filter->add('contact_name', 'Contact Name', 'text');
        $this->filter->add('status', 'Status', 'select')->options(\Winwins\Sponsor::$SponsorStatus);
        $this->filter->submit('search');
        $this->filter->reset('reset');
        $this->filter->build();

        $this->grid = \DataGrid::source($this->filter);
        $this->grid->add('name', 'Sponsor Name');
        $this->grid->add('status', 'Status');
        $this->grid->add('type', 'Type');
        $this->grid->add('contact_name',  'Contact Name');
        $this->grid->add('contact_email', 'Contact Email');
        $this->grid->add('contact_phone', 'Contact Phone');
        $this->addStylesToGrid();

        return $this->returnView();
    }

    public function  edit($entity){

        parent::edit($entity);

        $this->edit = \DataEdit::source(new \Winwins\Sponsor());
        $this->edit->label('Editar Sponsor');

        $this->edit->add('user', 'User', 'select')->options(\Winwins\User::lists('username', 'id')->all());

        $this->edit->add('name', 'Sponsor Name', 'text')->rule('required');
        $this->edit->add('about', 'About', 'textarea')->rule('required');

        $this->edit->add('status', 'Status', 'select')->options(\Winwins\Sponsor::$SponsorStatus);
        $this->edit->add('type', 'Type', 'text')->rule('required');

        $this->edit->add('is_active', 'is_active', 'checkbox');
        $this->edit->add('is_main',   'is_main',   'checkbox');

        $this->edit->add('contact_name',  'Contact Name' , 'text')->rule('required');
        $this->edit->add('contact_email', 'Contact Email', 'text')->rule('required');
        $this->edit->add('contact_phone', 'Contact Phone', 'text')->rule('required');

        $this->edit->add('cover_photo', 'Cover Photo', 'text');
        $this->edit->add('photo', 'Photo', 'text');

        return $this->returnEditView();
    }
}

