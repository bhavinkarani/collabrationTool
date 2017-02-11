$( document ).ready(function(){

  if (localStorage.getItem("user") === null) {
    $('#myModal').modal({
      backdrop: 'static',
      keyboard: false
    });
  } 
 

  var socket = io();
  var toggle = false;
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
       
          $(".fixedContent").scrollTop( $(".fixedContent").prop("scrollHeight") );  // chat scroll to bottom
          $(this).val('');
      }
      
  });


  socket.on("chat message from server",function(data){
    $('.fixedContent').append("<div class='userwrap'><span class='user'>"+data["user"]+"</span><span class='messages'>"+data["msg"]+"</span></div>");
  });



  var myCanvas = document.getElementById("myCanvas");
  var curColor = $('#selectColor option:selected').val();
  if(myCanvas){
                  var isDown      = false;
                  var ctx = myCanvas.getContext("2d");
                  var canvasX, canvasY;
                  ctx.lineWidth = 3;
                   
                  $(myCanvas)
                  .mousedown(function(e){
                                  isDown = true;
                                  ctx.beginPath();
                                  canvasX = e.pageX - myCanvas.offsetLeft;
                                  canvasY = e.pageY - myCanvas.offsetTop;
                                  ctx.moveTo(canvasX, canvasY);
                  })
                  .mousemove(function(e){
                                  if(isDown != false) {
                                          canvasX = e.pageX - myCanvas.offsetLeft;
                                          canvasY = e.pageY - myCanvas.offsetTop;
                                          ctx.lineTo(canvasX, canvasY);
                                          ctx.strokeStyle = curColor;
                                          ctx.stroke();
                                  }
                  })
                  .mouseup(function(e){
                                  isDown = false;
                                  ctx.closePath();
                                  console.log("mouse is up");
                  });
  }
   
  $('#selectColor').change(function () {
                  curColor = $('#selectColor option:selected').val();
  });
            


}); // doc ready function end
