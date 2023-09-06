<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;


Route::get("/list", [TaskController::class, "list"]);
Route::post("/create", [TaskController::class, "create"]);
Route::delete("/task/{task}", [TaskController::class, "delete"]);
Route::patch("/trigger/{task}", [TaskController::class, "trigger"]);
