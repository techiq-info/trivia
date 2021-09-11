@extends('layouts.website')
            @if(session()->has('message'))
            <script>
                alert(unescape('Thanks for contacting us . We will connect with you shortly. Team H&M'));
            </script>
            @endif
            <style>
              .error{
                color:red;
              }
            </style>
@section('page-content')
    
<section class="contact_uuus mrg-contact">
  <div class="container">
    <h4>Get In Touch</h4>
    <div class="row">
      <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
        <div class="inner_cntnt_inner box-lft">
          <h2>We're here to help you!</h2>
          <div class="line">
            <div class="img">
              <img src="/images/call.png">
            </div>
            <div class="cntnnt">
              <h3>Call Us</h3>
              <p class="big_p">+91 522 4042108</p>
            </div>
          </div>
          <div class="line">
            <div class="img">
              <img src="/images/whatsapp.png" style="width:30px">
            </div>
            <div class="cntnnt">
              <h3>WhatsApp</h3>
              <p class="big_p">+91 860 1654647 </p>
            </div>
          </div>
          <div class="line">
            <div class="img">
              <img src="/images/email.png">
            </div>
            <div class="cntnnt">
              <h3>Email Us</h3>
              <p class="big_p">contactus@heuteandmorgen.com</p>
            </div>
          </div>
          <div class="line">
            <div class="img">
              <img src="/images/pin.png">
            </div>
            <div class="cntnnt">
              <h3> Registered Address </h3>
              <p class="big_p">Flat No – 04, Maa Apartment, Vikas Nagar, Lucknow, Uttar Pradesh - 226022</p>
            </div>
          </div>
          <div class="line">
            <div class="img">
              <img src="/images/pin.png">
            </div>
            <div class="cntnnt">
              <h3>Corporate office  </h3>
              <p>3C, Gulmohar Enclave, Gokhle Marg, Hazratganj, Lucknow, U.P. 226001</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
        <div class="inner_cntnt_inner box_right">
          <h2>Let us assist you</h2>
          <p>With the query that you have. Please fill in the details.</p>
          <form id="contactUsForm" action="/contact-us/store" method="post" name="contactUs">
          @csrf
            <input type="hidden" id="custId" name="pageName" value="contactus">
            <div class="form-group">
              <input type="text" class="form-control required" id="inputName" placeholder="Name*" name="name" maxlength="70">
            </div>
            <div class="form-group">
              <input type="text" class="form-control required" id="exampleInputmobile" placeholder="Mobile Number*" name="phone" maxlength="10">
            </div>
            <div class="form-group">
              <input type="email" class="form-control required" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email*" name="email" maxlength="100">
              
            </div>
            <div class="form-group">
              <textarea class="form-control required" id="exampleFormControlTextarea1" rows="3" placeholder="Message*" name="message"></textarea>
            </div>
            <button type="submit" id="submitContactUs" class="btn-form">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</section> 
<section class="support_offices ">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 mt-50">
        <h4>Support Offices</h4>
        </div>
      </div>
        <div class="row">
            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                <div class="support_offices_bx">
                    <h5>Lucknow </h5>
                    <!-- <p><b>lorem ipsum</b></p> -->
                    <p> 3C, Gulmohar Enclave,   </p>
                    <p> Gokhle Marg, </p>
                    <p>  Hazratganj, <p>
                    <p> Lucknow-01</p>
                    <!-- <p class="phn">123045678</p> -->
                </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                <div class="support_offices_bx1">
                    <h5>Coming Soon</h5>
                     <!-- <p><b>lorem ipsum</b></p> -->
                    <p> Agra  </p>
                    <p>Ahmedabad </p>
                    <p>Hydrabad <p> 
                    <!-- <p class="phn">123045678</p> -->
                </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                <div class="support_offices_bx">
                    <h5>Coming Soon</h5>
                    <!-- <p><b>lorem ipsum</b></p> -->
                    <p> Banglore  </p>
                    <p>Patna</p>
                    <p> Dehradun <p> 
                    <!-- <p class="phn">123045678</p> -->
                </div>
            </div>
        </div>
    </div>
</section> 

<!-- Optional JavaScript -->
<!-- jQuery first, then Popper.js, then Bootstrap JS -->
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.3/jquery.validate.min.js" integrity="sha512-37T7leoNS06R80c8Ulq7cdCDU5MNQBwlYoy1TX/WUsLFC2eYNqtKlV0QjH7r8JpG/S0GUMZwebnVFLPd6SU5yg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script>
  jQuery(document).ready(function(){
    jQuery('#contactUsForm').validate({
      rules: {
          "name": {
               required: true
           },
           "phone": {
               required: true
           },
           "email": {
               required: true,
               email: true
           },
           "message": {
               required: true
           },
        },
        messages: {
          "name": {
              required: "Name is required"
          },
          "phone": {
              required: "Phone number is required"
          },
          "email": {
              required: "Email ID is required",
              email: "Enter valid email id."
           },
           "message": {
              required: "Message is required"
          },
        }
        
    });
    
  });


</script>
@endsection