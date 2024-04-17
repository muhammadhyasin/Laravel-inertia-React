<?php

use Inertia\Inertia;
use App\Models\Expense;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\ProfileController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'authenticated' => auth()->check(),
    ]);
});

Route::get('/dashboard', function () {
    $expenses = Expense::all();
    return Inertia::render('Dashboard',[
        'expenses' => $expenses,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/expenses', [ExpenseController::class,'index'])->name('expense.list');
    Route::get('/expenses/add', [ExpenseController::class,'add'])->name('expense.add');
    Route::post('/expenses/save', [ExpenseController::class,'store'])->name('expense.save');
    Route::get('/expenses/view/{expense}', [ExpenseController::class,'view'])->name('expense.view');
    Route::post('/expense/update', [ExpenseController::class, 'update'])->name('expense.update');
    Route::get('/expenses/delete/{expense}', [ExpenseController::class,'delete'])->name('expense.delete');
    Route::get('/expenses/category/{category}', [ExpenseController::class,'showByCategory'])->name('expenses.byCategory');

});
Route::get('/index', function () {
    $expenses = Expense::all();
    return Inertia::render('Home/Index',[
        'expenses' => $expenses,
    ]);
})->name('index');;
Route::get('/expense', function () {
    $expenses = Expense::orderByDesc('id')
        ->paginate(7);
    return Inertia::render('Expenses/index',[
        'expenses' => $expenses,
        
    ]);
})->name('nm');;

require __DIR__.'/auth.php';
