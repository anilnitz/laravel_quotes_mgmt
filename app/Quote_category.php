<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Quote_category extends Model
{
    protected $fillable = [
        'category', 'description', 'dates','user_id'
    ];
    
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
