let oFields = {};

oFields.vnaam = {field:"vnaam", placeholder:"Voornaam", type:"string", req:true, minChar:3, maxChar:18};
oFields.tv = {field:"tv", placeholder:"tussen voegsel", type:"string", req:false, maxChar:7};
oFields.anaam = {field:"anaam", placeholder:"Achternaam", type:"string", req:true, minChar:3, maxChar:24};
oFields.email = {field:"email", placeholder:"Email", type:"varchar", req:false, maxChar:32};
oFields.gebDatum = {field:"gebDatum", placeholder:"Geb. Datum", type:"date", req:false};
// oFields.gender = {field:"gender", type:"radio", req:true };
$aOptionsGender = [
    { value: "man", label: "Man" },
    { value: "vrouw", label: "Vrouw" },
    { value: "other", label: "Anders" }
];
oFields.gender = {field:"gender", placeholder:"Gender", type:"radio", options: $aOptionsGender};

$( document ).ready(function() {

    let errMsgEmpty = {};
    let errMsgChar = {};

    $.each(oFields, function (key, val){
        // make input fields except for radio
        var div = $("<div class='divField'>");
        div.append( $("<div>").html(val.placeholder));
        if(val.type == "string" || val.type == "varchar" || val.type == "date") {
            div.append( $("<div>").append(
                $("<input class='inpField' type='"+val.type+"' name='"+val.field+"' placeholder='"+val.placeholder+"' />")
            ));
        }
        // make input radio
        if(val.type == "radio") {
            var divRadio = $("<div>");
            $.each(val.options, function(k, v){
                divRadio.append( $("<div>")
                .append( $("<input type='radio' name='"+k.field+"' value='"+v.value+"' />") )
                .append(v.label) )
            });
            div.append(divRadio);            
        }
        $("#frm").append(div);
    });

    $(".inpField").on("blur", function(e){
        let targetField = e.target.name;
        let oField = oFields[targetField];

        if(oField.req && e.target.value == "") {
            errMsgEmpty[targetField] = oField.placeholder + " kan niet leeg zijn!";
        }
        if(e.target.value <= oField.minChar || e.target.value >= oField.maxChar ){
            errMsgChar[targetField] = oField.placeholder + " heeft te weinig of te veel characters!";
        }

        $("#err").empty();
        
        fCheckErrors();
    });

    function fCheckErrors(){
        if(Object.keys(errMsgEmpty).length>0 || Object.keys(errMsgChar).length>0) {
            $("#msg").css("display","block");
            $.each(errMsgEmpty, function(key, val){
                $("#err").append(val+"<br>");
            });
            $.each(errMsgChar, function(key, val){
                $("#err").append(val+"<br>");
            });
        }
    }
    
});
