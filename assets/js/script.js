function createFocusEffect(element){
    $(`#${element}`).focus(function(){
        $(`#${element}-container`).addClass('bg-grey'); 
    });
    $(`#${element}`).focusout(function(){
        $(`#${element}-container`).removeClass('bg-grey'); 
    }); 
}
createFocusEffect('description'); 
createFocusEffect('category'); 
createFocusEffect('due-date');

$('#delete-btn').on('click', function(){
    var query = [];
    $('.pending-todo:checked').each(function(){
        query.push($(this).val()); 
        console.log($(this).val()); 
    });  
    window.location.pathname = "/delete-todo/" + query; 

});