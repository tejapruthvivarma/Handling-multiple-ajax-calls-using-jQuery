(function(){
    $(document).ready(function(){


        // function to call once all three Ajax calls have returned
        var finalize = function(){
            // gather the three values
            var result1 = Number($('#result-1').val()) || undefined,
                result2 = Number($('#result-2').val()) || undefined,
                result3 = Number($('#result-3').val()) || undefined;

            // if they have all returned results, then show the result as a success!
            if(result1 && result2 && result3){
                $('#sum-of-results')
                    .removeClass('well')
                    .addClass('alert alert-success')
                    .html('SUCCESS! (sum is ' + (result1 + result2 + result3) + ')');
            }
            else{
                $('#sum-of-results')
                    .removeClass('well')
                    .addClass('alert alert-danger')
                    .html("ERROR!");
            }
        };

        // Ajax 1
        $.ajax({
            url: 'server1.php'
        }).done(function(data){
            $('#result-1').val(data);
            events.publish('done', {id: 1});
        }).fail(function(jqXHR, statusText, errorThrown){
            $('#result-1').val('ERROR!');
        });

        // Ajax 2
        $.ajax({
            url: 'server2.php'
        }).done(function(data){
            $('#result-2').val(data);
            events.publish('done', {id: 2});
        }).fail(function(jqXHR, statusText, errorThrown){
            $('#result-2').val('ERROR!');
        });

        // Ajax 3
        $.ajax({
            url: 'server3.php'
        }).done(function(data){
            $('#result-3').val(data);
            events.publish('done', {id: 3});
        }).fail(function(jqXHR, statusText, errorThrown){
            $('#result-3').val('ERROR!');
        });

        // call finalize when ready
        var completed = [];
        var topic = events.subscribe('done', function(obj){
            console.log('COMPLETED ID ' + obj.id);
            completed.push(obj.id);
            if(completed.indexOf(1) > -1 && completed.indexOf(2) > -1 && completed.indexOf(3) > -1){
                finalize();
            }
        });
    });
})();
