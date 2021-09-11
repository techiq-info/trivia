//CAR From Drop Down Dynamic Update Start
$( document ).ready(function() {
    $('.rtoAutoComplete').autoComplete();
    $('.pincodeAutoComplete').autoComplete();
    $('#Make').change(function() {
        var ele_val = $(this).val();
        if(ele_val != ''){
            var reqUrl = SITE_URL+'/cars/get-vehicle-model';
            var reqData = '&manufacturer_id='+ele_val;
            // alert(reqUrl+' - '+reqData); // return false;
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
                    if(status == 1){
                        var data = response.data;
                        var selectHtml = '<option value="">Select Vehicle Model</option>';
                        if(data != ''){
                            $.each(data, function(key,value) {
                                selectHtml += '<option value="'+value+'">'+value +'</option>';
                            });
                        }
                        $("#Model").html(selectHtml);
                    } else {
                        alert("Something went wrong");
                    }
                }
            });
        } else {
            // Reset All Dependent DropDowns
            $("#Make").html('<option value="">Select Manufacturer</option>');
        }
    });

    $('#FuelType').change(function(){
        getmodel();
    });

    $('#Model').change(function() {
        getmodel();
    });



    // GET QUOTE WHEN User Click on get Quote Button
    $('.getQuoteBtn').click(function() {
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
        getQuote();
    });




    // Js Function 

    function getmodel(){
        var ele_val = $("#Model").val();
        var fueltype = $("#FuelType").val();
        console.log(fueltype);
        if(ele_val != ''){
            var reqUrl = SITE_URL+'/cars/get-vehicle-varient';
            var reqData = '&model_id='+ele_val+'&fueltype='+fueltype;
            // alert(reqUrl+' - '+reqData); // return false;
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
                    if(status == 1){
                        var data = response.data;
                        var selectHtml = '<option value="">Select Vehicle Varient</option>';
                        if(data != ''){
                            $.each(data, function(key,value) {
                                selectHtml += '<option value="'+key+'">'+value+'</option>';
                            });
                        }
                        $("#Varient").html(selectHtml);
                    } else {
                        alert("Something went wrong");
                    }
                }
            });
        } else {
            // Reset All Dependent DropDowns
            $("#Model").html('<option value="">Select Vehicle Model</option>');
        } 
    }

function getQuoteDataFromApi(request) {
    var api = request.api;
    $.each(api, function(key, value) {
        var reqUrl = SITE_URL + '/cars/ICAPI/' + value;
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

    function getQuote(){
         var reqUrl = SITE_URL + '/cars/get-quote';
        var reqData = $('#frmVehicleDetails').serialize();
        console.log(reqData);
            $.ajax({
                type: "POST",
                url: reqUrl,
                data: reqData,
                dataType: "json",
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                beforeSend: function() {
                   // $('#BasicDetail :input').prop('disabled', true);
                    $("#dvloader").show();
                   // $('.quoteListing').not(':first').remove();
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
                        console.log(response);
                        getQuoteDataFromApi(response);
                    } else {
                        alert("Something went wrong");
                    }
                }
            });
    }
});

