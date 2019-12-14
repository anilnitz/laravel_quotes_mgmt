<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class comment extends Model
{
    //
    protected $fillable = [
        'user_id', 'guestname', 'comment','quote_id',
    ];
}
