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
                    <div class="question bg-white p-3 border-bottom">
                        <div class="d-flex flex-row align-items-center question-title">
                            <h5 class="text-danger">Enter Your Name</h3>
                            <h5 class="mt-1 ml-2"><input name="yourname" id="yourname" type="text"/></h5>
                        </div>
                        <div class="d-flex flex-row align-items-center question-title">
                            <h5 class="text-danger">Enter Your Email</h3>
                            <h5 class="mt-1 ml-2"><input name="email" id="email" type="text"/></h5>
                        </div>
                    </div>
                    <div class="d-flex flex-row justify-content-between align-items-center p-3 bg-white">
                        <button class="btn btn-primary border-success align-items-center btn-success" type="button">Lets Start Quiz<i class="fa fa-angle-right ml-2"></i></button>
                        <input type="submit">
                    </div>
                </div>
            </div>
        </div>
</form>
    </div>
</section>
@endsection