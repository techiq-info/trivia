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

    var CustomerName = $('#CustomerName').val();
    if(CustomerName == '')
    {
      $('#CustomerName_error').css('display','block');
      $('html, body').animate({
        scrollTop: $("#CustomerName").offset().top -100
      }, 2000);
      return false;
    } else{
      $('#CustomerName_error').css('display','none');
      flag = true;
    }

    if (!$('#CustDOB').val()) {
      $('#CustDOB_error').css('display','block');
      $('html, body').animate({
        scrollTop: $("#CustDOB").offset().top -100
      }, 2000);
      return false;
    }else{
      $('#CustDOB_error').css('display','none');
      flag = true;
    }

    if (!$('#CustomerMobileNo').val()) {
      $('#CustomerMobileNo_error').css('display','block');
      $('html, body').animate({
        scrollTop: $("#CustomerMobileNo").offset().top -100
      }, 2000);
      return false;
    }else{
      $('#CustomerMobileNo_error').css('display','none');
      flag = true;
    }

    if (!$('#CustomerEmail').val()) {
      $('#CustomerEmail_error').css('display','block');
      $('html, body').animate({
        scrollTop: $("#CustomerEmail").offset().top -100
      }, 2000);
      return false;
    }else{
        $('#CustomerEmail_error').css('display','none');
          flag = true;
        var mail_value = $('#CustomerEmail').val();
        var mail_test = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$'); //regex

        if (mail_test.test(mail_value)) {
          $('#CustomerEmail_invalid_error').css('display','none');
          flag = true;
        }
        else{
          $('#CustomerEmail_invalid_error').text('Please enter valid email id');
          $('#CustomerEmail_invalid_error').css('display','block');
          $('html, body').animate({
            scrollTop: $("#CustomerEmail").offset().top -100
          }, 2000);
          return false;
        }
    }

    var State = $("#State option:selected").val();
    if(State == '')
    {
      $('#State_error').css('display','block');
      $('html, body').animate({
        scrollTop: $("#State").offset().top -100
      }, 2000);
      return false;
    } else{
      $('#State_error').css('display','none');
      flag = true;
    }

    var SumInsured = $("input[type='radio'][name='SumInsured']:checked").val();
    if(SumInsured == '')
    {
      $('#SumInsured_error').css('display','block');
      $('html, body').animate({
        scrollTop: $("#SumInsured").offset().top -100
      }, 2000);
      return false;
    } else{
      $('#SumInsured_error').css('display','none');
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
    localStorage.setItem("premium_name", "Bajaj Allianz");

    window.location.replace("payment.html");
    // $('#ProposalDetail').css('display','block');
    // $('.collapse_button1').removeClass('collapsed');
    // $('.collapse_button_div_1').addClass('show');
    // $("collapse_button1").attr("aria-expanded","false");
    // $('html, body').animate({
    //     scrollTop: $("#ProposalDetail").offset().top
    // }, 2000);
  });
  $('.insurancebutton3').click(function(){
    var flag = false;
    var premium = $('.insurancebutton3').text();
    localStorage.setItem("premium", premium);
    localStorage.setItem("premium_name", "Raheja QBE");

    window.location.replace("payment.html");
    // $('#ProposalDetail').css('display','block');
    // $('.collapse_button1').removeClass('collapsed');
    // $('.collapse_button_div_1').addClass('show');
    // $("collapse_button1").attr("aria-expanded","false");
    // $('html, body').animate({
    //     scrollTop: $("#ProposalDetail").offset().top
    // }, 2000);
  });
  $('.insurancebutton4').click(function(){
    var flag = false;
    var premium = $('.insurancebutton4').text();
    localStorage.setItem("premium", premium);
    localStorage.setItem("premium_name", "Reliance General Insurance");

    window.location.replace("payment.html");
    // $('#ProposalDetail').css('display','block');
    // $('.collapse_button1').removeClass('collapsed');
    // $('.collapse_button_div_1').addClass('show');
    // $("collapse_button1").attr("aria-expanded","false");
    // $('html, body').animate({
    //     scrollTop: $("#ProposalDetail").offset().top
    // }, 2000);
  });
  $('.insurancebutton5').click(function(){
    var flag = false;
    var premium = $('.insurancebutton5').text();
    localStorage.setItem("premium", premium);
    localStorage.setItem("premium_name", "Max Bupa Insurance");

    window.location.replace("payment.html");
    // $('#ProposalDetail').css('display','block');
    // $('.collapse_button1').removeClass('collapsed');
    // $('.collapse_button_div_1').addClass('show');
    // $("collapse_button1").attr("aria-expanded","false");
    // $('html, body').animate({
    //     scrollTop: $("#ProposalDetail").offset().top
    // }, 2000);
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

