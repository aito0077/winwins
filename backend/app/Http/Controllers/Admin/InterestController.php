<?php 

namespace Winwins\Http\Controllers\Admin;

use Winwins\Http\Requests;
use Winwins\Http\Controllers\Controller;
use \Serverfireteam\Panel\CrudController;

use Illuminate\Http\Request;

class InterestController extends CrudController{

    public function all($entity){
        parent::all($entity);

        $this->filter = \DataFilter::source(new \Winwins\Interest);
        $this->filter->add('name', 'Name', 'text');
        $this->filter->add('description', 'Description', 'text');
        $this->filter->submit('search');
        $this->filter->reset('reset');
        $this->filter->build();

        $this->grid = \DataGrid::source($this->filter);
        $this->grid->add('name', 'Name');
        $this->grid->add('description', 'Description');
        $this->addStylesToGrid();

        return $this->returnView();
    }

    public function  edit($entity){

        parent::edit($entity);

        $this->edit = \DataEdit::source(new \Winwins\Interest());
        $this->edit->label('Editar Interest');

        $this->edit->add('name', 'Name', 'text')->rule('required');
        $this->edit->add('description', 'Description', 'text')->rule('required');

        return $this->returnEditView();
    }
}
