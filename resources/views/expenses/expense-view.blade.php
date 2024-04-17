@section('content')
@extends('layouts.app')

<div class="container mx-auto">
    <div class="w-96 mx-auto">
        <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <div class="p-6">
                <div class="text-xl font-semibold mb-4">View</div>
                <form action="{{ route('expense.update') }}" method="post">
                    @include('expenses.expense-form-partial')
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
