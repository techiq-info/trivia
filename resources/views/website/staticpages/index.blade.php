@extends('layouts.website')
@section('page-content')
<section>
<div class="container mt-5">
    <form action="/play" method="post">
    <input type="hidden" name="_token" value="{{ csrf_token() }}">
        <div class="d-flex justify-content-center row">
            <div class="col-md-10 col-lg-10">
                <div class="border">
                    <div class="question bg-white p-3 border-bottom">
                        <div class="d-flex flex-row justify-content-between align-items-center mcq">
                            <h4>Trivia Quiz</h4>
                        </div>
                    </div>
                @if($errors->count())
                  @foreach ($errors->all() as $error)
                  <p class="yellow-text font lato-normal center">{{ $error }}</p>
                  @endforeach
                  @endif
                    <div class="question bg-white p-3 border-bottom">
                        <div class="d-flex flex-row align-items-center question-title">
                            <div><label>Name  </label></div>
                            <div><input name="username" id="username" type="text" required/></div>
                        </div>
                        <div class="d-flex flex-row align-items-center question-title">
                            <label>Email  </label>
                            <input name="useremail" id="email" type="text" required/>
                        </div>
                    </div>
                    <div class="d-flex flex-row justify-content-between align-items-center p-3 bg-white">
                        <button class="btn btn-primary border-success align-items-center btn-success" type="submit">Lets Start Quiz<i class="fa fa-angle-right ml-2"></i></button>
                        <!-- <input type="submit"> -->

                    </div>
                </div>
            </div>
        </div>
</form>
    </div>
</section>
@endsection