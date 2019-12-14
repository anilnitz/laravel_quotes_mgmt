<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Quote extends Model
{
    //
    protected $fillable = [
        'title', 'category', 'author_name','quote','user_id'
    ];
    
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}

