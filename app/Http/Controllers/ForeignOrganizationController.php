<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreForeignOrganizationRequest;
use App\Http\Requests\UpdateForeignOrganizationRequest;
use App\Models\ForeignOrganization;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ForeignOrganizationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = ForeignOrganization::query();

        // Apply filters
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('organization_name', 'like', "%{$search}%")
                  ->orWhere('registration_number', 'like', "%{$search}%")
                  ->orWhere('contact_person', 'like', "%{$search}%");
            });
        }

        if ($request->filled('country')) {
            $query->where('country_of_origin', $request->get('country'));
        }

        if ($request->filled('status')) {
            $query->where('status', $request->get('status'));
        }

        if ($request->filled('organization_type')) {
            $query->where('organization_type', $request->get('organization_type'));
        }

        if ($request->filled('activity_type')) {
            $query->where('activity_type', $request->get('activity_type'));
        }

        $organizations = $query->orderBy('created_at', 'desc')->paginate(15);

        // Get filter options
        $countries = ForeignOrganization::distinct()->pluck('country_of_origin')->sort()->values();
        $organizationTypes = ['company', 'ngo', 'embassy', 'consulate', 'educational', 'religious', 'other'];
        $activityTypes = ['commercial', 'educational', 'humanitarian', 'diplomatic', 'religious', 'research', 'development'];
        $statuses = ['active', 'inactive', 'suspended', 'closed'];

        return Inertia::render('foreign-organizations/index', [
            'organizations' => $organizations,
            'filters' => [
                'search' => $request->get('search'),
                'country' => $request->get('country'),
                'status' => $request->get('status'),
                'organization_type' => $request->get('organization_type'),
                'activity_type' => $request->get('activity_type'),
            ],
            'filterOptions' => [
                'countries' => $countries,
                'organizationTypes' => $organizationTypes,
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
        return Inertia::render('foreign-organizations/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreForeignOrganizationRequest $request)
    {
        $organization = ForeignOrganization::create($request->validated());

        return redirect()->route('foreign-organizations.show', $organization)
            ->with('success', 'Foreign organization registered successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(ForeignOrganization $foreignOrganization)
    {
        $foreignOrganization->load('alerts');
        
        return Inertia::render('foreign-organizations/show', [
            'organization' => $foreignOrganization
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ForeignOrganization $foreignOrganization)
    {
        return Inertia::render('foreign-organizations/edit', [
            'organization' => $foreignOrganization
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateForeignOrganizationRequest $request, ForeignOrganization $foreignOrganization)
    {
        $foreignOrganization->update($request->validated());

        return redirect()->route('foreign-organizations.show', $foreignOrganization)
            ->with('success', 'Foreign organization updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ForeignOrganization $foreignOrganization)
    {
        $foreignOrganization->delete();

        return redirect()->route('foreign-organizations.index')
            ->with('success', 'Foreign organization record deleted successfully.');
    }
}