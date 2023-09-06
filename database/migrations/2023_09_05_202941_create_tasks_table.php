<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('tasks', static function (Blueprint $table) {
            $table->engine = 'MyISAM';
            $table->id();
            $table->string('title', 255);
            $table->string('description', 2048);
            $table->boolean('status')->default(false);
            $table->fullText(['title', 'description']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
