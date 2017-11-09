<?php

namespace App;

use App\games;
use App\throws;

use Illuminate\Database\Eloquent\Model;

class sets extends Model
{
    //
    protected $table = 'sets';

    protected $fillable = ['gameid', 'setScore'];

    public function throws() {
        return $this->hasMany(throws::class);
    }

    public function games() {
        return $this->belongsTo(games::class);
    }
}
