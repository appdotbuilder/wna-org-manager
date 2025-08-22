<?php

use App\Http\Controllers\ForeignNationalController;
use App\Http\Controllers\ForeignOrganizationController;
use App\Http\Controllers\WnaDashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// WNA Dashboard - Main functionality on home page
Route::get('/', [WnaDashboardController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // Foreign Nationals resource routes
    Route::resource('foreign-nationals', ForeignNationalController::class);
    
    // Foreign Organizations resource routes  
    Route::resource('foreign-organizations', ForeignOrganizationController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
