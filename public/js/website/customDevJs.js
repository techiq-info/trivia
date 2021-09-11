var baseUrl = window.location.origin,
    now,
    minDate,
    maxDate,
    changeMonth,
    changeYear,
    showButtonPanel;
$(".default_calendar").datepicker({
    changeMonth: !0,
    changeYear: !0,
    dateFormat: "dd-M-yy",
    onClose: function () {
        $(this).valid();
    },
});
$(".calendar").each(function () {
    var n = $(this);
    n.datepicker({
        changeMonth: !0,
        changeYear: !0,
        dateFormat: "dd-M-yy",
        minDate: n.prop("data-minDate", true),
        maxDate: n.prop("data-maxDate", true),
        yearRange: n.prop("data-yearRange", true),
        
    });
});
$.validator.messages.required = function (n, t) {
    return $(t).attr("data-message");
};
$.validator.messages.email = function (n, t) {
    return $(t).attr("data-valid");
};
$.validator.messages.number = function (n, t) {
    return $(t).attr("data-valid");
};
$.validator.messages.unique = function (n, t) {
    return $(t).attr("data-duplicate");
};
$.validator.messages.customphone = function (n, t) {
    return $(t).attr("data-valid");
};
$.validator.messages.range = function (n, t) {
    return $(t).attr("data-valid");
};
$.validator.messages.require_from_group = function (n, t) {
    return $(t).attr("data-message");
};
$.validator.messages.min_strict = function (n, t) {
    return $(t).attr("data-valid");
};
$.validator.messages.pan = function (n, t) {
    return $(t).attr("data-message");
};
$.validator.messages.minlength = function () {
    return "Please enter valid Aadhaar No.";
};
$.validator.messages.special_chars = function (n, t) {
    return $(t).attr("data-valid");
};
$.validator.messages.filesize = function (n, t) {
    var i = $(t).val().split(".").pop().toLowerCase();
    return i.length > 0 &&
        $.inArray(i, ["gif", "png", "jpg", "jpeg", "pdf"]) == -1
        ? $(t).attr("data-valid")
        : $(t).attr("data-size");
};
$.validator.addMethod("customphone", function (n, t) {
    return this.optional(t) || /^([0|\+[0-9]{1,5})?([6-9][0-9]{9})$/.test(n);
});
$.validator.addMethod("require_from_group", function (n, t, i) {
    var r = $(i[1], t.form),
        u = r.eq(0),
        f = u.data("valid_req_grp")
            ? u.data("valid_req_grp")
            : $.extend({}, this),
        e =
            r.filter(function () {
                return f.elementValue(this);
            }).length >= i[0];
    return (
        u.data("valid_req_grp", f),
        $(t).data("being_validated") ||
            (r.data("being_validated", !0),
            r.each(function () {
                f.element(this);
            }),
            r.data("being_validated", !1)),
        e
    );
});
$.validator.addMethod("pan", function (n, t) {
    return (
        this.optional(t) || /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/.test(n)
    );
});
$.validator.addMethod("unique", function (n, t) {
    var r = $(t).attr("name") + "=" + n,
        i = !0;
    return (
        n != null &&
            n != "" &&
            $.ajax({
                url: baseUrl + "/Common/CheckExistingEmailPhone",
                type: "POST",
                async: !1,
                data: r,
                success: function (n) {
                    i = n;
                },
            }),
        i
    );
});
$.validator.addMethod("min_strict", function (n, t) {
    return this.optional(t) || n.slice(0, 1) > 0;
});
$.validator.addMethod("aadhar_pan_validation", function (n, t) {
    var value1 = $('#AadharNumber').val();
    var value2 = $('#PanCardNumber').val();
    var value3 = $('#AadharCardFile').val();
    var value4 = $('#PanCardFile').val();
	$("#AadharCardFile").removeClass("required");
	$("#PanCardFile").removeClass("required");
    if(value1 != '' && value3 == '' && value2 == ''){
        $("#AadharCardFile").addClass("required");
        return true;
    }
    else if(value2 != '' && value4 == '' && value1 == ''){
        $("#PanCardFile").addClass("required");
        return true;
    }
    else if(value1 != '' && value2 != '' && (value3 == '' && value4 == '')){
        $("#AadharCardFile").addClass("required");
        $("#PanCardFile").addClass("required");
        return true;
    }
	return true;
});
$.validator.addMethod("aadhar_pan_new_valid", function (n, t, i) {
    var value1 = $('#AadharNumber').val();
    var value2 = $('#PanCardNumber').val();
    $("#AadharCardFile").removeClass("required");
	$("#PanCardFile").removeClass("required");
    if(value1 == '' && value2 == ''){
        $("#AadharCardFile").addClass("required");
	    $("#PanCardFile").addClass("required");
        return true;
    }
    return true;
});
$.validator.addMethod("filesize", function (n, t, i) {
    var r = $(t).val().split(".").pop().toLowerCase(),
        u;
    return r.length > 0 &&
        $.inArray(r, ["gif", "png", "jpg", "jpeg", "pdf"]) == -1
        ? !1
        : ((u = i * 1048576), this.optional(t) || t.files[0].size <= u);
});
$(".validate_group").on("change", function () {
    $(this).attr("name") == "AadharNumber" && $(this).val() != ""
        ? $("#AadharCardFile").addClass("required")
        : $("#AadharCardFile").removeClass("required");
    $(this).attr("name") == "PanCard" && $(this).val() != ""
        ? $("#PanCardFile").addClass("required")
        : $("#PanCardFile").removeClass("required");
});
$(".special_chars").bind("keypress", function (n) {
    var t = new RegExp("^[a-zA-Z-. ]+$"),
        i;
    switch ($(this).attr("name")) {
        case "FirstName":
            t = new RegExp("^[a-zA-Z-. ]+$");
            break;
        case "LastName":
            t = new RegExp("^[a-zA-Z-. ]+$");
            break;
        case "Address":
            t = new RegExp("^[a-zA-Z0-9.,-/' ]+$");
            break;
        case "AadharNumber":
            t = new RegExp("^[0-9]+$");
    }
    return ((i = String.fromCharCode(n.charCode ? n.charCode : n.which)),
    t.test(i))
        ? !0
        : (n.preventDefault(), !1);
});
$.validator.addMethod("special_chars", function (n, t) {
    switch ($(t).attr("name")) {
        case "FirstName":
            return this.optional(t) || /^[a-zA-Z-. ]+$/.test(n);
        case "LastName":
            return this.optional(t) || /^[a-zA-Z-. ]+$/.test(n);
        case "Address":
            return this.optional(t) || /^[a-zA-Z0-9.,-/' ]+$/.test(n);
        case "AadharNumber":
            return this.optional(t) || /^[0-9]+$/.test(n);
    }
});

$('#BasicDetail input[name="PolicyExpired"]').on("change", function () {
    $(this).val() == "YES"
        ? $(".previous_policy :input")
              .not($("input[name=PolicyExpired]"))
              .prop("disabled", !0)
        : $(".previous_policy :input").prop("disabled", !1);
    $("#PreviousNCB, #PExpiryDate, #PolicyExpiredType").val("");
    $(".previous_policy :input")
        .not("input[name=PolicyExpired]")
        .attr("checked", !1);
});
now = new Date();
minDate = new Date(now.getFullYear() - 10, now.getMonth(), now.getDate());
maxDate = new Date(now.getFullYear(), now.getMonth() - 10, now.getDate());
$('#BasicDetail input[name="PolicyType"]').on("change", function () {
    if (
        ($("#PreviousNCB, #PExpiryDate, #PolicyExpiredType").val(""),
        $("input[name=PolicyExpired], input[name=ClaimPrevious]").attr(
            "checked",
            !1
        ),
        $(this).val() != "N")
    ) {
        var n = new Date(),
            t = new Date(n.setFullYear(n.getFullYear() - 10, 1));
        $("#InvoiceDate").datepicker("option", {
            minDate: "-15y",
            maxDate: "-1y:+60d",
            yearRange: "-15:-0",
        });
        $("#RegistrationDate").datepicker("option", {
            minDate: "-15y",
            maxDate: "0",
        });
    } else {
        var i = new Date(),
            t = new Date(i.setDate(i.getDate() - 90, 1));
        $("#InvoiceDate").datepicker("option", {
            minDate: t,
            maxDate: "today",
        });
    }
});
$("#PDOB").datepicker({
    changeMonth: true,
    changeYear: true,
    showButtonPanel: !1,
    dateFormat: "dd-mm-yy",
    minDate: new Date(1900,1-1,1),
    maxDate: "-18y",
    yearRange: "-110:-18",
});
DatePicker = function () {
    $(".calendar_car").datepicker("option", "maxDate", maxDate);
    $(".calendar_car").datepicker("option", "minDate", minDate);
};
DatePicker();
$("#FinancerCar")
    .autocomplete({
        autoFocus: !0,
        minLength: 2,
        source: function (n, t) {
            $("#divloaderFinancierCar").show();
            var i = {
                value: $.trim($("#FinancerCar").val()),
                Product_ID: $("#FKProduct_ID").val(),
            };
            $.ajax({
                type: "POST",
                contentType: "application/json;",
                url: baseUrl + "/Car/GetFinancerName",
                cache: !1,
                data: JSON.stringify(i),
                contentType: "application/json; charset=utf-8",
                success: function (n) {
                    t(n);
                    $("#divloaderFinancierCar").hide();
                },
                error: function (n) {
                    console.log(n);
                },
            });
        },
        change: function (n, t) {
            $(this).val(t.item ? t.item.Text : "");
        },
        focus: function () {
            return $("#FinancerCar").val($("#FinancerCar").val()), !1;
        },
        blur: function (n, t) {
            return $("#FinancerCar").val(t.item.Text), !1;
        },
        select: function (n, t) {
            return (
                $("#FinancerCar").val(t.item.Text),
                $("#CarFinancerCode").val(t.item.Value),
                !1
            );
        },
    })
    .autocomplete("instance")._renderItem = function (n, t) {
    return $("<li>").append(t.Text).appendTo(n);
};
$("#FinancerCitycodeCar")
    .autocomplete({
        autoFocus: !0,
        minLength: 3,
        source: function (n, t) {
            $("#divloaderFinancierCityCar").show();
            var i = { value: $.trim($("#FinancerCitycodeCar").val()) };
            $.ajax({
                type: "POST",
                contentType: "application/json;",
                url: baseUrl + "/Car/GetFinancerCityName",
                cache: !1,
                data: JSON.stringify(i),
                contentType: "application/json; charset=utf-8",
                success: function (n) {
                    t(n);
                    $("#divloaderFinancierCityCar").hide();
                },
                error: function (n) {
                    console.log(n);
                },
            });
        },
        change: function (n, t) {
            $(this).val(t.item ? t.item.Value : "");
        },
        focus: function () {
            return (
                $("#FinancerCitycodeCar").val($("#FinancerCitycodeCar").val()),
                !1
            );
        },
        blur: function (n, t) {
            return $("#FinancerCitycodeCar").val(t.item.Value), !1;
        },
        select: function (n, t) {
            return $("#FinancerCitycodeCar").val(t.item.Value), !1;
        },
    })
    .autocomplete("instance")._renderItem = function (n, t) {
    return $("<li>").append(t.Value).appendTo(n);
};
$('#BasicDetail input[name="IDVradio"]').on("change", function () {
    $(this).val() == "BestIDV" && $("#IDV").val("");
});
$(document).ready(function () {
    $(".custom-form-control")
        .on("focus blur", function (n) {
            $(this)
                .parents(".custom-form-group")
                .toggleClass(
                    "focused",
                    n.type === "focus" || this.value.length > 0
                );
        })
        .trigger("blur");
});
$(document).on("change", "select", function () {
    $(this)
        .closest("div .selectfloat .form-control")
        .css({ "padding-top": "20px" });
    var n = $(this).closest("div").find("div");
    n.css("display", "block");
});
