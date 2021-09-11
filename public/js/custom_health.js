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
  $('.firstformnext').click(function(){
    console.log('asd');
    var flag = false;
    var CoveredMember = $(".CoveredMember option:selected").val();
    if(CoveredMember == '')
    {
      $('#CoveredMember').css('display','block');
      $('html, body').animate({
        scrollTop: $("#CoveredMember").offset().top -100
      }, 2000);
      return false;
    } else{
      $('#CoveredMember').css('display','none');
      flag = true;
    }

    var Gender = $("#Gender option:selected").val();
    if(Gender == '')
    {
      $('.Gender').css('display','block');
      $('html, body').animate({
        scrollTop: $("#Gender").offset().top -100
      }, 2000);
      return false;
    } else{
      $('.Gender').css('display','none');
      flag = true;
    }

    var Age = $("#Age option:selected").val();
    if(Age == '')
    {
      $('.Age').css('display','block');
      $('html, body').animate({
        scrollTop: $("#Age").offset().top -100
      }, 2000);
      return false;
    } else{
      $('.Age').css('display','none');
      flag = true;
    }

    var Genderspouce = $("#Genderspouce option:selected").val();
    if(Genderspouce == '')
    {
      $('.Genderspouce').css('display','block');
      $('html, body').animate({
        scrollTop: $("#Genderspouce").offset().top -100
      }, 2000);
      return false;
    } else{
      $('.Genderspouce').css('display','none');
      flag = true;
    }

    var Agespouce = $("#Agespouce option:selected").val();
    if(Agespouce == '')
    {
      $('.Agespouce').css('display','block');
      $('html, body').animate({
        scrollTop: $("#Agespouce").offset().top -100
      }, 2000);
      return false;
    } else{
      $('.Agespouce').css('display','none');
      flag = true;
    }

    if (!$('#ResidanceCity').val()) {
      $('.ResidanceCity').css('display','block');
      $('html, body').animate({
        scrollTop: $("#ResidanceCity").offset().top -100
      }, 2000);
      return false;
    }else{
      $('.ResidanceCity').css('display','none');
      flag = true;
    }

    //$('.signup').css('display','none');
    $('#Quotation').css('display','block');
    if(flag==true){
      $('html, body').animate({
          scrollTop: $("#Quotation").offset().top
      }, 2000);
    }
  });

  $('.insurancebutton2').click(function(){
    var flag = false;
    var premium = $('.insurancebutton2').text();
    localStorage.setItem("premium", premium);
    localStorage.setItem("premium_name", "HDFC Ergo General Insurance Company");
    $('#ProposalDetail').css('display','block');
    $('.collapse_button1').removeClass('collapsed');
    $('.collapse_button_div_1').addClass('show');
    $("collapse_button1").attr("aria-expanded","false");
    $('html, body').animate({
        scrollTop: $("#ProposalDetail").offset().top
    }, 2000);
  });
  $('.insurancebutton3').click(function(){
    var flag = false;
    var premium = $('.insurancebutton3').text();
    localStorage.setItem("premium", premium);
    localStorage.setItem("premium_name", "SUPER SURPLUS FLOATER");
    $('#ProposalDetail').css('display','block');
    $('.collapse_button1').removeClass('collapsed');
    $('.collapse_button_div_1').addClass('show');
    $("collapse_button1").attr("aria-expanded","false");
    $('html, body').animate({
        scrollTop: $("#ProposalDetail").offset().top
    }, 2000);
  });
  $('.insurancebutton4').click(function(){
    var flag = false;
    var premium = $('.insurancebutton4').text();
    localStorage.setItem("premium", premium);
    localStorage.setItem("premium_name", "Care NCB Super");
    $('#ProposalDetail').css('display','block');
    $('.collapse_button1').removeClass('collapsed');
    $('.collapse_button_div_1').addClass('show');
    $("collapse_button1").attr("aria-expanded","false");
    $('html, body').animate({
        scrollTop: $("#ProposalDetail").offset().top
    }, 2000);
  });
  $('.insurancebutton5').click(function(){
    var flag = false;
    var premium = $('.insurancebutton5').text();
    localStorage.setItem("premium", premium);
    localStorage.setItem("premium_name", "Edelweiss Health Insurance");
    $('#ProposalDetail').css('display','block');
    $('.collapse_button1').removeClass('collapsed');
    $('.collapse_button_div_1').addClass('show');
    $("collapse_button1").attr("aria-expanded","false");
    $('html, body').animate({
        scrollTop: $("#ProposalDetail").offset().top
    }, 2000);
  });
  $('.insurancebutton6').click(function(){
    var flag = false;
    var premium = $('.insurancebutton6').text();
    localStorage.setItem("premium", premium);
    localStorage.setItem("premium_name", "Raheja QBE Insurance");
    $('#ProposalDetail').css('display','block');
    $('.collapse_button1').removeClass('collapsed');
    $('.collapse_button_div_1').addClass('show');
    $("collapse_button1").attr("aria-expanded","false");
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

    if (!$('#FirstName_self').val()) {
      $('.FirstName_self').css('display','block');
      $('html, body').animate({
        scrollTop: $("#FirstName_self").offset().top -100
      }, 2000);
      return false;
    }else{
      $('.FirstName_self').css('display','none');
      flag = true;
    }

    if (!$('#LastName_self').val()) {
      $('.LastName_self').css('display','block');
      $('html, body').animate({
        scrollTop: $("#LastName_self").offset().top -100
      }, 2000);
      return false;
    }else{
      $('.LastName_self').css('display','none');
      flag = true;
    }

    if (!$('#DOB_self').val()) {
      $('.DOB_self').css('display','block');
      $('html, body').animate({
        scrollTop: $("#DOB_self").offset().top -100
      }, 2000);
      return false;
    }else{
      $('.DOB_self').css('display','none');
      flag = true;
    }

    if (!$('#NomineeFirstName').val()) {
      $('.NomineeFirstName').css('display','block');
      $('html, body').animate({
        scrollTop: $("#NomineeFirstName").offset().top -100
      }, 2000);
      return false;
    }else{
      $('.NomineeFirstName').css('display','none');
      flag = true;
    }

    if (!$('#NomineeLastName').val()) {
      $('.NomineeLastName').css('display','block');
      $('html, body').animate({
        scrollTop: $("#NomineeLastName").offset().top -100
      }, 2000);
      return false;
    }else{
      $('.NomineeLastName').css('display','none');
      flag = true;
    }

    var NomineeRelation = $("#NomineeRelation option:selected").val();
    if(NomineeRelation == '')
    {
      $('.NomineeRelation').css('display','block');
      $('html, body').animate({
        scrollTop: $("#NomineeRelation").offset().top -100
      }, 2000);
      return false;
    } else{
      $('.NomineeRelation').css('display','none');
      flag = true;
    }

    if (!$('#FirstName_spouce').val()) {
      $('.FirstName_spouce').css('display','block');
      $('html, body').animate({
        scrollTop: $("#FirstName_spouce").offset().top -100
      }, 2000);
      return false;
    }else{
      $('.FirstName_spouce').css('display','none');
      flag = true;
    }

    if (!$('#LastName_spouce').val()) {
      $('.LastName_spouce').css('display','block');
      $('html, body').animate({
        scrollTop: $("#LastName_spouce").offset().top -100
      }, 2000);
      return false;
    }else{
      $('.LastName_spouce').css('display','none');
      flag = true;
    }

    if (!$('#DOB_spouce').val()) {
      $('.DOB_spouce').css('display','block');
      $('html, body').animate({
        scrollTop: $("#DOB_spouce").offset().top -100
      }, 2000);
      return false;
    }else{
      $('.DOB_spouce').css('display','none');
      flag = true;
    }

    if (!$('#NomFName_spouce').val()) {
      $('.NomFName_spouce').css('display','block');
      $('html, body').animate({
        scrollTop: $("#NomFName_spouce").offset().top -100
      }, 2000);
      return false;
    }else{
      $('.NomFName_spouce').css('display','none');
      flag = true;
    }

    if (!$('#NomFName_spouce').val()) {
      $('.NomFName_spouce').css('display','block');
      $('html, body').animate({
        scrollTop: $("#NomFName_spouce").offset().top -100
      }, 2000);
      return false;
    }else{
      $('.NomFName_spouce').css('display','none');
      flag = true;
    }

    var NomRelation_spouce = $("#NomRelation_spouce option:selected").val();
    if(NomRelation_spouce == '')
    {
      $('.NomRelation_spouce').css('display','block');
      $('html, body').animate({
        scrollTop: $("#NomRelation_spouce").offset().top -100
      }, 2000);
      return false;
    } else{
      $('.NomRelation_spouce').css('display','none');
      flag = true;
    }

    $('.collapse_button1').addClass('collapsed');
    $('.collapse_button_div_1').removeClass('show');
    $("collapse_button1").attr("aria-expanded","true");

    $('.collapse_button2').removeClass('collapsed');
    $('.collapse_button_div_2').addClass('show');
    $("collapse_button2").attr("aria-expanded","false");
    $('html, body').animate({
      scrollTop: $(".collapse_button2").offset().top -100
    }, 2000);

  });

  $('.nextStepButton4').click(function(){
    var flag = false;

    if (!$('#FirstName_proposer').val()) {
      $('.FirstName_proposer').css('display','block');
      $('html, body').animate({
        scrollTop: $("#FirstName_proposer").offset().top -100
      }, 2000);
      return false;
    }else{
      $('.FirstName_proposer').css('display','none');
      flag = true;
    }

    if (!$('#LastName_proposer').val()) {
      $('.LastName_proposer').css('display','block');
      $('html, body').animate({
        scrollTop: $("#LastName_proposer").offset().top -100
      }, 2000);
      return false;
    }else{
      $('.LastName_proposer').css('display','none');
      flag = true;
    }

    if (!$('#Dateofbirth_proposer').val()) {
      $('.Dateofbirth_proposer').css('display','block');
      $('html, body').animate({
        scrollTop: $("#Dateofbirth_proposer").offset().top -100
      }, 2000);
      return false;
    }else{
      $('.Dateofbirth_proposer').css('display','none');
      flag = true;
    }

    if (!$('#Mobile_proposer').val()) {
      $('.Mobile_proposer').css('display','block');
      $('html, body').animate({
        scrollTop: $("#Mobile_proposer").offset().top -100
      }, 2000);
      return false;
    }else{
      $('.Mobile_proposer').css('display','none');
      flag = true;
    }

    if (!$('#Email_proposer').val()) {
      $('.Email_proposer').css('display','block');
      $('html, body').animate({
        scrollTop: $("#Email_proposer").offset().top -100
      }, 2000);
      return false;
    }else{
        $('.Email_proposer').css('display','none');
          flag = true;
        var mail_value = $('#Email_proposer').val();
        var mail_test = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$'); //regex

        if (mail_test.test(mail_value)) {
          $('.Email_proposer_valid').css('display','none');
          flag = true;
        }
        else{
          $('.Email_proposer_valid').text('Please enter valid email id');
          $('.Email_proposer_valid').css('display','block');
          $('html, body').animate({
            scrollTop: $("#Email_proposer").offset().top -100
          }, 2000);
          return false;
        }
    }

    if (!$('#Addr_proposer').val()) {
      $('.Addr_proposer').css('display','block');
      $('html, body').animate({
        scrollTop: $("#Addr_proposer").offset().top -100
      }, 2000);
      return false;
    }else{
      $('.Addr_proposer').css('display','none');
      flag = true;
    }

    if (!$('#Address_propser').val()) {
      $('.Address_propser').css('display','block');
      $('html, body').animate({
        scrollTop: $("#Address_propser").offset().top -100
      }, 2000);
      return false;
    }else{
      $('.Address_propser').css('display','none');
      flag = true;
    }

    var state_propser = $("#state_propser option:selected").val();
    if(state_propser == '')
    {
      $('.state_propser').css('display','block');
      $('html, body').animate({
        scrollTop: $("#state_propser").offset().top -100
      }, 2000);
      return false;
    } else{
      $('.state_propser').css('display','none');
      flag = true;
    }

    var City_propser = $("#City_propser option:selected").val();
    if(City_propser == '')
    {
      $('.City_propser').css('display','block');
      $('html, body').animate({
        scrollTop: $("#City_propser").offset().top -100
      }, 2000);
      return false;
    } else{
      $('.City_propser').css('display','none');
      flag = true;
    }

    if (!$('#pincode_proposer').val()) {
      $('.pincode_proposer').css('display','block');
      $('html, body').animate({
        scrollTop: $("#pincode_proposer").offset().top -100
      }, 2000);
      return false;
    }else{
      $('.pincode_proposer').css('display','none');
      flag = true;
    }

    if (!$('#Pan_proposer').val()) {
      $('.Pan_proposer').css('display','none');
      flag = true;
    }else{
      var pan_value= $('#Pan_proposer').val()
      var pan_valid = new RegExp('^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$'); //regex
      if (pan_valid.test(pan_value)) {
        $('.Pan_proposer').css('display','none');
        flag = true;
      }
      else{
        $('.Pan_proposer').css('display','block');
        $('html, body').animate({
          scrollTop: $("#Pan_proposer").offset().top -100
        }, 2000);
        return false;
      }
    }

    if (!$('#GSTIN_proposer').val()) {
      $('.GSTIN_proposer').css('display','none');
      flag = true;
    }else{
      var GSTIN_value= $('#GSTIN').val()
      var GSTIN_valid = new RegExp('^([0-9]){2}([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}([1-9a-zA-Z]){1}[zZ]([1-9a-zA-Z]){1}$'); //regex 18AABCU9603R1ZM
      if (GSTIN_valid.test(GSTIN_value)) {
        $('.GSTIN_proposer').css('display','none');
        flag = true;
      }
      else{
        $('.GSTIN_proposer').css('display','block');
        $('html, body').animate({
          scrollTop: $("#GSTIN_proposer").offset().top -100
        }, 2000);
        return false;
      }
    }

    $('.collapse_button2').addClass('collapsed');
    $('.collapse_button_div_2').removeClass('show');
    $("collapse_button2").attr("aria-expanded","true");

    $('.collapse_button3').removeClass('collapsed');
    $('.collapse_button_div_3').addClass('show');
    $("collapse_button3").attr("aria-expanded","false");
    $('html, body').animate({
      scrollTop: $(".collapse_button3").offset().top -100
    }, 2000);

  });

  $('.nextStepButton5').click(function(){
    var flag = false;

    $('.collapse_button3').addClass('collapsed');
    $('.collapse_button_div_3').removeClass('show');
    $("collapse_button3").attr("aria-expanded","true");

    var FirstName_self = $('#FirstName_self').val();
    $('#FirstName_self_text').text(FirstName_self);

    var LastName_self = $('#LastName_self').val();
    $('#LastName_self_text').text(LastName_self);

    var DOB_self = $('#DOB_self').val();
    $('#DOB_self_text').text(DOB_self);

    var NomineeFirstName = $('#NomineeFirstName').val();
    $('.NomineeFirstName_text').text(NomineeFirstName);

    var NomineeLastName = $('#NomineeLastName').val();
    $('.NomineeLastName_text').text(NomineeLastName);

    var NomineeRelation = $("#NomineeRelation option:selected").text();
    $('.NomineeRelation_text').text(NomineeRelation);

    var FirstName_spouce = $('#FirstName_spouce').val();
    $('.FirstName_spouce_text').text(FirstName_spouce);

    var LastName_spouce = $('#LastName_spouce').val();
    $('.LastName_spouce_text').text(LastName_spouce);

    var DOB_spouce = $('#DOB_spouce').val();
    $('.DOB_spouce_text').text(DOB_spouce);

    var NomFName_spouce = $('#NomFName_spouce').val();
    $('.NomFName_spouce_text').text(NomFName_spouce);

    var NomLName_spouce = $('#NomLName_spouce').val();
    $('.NomLName_spouce_text').text(NomLName_spouce);

    var NomRelation_spouce = $("#NomRelation_spouce option:selected").text();
    $('.NomRelation_spouce_text').text(NomRelation_spouce);
    
    var FirstName_proposer = $('#FirstName_proposer').val();
    $('.FirstName_proposer_text').text(FirstName_proposer);

    var LastName_proposer = $('#LastName_proposer').val();
    $('.LastName_proposer_text').text(LastName_proposer);

    var gender_propser = $('input[name="propGender"]:checked').val();
    $('.gender_propser_text').text(gender_propser);

    var Dateofbirth_proposer = $('#Dateofbirth_proposer').val();
    $('.Dateofbirth_proposer_text').text(Dateofbirth_proposer);

    var Mobile_proposer = $('#Mobile_proposer').val();
    $('.Mobile_proposer_text').text(Mobile_proposer);

    var Email_proposer = $('#Email_proposer').val();
    $('.Email_proposer_text').text(Email_proposer);

    var Addr_proposer = $('#Addr_proposer').val();
    $('.Addr_proposer_text').text(Addr_proposer);

    var Address_propser = $('#Address_propser').val();
    $('.Address_propser_text').text(Address_propser);

    var state_propser = $("#state_propser option:selected").text();
    $('.state_propser_text').text(state_propser);

    var City_propser = $("#City_propser option:selected").text();
    $('.City_propser_text').text(City_propser);

    var pincode_proposer = $('#pincode_proposer').val();
    $('.pincode_proposer_text').text(pincode_proposer);

    var question1 = $('input[name="question1"]:checked').val();
    $('.question1_text').text(question1);

    var height0 = $('#height0').val();
    $('.height0_text').text(height0);

    var Weight0 = $('#Weight0').val();
    $('.Weight0_text').text(Weight0);

    var question2 = $('input[name="question2"]:checked').val();
    $('.question2_text').text(question2);

    var height1 = $('#height1').val();
    $('.height1_text').text(height1);

    var Weight1 = $('#Weight1').val();
    $('.Weight1_text').text(Weight1);

    $('#Preview').css('display','block');
    $('html, body').animate({
        scrollTop: $("#Preview").offset().top
    }, 2000);
  });

  $('#btnForwordProposal').click(function(){
    if ($('#chkTerm').is(":checked"))
    {
      $('.chkTerm').css('display','none');
      flag = true;
    }else{
      $('.chkTerm').css('display','block');
      $('html, body').animate({
        scrollTop: $("#chkTerm").offset().top -100
      }, 2000);
      return false;
    }
  });

  $('option[value=""]').attr("disabled", "disabled");
  

});

