<?php

namespace App;

use App\sets;
use App\users;

use Illuminate\Database\Eloquent\Model;

class games extends Model
{
    //

    protected $table = 'games';

    protected $fillable = ['userid', 'totalScore'];

    public function users() {
        return $this->belongsTo(users::class);
    }

    public function sets() {
        return $this->hasMany(sets::class);
    }
}
