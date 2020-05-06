function checkEmptyTasks() {
    if ($('ul>li').length < 1) {
        $('.empty-list').show();
    } else {
        $('.empty-list').hide();
    }
}

function addTaskItem(title, text) {
    var collapse = '<div class="collapse"></div>';

    if (text == '') {
        collapse = '';
    } else {
        text = '<p>' + text + '</p>';
    }

    $('ul').append(
        '<li class="task">' + 
            '<div class="task-head clearfix">' + 
                '<h3 class="title">' + title + '</h3>' + 
                '<div class="delete-task"></div>' +
                collapse +
            '</div>' +
            text +
        '</li>'
    );

    checkEmptyTasks();
}

$(function() {
    checkEmptyTasks();

    $('.add-task').on('click', function(event) {
        event.preventDefault();
        var taskTitle = $('.task-title').val(),
            taskText = $('.task-text').val();

        if (taskTitle != '') {
            addTaskItem(taskTitle, taskText);
            $('.task-title').val('');
            $('.task-text').val('');
        } else {
            alert('Название дела не может быть пустым');
        }    
    });

    $('ul').on('click', '.delete-task', function() {
        var task = $(this).parents().eq(1);
        $.when($(task).animate({
            height: 0,
            'margin-bottom': 0
        }, 400)).then(function() {
            $(task).remove();
            checkEmptyTasks();
        });
    });

    $('ul').on('click', '.collapse', function() {
        var taskText = $(this).parent().siblings('p');
        $(taskText).slideToggle();
        $(this).toggleClass('collapsed');
    });

    $('.show-popup').on('click', function() {
        $('.popup-container').show();
        $('html, body').css({
            'position': 'fixed',
            'overflow': 'hidden'
        });
    });

    $('.popup').on('click', function() {
        $('.popup-container').hide();
        $('html, body').css({
            'position': 'unset',
            'overflow': 'unset'
        });
    });
});