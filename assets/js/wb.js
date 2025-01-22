$(document).ready(function(){
	$('.navbar-collapse ul li a').click(function(){ 
            $('.navbar-toggle:visible').click();
    });
	var malpractice,
		malpractice_ongoing,
		feedback, 
	    y = 4,
	    x = 2
	    ipAddress = $('#ipAddress').attr("value");

	function emailValidation(email) {
	    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
	    return pattern.test(email);
	}

	function handleValidation(class_id,message){

		$(class_id).addClass("error");
		$(".error-submit" ).html('<div class="error">'+ message+'</div>');
		setTimeout(function(){ $(".error-submit" ).html(''); $(".error").removeClass("error");  }, 3000);
	}

	function fileUpload(event){
        
    //get selected file
    files = event.target.files;
    
    //form data check the above bullet for what it is  
    window.data = new FormData();                                   

    //file data is presented as an array
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
       
        var fileName  = file.name;
        var ext = fileName.split('.').pop().toLowerCase();
		if($.inArray(ext, ['pdf','png','jpg','jpeg','mp4','mp3','docx']) == -1) {
		    
		    $(".help-block").html("<div class='error-submit'>Please choose a .pdf/.png/.jpg/.docx/.mp3/.mp4 file.</div>");

        }else if(file.size > 1048576*10){//check file size (in bytes)
            
            $(".help-block").html("<div class='error-submit'>File is too large (1 MB max)</div>");
        }else{
            
            data.append('file', file, fileName); 
            //create a new XMLHttpRequest
            var xhr = new XMLHttpRequest();     
            
            //post file data for upload
            xhr.open('POST', 'https://centum.co.ke/whistleblower/api/email/upload-file', true);  
            xhr.send(window.data);
            xhr.onload = function () {                
                var response = JSON.parse(xhr.responseText);
                //console.log(response);
            };     
           
        }
    }
}

	$('#add').on('click',function(event){
		event.preventDefault();
		//alert(wbInvolvedDiv);	
		wbInvolvedDiv = '' +	    
			'<div class="row">'+
				'<div class="col-xs-6 form-group">'+
				  '<input type="text" class="form-control" id="firstname'+x+'" placeholder="First name">'+
				'</div>'+
				'<div class="col-xs-6 form-group">'+
				  '<input type="text" class="form-control" id="lastname'+x+'" placeholder="Last name">'+
				'</div>'+
			'</div>'+
			'<div class="input-group form-group">'+
			  '<span class="input-group-addon"><i class="fa fa-location-arrow"></i></span>'+
			  '<input type="text" class="form-control" id="work'+x+'" placeholder="Company/Work location">'+
			'</div>'+
			'<div class="input-group form-group">'+
			  '<span class="input-group-addon"><i class="fa fa-briefcase"></i></span>'+
			  '<input type="text" class="form-control" id="role'+x+'" placeholder="Role/Position">'+
			'</div>'+
			'<div class="input-group form-group">'+
			  '<span class="input-group-addon"><i class="fa fa-phone"></i></span>'+
			  '<input type="text" class="form-control"  id="phone'+x+'" placeholder="254712345678 or N/A">'+
			'</div>';		

		if(x<y){
			
            $('.wb-involved').append(wbInvolvedDiv);
            x++;
        }
		 	
	});
	
	$('#remove').on('click',function(event){
		event.preventDefault();

		$('.wb-involved').children(wbInvolvedDiv).remove();			
		 	
	});


	window.malpractice = '';
	$('#malpractice').on('change',function(){	 
	 	window.malpractice = $('#malpractice :selected').attr('value');
	 	
	});

	$('input[name=malpractice_ongoing]').change(function(){
	    window.malpractice_ongoing = this.value;
	});

	$('input[name=feedback]').change(function(){
	    window.feedback = this.value;
	});

	$('input[type=file]').on('change', fileUpload);


	$('#wb-policy-download').on('click',function(event){
		event.preventDefault();	

		$.ajax({				
			type: "GET",
			url: "https://centum.co.ke/whistleblower/api/email/download",
			contentType: "application/json; charset=utf-8",
			crossDomain: true,
			dataType: "json",
			
			success: function(data) {

				console.log("200");				 				  					
			}
		})
	});
	

	$('#wb-submit').on('click',function(event){
		event.preventDefault();
		
		var firstname1 = $("#firstname1").val();
		var lastname1 = $("#lastname1").val();
		var work1 = $("#work1").val();
		var role1 = $("#role1").val();
		var phone1 = $("#phone1").val();

		var firstname2 = $("#firstname2").val();
		var lastname2 = $("#lastname2").val();
		var work2 = $("#work2").val();
		var role2 = $("#role2").val();
		var phone2 = $("#phone2").val();

		var firstname3 = $("#firstname3").val();
		var lastname3 = $("#lastname3").val();
		var work3 = $("#work3").val();
		var role3 = $("#role3").val();
		var phone3 = $("#phone3").val();

		var malpractice_location = $("#malpractice_location").val();
		var malpractice_desc = $("#malpractice_desc").val();
		var malpractice_attach = $("#malpractice_attach").val();

		var firstname_2 = $("#firstname_2").val();
		var lastname_2 = $("#lastname_2").val();
		var work_2 = $("#work_2").val();
		var role_2 = $("#role_2").val();
		var email_2 = $("#email_2").val();
		var phone_2 = $("#phone_2").val();
		var feedback = $("#feedback").val();

		var firstname4 = $("#firstname4").val();
		var lastname4 = $("#lastname4").val();
		var role4 = $("#role4").val();		
		var email4 = $("#email4").val();		
		var phone4 = $("#phone4").val();

		var firstname5 = $("#firstname5").val();
		var lastname5 = $("#lastname5").val();
		var role5 = $("#role5").val();		
		var email5 = $("#email5").val();
		var phone5 = $("#phone5").val();

		//validation
		var captcha = grecaptcha.getResponse();
		

		if(firstname1.length == 0 ) {
			handleValidation('#firstname1','Please enter person involved Firstname');			
		}else if(lastname1.length == 0 ){
			handleValidation('#lastname1','Please enter person involved Lastname');
		}else if(work1.length == 0 ){
			handleValidation('#work1','Please enter person involved Work Location');
		}else if(role1.length == 0 ){
			handleValidation('#role1','Please enter person involved Role/Position');
		}else if(phone1.length == 0 ){
			handleValidation('#phone1','Please enter person involved Phone number');		
		}else if((($('#firstname2').length)>0) && (firstname2.length == 0)){
			handleValidation('#firstname2','Please enter 2nd person involved Firstname');			
		}else if((($('#firstname2').length)>0) && (lastname2.length == 0 )){
			handleValidation('#lastname2','Please enter 2nd person involved Lastname');
		}else if((($('#firstname2').length)>0) && (work2.length == 0 )){
			handleValidation('#work2','Please enter 2nd person involved Work location');
		}else if((($('#firstname2').length)>0) && (role2.length == 0 )){
			handleValidation('#role2','Please enter 2nd person involved Role');
		}else if((($('#firstname2').length)>0) && (phone2.length == 0 )){
			handleValidation('#phone2','Please enter 2nd person involved phone number');
		}else if((($('#firstname3').length)>0) && (firstname3.length == 0 )) {
			handleValidation('#firstname3','Please enter 3rd person involved Firstname');			
		}else if((($('#firstname3').length)>0) && (lastname3.length == 0)){
			handleValidation('#lastname3','Please enter 3rd person involved Lastname');
		}else if((($('#firstname3').length)>0) && (work3.length == 0 )){
			handleValidation('#work3','Please enter 3rd person involved Work location');
		}else if((($('#firstname3').length)>0) && (role3.length == 0 )){
			handleValidation('#role3','Please enter 3rd person involved Role');
		}else if((($('#firstname3').length)>0) && (phone3.length == 0 )){
			handleValidation('#phone3','Please enter 3rd person involved phone number');
		// 
		}else if(window.malpractice == ''){
			handleValidation('#malpractice','Please select malpractice');
		}else if(malpractice_location.length == 0 ){
			handleValidation('#malpractice_location','Please describe where malpractice occurred');
		}else if(malpractice_desc.length == 0 ){
			handleValidation('#malpractice_desc','Please describe malpractice committed');		
		}else if(typeof(window.malpractice_ongoing) == "undefined"){
			window.malpractice_ongoing = "unknown";
		}else if(typeof(window.feedback) == "undefined"){
			window.feedback = "";
		}else if(email_2.length>0 && !emailValidation(email_2)){
			handleValidation('#email_2','Invalid email address');
		}else if(captcha.length == 0){
			handleValidation('','Please verify you are not a robot');
		}else{

			//confirm not a Robot
			var recaptcha_params = {

		       ipAddress :  window.ipAddress,
		       captcha : captcha
			}

			$.ajax({				
				type: "POST",
				url: "https://centum.co.ke/whistleblower/api/email/recaptcha",
				data: JSON.stringify(recaptcha_params),
				crossDomain: true,
				dataType: "json",
				
				success: function(data) {

					//CONFIRM with google recaptcha api if NO aliens on earth, YET.
					if(data == 'alien'){

						setTimeout(function() { handleValidation('','Cannot send data. Redirecting...')}, 5000);
						setTimeout(function(){ window.location.href = 'http://centum.co.ke'; }, 5500);	

					}else{
						
						//get data and invoke send email here
						var params = { 

					       firstname1 :  firstname1,
					       lastname1 :  lastname1,
					       work1 :  work1,
					       role1 :  role1,
					       phone1 :  phone1,

					       firstname2 :  firstname2,
					       lastname2 :  lastname2,
					       work2 :  work2,
					       role2 :  role2,
					       phone2 :  phone2,

					       firstname3 :  firstname3,
					       lastname3 :  lastname3,
					       work3 :  work3,
					       role3 :  role3,
					       phone3 :  phone3,

					       malpractice: window.malpractice,
					       malpractice_location :  malpractice_location,
					       malpractice_desc :  malpractice_desc,
					       malpractice_attach :  malpractice_attach,
					       malpractice_ongoing :  window.malpractice_ongoing,

					       firstname_2 :  firstname_2,
					       lastname_2 :  lastname_2,
					       work_2 :  work_2,
					       role_2 :  role_2,
					       email_2 : email_2,
					       phone_2 :  phone_2,
					       feedback : window.feedback

						};

						$.ajax({				
							type: "POST",
							url: "https://centum.co.ke/whistleblower/api/email/send-email",
							data: JSON.stringify(params),
							crossDomain: true,
							dataType: "json",
							
							success: function(data) {

								if(data == "ok"){
									setTimeout($('#loading').hide(), 1000);
								 	window.location.href = 'https://centum.co.ke/whistleblower/success.php';	
								}else{
									setTimeout(handleValidation('','Could not send data, Please try again later'), 3000);
									location.reload();
								}				 				  					
							},
							beforeSend: function(){
								
													
							}
						})
					}//close else for recaptcha ajax function
									 				  					
				},
				beforeSend: function(){

					$('#loading').show();
					$('.wb-submit').hide();
										
				}
			})
		}//end else	
	});	
	

});
