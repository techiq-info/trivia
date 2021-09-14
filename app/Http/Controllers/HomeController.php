<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\NumberApiService;
use App\Http\Models\Quote;

use Validator, DB, Mail, Response;

class HomeController extends Controller
{

    protected $numberservice;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(NumberApiService $numberservice)
    {
        $this->numberservice = $numberservice;
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
        $slug = 'home';
        //$request->session()->put('username', null);
        $this->gotoStep($request);
        if($request->session()->has('username')) {
            $this->viewData['username'] = $request->session()->get('username');
        } else {
            $this->viewData['username'] = "Guest User";
        }
    
        $this->viewData['meta_title'] = "Trivia Game";
        return view('website.staticpages.index',$this->viewData);
    }

    public function gotoStep(Request $request){
        if(!$request->session()->get("quote_id")){
            return redirect('/home');
        }
        return redirect('/quiz');
    }

    public function getQuestions()
    {
       return $questions = $this->numberservice->getQuestions();
     }


    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function play(Request $request)
    {
        $requestInput = $request->all();
        // validation

        $validator = Validator::make($request->all(), [
            'username' => "required",
            'useremail' => 'required',
        ]);

        if ($validator->fails()) {
            // validator
            return redirect()->back()->withErrors($validator)->withInput();
        }
        
        $emailAddress = $requestInput["useremail"];
        $username = $requestInput["username"];
        $quoteId =  $request->session()->get('quote_id'); //die();

        //  if quote not set in session then call api and set new quote for user

        if($quoteId > 0) {
            return redirect('/quiz');
        } else {
            $questions = $this->getQuestions();
            if(!empty($requestInput["useremail"])) {
                $request->session()->put('username',$username);
                $request->session()->put('useremail',$emailAddress);


                // Save a Quote in database and set the quote id on session
                $newQuote = new Quote();
                $newQuote->field["username"]        = $username;
                $newQuote->field["useremail"]       = $emailAddress;
                $newQuote->field["questions"] =   json_encode($questions);
                $arrResp = $newQuote->saveQuote();

                if($arrResp)
                {
                    $request->session()->put('quote_id',$arrResp['quote_id']);
                    $request->session()->put('quote_questions',$questions);
                    $request->session()->put('results',[]);
                }

                return redirect('/quiz');
            }
            
        }       
        
        
        return redirect('/home');
    }

    public function submitAnswerQuiz(Request $request)
    {
        $requestInput = $request->all();
        $currentQ = $request->session()->get("current_question");  
        if($currentQ["answer"] === $requestInput["answer"]){
            $status = "Correct";
        } else {
            $status = "Wrong";
        }
        $result = array(
            'question' => $currentQ["question"],
            'answer' => $currentQ["answer"],
            'answergiven' => $requestInput["answer"],
            'status' => $status
        );

        $results = $request->session()->get('results');
        $results[] = $result;
        $results = $request->session()->put('results', $results);

        

        return redirect('/quiz');

    }

    public function QuizPlay(Request $request)
    {  

        // if quote id not set in session then return to home

        if(!$request->session()->get("quote_id")){
            return redirect('/home');
        }



        $questions = $request->session()->get("quote_questions");
        $results = $request->session()->all();
        $this->viewData['username'] = $request->session()->get('username');
        // pull one element
        if(count($questions)==0)
        {
             $results = $request->session()->get("results");
            // Save Result in DB
            



            $this->viewData['results'] = $results;
            $this->viewData['totalquestions'] = count($results);
            $this->viewData['correctans'] = count($results);
            $this->viewData['wrongans'] = count($results);
            $this->viewData['meta_title'] = "Trivia Game";

            // refresh session and delete the quiz quote session
            $request->session()->forget("quote_id");
            $request->session()->forget("quote_questions");

            return view('website.result',$this->viewData);
            // set the Thank You Page and Show Result

            die("You completed the Quiz");
        }

        $currentQuestion  = array_pop($questions);
        $questions = $request->session()->put("quote_questions", $questions);
        $currentQ = $request->session()->put("current_question", $currentQuestion);      
        $this->viewData['currentquestion'] = $currentQuestion;
       
        $this->viewData['meta_title'] = "Trivia Game";
        return view('website.quiz',$this->viewData);
    }
}
