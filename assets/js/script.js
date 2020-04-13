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