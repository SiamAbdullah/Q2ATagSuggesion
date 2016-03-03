var qa_tags_max = 5;
var qa_tag_template = '<li onmouseover="mouseMoveOnSuggestion(this)"><a href="#" onclick="return qa_suggession_tag_click(this);">^</a></li>';

var previousText='';
var qa_tag_hints = qa_custom_tag_hints;
var tagSuggestionId = '#tag_hints';

$.fn.textWidth = function(text, font) {
    if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);
    $.fn.textWidth.fakeEl.text(text || this.val() || this.text()).css('font', font || this.css('font'));
    return $.fn.textWidth.fakeEl.width();
};

function qa_custom_tag_hints(skipcomplete)
{
     var elem=document.getElementById('tags');
    if(elem.value === previousText) return;

    previousText = elem.value;
    var html='';
    var completed=false;
   // qa_tag_template='^';

    // first try to auto-complete
    if (!skipcomplete) {
        var parts=qa_tag_typed_parts(elem);

        if (parts.typed) {
            html=qa_tags_to_html((qa_html_unescape(qa_tags_complete)).split(','), parts.typed.toLowerCase());
            completed=html ? true : false;
        }
    }

    if(!completed){
        $(tagSuggestionId).css("display", "none");
        $(tagSuggestionId).html('');
    }else{
        if($(tagSuggestionId).css("display") === "none"){
           var widthPercentUnit = 100/ $(".qa-part-form").width();
           var left = 3 + Math.ceil($.fn.textWidth($('#tags').val(), $('#tags').css('font-size') + ' Arial') * widthPercentUnit);
           $(tagSuggestionId).css("left", left + "%");
        }

        $(tagSuggestionId).css("display", "block");
        html = '<ul class="tag-suggestion" >' + html + '</ul>';
        $(tagSuggestionId).html(html);
        $('.tag-suggestion li').eq(0).addClass('selected');
    }
}

function qa_suggession_tag_click(link)
{
    var elem=document.getElementById('tags');
    var parts=qa_tag_typed_parts(elem);

    // removes any HTML tags and ampersand
    var tag=qa_html_unescape(link.innerHTML.replace(/<[^>]*>/g, ''));

    var separator=qa_tag_onlycomma ? ', ' : ' ';

    // replace if matches typed, otherwise append
    var newvalue=(parts.typed && (tag.toLowerCase().indexOf(parts.typed.toLowerCase())>=0))
        ? (parts.before+separator+tag+separator+parts.after+separator) : (elem.value+separator+tag+separator);

    // sanitize and set value
    if (qa_tag_onlycomma)
        elem.value=newvalue.replace(/[\s,]*,[\s,]*/g, ', ').replace(/^[\s,]+/g, '');
    else
        elem.value=newvalue.replace(/[\s,]+/g, ' ').replace(/^[\s,]+/g, '');

    //elem.focus();

    hideSuggestionBox();
    return false;
}

function overwriteUpDownKeyForTag(){
    $('#tags').bind('keyup', function(e){
        var liSelected = $('.tag-suggestion li.selected');
        var li = $('.tag-suggestion li');
        if(e.which === 40){
            $('.tag-suggestion').focus();
            if(liSelected && liSelected.length > 0){
                liSelected.removeClass('selected');
                var next = li.index(liSelected[0]) + 1;
                if(next < li.length){
                    liSelected = li.eq(next).addClass('selected');
                }else{
                    liSelected = li.eq(0).addClass('selected');
                }
            }else{
                liSelected = li.eq(0).addClass('selected');
            }
        }else if(e.which === 38){
            if(liSelected){
                liSelected.removeClass('selected');
                next = liSelected.prev();
                if(next.length > 0){
                    liSelected = next.addClass('selected');
                }else{
                    liSelected = li.last().addClass('selected');
                }
            }else{
                liSelected = li.last().addClass('selected');
            }
       }else if(e.which === 27 ){
           hideSuggestionBox();
       }
       else if(e.which === 13){
           var tagLink = $('.tag-suggestion li.selected a');
           if(tagLink){
               qa_suggession_tag_click(tagLink[0]);
               hideSuggestionBox();
           }

       }
    });

     $('#tags').bind('keydown', function(e){
         if(e.which === 13){
           e.preventDefault();
       }
     });
}

$('#tags').ready( function(){
  overwriteUpDownKeyForTag();
});

function hideSuggestionBox(){
     $(tagSuggestionId).css("display", "none");
     $(tagSuggestionId).html('');
}

function mouseMoveOnSuggestion(e){
     var liSelected = $('.tag-suggestion li.selected');
     var li = $('.tag-suggestion li');
     var next = li.index(e) ;
     if(next > -1){
          liSelected.removeClass('selected');
          liSelected = li.eq(next).addClass('selected');
     }
}

