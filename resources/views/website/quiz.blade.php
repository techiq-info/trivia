@extends('layouts.website')
@section('page-content')
<section>
    <div class="container mt-5">
         <form action="/submitanswer" method="post">
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
        <div class="d-flex justify-content-center row">
            <div class="col-md-10 col-lg-10">
                <div class="border">
                    <div class="question bg-white p-3 border-bottom">
                        <div class="d-flex flex-row justify-content-between align-items-center mcq">
                            <h4>Quiz</h4>
                        </div>
                    </div>
                    <div class="question bg-white p-3 border-bottom">
                    <div class="d-flex flex-row align-items-center question-title">
                            <h5 class="text-danger">Question: </h5>
                            <h5 class="mt-1 ml-2"><?php echo $currentquestion["question"]?></h5>
                        </div>
                        @foreach($currentquestion["options"] as $option)
                        <div class="ans ml-2">
                            <label class="radio"> <input type="radio" name="answer" value="<?php echo $option?>" required> <span><?php echo $option?></span>
                            </label>
                        </div>
                        @endforeach
                    </div>
                    <div class="d-flex flex-row justify-content-between align-items-center p-3 bg-white">
                        <!-- <button  type="button">Next<i class="fa fa-angle-right ml-2"></i></button> -->

                        <input class="btn btn-primary border-success align-items-center btn-success" type="submit" value="Next Question">

                    </div>
                </div>
            </div>
        </div>
    </form>
    </div>
</section>
@endsection