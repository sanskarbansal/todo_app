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
    }); 
    if(query.length > 0 ){
        window.location.pathname = "/user/delete-todo/" + query; 
    }
});
$('.todo').on('click', function(){
    var toggle = $(this).children('.pending-todo').prop('checked'); 
    if(toggle){
        $(this).children('.pending-todo').prop('checked', false); 
    }else{
        $(this).children('.pending-todo').prop('checked', true); 
    }
}); 
$('#add-task-form').on('submit', function(e){
    var desc = $('#description').val(); 
    var date = $('#due-date').val(); 
    if(desc.trim() =="" || date.trim() == ""){
        alert("Please dont put description or date empty!"); 
        e.preventDefault(); 
    }

});