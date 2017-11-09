<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class users extends Model
{
    //
    public function games() {
        return $this->hasMany('App/games');
    }
}
