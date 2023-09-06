<?php

namespace App\Http\Resources;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Task */
class TaskResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            // Без (bool) выдаёт в виде числа, что вызовет ошибку в клиенте
            'status' => (bool)$this->status,
            'createdAt' => $this->created_at,
            //'updated_at' => $this->updated_at,
        ];
    }
}
