@extends('layouts.website')
@section('page-content')
<section>
    <div class="container mt-5">
        <div class="d-flex justify-content-center row">
            <div class="col-md-10 col-lg-10">
                <div class="border">
                    <div class="question bg-white p-3 border-bottom">
                        <div class="d-flex flex-row justify-content-between align-items-center mcq">
                            <h4>Quiz</h4><span>(5 of 20)</span>
                        </div>
                    </div>
                    <div class="question bg-white p-3 border-bottom">
                    <div class="d-flex flex-row align-items-center question-title">
                            <h3 class="text-danger">Q.</h3>
                            <h5 class="mt-1 ml-2"><?php echo $currentquestion["question"]?></h5>
                        </div>
                        @foreach($currentquestion["options"] as $option)
                        <div class="ans ml-2">
                            <label class="radio"> <input type="radio" name="answer" value="<?php echo $option?>"> <span><?php echo $option?></span>
                            </label>
                        </div>
                        @endforeach
                    </div>
                    <div class="d-flex flex-row justify-content-between align-items-center p-3 bg-white"><button class="btn btn-primary border-success align-items-center btn-success" type="button">Next<i class="fa fa-angle-right ml-2"></i></button></div>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection