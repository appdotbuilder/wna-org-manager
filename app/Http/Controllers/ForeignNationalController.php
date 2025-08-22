<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreForeignNationalRequest;
use App\Http\Requests\UpdateForeignNationalRequest;
use App\Models\ForeignNational;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ForeignNationalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = ForeignNational::query();

        // Apply filters
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('full_name', 'like', "%{$search}%")
                  ->orWhere('passport_number', 'like', "%{$search}%")
                  ->orWhere('permit_number', 'like', "%{$search}%");
            });
        }

        if ($request->filled('country')) {
            $query->where('country_of_origin', $request->get('country'));
        }

        if ($request->filled('status')) {
            $query->where('status', $request->get('status'));
        }

        if ($request->filled('permit_type')) {
            $query->where('permit_type', $request->get('permit_type'));
        }

        if ($request->filled('activity_type')) {
            $query->where('activity_type', $request->get('activity_type'));
        }

        $foreignNationals = $query->orderBy('created_at', 'desc')->paginate(15);

        // Get filter options
        $countries = ForeignNational::distinct()->pluck('country_of_origin')->sort()->values();
        $permitTypes = ['work', 'study', 'visit', 'business', 'family', 'diplomatic'];
        $activityTypes = ['employee', 'student', 'investor', 'researcher', 'diplomat', 'tourist', 'family_reunion'];
        $statuses = ['active', 'expired', 'overstay', 'cancelled'];

        return Inertia::render('foreign-nationals/index', [
            'foreignNationals' => $foreignNationals,
            'filters' => [
                'search' => $request->get('search'),
                'country' => $request->get('country'),
                'status' => $request->get('status'),
                'permit_type' => $request->get('permit_type'),
                'activity_type' => $request->get('activity_type'),
            ],
            'filterOptions' => [
                'countries' => $countries,
                'permitTypes' => $permitTypes,
                'activityTypes' => $activityTypes,
                'statuses' => $statuses,
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('foreign-nationals/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreForeignNationalRequest $request)
    {
        $foreignNational = ForeignNational::create($request->validated());

        return redirect()->route('foreign-nationals.show', $foreignNational)
            ->with('success', 'Foreign national registered successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(ForeignNational $foreignNational)
    {
        $foreignNational->load('alerts');
        
        return Inertia::render('foreign-nationals/show', [
            'foreignNational' => $foreignNational
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ForeignNational $foreignNational)
    {
        return Inertia::render('foreign-nationals/edit', [
            'foreignNational' => $foreignNational
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateForeignNationalRequest $request, ForeignNational $foreignNational)
    {
        $foreignNational->update($request->validated());

        return redirect()->route('foreign-nationals.show', $foreignNational)
            ->with('success', 'Foreign national updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ForeignNational $foreignNational)
    {
        $foreignNational->delete();

        return redirect()->route('foreign-nationals.index')
            ->with('success', 'Foreign national record deleted successfully.');
    }
}