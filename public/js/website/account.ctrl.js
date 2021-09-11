var app = angular.module('PosRegister', ["ngStorage"]);//extending angular module from First Part

app.controller('AccountCtrl', function ($scope, $http, $compile) { //explained about controller in Part 2
    //Default Variable
    $scope.MissCallTimer = parseInt($('#MissCallTime').val()) * 1000;//1000ms=1sec
    $scope.OTPCloseTimer = parseInt($('#OTPCloseTime').val()) * 60 * 1000;// Convert in min to  ms
    $scope.TimerMissCallAuth = null;
    $scope.TimerOPTModelClose = null;
    $scope.timerClose = false;
    $scope.OTPCountForQuotation = null;
    $scope.formId = "#register";
    $scope.fieldLabel = "Qualification";
    if (!window.location.origin) {
        window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        $scope.baseUrl = window.location.origin;// $("#baseUrl").val();
    }
    else {
        $scope.baseUrl = window.location.origin;// $("#baseUrl").val();
    }
    $scope.OTPResendCounter = 0;
    $scope.showGuestOTPVerfictionForm = false;
    $scope.POSAccountMDL = {};
    $scope.IsGuestOTPSendSubmitted = false;
    $scope.GuestMobileNo = null;
    $scope.IsCOVIDEnquiryOTPSendSubmitted = false;
    $scope.CovidEnquiryMobileNo = null;
    $scope.CovidEnquiryPersonName = null;
    $scope.CovidEnquiryEmailId = null;
    $scope.IsHomePageEnqSubmitted = false;
    $scope.HomePageEnqiuerName = null;
    $scope.HomePageEnquierEmailId = null;
    $scope.HomePageEnquierMobileNo = null;
    $scope.HomePageEnquierOTP = null;
    $scope.HomePageEnquierDescription = null;
    $scope.HealthInsType = "Individual/Family Health Insurance";
    $scope.HealthOrganization = null;
    $scope.blogBaseUrl = window.location.origin + '/Home/';
    $scope.fromSubmited = false;

    $scope.abortTimer = function () { // to be called when you want to stop the timer
        clearTimeout($scope.TimerMissCallAuth);
        timerClose = true;
        // clearInterval(TimerMissCallAuth);
    }

    $scope.CloseOPTModel = function () {
        $('#ConfirmOTP').modal('hide');
        $scope.abortTimer()
    }
    $scope.SaveInSessionCookies = function (objName, data) {
        try {
            if (setLocalCookiesFlag == "true") {

                $.cookie(objName, JSON.stringify(data));
            }
            else {
                $.cookie(objName, JSON.stringify(data), { path: '/', domain: GetInSessionCookies('ClientServerDomainName') });  // Cookies store data of Client UAT with Domain Name Specific.  -- 03/11/2016
            }
        }
        catch (e) {
            console.log("Error: Saving to Cookies." + e);
        }
    }
    $scope.CallOTP = function () {
        var mobileno = $("#MobileNumber").val();
        $http({

            method: 'POST',
            url: $scope.baseUrl + '/Common/SendOTP',
            data: JSON.stringify({ mobileno: mobileno, DomainID: "1", IsQuotation: false })
        }).then(function (result) {
            //.success(function (result) {
            if (result.data == "OK") {
                $('.invalid_otp').val("Please enter the OTP received on your mobile number");
                $('#ConfirmOTP').modal('show'); // Added By Manas If OTP Status Is Ok Then it will Show -- 21/09/2016
            }
            else {
                $('#ConfirmOTP').modal('hide'); // Added By Manas If OTP Status Is Fail Then it will Hide -- 21/09/2016
                alert("Please try after some time.");
            }
        });
    }
    $scope.ConfirmOTP = function () {
        $scope.ConfirmOTPNumber();
        if ($('#txtOTP').val() != "") {
            $scope.OTPCountForQuotation = parseInt($scope.OTPCountForQuotation) + 1;
        }
    }
    $scope.ConfirmOTPNumber = function () {
        var CustMobileNo = $("#MobileNumber").val();
        var otp1 = $('#txtOTP').val();

        if (otp1.length != 4 || isNaN(otp1)) {
            $('#txtOTP').addClass('input-validation-error');
            $('.spn_message').show().text('Please enter the OTP received on your mobile number');
            return false;
        }
        else {
            $('#txtOTP').removeClass('input-validation-error');
            $('.spn_message').hide();
        }
        $http({

            method: 'POST',
            url: $scope.baseUrl + '/Common/verifyOTP',
            data: JSON.stringify({ otp: otp1, MobileNo: CustMobileNo })
        }).then(function (result) {
            //.success(function (result) {
            if (result.data == "UnSuccess") {
                $('#txtOTP').addClass('input-validation-error').val('');
                $('.spn_message').show().text('Please enter the OTP received on your mobile number');
                // Show Msg. of Auth. Fail
                if (OTPCountForQuotation >= 4) {
                    $('#ConfirmOTP').modal('hide');
                    alert("Authentication Failed.");
                    $('#txtOTP').val(''); // Added By Manas -- 21/9/2016
                    $('#txtOTP').removeClass('input-validation-error'); // Added By Manas -- 21/9/2016
                }
                // End
            }
            else {
                $('#ConfirmOTP').modal('hide');
                $('#txtOTP').removeClass('input-validation-error').val('');
                $('.spn_message').hide();
                $scope.SaveInSessionCookies('OPTVarifiedMobileNo', CustMobileNo); // Added For Session and Save In Cookies -- 19-10-2016
                $($scope.formId).submit();
            }
        });
    }
    $scope.SendOTP = function (formId) {
        $scope.formId = formId;
        $scope.validate();
        if ($($scope.formId).valid()) {
            $('#txtOTP').removeClass('input-validation-error');
            $('.invalid_otp').hide();
            $scope.CallOTP();
            $scope.TimerMissCallAuth = setTimeout($scope.CheckMissCallAuth, $scope.MissCallTimer);
            $scope.TimerOPTModelClose = setTimeout($scope.CloseOPTModel, $scope.OTPCloseTimer);
        }
        //$scope.CallOTP();
    };
    $scope.ResendOTP = function (formId) {
        $scope.CallOTP();
        $scope.formId = formId;
        $scope.validate();
        if ($($scope.formId).valid()) {
            $scope.CallOTP();
            $scope.OTPCountForQuotation = 1; // For Set Counter OTP as 1
            $('.spn_message').show().text('OTP Resent Successfully.');
        }
    };
    /// OTP msg
    /// OTP msg
    $scope.openOTPDiv = function () {
        $('#ConfirmOTP').modal('show');
        $('#divOtpMobileNo').show();
        $('#divOtp').hide();
        $('#spnOtpHeader').text('Enter Mobile No.');
    }

    //Clear Form (reset)
    $scope.clearForm = function () {
        $scope.User = {};
        $scope.register.$setPristine(); //here f1 our form name
        $scope.submitted = false;
    }


    //$http service for authenticate user 
    $scope.AuthenticateUser = function () {
        $('.error').removeClass('error');
        $('label[for="NewPassword"]').hide();
        $('label[for="ConfirmPassword"]').hide();
        var data = { Username: $("#UserName").val(), Password: $("#Password").val() };

        if ($("#login").valid()) {
            $http({

                method: 'POST',
                url: $scope.baseUrl + '/Account/Login/',
                data: JSON.stringify({ Model: data })
            }).then(function (result) {
                //success(function (data) {
                if (result.data["MessageId"] == "1") {
                    $('#Login').modal('hide');
                    $(".invalid_user").text('');
                    if (result.data["IsForcedReset"] == "1") {
                        $('#Resetpassword').modal('show');
                    }
                    else {
                        window.location = $scope.baseUrl + "/Home/Welcome";
                    }
                }
                else {
                    $(".invalid_user").text(result.data["Message"]);
                }
            }).catch(function (reason) {
                console.log(reason);
            });
        }
        else {
            $(".invalid_user").text("");
        }
    }
    //$http service for reset password 
    $scope.ChangePassword = function () {
        $scope.formId = "#reset_password";
        var data = { Password: $("#NewPassword").val(), ConfirmPassword: $("#ConfirmPassword").val() };
        $scope.validate();
        if ($("#reset_password").valid()) {
            $http({

                method: 'POST',
                url: $scope.baseUrl + '/Account/ChangePassword/',
                data: JSON.stringify({ Model: data })
            }).then(function (response) {
                //success(function (data) {
                if (response.data["MessageId"] == "1") {
                    window.location = $scope.baseUrl + "/Home/Welcome";
                }
                else {
                    $(".invalid_user").text(response.data["Message"]);
                }
            });
        }
        else {
            $(".invalid_user").text("");
        }
    }

    $scope.validate = function () {
        var date = new Date();
        var year = date.getFullYear();

        $($scope.formId).validate({
            rules: {
                AadharNumber: {
                    minlength: 12
                },
                PanCard: {
                    minlength: 10
                },
                MobileNumber: {
                    minlength: 10
                },
                PassingYear: {
                    range: [1928, year]
                },
                ConfirmPassword: {
                    equalTo: "#NewPassword"
                }
            },
            //onkeyup: function (element) {
            //    this.element(element);
            //},
            focusInvalid: false,
            onfocusout: function (element) {
                if ($(element).attr("type") != "file")
                    this.element(element);
            },
            invalidHandler: function (form, validator) {
                if (!validator.numberOfInvalids())
                    return;
                $(validator.errorList[0].element).focus();
            }
        });
    };


    //initialize get states function
    $scope.Init = function (model) {
        $('.nav-side-menu').height($('.signup').height() + 61);
        $scope.validate();
        $scope.POSAccountMDL.Logintype = "C";
        $(window).scroll(function () {
            if ($(window).scrollTop() + $(window).height() > $(document).height() - 150) {
                $('.regCall').addClass('fixed_buttonReg');
            } else {
                $('.regCall').removeClass('fixed_buttonReg');
            }
        });

        if (model != null) {
            // $scope.BlogDetailList = model;
        }
        else {
            // $scope.SearchRecords();


        }

    }

    //Forget Password functionality
    $scope.ForgotPassword = function () {
        var data = { UserName: $('#UserName').val() };
        var input = { objLogin: data };
        $http.post($scope.baseUrl + '/Account/ForgotPassword', data).then(function (response) {
            if (response.data.MessageId == 1) {
                $('#Login').modal('hide');
                window.alert(response.data.Message);
            }
            else if (response.data.MessageId == 2) {
                $(".invalid_user").text(response.data.Message);
            }
        });

    };

    $scope.SendOTPToEnquier = function (form) {
        var product = "";
        if (form.HomePageEnquierMobileNo.$valid) {
            switch (form.$name) {
                case "frmTwoWheelerEnq":
                    product = "TwoWheeler";
                    break;
                case "frmHomeInsuranceEnq":
                    product = "Home";
                    break;
                case "frmHealthInsuranceEnq":
                    product = "Health";
                    break;
                case "frmCovidInsuranceEnq":
                    product = "Covid";
                    break;
            }
            $http({

                method: 'POST',
                url: $scope.baseUrl + '/Account/SendOTPToEnquier/',
                data: JSON.stringify({ MobileNo: $scope.HomePageEnquierMobileNo, productType: product })
            }).then(function (result) {
                //success(function (data) {
                if (result.data.IsOTPSendToMobile == true) {
                    alert("OTP sent to entered Mobile No. ");
                    $scope.isOTPOpen = false;
                }
                else {
                    alert("Opps! some error occured. Please try after some time.");
                    $scope.isOTPOpen = true;
                }

            }).catch(function (reason) {

            });
        }
        else {
            $scope.IsHomePageEnqSubmitted = true;
        }
    }


    $scope.HomePageEnquiry = function (form) {
        var product = "";
        if (form.$valid) {
            switch (form.$name) {
                case "TwoWheelerEnquiry":
                    product = "TwoWheeler";
                    break;
                case "HomeInsuranceEnquiry":
                    product = "Home";
                    break;
                case "CovidInsuranceEnquiry":
                    product = "Covid";
                    break;
                case "HealthInsuranceEnquiry":
                    product = "Health";
                    break;
            }
            $http({

                method: 'POST',
                url: $scope.baseUrl + '/Account/VerifyHomePageEnqOTP/',
                data: JSON.stringify({ name: $scope.HomePageEnqiuerName, mobileNo: $scope.HomePageEnquierMobileNo, EmailId: $scope.HomePageEnquierEmailId, OTP: $scope.HomePageEnquierOTP, productType: product, Description: $scope.HomePageEnquierDescription, HealthInsType: $scope.HealthInsType, HealthOrganization: $scope.HealthOrganization })
            }).then(function (result) {
                //success(function (data) {
                if (result.data["MessageId"] == "1") {
                    window.location = $scope.baseUrl;
                    alert('Dear Customer, Thank you for showing your interest. Our customer care executive will get back to you shortly');
                }
                else {
                    alert(result.data["Message"]);
                }
            }).catch(function (reason) {

            });
        }
        else {
            $scope.IsHomePageEnqSubmitted = true;
        }
    }


    $scope.CoronaVirusEnquirySubmit = function (IsResend) {
        var msg = "";
        $scope.IsCOVIDEnquiryOTPSendSubmitted = true;
        $scope.IsSendOTPAsyncRunning = true;
        if (IsResend == true) {
            $scope.IsOTPVerificationAsyncRunning = true;
        }
        var data = { EnquiryMobileNo: $scope.CovidEnquiryMobileNo, EnquiryPersonName: $scope.CovidEnquiryPersonName, EmailId: $scope.CovidEnquiryEmailId };
        //var data = { MobileNumber: $scope.CovidEnquiryMobileNo};
        if ($scope.frmCoronaEnquiry.$valid) {
            if (IsResend == true && $scope.OTPResendCounter > 3) {
                alert('Maximum attempt reached for resending OTP. Please contact with the concerned Person.');
                $('#GuestOTPVertification').modal('hide');
            }
            else {
                $http({

                    method: 'POST',
                    url: $scope.baseUrl + '/Account/SendCovidOTPToEnquier',
                    data: JSON.stringify({ enquiryDetail: data })
                }).then(function (result) {
                    //success(function (data) {
                    if (result.data.IsOTPSendToMobile == true) {
                        $("#frmCoronaVirusEnquiry").hide();
                        $("#frmCOVIDOTPVertification").show();
                        if (IsResend == true) {

                            $scope.OTPResendCounter = parseInt($scope.OTPResendCounter) + 1;
                        }
                        alert("OTP sent to entered Mobile No. ");
                    }
                    else {
                        $("#spnCoronaEnquirySendOTP_invalid").text("Opps! some error occured. Please try after some time.");
                    }
                    $scope.IsSendOTPAsyncRunning = false;
                    $scope.IsOTPVerificationAsyncRunning = false;
                }).catch(function (reason) {
                    console.log(reason);
                    $scope.IsSendOTPAsyncRunning = false;
                    $scope.IsOTPVerificationAsyncRunning = false;
                });
            }
        }
        else {
            $("#spnCoronaEnquirySendOTP_invalid").text("");
            $scope.IsSendOTPAsyncRunning = false;
            $scope.IsOTPVerificationAsyncRunning = false;

        }
    }

    $scope.VerifyCOVIDOTP = function () {
        $scope.IsOTPVerificationAsyncRunning = true;
        var data = { MobileNumber: $("#CovidEnquiryMobileNo").val(), OTP: $scope.POSAccountMDL.OTP };
        if ($("#frmCOVIDOTPVertification").valid()) {

            $http({

                method: 'POST',
                url: $scope.baseUrl + '/Account/VerifyCOVIDOTP/',
                data: JSON.stringify({ OTPVerificationDetail: data })
            }).then(function (result) {
                //success(function (data) {
                if (result.data["MessageId"] == "1") {
                    $('#COVIDOTPVertification').modal('hide');
                    $("#spnCOVIDOTPVertification_Invalid").text('');
                    if (result.data["IsForcedReset"] == "1") {
                        $('#Resetpassword').modal('show');
                        $scope.IsOTPVerificationAsyncRunning = false;
                    }
                    else {
                        window.location = $scope.baseUrl;
                        //alert('Our concerned person will get back to you');
                        alert('Dear Customer, Thank you for showing your interest. Our customer care executive will get back to you shortly');
                    }
                }
                else {
                    $("#spnCOVIDOTPVertification_Invalid").text(result.data["Message"]);
                    $scope.IsOTPVerificationAsyncRunning = false;
                }
            }).catch(function (reason) {
                console.log(reason);
                $scope.IsOTPVerificationAsyncRunning = false;
            });
        }
        else {
            $("#spnCOVIDOTPVertification_Invalid").text("");
            $scope.IsOTPVerificationAsyncRunning = false;
        }
    };


    // Guest Login

    $scope.GuestLoginSubmit = function (IsResend) {
        var msg = "";
        $scope.IsGuestOTPSendSubmitted = true;
        $scope.IsSendOTPAsyncRunning = true;
        if (IsResend == true) {
            $scope.IsOTPVerificationAsyncRunning = true;
        }
        var data = { MobileNumber: $("#MobileNo").val() };
        if ($scope.frmMobile.$valid) {

            if (IsResend == true && $scope.OTPResendCounter > 3) {
                alert("Maximum attempt reached for resending OTP. Please contact with the concerned Person.");
                $('#GuestOTPVertification').modal('hide');
            }
            else {
                $http({

                    method: 'POST',
                    url: $scope.baseUrl + '/Account/SendOTPToGuestUser/',
                    data: JSON.stringify({ GuestUserDetail: data })
                }).then(function (result) {
                    //success(function (data) {
                    if (result.data.IsOTPSendToMobile == true) {
                        $("#frmGuestLogin").hide();
                        $("#frmGuestOTPVertification").show();
                        if (IsResend == true) {

                            $scope.OTPResendCounter = parseInt($scope.OTPResendCounter) + 1;
                        }
                        alert("OTP sent to entered Mobile No. ");
                    }
                    else {
                        $("#spnGuestSendOTP_invalid").text("Opps! some error occured. Please try after some time.");
                    }
                    $scope.IsSendOTPAsyncRunning = false;
                    $scope.IsOTPVerificationAsyncRunning = false;
                }).catch(function (reason) {
                    console.log(reason);
                    $scope.IsSendOTPAsyncRunning = false;
                    $scope.IsOTPVerificationAsyncRunning = false;
                });
            }


        }
        else {
            $("#spnGuestSendOTP_invalid").text("");
            $scope.IsSendOTPAsyncRunning = false;
            $scope.IsOTPVerificationAsyncRunning = false;

        }
    };

    //VerifyGuestOTP

    $scope.VerifyGuestOTP = function () {
        $scope.IsOTPVerificationAsyncRunning = true;
        var data = { MobileNumber: $("#MobileNo").val(), OTP: $("#OTP").val() };
        if ($("#frmGuestOTPVertification").valid()) {

            $http({

                method: 'POST',
                url: $scope.baseUrl + '/Account/VerifyGuestOTP/',
                data: JSON.stringify({ OTPVerificationDetail: data })
            }).then(function (result) {
                //success(function (data) {
                if (result.data["MessageId"] == "1") {
                    $('#GuestOTPVertification').modal('hide');
                    $("#spnGuestOTPVertification_Invalid").text('');
                    if (result.data["IsForcedReset"] == "1") {
                        $('#Resetpassword').modal('show');
                        $scope.IsOTPVerificationAsyncRunning = false;
                    }
                    else {
                        window.location = $scope.baseUrl + "/Home/Welcome";
                    }
                }
                else {
                    $("#spnGuestOTPVertification_Invalid").text(result.data["Message"]);
                    $scope.IsOTPVerificationAsyncRunning = false;
                }
            }).catch(function (reason) {
                console.log(reason);
                $scope.IsOTPVerificationAsyncRunning = false;
            });
        }
        else {
            $("#spnGuestOTPVertification_Invalid").text("");
            $scope.IsOTPVerificationAsyncRunning = false;
        }
    };



    //Dual Login with OTP start:

    $scope.VerifyMobileLogin = function () {
        var MobileNo = $("#mobileNo").val();
        $scope.IsAsyncRunning = true;
        $http({

            method: 'POST',
            url: $scope.baseUrl + '/Account/VerifyMobileUserLogin',
            data: JSON.stringify({ MobileNo: MobileNo })
        }).then(function (result) {
            if (result.data["MessageId"] == "1") {
                //$('#Login').modal('hide');
                $("#divInvalidUser").text('');
             
                    $('#divOtpMobileNo').hide();
                    $scope.IsMobileNo = 'OTP';
                    $scope.IsAsyncRunning = false;
            }
            else {
                $scope.IsAsyncRunning = false;
                $("#divInvalidUser").text(result.data["Message"]);
            }
        }).catch(function (reason) {
            console.log(reason);
        });
  // }
       
           
    }

    /*function to verify OTP in Mobile No.*/
    $scope.VerifyOTP = function () {
        $scope.Message = '';
        //if ($('#frmOTP').valid()) {
            $scope.IsAsyncRunning = true;
            var input = { otp: $scope.POSAccountMDL.OTP, MobileNo: $scope.POSAccountMDL.MobileNo};
            $http.post($scope.baseUrl + "/Account/VerifyLoginOTP", input).then(function (result) {
                if (result.data["MessageId"] == "1") {
                   // $('#Login').modal('hide');
                    $scope.IsAsyncRunning = false;
                    $("#divInvalidUser").text('');
                    $('#divloginOtp').hide();
                    if (result.data["IsForcedReset"] == "1") {
                        $('#Resetpassword').modal('show');
                    }
                    else {
                        window.location = $scope.baseUrl + "/Home/Welcome";
                    }
                  
                }
                else {
                    $scope.IsAsyncRunning = false;
                    $scope.Message = 'Invalid OTP';
                }

            });
        //}
    }

    $scope.LoginOptionChange = function (LoginType)
    {
        if (LoginType == "C") {
            $scope.IsMobileNo = "";
            $scope.POSAccountMDL.MobileNo = '';
            $scope.POSAccountMDL.OTP = ''
            $("#divInvalidUser").text('');
        }
        else
        {
            $scope.IsMobileNo = 'MobileNo';
            $scope.POSAccountMDL.Password = '';
            $scope.POSAccountMDL.UserName = '';
            $(".invalid_user").text("");
        }
    }

    $scope.ResendOTP = function ()
    {
        
            $scope.Message = '';
                $scope.IsAsyncRunning = true;
                var input = { mobileno: $scope.POSAccountMDL.MobileNo, DomainID: "1", IsQuotation: false };  
                $http.post($scope.baseUrl + "/Common/SendOTP", input).then(function (response) {
                    if (response.status == 200 && response.data == 'OK') {
                        $scope.IsMobileNo = "OTP";
                        $scope.Message = '';
                        $scope.HeaderMsg = 'Enter OTP';
                        
                            $scope.Message = 'OTP resent successfully';
                            $scope.OTPResendCounter = parseInt($scope.OTPResendCounter) + 1
                            if ($scope.OTPResendCounter >= 3) {
                                $('#btnResendOTP').hide();
                                $('spanresendOTPmsg').hide();
                            }
                        
                    }
                    $scope.IsAsyncRunning = false;

                });

        
    }
    //Dual Login with OTP end:

});

