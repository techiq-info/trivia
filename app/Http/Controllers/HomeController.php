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
        // $this->middleware('auth');
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
        if($request->session()->has('username')) {
            $this->viewData['username'] = $request->session()->get('username');
        } else {
            $this->viewData['username'] = "Guest User";
        }
    
        $this->viewData['meta_title'] = "Trivia Game";
        return view('website.staticpages.index',$this->viewData);
    }

    public function getQuestions()
    {
       return $questions = $this->numberservice->getQuestions();
        // echo "<pre>";
        // print_r($questions);
        // die();
    }


    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function play(Request $request)
    {
        $requestInput = $request->all();
        $emailAddress = $requestInput["email"];
        $username = $requestInput["yourname"];

   echo     $quoteId =  $request->session()->get('quote_id'); //die();

        //  if quote not set in session then call api and set new quote for user

        if($quoteId > 0) {
            return redirect('/quiz');
                print_r($request->session->all()); die();
        } else {
            $questions = $this->getQuestions();
            if(!empty($requestInput["email"])) {
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
                }

                return redirect('/quiz');
            }
            
        }       
        
        
        return redirect('/home');
    }

    public function QuizPlay(Request $request)
    {  

        // set the question in session

        // pull one question and set in view Data

        $questions = $request->session()->get("quote_questions");
        // pull one element
        
        if(!$questions)
        {
            return view('website.complete');
        }

        $currentQuestion  = array_pop($questions);
        $questions = $request->session()->put("quote_questions", $questions);


        // echo "<pre>";
        // $allsession = $request->session()->all();

        // print_r($allsession);
        
        $this->viewData['currentquestion'] = $currentQuestion;
        $this->viewData['username'] = $request->session()->get('username');
        $this->viewData['meta_title'] = "Trivia Game";
        return view('website.quiz',$this->viewData);
        die();
    }
}
