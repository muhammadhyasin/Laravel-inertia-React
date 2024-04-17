
                    {{ csrf_field() }}
                    <input type="hidden" name="id" value="{{$expense->id}}">
                    <div class="mb-4">
                        <label for="description" class="block">Description</label>
                        <input type="text" name="description" class="w-full border-gray-300 dark:border-gray-600 rounded-md p-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white" value="{{old('description', $expense->description)}}">
                        <div class="text-red-500">{{ $errors->first('description') }}</div>
                    </div>

                    <div class="mb-4">
                        <label for="date" class="block">Date</label>
                        <input type="date" name="date" class="w-full border-gray-300 dark:border-gray-600 rounded-md p-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white" value="{{ old('date', Carbon\Carbon::parse($expense->date)->format('Y-m-d')) }}">
                        <div class="text-red-500">{{ $errors->first('date') }}</div>
                    </div>

                    <div class="mb-4">
                        <label for="amount" class="block">Amount</label>
                        <input type="text" name="amount" class="w-full border-gray-300 dark:border-gray-600 rounded-md p-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white" value="{{old('amount',$expense->amount)}}">
                        <div class="text-red-500">{{ $errors->first('amount') }}</div>
                    </div>

                    <div class="mb-4">
                        <label for="category" class="block">Category</label>
                        <select name="category" id="category" class="w-full border-gray-300 dark:border-gray-600 rounded-md p-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white">
                            @foreach($expenses as $exp)
                            <option value="{{$exp}}" {{($expense->category === $exp) ? "selected" : null}}>{{$exp}}</option>
                        @endforeach
                        </select>
                        <div class="text-red-500">{{ $errors->first('category') }}</div>
                    </div>

                    <div class="mb-4">
                        <label for="payment_method" class="block">Payment Method</label>
                        <select name="payment_method" id="payment_method" class="w-full border-gray-300 dark:border-gray-600 rounded-md p-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white">
                             @foreach($paymentMethods as $paymentMethod)
                             <option value="{{$paymentMethod}}" {{($expense->payment_method === $paymentMethod) ? "selected" : null}}>{{$paymentMethod}}</option>
                            @endforeach
                        </select>
                    </div>

                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
                