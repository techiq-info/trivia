<?php

namespace App\Http\Controllers\Website;

use Hash;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use App\Mail\contactUs;
use App\Http\Models\Page;
use Validator, DB, Mail, Response;

class StaticPagesController extends Controller
{
    
    public function __construct() {
        parent::__construct();
        $this->viewData['page_title'] = '';
    }
    
	public function index() {
		$slug = 'home';
        // Get Page Data (Meta Title / Meta Desc / Meta Keywords) => START
        // $page = new \App\Http\Models\Page;
        // $arrPageData = $page->getPageDataBySlug($slug);
        // $pageDataObj = $arrPageData['data'];
        $this->viewData['meta_title'] = "Trivia Game";//$pageDataObj->meta_title;
        // $this->viewData['meta_description'] = $pageDataObj->meta_description;
        // $this->viewData['meta_keywords'] = $pageDataObj->meta_keywords;
        // Get Page Data (Meta Title / Meta Desc / Meta Keywords) => END
        // $pageObj = new Page();
        // $arrPageContent = $pageObj->getPageDataBySlug($slug);
        // $this->viewData['all_Content'] = $arrPageContent['data'];
        return view('website.staticpages.index',$this->viewData);
    }
	
	
	public function about() {
		$slug = 'about-us';
        // Get Page Data (Meta Title / Meta Desc / Meta Keywords) => START
        $page = new \App\Http\Models\Page;
        $arrPageData = $page->getPageDataBySlug($slug);
        $pageDataObj = $arrPageData['data'];
        $this->viewData['meta_title'] = $pageDataObj->meta_title;
        $this->viewData['meta_description'] = $pageDataObj->meta_description;
        $this->viewData['meta_keywords'] = $pageDataObj->meta_keywords;
        // Get Page Data (Meta Title / Meta Desc / Meta Keywords) => END
        $pageObj = new Page();
        $arrPageContent = $pageObj->getPageDataBySlug($slug);
        $this->viewData['all_Content'] = $arrPageContent['data'];
        return view('website.staticpages.about',$this->viewData);
    }
	
	public function contact(Request $request) {
        
		$validator = Validator::make($request->all(), [
            'name' => 'required',
            'phone' => 'required',
            'email' => 'required|email',
            'message' => 'required'
        ],[
            'name.required' => 'Name is required',
            'phone.required' => 'Phone Number is required',
            'email.required' => 'Email is required',
            'email.email' => 'Enter valid email id.',
            'message.required' => 'Message is required',
        ]);
        
        if ($validator->fails()) {
            // die();
            // return redirect()->back()->withErrors($validator)->withInput();
        }
        $slug = 'contact-us';
        // Get Page Data (Meta Title / Meta Desc / Meta Keywords) => START
        $page = new \App\Http\Models\Page;
        $arrPageData = $page->getPageDataBySlug($slug);
        $pageDataObj = $arrPageData['data'];
        $this->viewData['meta_title'] = $pageDataObj->meta_title;
        $this->viewData['meta_description'] = $pageDataObj->meta_description;
        $this->viewData['meta_keywords'] = $pageDataObj->meta_keywords;
        // Get Page Data (Meta Title / Meta Desc / Meta Keywords) => END
        $pageObj = new Page();
        $arrPageContent = $pageObj->getPageDataBySlug($slug);
        $this->viewData['all_Content'] = $arrPageContent['data'];
        // $email = config('constant.REGISTER_EMAIL');
        return view('website.staticpages.contact',$this->viewData);
    }
    public function viewDocument($filename='') {
        // echo $filename; exit('sadsaa');
        if(env('APP_ENV')=='production'){
            $file_path = '';
        } else {
            $file_path = env('APP_URL').'/uploads/documents/';
        }
        // echo $file_path; exit;
        // $full_file_path = $file_path . $filename; // storage_path($filename);
        $full_file_path = public_path('uploads/documents/'.$filename);
        // echo $full_file_path; exit;

        return Response::download($full_file_path);
    }
    public function emailer(Request $request) {
        $email = config('constant.EMAIL_MAIN');
        $input['name'] = $request->name;
		$input['phone'] = $request->phone;
		$input['email'] = $request->email;
        $input['message'] = $request->message;
		$input['email_subject'] = 'Contact us enquiry!';
		$emailRespCust = Mail::to($email)->bcc(config('constant.EMAIL_BCC'))->send(new contactUs($input));
        Session::flash('message', "Thanks for contacting us . We will connect with you shortly. Team H & M");
        return redirect('/contact-us');
    }
}
