function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if ((charCode < 48 || charCode > 57))
        return false;

    return true;
}
// Function that validates email address through a regular expression.
function validateEmail(sEmail) {
    var filter = /^[\w-.+]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
    if (filter.test(sEmail)) {
        return true;
    } else {
        return false;
    }
}

function validatePan(sPan) {
    var filter = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (filter.test(sPan)) {
        return true;
    } else {
        return false;
    }
}

function validateGSTIN(sGSTIN) {
    var filter = /^([0-9]){2}([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}([0-9]){1}([a-zA-Z]){1}([0-9]){1}?$/;
    if (filter.test(sGSTIN)) {
        return true;
    } else {
        return false;
    }
}

function validateRTO(sRTO) {
    var filter = /^[a-zA-Z]{2}[0-9]{2}$/;
    if (filter.test(sRTO)) {
        return true;
    } else {
        return false;
    }
}

function validatePattern(ntext, filter) {
	var filterObj = new RegExp(filter);
	if (filterObj.test(ntext)) {
        return true;
    }
	return false;
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

function dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;
}

function BuyNow(icID) {
    var flag = false;
    var premium = $('.insurancebutton3').text();
    localStorage.setItem("premium", premium);
    localStorage.setItem("premium_name", "Digit Insurance");
    var reqUrl = SITE_URL + '/bike/get-proposer-details';
    var reqData = 'id=' + $(icID).attr('data-id') + '&icCode=' + $(icID).attr('data-iccode');
    $.ajax({
        type: "POST",
        url: reqUrl,
        data: reqData,
        dataType: "json",
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        beforeSend: function() {
            $("#dvloader").show();
            // $("#web_loader_overlay").show();
            // $("#web_loader_img").show();
        },
        complete: function() {
            $("#dvloader").hide();
            // $("#web_loader_overlay").hide();
            // $("#web_loader_img").hide();
        },
        success: function(response) {
            // var response = JSON.parse(resp);
            var status = response.status;
            // alert(status); return false;
            if (status == 1) {
                var PolicyType = $('input[name="PolicyType"]:checked').val();
                var ProposarType = $('input[name="ProposarType"]:checked').val();
                var CoverType = $('input[name="CoverType"]:checked').val();

                //Default :: STRAT
                $('.Proposer_TypeI').hide();
                $('.Proposer_TypeC').hide();
                $('.PolicyTypeR').hide();
                //Default :: END 
                if (ProposarType == 'individual') {
                    $('.Proposer_TypeI').show();
                } else {
                    $('.Proposer_TypeC').show();
                }

                if (PolicyType == 'renew') {
                    $('.PolicyTypeR').show();
                }

                $('#ProposalDetail').css('display', 'block');
                $('#quoteId').val($(icID).attr('data-id'));
                $('.car_steps li').removeClass('active');
                $('.car_steps li#proposal_list').addClass('active');
                $('html, body').animate({
                    scrollTop: $("#ProposalDetail").offset().top
                }, 2000);

                $("#PState").html('');
                var listitems = '<option value="">Select State</option>';
                $.each(response.state, function(key, value) {
                    listitems += '<option value=' + value.id + '>' + value.name + '</option>';
                });
                $("#PState").append(listitems);

                $("#PreICNameShort").html('');
                var listitems = '<option value="">Select Insurance Company</option>';
                $.each(response.insurer, function(key, value) {
                    listitems += '<option value=' + value.id + '>' + value.name + '</option>';
                });
                $("#PreICNameShort").append(listitems);
            } else {
                alert("Something went wrong");
            }
        }
    });
}
$(function() {
    $('#btnSendOTP').click(function() {
        var flag = false;
        if (!$("input[name='Logintype']:checked").val()) {
            $('#otp_error').css('display', 'block');
            return false;
        } else {
            $('#otp_error').css('display', 'none');
            flag = true;
        }
        if (!$('#mobileNo').val()) {
            $('#mobile_error').css('display', 'block');
            return false;
        } else {
            if ($('#mobileNo').val().length < 10) {
                $('#mobile_error').text('Please enter valid mobile no');
                $('#mobile_error').css('display', 'block');
                return false;
            } else {
                $('#mobile_error').css('display', 'none');
                flag = true;
            }
        }
        if (flag == true) {
            $('#exampleModal').modal('hide');
            $('#otp_login').modal('show');
            return false;
        }
    });
});
$('#btnLoginOTP').click(function() {
    var flag = false;
    if (!$('#otp_field').val()) {
        $('#otp_field_error').css('display', 'block');
        return false;
    } else {
        $('#otp_field_error').css('display', 'none');
        flag = true;
    }
});

$(function() {
    $('#SalutationCode').change(function() {
        var value = $('#SalutationCode').val();
        if (value == 'mr') {
            $('input[id="PGenderMale"]').prop("checked", true);
        } else {
            $('input[id="PGenderFemale"]').prop("checked", true);
        }
    })
});


$(function() {
    $('#MaritalStatus').change(function() {
        var value = $('#MaritalStatus').val();
        var value2 = $('#Nomine_RelCode').val();
        if (value == 'Single' && (value2 == 'CHILD' || value2 == 'DAUGHTER' || value2 == 'HUSBAND' || value2 == 'SON' || value2 == 'SPOUSE')) {
            $('.nomineerelerror').show();
        } else {
            $('.nomineerelerror').hide();
        }
    })
});

$(function() {
    $('#Nomine_RelCode').change(function() {
        var value = $('#MaritalStatus').val();
        var value2 = $('#Nomine_RelCode').val();
        if (value == 'Single' && (value2 == 'CHILD' || value2 == 'DAUGHTER' || value2 == 'HUSBAND' || value2 == 'SON' || value2 == 'SPOUSE')) {
            $('.nomineerelerror').show();
        } else {
            $('.nomineerelerror').hide();
        }
    })
});


$(function() {
    $('#PremBrkpLink').on('click', function(event) {
        $('#PremiumBreakupAlert').show();
    })
});

$(function() {
    $('#NomineeAge').keyup(function() {
        var value = $('#NomineeAge').val();
        if (value == "") {
            $('.apprelation').hide();
            $('.appfullname').hide();
        } else if (value < "18") {
            $('.apprelation').show();
            $('.appfullname').show();
        } else if (value == " ") {
            $('.apprelation').hide();
            $('.appfullname').hide();
        } else {
            $('.apprelation').hide();
            $('.appfullname').hide();
        }
    })
});



$(function() {
    $('#chkVehicleFinance').on('change', function(e) {
        if (e.target.checked) {
            $('.agreement_type').show();
            $('.financier_city').show();
            $('.financier_name').show();
        } else {
            $('.agreement_type').hide();
            $('.financier_city').hide();
            $('.financier_name').hide();
        }
    })
});


$('.getQuoteBtn').click(function() {
    alert("word");
    var flag = false;
    var make = $("#Make option:selected").val();
    if (make == '') {
        $('#make_field_error').css('display', 'block');
        $('html, body').animate({
            scrollTop: $("#make_field_error").offset().top - 100
        }, 2000);
        return false;
    } else {
        $('#make_field_error').css('display', 'none');
        flag = true;
    }
    var model = $("#Model option:selected").val();
    if (model == '') {
        $('#model_field_error').css('display', 'block');
        $('html, body').animate({
            scrollTop: $("#model_field_error").offset().top - 100
        }, 2000);
        return false;
    } else {
        $('#model_field_error').css('display', 'none');
        flag = true;
    }


    var model_1 = $("#FuelType option:selected").val();
    if (model_1 == '') {
        $('#fuel_field_error').css('display', 'block');
        $('html, body').animate({
            scrollTop: $("#fuel_field_error").offset().top - 100
        }, 2000);
        return false;
    } else {
        $('#fuel_field_error').css('display', 'none');
        flag = true;
    }
    var model_2 = $("#Varient option:selected").val();
    if (model_2 == '') {
        $('#variant_field_error').css('display', 'block');
        $('html, body').animate({
            scrollTop: $("#variant_field_error").offset().top - 100
        }, 2000);
        return false;
    } else {
        $('#variant_field_error').css('display', 'none');
        flag = true;
    }
    if (!$('#VehicleInvoiceDate').val()) {
        $('#invoice_date_field_error').css('display', 'block');
        $('html, body').animate({
            scrollTop: $("#invoice_date_field_error").offset().top - 100
        }, 2000);
        return false;
    } else {
        $('#invoice_date_field_error').css('display', 'none');
        flag = true;
    }
    if (!$('#RTO_Code').val()) {
        $('#rto_field_error').css('display', 'block');
        $('html, body').animate({
            scrollTop: $("#rto_field_error").offset().top - 100
        }, 2000);
        return false;
    } else {
        var RTO_Code = $('#RTO_Code').val();
        if (validateRTO(RTO_Code)) {
            $('#rto_field_error').css('display', 'none');
            flag = true;
        } else {
            $('#rto_field_error').text('Please enter valid RTO Code for eg. DL01');
            $('#rto_field_error').css('display', 'block');
            $('html, body').animate({
                scrollTop: $("#rto_field_error").offset().top - 100
            }, 2000);
            return false;
        }
    }
    if ($('input[name="PolicyType"]:checked').val() == 'renew' && $('input[name="PolicyExpired"]:checked').val() == 'NO') {
        var DatePurchaseOneYearplus = new Date($('input[name="VehicleInvoiceDate"]').val());
        DatePurchaseOneYearplus.setFullYear(DatePurchaseOneYearplus.getFullYear() + 1);
        DatePurchaseOneYearplus.setDate(DatePurchaseOneYearplus.getDate() - 1);
        var PreviousPolicyExpiryDate1 = new Date($('input[name="PreviousPolicyExpiry"]').val());
        if (DatePurchaseOneYearplus > PreviousPolicyExpiryDate1) {
            const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

            $('.prevpolerror').text('Previous Policy Expiry Date not less than ' + dateToYMD(DatePurchaseOneYearplus));
            $('.prevpolerror').show();
            $('html, body').animate({
                scrollTop: $("#PreviousPolicyExpiry").offset().top - 100
            }, 2000);
            return false;
        } else {
            $('.prevpolerror').hide();
        }
    }
    var PolicyExpired = $("input[name='PolicyExpired']:checked").val();

    if (PolicyExpired == 'NO') {

        var ClaimPrevious = $("input[name='ClaimPrevious']:checked").val();

        // $('.ClaimPrevious').change(function(){
        //     var value = $( this ).val();
        if (ClaimPrevious == 'YES') {
            //$('.prevoius_ncb_intents').hide();
            if (!$('#PreviousPolicyExpiry').val()) {
                $('#policy_date_error').css('display', 'block');
                $('html, body').animate({
                    scrollTop: $("#policy_date_error").offset().top - 100
                }, 2000);
                return false;
            } else {
                $('#policy_date_error').css('display', 'none');
                flag = true;
            }
        } else {
            if ($('input[name="CoverType"]:checked').val() != 'policy-tp') {
                if (!$('#PreviousNCB').val()) {
                    $('#previous_ncb_error').css('display', 'block');
                    $('html, body').animate({
                        scrollTop: $("#previous_ncb_error").offset().top - 100
                    }, 2000);
                    return false;
                } else {
                    $('#previous_ncb_error').css('display', 'none');
                    flag = true;
                }
            }
            if (!$('#PreviousPolicyExpiry').val()) {
                $('#policy_date_error').css('display', 'block');
                $('html, body').animate({
                    scrollTop: $("#policy_date_error").offset().top - 100
                }, 2000);
                return false;
            } else {
                $('#policy_date_error').css('display', 'none');
                flag = true;
            }
        }
    }
    var Rto_code = $('#RTO_Code').val();
    $('#PRTO').val(Rto_code);

    var VehicleMake_Name = $("#Make option:selected").text();
    $('#VehicleMake_Name').text(VehicleMake_Name);

    var VehicleREGISTRATION_DATE = $('#VehicleInvoiceDate').val();
    $('#VehicleREGISTRATION_DATE').text(VehicleREGISTRATION_DATE);

    //$('.signup').css('display','none');
    $('#Quotation').css('display', 'block');
    var Quotation_search_product_name = $("#Make option:selected").text() + ' ' + $("#Model option:selected").text() + ' ' + $("#Varient option:selected").text();
    $('#span_quotation_search_product_name').text(Quotation_search_product_name);
    $('.span_quotation_search_after_result_count').hide();
    $('.span_quotation_search_after_result').hide();
    $('.span_quotation_search_before_result').show();

    var reqUrl = SITE_URL + '/bike/get-quote';
    var reqData = $('#frmBikeDetails').serialize();;
    $.ajax({
        type: "POST",
        url: reqUrl,
        data: reqData,
        dataType: "json",
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        beforeSend: function() {
            $('#BasicDetail :input').prop('disabled', true);
            $("#dvloader").show();
            $('.quoteListing').not(':first').remove();
            // $("#web_loader_overlay").show();
            // $("#web_loader_img").show();
        },
        complete: function() {
            $("#dvloader").hide();
            // $("#web_loader_overlay").hide();
            // $("#web_loader_img").hide();
        },
        success: function(response) {
            // var response = JSON.parse(resp);
            var status = response.status;
            // alert(status); return false;
            if (status == 1) {
                getQuoteDataFromApi(response);
            } else {
                alert("Something went wrong");
            }
        }
    });



    $('.car_steps li').removeClass('active');
    $('.car_steps li#quote_list').addClass('active');
    if (flag == true) {
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

function getQuoteDataFromApi(request) {
    var api = request.api;
    $.each(api, function(key, value) {
        var reqUrl = SITE_URL + '/bike/ICAPI/' + value;
        var reqData = request.input;
        $.ajax({
            type: "POST",
            url: reqUrl,
            data: reqData,
            dataType: "json",
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            beforeSend: function() {
                // $("#web_loader_overlay").show();
                // $("#web_loader_img").show();

            },
            complete: function() {
                // $("#web_loader_overlay").hide();
                // $("#web_loader_img").hide();
            },
            success: function(response) {
                // var response = JSON.parse(resp);
                var status = response.status;
                // alert(status); return false;
                if (status == 1) {
                    $("#dvloader").hide();
                    var quote_clone = $("#quote_design_template").clone().removeAttr('id');
                    quote_clone.attr('id', request.quoteId);
                    quote_clone.find('#proceednow').attr('data-id', request.quoteId);
                    quote_clone.find('#proceednow').attr('data-iccode', response.ICCode);
                    quote_clone.find('.iclogo').attr('src', response.ICLogo).attr('alt', response.ICName);
                    quote_clone.find('.ICName p').text(response.ICName);
                    if (response.data.coverType != 'policy-tp') {
                        quote_clone.find('.quote_tp_show').hide();
                        quote_clone.find('.quote_tp_hide').show();
                        quote_clone.find('.idv-value').html('<i class="fa fa-inr"></i>' + response.data.IDV);
                        quote_clone.find('.ncb-value').html(response.data.NCB);
						quote_clone.find('.garages').attr('href', response.ICGarages);
						quote_clone.find('#viewDetailsLink').attr('data-target', '#viewDetailsContent_'+request.quoteId);
						quote_clone.find('.ICDetails').attr('id', '#viewDetailsContent_'+request.quoteId);
						quote_clone.find('#BrochureFileURL').attr('href', '/files/' + response.ICCode + "_Bike_Brochure.pdf");
						quote_clone.find('#ClaimFileURL').attr('href', '/files/' + response.ICCode + "_Bike_ClaimForm.pdf");
						quote_clone.find('#PolicyWordingURL').attr('href', '/files/' + response.ICCode + "_Bike_Policywordings.pdf");
                    } else {
                        quote_clone.find('.quote_tp_show').show();
                        quote_clone.find('.quote_tp_hide').hide();
                    }
                    quote_clone.find('.premiumbreakuppopup').html(response.ICQuoteBreakUp);
                    quote_clone.find('#PremBrkpLink').attr('data-target', '#PremiumBreakup' + response.ICCode);
					quote_clone.find('#PremBrkpLink').attr('data-ic', response.ICCode);
                    quote_clone.find('.price').html('<i class="fa fa-inr"></i>' + response.data.GrossPremium);
                    quote_clone.appendTo(".PolicyListing").show()
                } else {
                    alert("Something went wrong");
                }
            }
        });
    });
}

function showPremBrkpPopUp(anchorId) {
    $('.premiumbreakuppopup').show();
}

$("#IsRegAddrSameProposerAdd").click(function() {
    var isChecked = $("#IsRegAddrSameProposerAdd").is(":checked");
    if (isChecked) {
        $('.same_vehicle_registration').hide();
    } else {
        $('.same_vehicle_registration').show();
    }
});

$("#IsRegAddrSameProposerAdd").click(function() {
    var isChecked = $("#IsRegAddrSameProposerAdd").is(":checked");
    if (isChecked) {
        $('.same_vehicle_registration').hide();
    } else {
        $('.same_vehicle_registration').show();
    }
});


$('.nextStepButton3').click(function() {
    var flag = false;
    var PolicyType = $('input[name="PolicyType"]:checked').val();
    var ProposarType = $('input[name="ProposarType"]:checked').val();
    var CoverType = $('input[name="CoverType"]:checked').val();
    //$('.signup').css('display','none');
    if (ProposarType == 'individual') {
        var SalutationCode = $("#SalutationCode option:selected").val();
        if (SalutationCode == '') {
            $('#salutation_error').css('display', 'block');
            $('html, body').animate({
                scrollTop: $("#salutation_error").offset().top - 100
            }, 2000);
            return false;
        } else {
            $('#salutation_error').css('display', 'none');
            flag = true;
        }

        if (!$('#FirstName').val()) {
            $('#FirstName_Required_error').css('display', 'block');
            $('html, body').animate({
                scrollTop: $("#FirstName_Required_error").offset().top - 100
            }, 2000);
            return false;
        } else {
			$('#FirstName_Required_error').css('display', 'none');
			if(validatePattern($('#FirstName').val(), "^[a-zA-Z]*$")) {
				$('#FirstName_error').css('display', 'none');
				flag = true;
			} else {
				$('#FirstName_error').css('display', 'block');
				$('html, body').animate({
					scrollTop: $("#FirstName_error").offset().top - 100
				}, 2000);
				return false;
			}
        }

        if (!$('#PLastName').val()) {
            $('#PLastName_Required_error').css('display', 'block');
            $('html, body').animate({
                scrollTop: $("#PLastName_Required_error").offset().top - 100
            }, 2000);
            return false;
        } else {
            $('#PLastName_Required_error').css('display', 'none');
			if(validatePattern($('#PLastName').val(), "^[a-zA-Z]*$")) {
				$('#PLastName_error').css('display', 'none');
				flag = true;
			} else {
				$('#PLastName_error').css('display', 'block');
				$('html, body').animate({
					scrollTop: $("#PLastName_error").offset().top - 100
				}, 2000);
				return false;
			}
        }

        if (!$('#Date').val()) {
            $('#DOB_error').css('display', 'block');
            $('html, body').animate({
                scrollTop: $("#DOB_error").offset().top - 100
            }, 2000);
            return false;
        } else {
            $('#DOB_error').css('display', 'none');
            flag = true;
        }
    } else {
        if (!$('#CorporateName').val()) {
            $('#CorporateName_Required_error').css('display', 'block');
            $('html, body').animate({
                scrollTop: $("#CorporateName_Required_error").offset().top - 100
            }, 2000);
            return false;
        } else {
			$('#CorporateName_Required_error').css('display', 'none');
			if(validatePattern($('#CorporateName').val(), "^[a-zA-Z]*$")) {
				$('#CorporateName_error').css('display', 'none');
				flag = true;
			} else {
				$('#CorporateName_error').css('display', 'block');
				$('html, body').animate({
					scrollTop: $("#CorporateName_error").offset().top - 100
				}, 2000);
				return false;
			}
        }
    }

    if (!$('#PMobile').val()) {
        $('#mobile_Required_error').css('display', 'block');
        $('html, body').animate({
            scrollTop: $("#mobile_Required_error").offset().top - 100
        }, 2000);
        return false;
    } else {
		$('#mobile_Required_error').css('display', 'none');
        if ($('#PMobile').val().length != 10 || validatePattern($('#PMobile').val(), "^[6789]\d{9}$")) {
            $('#mobile_valid_error').css('display', 'block');
            $('html, body').animate({
                scrollTop: $("#mobile_valid_error").offset().top - 100
            }, 2000);
            return false;
        } else {
            $('#mobile_valid_error').css('display', 'none');
            flag = true;
        }
    }

    if (!$('#PEmailId').val()) {
        $('#email_error').css('display', 'block');
        $('html, body').animate({
            scrollTop: $("#email_error").offset().top - 100
        }, 2000);
        return false;
    } else {
        var sEmail = $('#PEmailId').val();
        if (validateEmail(sEmail)) {
            $('#email_error').css('display', 'none');
            flag = true;
        } else {
            $('#email_error').css('display', 'none');
            $('#email_valid_error').css('display', 'block');
            $('html, body').animate({
                scrollTop: $("#email_valid_error").offset().top - 100
            }, 2000);
            return false;
        }
    }
    if (!$('#PAddress1').val()) {
        $('#PAddress1_error').css('display', 'block');
        $('html, body').animate({
            scrollTop: $("#PAddress1_error").offset().top - 100
        }, 2000);
        return false;
    } else {
        $('#PAddress1_error').css('display', 'none');
        flag = true;
    }

    var PState = $("#PState option:selected").val();
    if (PState == '') {
        $('#PState_error').css('display', 'block');
        $('html, body').animate({
            scrollTop: $("#PState_error").offset().top - 100
        }, 2000);
        return false;
    } else {
        $('#PState_error').css('display', 'none');
        flag = true;
    }

    var PCity = $("#PCity option:selected").val();
    if (PCity == '') {
        $('#PCity_error').css('display', 'block');
        $('html, body').animate({
            scrollTop: $("#PCity_error").offset().top - 100
        }, 2000);
        return false;
    } else {
        $('#PCity_error').css('display', 'none');
        flag = true;
    }

    if (!$('#PinCode').val()) {
        $('#PinCode_error').css('display', 'block');
        $('html, body').animate({
            scrollTop: $("#PinCode_error").offset().top - 100
        }, 2000);
        return false;
    } else {

        if ($('#PinCode').val().length != 6) {
            $('#PinCode_error').text('Please enter valid pan no');
            $('#PinCode_error').css('display', 'block');
            $('html, body').animate({
                scrollTop: $("#PinCode_error").offset().top - 100
            }, 2000);
            return false;
        } else {
            $('#PinCode_error').css('display', 'none');
            flag = true;
        }
    }

    if (ProposarType == 'individual') {
        var OccupationCode = $("#OccupationCode option:selected").val();
        if (OccupationCode == '') {
            $('#OccupationCode_error').css('display', 'block');
            $('html, body').animate({
                scrollTop: $("#OccupationCode_error").offset().top - 100
            }, 2000);
            return false;
        } else {
            $('#OccupationCode_error').css('display', 'none');
            flag = true;
        }

        var MaritalStatus = $("#MaritalStatus option:selected").val();
        if (MaritalStatus == '') {
            $('#MaritalStatus_error').css('display', 'block');
            $('html, body').animate({
                scrollTop: $("#MaritalStatus_error").offset().top - 100
            }, 2000);
            return false;
        } else {
            $('#MaritalStatus_error').css('display', 'none');
            flag = true;
        }
    }

    if (!$('#GSTIN').val()) {
        if (ProposarType == 'individual') {
            $('#GSTIN_error').css('display', 'none');
            flag = true;
        } else {
            $('#GSTIN_error').css('display', 'block');
            $('html, body').animate({
                scrollTop: $("#GSTIN_error").offset().top - 100
            }, 2000);
            return false;
        }
    } else {
        var GSTIN_value = $('#GSTIN').val()
        var GSTIN_valid = new RegExp('^([0-9]){2}([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}([1-9a-zA-Z]){1}[zZ]([1-9a-zA-Z]){1}$'); //regex 18AABCU9603R1ZM
        if (GSTIN_valid.test(GSTIN_value)) {
            $('#GSTIN_error').css('display', 'none');
            flag = true;
        } else {
            $('#GSTIN_error').text('Please enter valid GSTIN no');
            $('#GSTIN_error').css('display', 'block');
            $('html, body').animate({
                scrollTop: $("#GSTIN_error").offset().top - 100
            }, 2000);
            return false;
        }
    }

    if (!$('#PANNo').val()) {
        if (ProposarType == 'individual') {
            $('#PANNo_error').css('display', 'none');
            flag = true;
        } else {
            $('#PANNo_error').css('display', 'block');
            $('html, body').animate({
                scrollTop: $("#PANNo_error").offset().top - 100
            }, 2000);
            return false;
        }
    } else {
        var pan_value = $('#PANNo').val()
        var pan_valid = new RegExp('^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$'); //regex
        if (pan_valid.test(pan_value)) {
            $('#PANNo_error').css('display', 'none');
            flag = true;
        } else {
            $('#PANNo_error').text('Please enter valid Pan no');
            $('#PANNo_error').css('display', 'block');
            $('html, body').animate({
                scrollTop: $("#PANNo_error").offset().top - 100
            }, 2000);
            return false;
        }
    }

    if (ProposarType == 'individual') {
        if (!$('#NomineeName').val()) {
            $('#NomineeName_Required_error').css('display', 'block');
            $('html, body').animate({
                scrollTop: $("#NomineeName_Required_error").offset().top - 100
            }, 2000);
            return false;
        } else {
			$('#NomineeName_Required_error').css('display', 'none');
			if(validatePattern($('#NomineeName').val(), "^[a-zA-Z ]*$")) {
				$('#NomineeName_error').css('display', 'none');
				flag = true;
			} else {
				$('#NomineeName_error').css('display', 'block');
				$('html, body').animate({
					scrollTop: $("#NomineeName_error").offset().top - 100
				}, 2000);
				return false;
			}
        }

        var Nomine_RelCode = $("#Nomine_RelCode option:selected").val();
        if (Nomine_RelCode == '') {
            $('#Nomine_RelCode_error').css('display', 'block');
            $('html, body').animate({
                scrollTop: $("#Nomine_RelCode_error").offset().top - 100
            }, 2000);
            return false;
        } else {
            $('#Nomine_RelCode_error').css('display', 'none');
            flag = true;
        }

        if (!$('#NomineeAge').val()) {
            $('#NomineeAge_Required_error').css('display', 'block');
            $('html, body').animate({
                scrollTop: $("#NomineeAge_Required_error").offset().top - 100
            }, 2000);
            return false;
        } else {
			$('#NomineeAge_Required_error').css('display', 'none');
			if(validatePattern($('#NomineeAge').val(), "^[0-9]*$")) {
				$('#NomineeAge_error').css('display', 'none');
				flag = true;
			} else {
				$('#NomineeAge_error').css('display', 'block');
				$('html, body').animate({
					scrollTop: $("#NomineeAge_error").offset().top - 100
				}, 2000);
				return false;
			}
			if($('#NomineeAge').val() < 18) {
				if (!$('#AppointeeName').val()) {
					$('#AppointeeName_Required_error').css('display', 'block');
					$('html, body').animate({
						scrollTop: $("#AppointeeName_Required_error").offset().top - 100
					}, 2000);
					return false;
				} else {
					$('#AppointeeName_Required_error').css('display', 'none');
					if(validatePattern($('#AppointeeName').val(), "^[a-zA-Z ]*$")) {
						$('#AppointeeName_error').css('display', 'none');
						flag = true;
					} else {
						$('#AppointeeName_error').css('display', 'block');
						$('html, body').animate({
							scrollTop: $("#AppointeeName_error").offset().top - 100
						}, 2000);
						return false;
					}
				}
				
				var Appointee_RelCode = $("#Appointee_RelCode option:selected").val();
				if (Appointee_RelCode == '') {
					$('#Appointee_RelCode_error').css('display', 'block');
					$('html, body').animate({
						scrollTop: $("#Appointee_RelCode_error").offset().top - 100
					}, 2000);
					return false;
				} else {
					$('#Appointee_RelCode_error').css('display', 'none');
					flag = true;
				}
			}
        }
    }
    if (PolicyType == 'renew') {
        var PreICNameShort = $("#PreICNameShort option:selected").val();
        if (PreICNameShort == '') {
            $('#PreICNameShort_error').css('display', 'block');
            $('html, body').animate({
                scrollTop: $("#PreICNameShort_error").offset().top - 100
            }, 2000);
            return false;
        } else {
            $('#PreICNameShort_error').css('display', 'none');
            flag = true;
        }
        if (!$('#PrevPolicyNo').val()) {
            $('#PrevPolicyNo_Required_error').css('display', 'block');
            $('html, body').animate({
                scrollTop: $("#PrevPolicyNo_Required_error").offset().top - 100
            }, 2000);
            return false;
        } else {
			$('#PrevPolicyNo_Required_error').css('display', 'none');
			if(validatePattern($('#PrevPolicyNo').val(), "^[a-zA-Z0-9/-]*$")) {
				$('#PrevPolicyNo_error').css('display', 'none');
				flag = true;
			} else {
				$('#PrevPolicyNo_error').css('display', 'block');
				$('html, body').animate({
					scrollTop: $("#PrevPolicyNo_error").offset().top - 100
				}, 2000);
				return false;
			}
        }
    }

    if (!$('#ChassisNo').val()) {
        $('#ChassisNo_Required_error').css('display', 'block');
        $('html, body').animate({
            scrollTop: $("#ChassisNo_Required_error").offset().top - 100
        }, 2000);
        return false;
    } else {
		$('#ChassisNo_Required_error').css('display', 'none');
		$('#ChassisNo_error').html('Please enter valid Chassis No. with minimum 6 characters.');
		if(validatePattern($('#ChassisNo').val(), "^[a-zA-Z0-9]*$") && $('#ChassisNo').val().length >= 6) {
			if(PolicyType == 'new' && $('#ChassisNo').val().length != 17) {
				$('#ChassisNo_error').html('Please enter valid Chassis No. with 17 characters.');
				$('#ChassisNo_error').css('display', 'block');
				$('html, body').animate({
					scrollTop: $("#ChassisNo_error").offset().top - 100
				}, 2000);
				return false;
			} else {
				$('#ChassisNo_error').css('display', 'none');
				flag = true;
			}
		} else {
			$('#ChassisNo_error').css('display', 'block');
			$('html, body').animate({
				scrollTop: $("#ChassisNo_error").offset().top - 100
			}, 2000);
			return false;
		}
    }
    if (!$('#EngineNo').val()) {
        $('#EngineNo_Required_error').css('display', 'block');
        $('html, body').animate({
            scrollTop: $("#EngineNo_Required_error").offset().top - 100
        }, 2000);
        return false;
    } else {
        $('#EngineNo_Required_error').css('display', 'none');
		if(validatePattern($('#EngineNo').val(), "^[a-zA-Z0-9]*$") && $('#EngineNo').val().length >= 6) {
			$('#EngineNo_error').css('display', 'none');
			flag = true;
		} else {
			$('#EngineNo_error').css('display', 'block');
			$('html, body').animate({
				scrollTop: $("#EngineNo_error").offset().top - 100
			}, 2000);
			return false;
		}
    }
    if (!$('#RegNo').val()) {
        $('#RegNo_Required_error').css('display', 'block');
        $('html, body').animate({
            scrollTop: $("#RegNo_Required_error").offset().top - 100
        }, 2000);
        return false;
    } else {
        $('#RegNo_Required_error').css('display', 'none');
		if(validatePattern($('#RegNo').val(), "^[a-zA-Z0-9]*$") && $('#RegNo').val().length >= 5) {
			$('#RegNo_error').css('display', 'none');
			flag = true;
		} else {
			$('#RegNo_error').css('display', 'block');
			$('html, body').animate({
				scrollTop: $("#RegNo_error").offset().top - 100
			}, 2000);
			return false;
		}
    }
	
	if($("#chkVehicleFinance").prop('checked') == true){
		var AgreementType = $("#AgreementType option:selected").val();
        if (AgreementType == '') {
            $('#AgreementType_Required_error').css('display', 'block');
            $('html, body').animate({
                scrollTop: $("#AgreementType_Required_error").offset().top - 100
            }, 2000);
            return false;
        } else {
            $('#AgreementType_Required_error').css('display', 'none');
            flag = true;
        }
		if (!$('#FinancierName').val()) {
			$('#FinancierName_Required_error').css('display', 'block');
			$('html, body').animate({
				scrollTop: $("#FinancierName_Required_error").offset().top - 100
			}, 2000);
			return false;
		} else {
			$('#FinancierName_Required_error').css('display', 'none');
			if(validatePattern($('#FinancierName').val(), "^[a-zA-Z0-9]*$")) {
				$('#FinancierName_error').css('display', 'none');
				flag = true;
			} else {
				$('#FinancierName_error').css('display', 'block');
				$('html, body').animate({
					scrollTop: $("#FinancierName_error").offset().top - 100
				}, 2000);
				return false;
			}
		}
		
		if (!$('#FinancierCity').val()) {
			$('#FinancierCity_Required_error').css('display', 'block');
			$('html, body').animate({
				scrollTop: $("#FinancierCity_Required_error").offset().top - 100
			}, 2000);
			return false;
		} else {
			$('#FinancierCity_Required_error').css('display', 'none');
			if(validatePattern($('#FinancierCity').val(), "^[a-zA-Z0-9]*$")) {
				$('#FinancierCity_error').css('display', 'none');
				flag = true;
			} else {
				$('#FinancierCity_error').css('display', 'block');
				$('html, body').animate({
					scrollTop: $("#FinancierCity_error").offset().top - 100
				}, 2000);
				return false;
			}
		}
	}

    // var CorporateName = $('#CorporateName').val();
    // $('#CompanyFullName').text(CorporateName);

    var FirstName = $('#FirstName').val();
    var PLastName = $('#PLastName').val();

    $('#ProposerFullName').text(FirstName + ' ' + PLastName);

    var ProposerDOB = $('#Date').val();
    $('#ProposerDOB').text(ProposerDOB);

    var ProposerMobileNo = $('#PMobile').val();
    $('#ProposerMobileNo').text(ProposerMobileNo);

    var ProposerEmailID = $('#PEmailId').val();
    $('#ProposerEmailID').text(ProposerEmailID);
    //
    var ProposerStateName = $("#PState option:selected").text();
    $('#ProposerStateName').text(ProposerStateName);

    var ProposerCityName = $("#PCity option:selected").text();
    $('#ProposerCityName').text(ProposerCityName);

    var ProposerAddress = $('#PAddress1').val();
    $('#ProposerAddress').text(ProposerAddress);

    var ProposerPinCode = $('#PinCode').val();
    $('#ProposerPinCode').text(ProposerPinCode);

    var ProposerPAN = $('#PANNo').val();
    $('#ProposerPAN').text(ProposerPAN);

    var ProposerGSTN = $('#GSTIN').val();
    $('#ProposerGSTN').text(ProposerGSTN);

    var ProposerNomineeName = $('#NomineeName').val();
    $('#ProposerNomineeName').text(ProposerNomineeName);

    var ProposerNomine_RelDsc = $("#Nomine_RelCode option:selected").val();
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

    var reqUrl = SITE_URL + '/bike/create-proposer';
    var reqData = $('#frmProposerDetails').serialize();
    $.ajax({
        type: "POST",
        url: reqUrl,
        data: reqData,
        dataType: "json",
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        beforeSend: function() {
            $('#ProposalDetail :input').prop('disabled', true);
        },
        complete: function() {

        },
        success: function(response) {
            // var response = JSON.parse(resp);
            var status = response.status;
            // alert(status); return false;
            if (status == 1) {} else {
                alert("Something went wrong");
            }
        }
    });

    if (flag == true) {
        $('#Preview').css('display', 'block');
		if (ProposarType == 'individual') {
			$(".ProposerIndividualPreview").show();
			$(".ProposerCompnayPreview").hide();
		} else {
			$(".ProposerCompnayPreview").show();
			$(".ProposerIndividualPreview").hide();
		}
		$('.ProposerPolicyTypePreview').hide();
		if (PolicyType == 'renew') {		
			$('.ProposerPolicyTypePreview').show();
		}
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

function chkTermClick(cb) {
    if (cb.checked) {
        $('#finalBuy').attr('disabled', false);
    } else {
        $('#finalBuy').attr('disabled', true);
    }
}

function RedirectToPayment() {
    if ($("#chkTerm").prop('checked')) {
        $('#finalBuy').attr('disabled', true);
        var reqUrl = SITE_URL + '/bike/buy';
        var reqData = 'quoteId=' + $('#quoteId').val();
        $.ajax({
            type: "POST",
            url: reqUrl,
            data: reqData,
            dataType: "json",
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            beforeSend: function() {

            },
            complete: function() {

            },
            success: function(response) {
                // var response = JSON.parse(resp);
                var status = response.status;
                // alert(status); return false;
                if (status == 1) {
                    createQuoteDataFromApi(response.input);
                } else {
                    alert("Something went wrong");
                }
            }
        });
    }
}

function createQuoteDataFromApi(request) {
    var reqUrl = SITE_URL + '/bike/ICAPI2/' + request.quoteId;
    var reqData = request;
    $.ajax({
        type: "POST",
        url: reqUrl,
        data: reqData,
        dataType: "json",
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        beforeSend: function() {
            // $("#web_loader_overlay").show();
            // $("#web_loader_img").show();

        },
        complete: function() {
            // $("#web_loader_overlay").hide();
            // $("#web_loader_img").hide();
        },
        success: function(response) {
            // var response = JSON.parse(resp);
            var status = response.status;
            // alert(status); return false;
            if (status == 1) {
                //alert(response.data);
                window.location.href = response.data;
            } else {
                alert("Something went wrong");
            }
        }
    });
}

$(function() {
    $('input[name="CoverType"]').change(function() {
        displayQuotePageInput();
    });
});

$(function() {
    $('input[name="PolicyType"]').on('change', function() {
        displayQuotePageInput();
        if ($('input[name="PolicyType"]:checked').val() == 'new') {
            $('input[name="VehicleInvoiceDate"]').attr("max", "");
        } else {
            $('input[name="VehicleInvoiceDate"]').attr("max", "2020-09-25");
        }
    })
});

$('input[name="ProposarType"]').on('change', function() {
    displayQuotePageInput()
});

function displayQuotePageInput() {
    var PolicyType = $('input[name="PolicyType"]:checked').val();
    var ProposarType = $('input[name="ProposarType"]:checked').val();
    var CoverType = $('input[name="CoverType"]:checked').val();
    var PolicyExpired = $('input[name="PolicyExpired"]:checked').val();

    //Default : START
    $('#divPrevNCB').hide();
    $('#divPrevclaim').hide();
    $('#PreviousNCB1').val('');
    //Default : END

    if (PolicyType == 'new') {
        if (ProposarType == 'corporate') {
            if (CoverType == 'policy-tp') {
                $('#previous-policy').hide();
                $('#additional-covers').hide();
                $('#Add-ons-IDV').hide();
            } else {
                $('#previous-policy').hide();
                $('#additional-covers').hide();
                $('#Add-ons-IDV').show();
            }
        } else {
            if (CoverType == 'policy-tp') {
                $('#previous-policy').hide();
                $('#additional-covers').show();
                $('#Add-ons-IDV').hide();
            } else {
                $('#previous-policy').hide();
                $('#additional-covers').show();
                $('#Add-ons-IDV').show();
            }
        }
    } else {
        if (ProposarType == 'corporate') {
            if (CoverType == 'policy-tp') {
                $('#previous-policy').show();
                $('#additional-covers').hide();
                $('#Add-ons-IDV').hide();
                $('#divPrevNCB').hide();
                $('#divPrevclaim').hide();
            } else {
                $('#previous-policy').show();
                $('#additional-covers').hide();
                $('#Add-ons-IDV').show();
                if (PolicyExpired == 'NO') {
                    $('#divPrevNCB').show();
                    $('#divPrevclaim').show();
                }
            }
        } else {
            if (CoverType == 'policy-tp') {
                $('#previous-policy').show();
                $('#additional-covers').show();
                $('#Add-ons-IDV').hide();
                $('#divPrevNCB').hide();
                $('#divPrevclaim').hide();
            } else {
                $('#previous-policy').show();
                $('#additional-covers').show();
                $('#Add-ons-IDV').show();
                if (PolicyExpired == 'NO') {
                    $('#divPrevNCB').show();
                    $('#divPrevclaim').show();
                }
            }
        }
    }
}

$(function() {
    $('#ZeroDep').on('change', function(e) {
        var PolicyType = $('input[name="PolicyType"]:checked').val();
        if (e.target.checked && PolicyType == 'renew') {
            $('#ZeroDepAlert').show();
            $('.zdep_pp').show();
        } else {
            $('#ZeroDepAlert').hide();
            $('.zdep_pp').hide();
        }
    })
});

$(function() {
    $('.yesbutton').click(function() {
        $('input[id=ZeroDep1]').attr('checked', 'checked')
        $('#ZeroDepAlert').hide();
    })
    $('.nobutton').click(function() {
        $('#ZeroDepAlert').hide();
    })
});

$(function() {
    $("input[name='PolicyExpired']").change(function() {
        var value = $(this).val();
        $('#PreviousNCB1').val('');
        if (value == 'YES') {
            $('.policy_intents').hide();
            $('.polexptype').show();
        } else {
            if ($('input[name="CoverType"]:checked').val() == 'policy-tp') {
                $('#divPrevNCB').hide();
                $('#divPrevclaim').hide();
                $('.polexptype').hide();
                $('#divPrevExpiry').show();
            } else {
                $('.policy_intents').show();
                $('.polexptype').hide();
            }
        }
    });
});

$(function() {
    $('#PreviousNCB1').change(function() {
        var value2 = $("input[name='PolicyExpired']:checked").val();
        if ($('input[name="CoverType"]:checked').val() == 'policy-comprehensive' && value2 == 'YES') {
            var value = $('#PreviousNCB1').val();
            if (value == '20') {
                $('#divPrevNCB').show();
                $('#divPrevclaim').show();
            } else {
                $('#divPrevNCB').hide();
                $('#divPrevclaim').hide();
            }
        }
    })
});

function enableSection(action) {
    if (action == "edit") {
        $("#BasicDetail :input").attr("disabled", false);
        $("#Quotation").fadeOut();
        $("#ProposalDetail").fadeOut();
        $('.quoteListing').not(':first').remove();
		$("#chkTerm").prop('checked', false)
        $('html, body').animate({
            scrollTop: $("#BasicDetail").offset().top
        }, 2000);
    } else if (action == "quote") {
        $("#BasicDetail :input").attr("disabled", true);
        $("#Quotation").css("pointer-events", "auto");
		$("#chkTerm").prop('checked', false)
        //Remove the opacity on quote Page
        $(".ICdiv").removeAttr("style", "opacity:1");
        $("#ProposalDetail").fadeOut();
        $("#Preview").fadeOut();
        $("#quote_design_template").hide();
        $('html, body').animate({
            scrollTop: $("#Quotation").offset().top
        }, 2000);
    } else if (action == "prop") {
        $("#Quotation").css("pointer-events", "none");
        $("#ProposalDetail :input").attr("disabled", false);
		$("#chkTerm").prop('checked', false)
        //Highlight the selected IC on quote Page
        //var Planhash = $scope.BikeInfoMDL.SelectedPlanHash;
        $(".ICdiv").css({
            opacity: 0.5
        });
        //$("#" + Planhash).removeAttr("style", "opacity:1");
        $("#Preview").fadeOut();
        $('html, body').animate({
            scrollTop: $("#ProposalDetail").offset().top
        }, 2000);
    } else if (action == "prev") {
        $("#Quotation").css("pointer-events", "none");
        //Highlight the selected IC on quote Page
        //var Planhash = $scope.BikeInfoMDL.SelectedPlanHash;
        $(".ICdiv").css({
            opacity: 0.5
        });
        //$("#" + Planhash).removeAttr("style", "opacity:1");
        $("#ProposalDetail :input").attr("disabled", true);
    }
}

$(document).ready(function() {
    $('#PState').change(function() {
        var ele_val = $(this).val();
        if (ele_val != '') {
            var reqUrl = SITE_URL + '/get-city';
            var reqData = '&state_id=' + ele_val;
            // alert(reqUrl+' - '+reqData); // return false;
            $.ajax({
                type: "GET",
                url: reqUrl,
                data: reqData,
                dataType: "json",
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                beforeSend: function() {
                    // $("#web_loader_overlay").show();
                    // $("#web_loader_img").show();
                },
                complete: function() {
                    // $("#web_loader_overlay").hide();
                    // $("#web_loader_img").hide();
                },
                success: function(response) {
                    // var response = JSON.parse(resp);
                    var status = response.status;
                    // alert(status); return false;
                    if (status == 1) {
                        var data = response.data;
                        var selectHtml = '<option value="">Select City</option>';
                        if (data != '') {
                            $.each(data, function(key, value) {
                                selectHtml += '<option value="' + value.city_id + '">' + value.city_name + '</option>';
                            });
                        }
                        $("#PCity").html(selectHtml);
                    } else {
                        alert("Something went wrong");
                    }
                }
            });
        } else {
            // Reset All Dependent DropDowns
            $("#PState").html('<option value="">Select City</option>');
        }
    });
});