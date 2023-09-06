<?php

namespace App\Providers;

use App\Models\Task;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     */
    public function boot(): void
    {
        Route::model('task', Task::class);
        $this->routes(function () {
            Route::prefix('api')
                ->group(base_path('routes/api.php'));

            Route::group([], base_path('routes/web.php'));
        });
    }
}
