<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use DB, Request, Auth;

class Quote extends Model
{
    
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'quotes';
    public $field;
    
    public function saveQuote() {
        $arrResp    = [];
        $status     = 0;
        $message    = '';
        try {
            $quote = new Quote();
            $quote->username        = $this->field['username'];
            $quote->useremail       = $this->field['useremail'];
            $quote->questions       = $this->field['questions'];
            
            if($quote->save()){
                $message = 'Quote addded successfully.';
                $status = 1;
                $arrResp['quote_id'] = $quote->id;
            } else {
                $status = 0;
                $message = 'Unabel to add quote, please try again later!';
            }
        } catch (Exception $ex) {
            $status = 0;
            $message = $ex->getMessage();
        }
        $arrResp['status'] = $status;
        $arrResp['message'] = $message;
        return $arrResp;
    }

    public function updateQuote(){

    }

    public function getQuoteById(){

    }

}
