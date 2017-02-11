$( document ).ready(function(){

  if (localStorage.getItem("user") === null) {
    $('#myModal').modal({
      backdrop: 'static',
      keyboard: false
    });
  } 
 

  var socket = io();
  var toggle = true;
  var user=localStorage.getItem("user");
  $("#chatUser").text( user );
  var searchBoxText= "Type here...";
  var fixIntv;
  var fixedBoxsize = $('#fixed').outerHeight()+'px';
  var Parent = $("#fixed"); // cache parent div
  var Header = $(".fixedHeader"); // cache header div
  var Chatbox = $(".userinput"); // cache header div
  Parent.css('height', '30px');
  $("#getName").click(function(){
    localStorage.setItem("user",$("#name").val());
    user = localStorage.getItem("user");
    $("#chatUser").text( user );
});

  Header.click(function(){           
      toggle = (!toggle) ? true : false;
      if(toggle)
      {
          Parent.animate({'height' : fixedBoxsize}, 300);                    
      }
      else
      {
          Parent.animate({'height' : '30px'}, 300); 
      }
      
  });

  Chatbox.focus(function(){
      $(this).val(($(this).val()==searchBoxText)? '' : $(this).val());
  }).blur(function(){
      $(this).val(($(this).val()=='')? searchBoxText : $(this).val());
  }).keyup(function(e){
      var code = (e.keyCode ? e.keyCode : e.which);       
      if(code==13 && $(this).val().trim().length>0){
          socket.emit("chat message from client", { user: user , msg : $(this).val() } );

          $('.fixedContent').append("<div class='userwrap'><span class='user'>"+user+"</span><span class='messages'>"+$(this).val()+"</span><div class='userwrap'></div>");
          event.preventDefault();
       
          $(".fixedContent").scrollTop( $(".fixedContent").prop("scrollHeight") );
          $(this).val('');
      }
      
  });


  socket.on("chat message from server",function(data){
    $('.fixedContent').append("<div class='userwrap'><span class='user'>"+data["user"]+"</span><span class='messages'>"+data["msg"]+"</span></div>");
  });

}); // doc ready function end