app.directive('capitalize', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            var capitalize = function (inputValue) {
                if (inputValue == undefined) inputValue = '';
                var capitalized = inputValue.toUpperCase();
                if (capitalized !== inputValue) {
                    modelCtrl.$setViewValue(capitalized);
                    modelCtrl.$render();
                }
                return capitalized;
            }
            modelCtrl.$parsers.push(capitalize);
            capitalize(scope[attrs.ngModel]); // capitalize initial value
        }
    };
});

app.directive("valueType", [function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            angular.element(elem).on("keypress", function (e) {

                if (attrs.valueType == "int") {
                    if (event.keyCode < 48 || event.keyCode > 57) {
                        e.preventDefault();
                    }
                }
                else if (attrs.valueType == "alphabet") {
                    if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122)) {

                    }
                    else {
                        e.preventDefault();
                    }
                }
                else if (attrs.valueType == "alphabetWithSpace") {
                    if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || event.keyCode == 32) {

                    }
                    else {
                        e.preventDefault();
                    }
                }
                else if (attrs.valueType == "alphaNumeric") {
                    if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || (event.keyCode >= 48 && event.keyCode <= 57)) {

                    }
                    else {
                        e.preventDefault();
                    }
                }
            });
        }
    }
}]);

app.filter('trustAsHtml', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);