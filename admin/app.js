    $(document).ready(function(){  
        //$('form').on('submit', function(e){
            $('#submit').click(function(e){
            e.preventDefault();
            let cloth_name= $('#cloth_name').val();
            let size= 		$('#size').val();
            let quantity= 	$('#quantity').val();
            let color= 		$('#color').val();
            let price= 		$('#price').val();
            let description= $('#description').val();
            let image= $('#image').val();
            let img_path= "db/image";

            // console.log(title);
            // console.log(venue);
            // console.log(date);

            $.ajax({
                url:"http://localhost:3000/fashion_info", success: function(result){
                    $("#div").html(result);
                    console.log(result);
                },

                method: "POST",
                data: {
                    cloth_name, 
                    size,
                    quantity,
                    color,
                    price,
                    description,
                    img_path
                }
            })
        });




    function getData(){
     	$.ajax({
     		method:'GET',
             url: "http://localhost:3000/fashion_info",
             contentType: 'application/json',
            dataType:'json',
            responseType:'application/json',
            xhrFields: {
                withCredentials: false
            },
            
                // 'Access-Control-Allow-Origin': '*',
             
     		success: function(data){
     			let myData=`<thead>
                 <tr>
                   <th scope="col">Id</th>
                   <th scope="col">Cloth Name</th>
                   <th scope="col">Size</th>
                   <th scope="col">Quantity</th>
                   <th scope="col">Description</th>
                   <th scope="col">Color</th>
                   <th scope="col">Images</th>
                 </tr>
               </thead>`;
     			$.each(data, function(index, value){
     				myData +=`

     				<tr>
     					<td>${value.id}</td>
     					<td>${value.cloth_name}</td>
     					<td>${value.size}</td>
     					<td>${value.quantity}</td>
                         <td>${value.description}</td>
                         <td>${value.color}</td>
                         <td style="width:20px; height:20px;"><img src='${value.img_path}' alt='No Image to Display'></td>
                         <td><button class="btn btn-danger btn-sm delete" value="${value.id}">Delete</td>
                         <td><button class="btn btn-success btn-sm" >View</td>		
     				<tr>
     				`;
     			});
     			$('#myList').html(myData);
     		}
     	});
     }
     getData();



     // To delete the record//

     $('body').on('click','.delete', function(e){
   // $('#delete').click(function(e){
        e.preventDefault();
      // let id = $(this).attr('id')
      let id= $(this).val();
       //alert(id)
       $.ajax({
            "url": "http://localhost:3000/fashion_info/" + id,
            //"contentType": "Application/json",
            "method": "DELETE",
            data:{id},
            beforeSend: function(){
                alert("Deleted?")
            },
            success: function(data){
            alert("Record Deleted Successfully")
            },
            
            error: function(e){
                alert("", JSON.stringify(e));
            }
         })
     });
//=======================================================================//

// const getParam= new URLSearchParams(window.location.search);
// const id= getParam.get("id");
// $.getJSON(`http://localhost:3000/fashion_info?id=${id}`, function(response){
//      $.each(response, function(key, design){
//         $('#styleName').val(`$design.styleName`);
//         $('#description').val(`$design.description`);
//         $('#price').val(`$design.price`);
//         $('#quantitiy').val(`$design.quantity`);
//         $('#update').click(function(e){
//             e.preventDefault();
//             const styleName= $("#styleName").val()|| design.styleName;
//             const description= $("#description").val()|| design.description;
//             const price= $("#price").val()|| design.price;
//             const img_path= $("#image").val()|| design.img_path;
//             const stylistEmail=  design.stylistEmail;
//             $.ajax({
//                 method: "PUT",
//                 url: `http://localhost:3000/designs/${id}`;
//                 data: {
//                     styleName,
//                     description,
//                     price,
//                     img_path,
//                     stylistEmail,
//                 }, 
//                 success: function(response){
//                     $(".update-message").html(
//                         "<p class='text-success'>Design Updated Successfully</p>"
//                     );

//                     window.location.assign(`design.html?id=${id}`);
//                 }
//             })
            
//         })
         
//      })
// })

//Users Panel

//=======================================================//
  //This area is responsible for adding of users      
$('#sign_up').click(function(e){
    e.preventDefault();
    let email= $('#email').val();
    let password= $('#password').val();
    let c_password= $('#c_password').val();
    // console.log(title);
    // console.log(venue);
    // console.log(date);

    $.ajax({
        url:"http://localhost:3000/users", 
            success: function(result){
            $("#div").html(result);
           // console.log(result);
           if (password===c_password){
            window.location="./admin/index.html";
           }else{
               alert("Password not match");
           }
         
        },
        method: "POST",
        data: {
            email, 
            password
            
        }
    })
});
//======================================================//



//login function
$('#sign_in').click(function(e) {
    e.preventDefault();
    const email = $('#email').val();
    const password = $('#password').val();
    if (!email || !password) {
      //$('.errLogin').html('You have not input your login details');
      alert('It is empty');
      return;
    }
    //Check if the user is in the database
    $.ajax({
      method: 'GET',
      url: `http://localhost:3000/users?email=${email}&password=${password}`,
      data: {
        email: email,
        password: password,
      },
    //   beforeSend: function() {
    //     $('.loginSuccess').html('Loading....');
    //   },
      success: function(response) {
        if (response.length) {
          $('.loginSuccess').html('Login sucessful');
         // $('.checkLogin').html('You are logged in');
          localStorage.setItem('email', email);
          //redirect to home page if the login is successfull
          window.location.assign('admin/index.html');
        } else {
          $('.loginSuccess').html('Invalid Login Parameters');
        }
      },
    });
  });



  //console.log(window.localStorage.getItem('email'));

// This is the login form

// $("#sign-in").click(function(e){
//     e.preventDefault();

//     function getSign(email, password){
//         $.ajax({
//             url: `http://localhost:3000/users?email=${email}&password=${password}`,
//             success: function(result){
//                 console.log(result);
//                 if(!result[0]){
//                     alert("Invalid Username or Password");
//                     return toggleForm();
//                 }

//                 if(result[0]["isAdmin"]==true){
//                     window.location="./index.html";
//                 }else if(!result[0]["isAdmin"]){
//                     window.location= "../index.html";
//                 }
//             },
//             method: "GET",
//         });
//     }

//     let username= $("#username").val();
//     let password= $("#password").val();
//     let email=$("#email").val();

//     getSign(email, password);
// });

     //    $(document).ready(function(){  
     //    $.getJSON("http://localhost:3000/fashion_info", function(data){
     //    	var design_data= '';
     //    	$.each(data, function(key, value){
     //    		console.log(value);
     //    		design_data += '<tr>';
     //    		design_data += '<td>'+value.cloth_name+'</td>';
     //    		design_data += '<td>'+value.size+'</td>';
     //    		design_data += '<td>'+value.size+'</td>';
     //    		design_data	+= '</tr>';
     //    	});

     //    	$('#design_table').append(design_data);
     //    });
     // });
     
    //  $("#sign_up").click(function(){
    //     alert("Hello");
    //   });

//     function SignUp(body){
//         try{
//             $.ajax({
//                 url: `http:localhost:3000/users`,
//                 success: function(result){
//                     console.log("success");
//                     windows.location="./index.html"

//                     // if (body["isAdmin"]==true){
//                     //     window.location="./admin_dashboard.html"
//                     // }else{

//                     // }
//                 }, 
//                 method: "POST", 
//                 data: body,
//             });
//         } catch(e){
//             console.log(e);
//         }
//     }

//     let password= $("#password").val();
//     let email= $("#email").val();
//     let isAdmin= false;
//     let id= 4;

//     let body= {
//         email,
//         password,
//         isAdmin
//     }

//     SignUp(body);
 });
