function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if ((charCode < 48 || charCode > 57))
        return false;

    return true;
}
function formatString(e) {
  var inputChar = String.fromCharCode(event.keyCode);
  var code = event.keyCode;
  var allowedKeys = [8];
  if (allowedKeys.indexOf(code) !== -1) {
    return;
  }

  event.target.value = event.target.value.replace(
    /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
  ).replace(
    /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
  ).replace(
    /^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
  ).replace(
    /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
  ).replace(
    /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
  ).replace(
    /[^\d\/]|^[\/]*$/g, '' // To allow only digits and `/`
  ).replace(
    /\/\//g, '/' // Prevent entering more than 1 `/`
  );
}
$(function() {
  $('#btnSendOTP').click(function(){
    var flag = false;
    if (!$("input[name='Logintype']:checked").val()) {
      $('#otp_error').css('display','block');
      return false;
    }else{
      $('#otp_error').css('display','none');
      flag = true;
    }
    if (!$('#mobileNo').val()) {
      $('#mobile_error').css('display','block');
      return false;
    }else{
      if ($('#mobileNo').val().length < 10 ){
        $('#mobile_error').text('Please enter valid mobile no');
        $('#mobile_error').css('display','block');
        return false;
      }else{
        $('#mobile_error').css('display','none');
        flag = true;
      }
    }
    if(flag==true){
      $('#exampleModal').modal('hide');
      $('#otp_login').modal('show');
      return false;
    }
  });
  $('#btnLoginOTP').click(function(){
    var flag = false;
    if (!$('#otp_field').val()) {
      $('#otp_field_error').css('display','block');
      return false;
    }else{
      $('#otp_field_error').css('display','none');
      flag = true;
    }
  });

  var PolicyExpired = $("input[name='PolicyExpired']:checked").val();

  if(PolicyExpired=='YES'){
    $('.policy_intents').hide();
  }else{
    $('.policy_intents').show();
  }
  $('.prevoius_ncb_intents').hide();

  var ClaimPrevious = $("input[name='ClaimPrevious']:checked").val();

  if(ClaimPrevious=='YES'){
    $('.prevoius_ncb_intents').hide();
  }

  $('.PolicyExpired').change(function(){
      var value = $( this ).val();
      if(value=='YES'){
        $('.policy_intents').hide();
      }else{
        $('.policy_intents').show();
      }
  });

  $('.ClaimPrevious').change(function(){
      var value = $( this ).val();
      if(value=='YES'){
        $('.prevoius_ncb_intents').hide();
      }else{
        $('.prevoius_ncb_intents').show();
      }
  });

  $('.getQuoteBtn').click(function(){
    var flag = false;
    var make = $("#Make option:selected").val();
    if(make == '')
    {
      $('#make_field_error').css('display','block');
      $('html, body').animate({
        scrollTop: $("#make_field_error").offset().top -100
      }, 2000);
      return false;
    } else{
      $('#make_field_error').css('display','none');
      flag = true;
    }
    var model = $("#Model option:selected").val();
    if(model == '')
    {
      $('#model_field_error').css('display','block');
      $('html, body').animate({
        scrollTop: $("#model_field_error").offset().top -100
      }, 2000);
      return false;
    } else{
      $('#model_field_error').css('display','none');
      flag = true;
    }


    var model_1 = $("#FuelType option:selected").val();
    if(model_1 == '')
    {
      $('#fuel_field_error').css('display','block');
      $('html, body').animate({
        scrollTop: $("#fuel_field_error").offset().top -100
      }, 2000);
      return false;
    } else{
      $('#fuel_field_error').css('display','none');
      flag = true;
    }
    var model_2 = $("#Varient option:selected").val();
    if(model_2 == '')
    {
      $('#variant_field_error').css('display','block');
      $('html, body').animate({
        scrollTop: $("#variant_field_error").offset().top -100
      }, 2000);
      return false;
    } else{
      $('#variant_field_error').css('display','none');
      flag = true;
    }
    if (!$('#VehicleInvoiceDate').val()) {
      $('#invoice_date_field_error').css('display','block');
      $('html, body').animate({
        scrollTop: $("#invoice_date_field_error").offset().top -100
      }, 2000);
      return false;
    }else{
      $('#invoice_date_field_error').css('display','none');
      flag = true;
    }
    if (!$('#RTO_Code').val()) {
      $('#rto_field_error').css('display','block');
      $('html, body').animate({
        scrollTop: $("#rto_field_error").offset().top -100
      }, 2000);
      return false;
    }else{
      flag = true;
      $('#rto_field_error').css('display','none');
      var value = $('#RTO_Code').val();
      $('#PRTO').val(value);
      var rto = new RegExp('^[a-zA-Z]{2}[0-9]{2}$');
      if (rto.test(value)) { 
        console.log('ppp');
        $('#rto_field_error').css('display','none');
        flag = true;
      }
      else{
        $('#rto_field_error').text('Please enter valid RTO Code for eg. DL01');
        $('#rto_field_error').css('display','block');
        $('html, body').animate({
          scrollTop: $("#rto_field_error").offset().top -100
        }, 2000);
        return false;
      }
    }
    // if (!$('#BioFuelPrice').val()) {
    //   $('#BioFuelPriceerror').css('display','block');
    //   $('html, body').animate({
    //     scrollTop: $("#BioFuelPriceerror").offset().top -100
    //   }, 2000);
    //   return false;
    // }else{
    //   $('#BioFuelPriceerror').css('display','none');
    //   flag = true;
    // }

    var PolicyExpired = $("input[name='PolicyExpired']:checked").val();

    if(PolicyExpired=='NO'){
      var ClaimPrevious = $("input[name='ClaimPrevious']:checked").val();

      // $('.ClaimPrevious').change(function(){
      //     var value = $( this ).val();
          if(ClaimPrevious=='YES'){
            //$('.prevoius_ncb_intents').hide();
            if (!$('#PreviousPolicyExpiry').val()) {
              $('#policy_date_error').css('display','block');
              $('html, body').animate({
                scrollTop: $("#policy_date_error").offset().top -100
              }, 2000);
              return false;
            }else{
              $('#policy_date_error').css('display','none');
              flag = true;
            }
          }else{
              if (!$('#PreviousNCB').val()) {
                $('#previous_ncb_error').css('display','block');
                $('html, body').animate({
                  scrollTop: $("#previous_ncb_error").offset().top -100
                }, 2000);
                return false;
              }else{
                $('#previous_ncb_error').css('display','none');
                flag = true;
              }
              if (!$('#PreviousPolicyExpiry').val()) {
                $('#policy_date_error').css('display','block');
                $('html, body').animate({
                  scrollTop: $("#policy_date_error").offset().top -100
                }, 2000);
                return false;
              }else{
                $('#policy_date_error').css('display','none');
                flag = true;
              }
          }
    }

     
    //$('.signup').css('display','none');
    $('#Quotation').css('display','block');
    $('.car_steps li').removeClass('active');
    $('.car_steps li#quote_list').addClass('active');
    if(flag==true){
      $('html, body').animate({
          scrollTop: $("#Quotation").offset().top
      }, 2000);
    }
    // if (!$('#otp_field').val()) {
    //   $('#otp_field_error').css('display','block');
    //   return false;
    // }else{
    //   $('#otp_field_error').css('display','none');
    //   flag = true;
    // }
  });

  $('.insurancebutton2').click(function(){
    var flag = false;
    var premium = $('.insurancebutton2').text();
    localStorage.setItem("premium", premium);
    localStorage.setItem("premium_name", "HDFC Ergo General Insurance Company");
    $('#ProposalDetail').css('display','block');
    $('.car_steps li').removeClass('active');
    $('.car_steps li#proposal_list').addClass('active');
    $('html, body').animate({
        scrollTop: $("#ProposalDetail").offset().top
    }, 2000);
  });
  $('.insurancebutton3').click(function(){
    var flag = false;
    var premium = $('.insurancebutton3').text();
    localStorage.setItem("premium", premium);
    localStorage.setItem("premium_name", "Future Generali Total Insurance Solution");
    $('#ProposalDetail').css('display','block');
    $('.car_steps li').removeClass('active');
    $('.car_steps li#proposal_list').addClass('active');
    $('html, body').animate({
        scrollTop: $("#ProposalDetail").offset().top
    }, 2000);
  });
  $('.insurancebutton4').click(function(){
    var flag = false;
    var premium = $('.insurancebutton4').text();
    localStorage.setItem("premium", premium);
    localStorage.setItem("premium_name", "Raheja QBE");
    $('#ProposalDetail').css('display','block');
    $('.car_steps li').removeClass('active');
    $('.car_steps li#proposal_list').addClass('active');
    $('html, body').animate({
        scrollTop: $("#ProposalDetail").offset().top
    }, 2000);
  });
  $('.insurancebutton5').click(function(){
    var flag = false;
    var premium = $('.insurancebutton5').text();
    localStorage.setItem("premium", premium);
    localStorage.setItem("premium_name", "Kotak General Insurance");
    $('#ProposalDetail').css('display','block');
    $('.car_steps li').removeClass('active');
    $('.car_steps li#proposal_list').addClass('active');
    $('html, body').animate({
        scrollTop: $("#ProposalDetail").offset().top
    }, 2000);
  });
  $('.insurancebutton6').click(function(){
    var flag = false;
    var premium = $('.insurancebutton6').text();
    localStorage.setItem("premium", premium);
    localStorage.setItem("premium_name", "Oriental Insurance");
    $('#ProposalDetail').css('display','block');
    $('.car_steps li').removeClass('active');
    $('.car_steps li#proposal_list').addClass('active');
    $('html, body').animate({
        scrollTop: $("#ProposalDetail").offset().top
    }, 2000);
  });
  $('.insurancebutton7').click(function(){
    var flag = false;
    var premium = $('.insurancebutton7').text();
    localStorage.setItem("premium", premium);
    localStorage.setItem("premium_name", "Chola MS General Insurance");
    $('#ProposalDetail').css('display','block');
    $('.car_steps li').removeClass('active');
    $('.car_steps li#proposal_list').addClass('active');
    $('html, body').animate({
        scrollTop: $("#ProposalDetail").offset().top
    }, 2000);
  });

  $( "#IsRegAddrSameProposerAdd" ).click(function() {
      var isChecked = $("#IsRegAddrSameProposerAdd").is(":checked");
      if (isChecked) {
          $('.same_vehicle_registration').hide();
      } else {
          $('.same_vehicle_registration').show();
      }
  });


  $('.nextStepButton3').click(function(){
    var flag = false;
    //$('.signup').css('display','none');

    var SalutationCode = $("#SalutationCode option:selected").val();
    if(SalutationCode == '')
    {
      $('#salutation_error').css('display','block');
      $('html, body').animate({
        scrollTop: $("#salutation_error").offset().top -100
      }, 2000);
      return false;
    } else{
      $('#salutation_error').css('display','none');
      flag = true;
    }

    if (!$('#FirstName').val()) {
      $('#FirstName_error').css('display','block');
      $('html, body').animate({
        scrollTop: $("#FirstName_error").offset().top -100
      }, 2000);
      return false;
    }else{
      $('#FirstName_error').css('display','none');
      flag = true;
    }

    if (!$('#FirstName').val()) {
      $('#FirstName_error').css('display','block');
      $('html, body').animate({
        scrollTop: $("#FirstName_error").offset().top -100
      }, 2000);
      return false;
    }else{
      $('#FirstName_error').css('display','none');
      flag = true;
    }

    if (!$('#PLastName').val()) {
      $('#PLastName_error').css('display','block');
      $('html, body').animate({
        scrollTop: $("#PLastName_error").offset().top -100
      }, 2000);
      return false;
    }else{
      $('#PLastName_error').css('display','none');
      flag = true;
    }

    if (!$('#Date').val()) {
      $('#DOB_error').css('display','block');
      $('html, body').animate({
        scrollTop: $("#DOB_error").offset().top -100
      }, 2000);
      return false;
    }else{
      $('#DOB_error').css('display','none');
      flag = true;
    }

    if (!$('#CorporateName').val()) {
      $('#CorporateName_error').css('display','block');
      $('html, body').animate({
        scrollTop: $("#CorporateName_error").offset().top -100
      }, 2000);
      return false;
    }else{
      $('#CorporateName_error').css('display','none');
      flag = true;
    }

    if (!$('#PMobile').val()) {
      $('#mobile_error').css('display','block');
      $('html, body').animate({
        scrollTop: $("#mobile_error").offset().top -100
      }, 2000);
      return false;
    }else{
      if ($('#PMobile').val().length < 10 ){
        $('#mobile_error').text('Please enter valid mobile no');
        $('#mobile_error').css('display','block');
        $('html, body').animate({
          scrollTop: $("#mobile_error").offset().top -100
        }, 2000);
        return false;
      }else{
        $('#mobile_error').css('display','none');
        flag = true;
      }
    }

    if (!$('#PEmailId').val()) {
      $('#email_error').css('display','block');
      $('html, body').animate({
        scrollTop: $("#email_error").offset().top -100
      }, 2000);
      return false;
    }else{
        $('#email_error').css('display','none');
          flag = true;
        var mail_value = $('#PEmailId').val();
        var mail_test = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$'); //regex

        if (mail_test.test(mail_value)) {
          $('#email_error').css('display','none');
          flag = true;
        }
        else{
          $('#email_error').text('Please enter valid email id');
          $('#email_error').css('display','block');
          $('html, body').animate({
            scrollTop: $("#email_error").offset().top -100
          }, 2000);
          return false;
        }
    }

    if (!$('#VehicleRegistrationAddress').val()) {
      $('#vehicle_reg_error').css('display','block');
      $('html, body').animate({
        scrollTop: $("#vehicle_reg_error").offset().top -100
      }, 2000);
      return false;
    }else{
      $('#vehicle_reg_error').css('display','none');
      flag = true;
    }

    var RegistrationStateICId = $("#RegistrationStateICId option:selected").val();
    if(RegistrationStateICId == '')
    {
      $('#RegistrationState_error').css('display','block');
      $('html, body').animate({
        scrollTop: $("#RegistrationState_error").offset().top -100
      }, 2000);
      return false;
    }else{
      $('#RegistrationState_error').css('display','none');
      flag = true;
    }

    var RegistrationCityICId = $("#RegistrationCityICId option:selected").val();
    if(RegistrationCityICId == '')
    {
      $('#RegistrationCityICId_error').css('display','block');
      $('html, body').animate({
        scrollTop: $("#RegistrationCityICId_error").offset().top -100
      }, 2000);
      return false;
    }else{
      $('#RegistrationCityICId_error').css('display','none');
      flag = true;
    }

    if (!$('#RegistrationPinCode').val()) {
      $('#RegistrationPinCode_error').css('display','block');
      $('html, body').animate({
        scrollTop: $("#RegistrationPinCode_error").offset().top -100
      }, 2000);
      return false;
    }else{
      $('#RegistrationPinCode_error').css('display','none');
      flag = true;
    }

    //$( "#IsRegAddrSameProposerAdd" ).click(function() {
      var isChecked = $("#IsRegAddrSameProposerAdd").is(":checked");
      if (!isChecked) {
          if (!$('#PAddress1').val()) {
            $('#PAddress1_error').css('display','block');
            $('html, body').animate({
              scrollTop: $("#PAddress1_error").offset().top -100
            }, 2000);
            return false;
          }else{
            $('#PAddress1_error').css('display','none');
            flag = true;
          }

          var PState = $("#PState option:selected").val();
          if(PState == '')
          {
            $('#PState_error').css('display','block');
            $('html, body').animate({
              scrollTop: $("#PState_error").offset().top -100
            }, 2000);
            return false;
          }else{
            $('#PState_error').css('display','none');
            flag = true;
          }

          var PCity = $("#PCity option:selected").val();
          if(PCity == '')
          {
            $('#PCity_error').css('display','block');
            $('html, body').animate({
              scrollTop: $("#PCity_error").offset().top -100
            }, 2000);
            return false;
          }else{
            $('#PCity_error').css('display','none');
            flag = true;
          }

          if (!$('#PinCode').val()) {
            $('#PinCode_error').css('display','block');
            $('html, body').animate({
              scrollTop: $("#PinCode_error").offset().top -100
            }, 2000);
            return false;
          }else{
            $('#PinCode_error').css('display','none');
            flag = true;
          }


          var OccupationCode = $("#OccupationCode option:selected").val();
          if(OccupationCode == '')
          {
            $('#OccupationCode_error').css('display','block');
            $('html, body').animate({
              scrollTop: $("#OccupationCode_error").offset().top -100
            }, 2000);
            return false;
          }else{
            $('#OccupationCode_error').css('display','none');
            flag = true;
          }

          var MaritalStatus = $("#MaritalStatus option:selected").val();
          if(MaritalStatus == '')
          {
            $('#MaritalStatus_error').css('display','block');
            $('html, body').animate({
              scrollTop: $("#MaritalStatus_error").offset().top -100
            }, 2000);
            return false;
          }else{
            $('#MaritalStatus_error').css('display','none');
            flag = true;
          }

          if (!$('#PANNo').val()) {
            $('#PANNo_error').css('display','none');
            flag = true;
          }else{
            var pan_value= $('#PANNo').val()
            var pan_valid = new RegExp('^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$'); //regex
            if (pan_valid.test(pan_value)) {
              $('#PANNo_error').css('display','none');
              flag = true;
            }
            else{
              $('#PANNo_error').text('Please enter valid Pan no');
              $('#PANNo_error').css('display','block');
              $('html, body').animate({
                scrollTop: $("#PANNo_error").offset().top -100
              }, 2000);
              return false;
            }
          }

          if (!$('#GSTIN').val()) {
            $('#GSTIN_error').css('display','none');
            flag = true;
          }else{
            var GSTIN_value= $('#GSTIN').val()
            var GSTIN_valid = new RegExp('^([0-9]){2}([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}([1-9a-zA-Z]){1}[zZ]([1-9a-zA-Z]){1}$'); //regex 18AABCU9603R1ZM
            if (GSTIN_valid.test(GSTIN_value)) {
              $('#GSTIN_error').css('display','none');
              flag = true;
            }
            else{
              $('#GSTIN_error').text('Please enter valid GSTIN no');
              $('#GSTIN_error').css('display','block');
              $('html, body').animate({
                scrollTop: $("#GSTIN_error").offset().top -100
              }, 2000);
              return false;
            }
          }
      }
  //});


    if (!$('#NomineeName').val()) {
      $('#NomineeName_error').css('display','block');
      $('html, body').animate({
        scrollTop: $("#NomineeName_error").offset().top -100
      }, 2000);
      return false;
    }else{
      $('#NomineeName_error').css('display','none');
      flag = true;
    }

    var Nomine_RelCode = $("#Nomine_RelCode option:selected").val();
      if(Nomine_RelCode == '')
      {
        $('#Nomine_RelCode_error').css('display','block');
        $('html, body').animate({
          scrollTop: $("#Nomine_RelCode_error").offset().top -100
        }, 2000);
        return false;
      }else{
        $('#Nomine_RelCode_error').css('display','none');
        flag = true;
      }

      if (!$('#NomineeAge').val()) {
        $('#NomineeAge_error').css('display','block');
        $('html, body').animate({
          scrollTop: $("#NomineeAge_error").offset().top -100
        }, 2000);
        return false;
      }else{
        $('#NomineeAge_error').css('display','none');
        flag = true;
      }

      var PreICNameShort = $("#PreICNameShort option:selected").val();
      if(PreICNameShort == '')
      {
        $('#PreICNameShort_error').css('display','block');
        $('html, body').animate({
          scrollTop: $("#PreICNameShort_error").offset().top -100
        }, 2000);
        return false;
      }else{
        $('#PreICNameShort_error').css('display','none');
        flag = true;
      }

      if (!$('#PrevPolicyNo').val()) {
        $('#PrevPolicyNo_error').css('display','block');
        $('html, body').animate({
          scrollTop: $("#PrevPolicyNo_error").offset().top -100
        }, 2000);
        return false;
      }else{
        $('#PrevPolicyNo_error').css('display','none');
        flag = true;
      }
      if (!$('#ChassisNo').val()) {
        $('#ChassisNo_error').css('display','block');
        $('html, body').animate({
          scrollTop: $("#ChassisNo_error").offset().top -100
        }, 2000);
        return false;
      }else{
        $('#ChassisNo_error').css('display','none');
        flag = true;
      }
      if (!$('#EngineNo').val()) {
        $('#EngineNo_error').css('display','block');
        $('html, body').animate({
          scrollTop: $("#EngineNo_error").offset().top -100
        }, 2000);
        return false;
      }else{
        $('#EngineNo_error').css('display','none');
        flag = true;
      }
      if (!$('#RegNo').val()) {
        $('#RegNo_error').css('display','block');
        $('html, body').animate({
          scrollTop: $("#RegNo_error").offset().top -100
        }, 2000);
        return false;
      }else{
        $('#RegNo_error').css('display','none');
        flag = true;
      }

      var CorporateName = $('#CorporateName').val();
      $('#CompanyFullName').text(CorporateName);

      var FirstName = $('#FirstName').val();
      var PLastName = $('#PLastName').val();

      $('#ProposerFullName').text(FirstName+' '+PLastName);

      var ProposerDOB = $('#Date').val();
      $('#ProposerDOB').text(ProposerDOB);

      var ProposerMobileNo = $('#PMobile').val();
      $('#ProposerMobileNo').text(ProposerMobileNo);

      var ProposerEmailID = $('#PEmailId').val();
      $('#ProposerEmailID').text(ProposerEmailID);
      //

      var ProposerStateName = $("#PState option:selected").text();
      if(ProposerStateName!='Select State'){
        $('#ProposerStateName').text(ProposerStateName);
      }else{
        var ProposerStateNamev = $("#RegistrationStateICId option:selected").text();
        $('#ProposerStateName').text(ProposerStateNamev);
      }
      
      var ProposerCityName = $("#PCity option:selected").text();
      if(ProposerCityName!="Select City"){
        $('#ProposerCityName').text(ProposerCityName);
      }else{
        var ProposerCityNamev = $("#RegistrationCityICId option:selected").text();
        $('#ProposerCityName').text(ProposerCityNamev);
      }

      var ProposerAddress = $('#PAddress1').val();
      if(ProposerAddress!=''){
        $('#ProposerAddress').text(ProposerAddress);
      }else{
        var ProposerAddressv = $('#VehicleRegistrationAddress').val();
        $('#ProposerAddress').text(ProposerAddressv);
      }

      var ProposerPinCode = $('#PinCode').val();
      if(ProposerPinCode!=''){
        $('#ProposerPinCode').text(ProposerPinCode);
      }else{
        var ProposerPinCodev = $('#RegistrationPinCode').val();
        $('#ProposerPinCode').text(ProposerPinCodev);
      }

      var ProposerNomineeName = $('#NomineeName').val();
      $('#ProposerNomineeName').text(ProposerNomineeName);

      var ProposerNomine_RelDsc = $("#Nomine_RelCode option:selected").text();
      $('#ProposerNomine_RelDsc').text(ProposerNomine_RelDsc);

      var ProposerNomineeAge = $('#NomineeAge').val();
      $('#ProposerNomineeAge').text(ProposerNomineeAge);

      var ProposerNomineeGender = $('#NomineeGender:checked').val();
      $('#ProposerNomineeGender').text(ProposerNomineeGender);

      // var ProposerAppointeeName = $('#PEmailId').val();
      // $('#ProposerAppointeeName').text(ProposerAppointeeName);

      // var ProposerAppointee_RelDsc = $('#PEmailId').val();
      // $('#ProposerAppointee_RelDsc').text(ProposerAppointee_RelDsc);

    //var IsRegAddrSameProposerAdd = $("#IsRegAddrSameProposerAdd:checked").val();

     var VehicleREGISTRATION_NO_B = $('#RegNo').val();
      $('#VehicleREGISTRATION_NO_B').text(VehicleREGISTRATION_NO_B);

      //  var VehicleManufacturedYear = $('#NomineeAge').val();
      // $('#VehicleManufacturedYear').text(VehicleManufacturedYear);

       var VehicleChasisNo = $('#ChassisNo').val();
      $('#VehicleChasisNo').text(VehicleChasisNo);

       var VehicleEngineNo = $('#EngineNo').val();
      $('#VehicleEngineNo').text(VehicleEngineNo);

      //  var VehicleMake_Name = $('#NomineeAge').val();
      // $('#VehicleMake_Name').text(VehicleMake_Name);

      //  var VehicleREGISTRATION_DATE = $('#NomineeAge').val();
      // $('#VehicleREGISTRATION_DATE').text(VehicleREGISTRATION_DATE);

       var Prev_field_4 = $("#PreICNameShort option:selected").text();
      $('#Prev_field_4').text(Prev_field_4);

       var Prev_policy_field_4 = $('#PrevPolicyNo').val();
      $('#Prev_policy_field_4').text(Prev_policy_field_4);

   
    if(flag==true){
      $('#Preview').css('display','block');
      $('.car_steps li').removeClass('active');
      $('.car_steps li#preview_list').addClass('active');
    
      $('html, body').animate({
          scrollTop: $("#Preview").offset().top
      }, 2000);
    }


    // if (!$('#otp_field').val()) {
    //   $('#otp_field_error').css('display','block');
    //   return false;
    // }else{
    //   $('#otp_field_error').css('display','none');
    //   flag = true;
    // }
  });
  $('option[value=""]').attr("disabled", "disabled");
  

});

