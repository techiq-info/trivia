<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class PospRegistrationEmail extends Mailable
{
    use Queueable, SerializesModels;
    public $_data;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($_data)
    {
        $this->_data = $_data;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $subject = $this->_data['email_subject'];
		$template_name = 'posp-registration';
		if(!empty($this->_data['ApprovalStatus'])) {
			if($this->_data['ApprovalStatus'] == 1) {
				$template_name = 'posp-approved';
			} else if($this->_data['ApprovalStatus'] == 2) {
				$template_name = 'posp-rejected';
			} else if($this->_data['ApprovalStatus'] == 3) {
				$template_name = 'posp-training-agency-successful';
			}	
		}
		$isEmailSent = false;
		if(!empty($this->_data['ApprovalStatus']) && $this->_data['ApprovalStatus'] == 3) {
			if(!empty($this->_data['arr_attach_files'])) {
				// Get Uploaded File Name
				$arrAttachFiles = [];
				$arrAttachFiles = $this->_data['arr_attach_files'];
				$filePath = '';
				$filePath = $this->_data['files_path'];
				$email = $this->view('email-templates.'.$template_name)->subject($subject);
				foreach ($arrAttachFiles as $key => $value) {
					$file_name = $value;
					$email->attach($filePath.$file_name,
					[
						'as' => $file_name
					]);
				}
				$email->with(['data' => $this->_data]); 
				$isEmailSent = $email;
			} else {
				$isEmailSent = $this->view('email-templates.'.$template_name)
					->subject($subject)
					->with(['data' => $this->_data]);
			}
		} else {
			$isEmailSent = $this->view('email-templates.'.$template_name)
					->subject($subject)
					->with(['data' => $this->_data]);
		}
        return $isEmailSent;
    }
}