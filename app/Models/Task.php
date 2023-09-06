<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'status',
    ];

    public function getRouteKeyName(): string
    {
        return "id";
    }

    public function resolveRouteBinding($value, $field = null)
    {
   
        return $this->where("id", $value)->first() ?? abort(404);
    }
}
