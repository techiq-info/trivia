<?php

namespace App\Services;

use Illuminate\Support\Collection;
use Illuminate\Session\SessionManager;

class NumberApiService {

    protected $endpoint = "http://numbersapi.com/";
    protected $min = 0;
    protected $max = 1000;
    protected $requestNumberArray = array();
    protected $length = 10;



    public function getRandomQuestions($numbers = '')
    {
        $url = $this->endpoint.$numbers;

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,            $url );
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
        $result=curl_exec ($ch);         
        curl_close($ch);

        $result = json_decode($result);

        return $result;
    }

    public function generateRandomNumber(){
       
        if(count($this->requestNumberArray) < $this->length) {
            $randomnumber = $this->randomnumber();
           
            if(in_array($randomnumber, $this->requestNumberArray)){
                $this->generateRandomNumber();
            } else {
                array_push($this->requestNumberArray, $randomnumber);
                $this->generateRandomNumber();
            }
        }

        return $this->requestNumberArray;
    }

    public function randomnumber()
    {
        return mt_rand($this->min, $this->max);
    }

    public function getQuestions(){
        $questions= [];
        $randomnumbers = $this->generateRandomNumber();
        $numbers = implode(",", $randomnumbers);
        $questions = $this->getRandomQuestions($numbers);
        $finalQuestionList = array();
        foreach($questions as $key => $question)
        {
            $resStr = str_replace($key, '?', $question);
            $options = $this->addOptions($key);
            shuffle($options);
            $finalQuestionList[$key] = array(
                'question' => $resStr,
                'answer' => $key,
                'options' => $options 
            );
        }
        return $finalQuestionList;
    }

    public function addOptions($key) {
            $randomnumber = $this->randomnumber();
            $option1 = $key;
            $option2 = $key+$randomnumber+15;
            $option3 = $key+$randomnumber+115;
            $option4 = $key+$randomnumber-125;

            return array($option1, $option2,$option3, $option4);
    }

}
