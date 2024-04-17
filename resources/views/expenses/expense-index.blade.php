@section('content')
@extends('layouts.app')

<div class="container mx-auto"></div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
               <tr>
                   <th scope="col" class="px-6 py-3">#</th>
                   <th scope="col" class="px-6 py-3">Description</th>
                   <th scope="col" class="px-6 py-3">Date</th>
                   <th scope="col" class="px-6 py-3">Category</th>
                   <th scope="col" class="px-6 py-3">Payment Method</th>
               </tr>
           
            </thead>
            @foreach($expenses as $expense)
            <tbody>
               <tr>
                   <td class="px-6 py-4">{{$expense->id}}</td>
                   <td class="px-6 py-4">{{$expense->description}}</td>
                   <td class="px-6 py-4">{{$expense->date}}</td>
                   <td class="px-6 py-4">{{$expense->category}}</td>
                   <td class="px-6 py-4">{{$expense->payment_method}}</td>
                   <td ><a href="{{ route('expense.view', $expense->id) }}" class="mr-3"><button>View</button></a></td>
                  
                    <ExpensePageList viewExpenseRoute="{{ route('expense.view', $expense->id) }}" />

                   <td ><a href="{{ route('expense.delete', $expense->id) }}" class="mr-3"><button>Delete</button></a></td>
                  
               </tr>
            </tbody>
            @endforeach
           </table>
           {{$expenses->render()}}
           
    </div>
</div>
   
   
   
@endsection