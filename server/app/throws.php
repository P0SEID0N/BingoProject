<?php

namespace App;

use App\sets;

use Illuminate\Database\Eloquent\Model;

class throws extends Model
{
    //
    protected $table = 'throws';

    protected $fillable = ['setid', 'throwValue'];

    public function sets() {
        return $this->belongsTo(sets::class);
    }
}
