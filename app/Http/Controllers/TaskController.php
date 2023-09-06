<?php

namespace App\Http\Controllers;

use App\Helpers\SearchStringOptimizerServiceProvider;
use App\Http\Requests\TaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class TaskController extends Controller
{
    public function list(Request $request): AnonymousResourceCollection
    {
        $sortType = $request->query("sort", "new");
        $searchString = trim($request->query("search", ""));
        /** @var ?Builder $builder */
        $builder = null;
        switch ($sortType) {
            case "new":
            {
                $builder = Task::query()->orderByDesc("created_at");
                break;
            }
            case "old":
            {
                $builder = Task::query()->orderBy("created_at");
                break;
            }
            case "done":
            {
                $builder = Task::query()->orderByDesc("status");
                break;
            }
            case "undone":
            {
                $builder = Task::query()->orderBy("status");
                break;
            }
        }
        if (is_null($builder)) {
            return TaskResource::collection(Task::all());
        }
        if (!empty($searchString)) {
            $searchString = SearchStringOptimizerServiceProvider::optimizeString($searchString);
            if (count($searchString) > 0) {
                array_walk($searchString, static function (&$item) {
                    $item = "+" . $item . "*";
                });
                $builder = $builder->whereRaw("MATCH (title, description) AGAINST (? IN BOOLEAN MODE)",
                    [implode(" ", $searchString)]
                );
            }
        }
        return TaskResource::collection($builder->get());
    }

    public function create(TaskRequest $request): TaskResource
    {
        return new TaskResource(Task::create($request->validated()));
    }

    public function delete(int $taskId): TaskResource
    {
        $task = Task::findOrFail($taskId);
        $task->delete();

        return new TaskResource($task);
    }

    public function trigger(int $taskId): TaskResource
    {
        $task = Task::findOrFail($taskId);
        $task->status = !$task->status;
        $task->save();

        return new TaskResource($task);
    }
}
