    $(document).ready(function(){  
        $('form').on('submit', function(e){
            e.preventDefault();
            let title= $('#title').val();
            let venue= $('#venue').val();
            let date= $('#date').val();

            // console.log(title);
            // console.log(venue);
            // console.log(date);

            $.ajax({
                url:"http://localhost:3000/event", success: function(result){
                    $("#div").html(result);
                    console.log(result);
                },

                method: "POST",
                data: {
                    title, 
                    venue,
                    date
                }
            })
        })
     });