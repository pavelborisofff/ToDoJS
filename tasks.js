function checkEmptyTasks() {
    if ($('ul>li').length < 1) {
        $('.empty-list').show();
    } else {
        $('.empty-list').hide();
    }
}

function addTaskItem(title, text) {
    var collapse = '<span class="collapse down">&#x25BC;</span>';

    if (text == '') {
        collapse = '';
    } else {
        text = '<p>' + text + '</p>';
    }

    $('ul').append(
        '<li class="task">' +
            '<h3 class="title">' + title +
                '<span class="delete-task">&#10060;</span>' + collapse + 
            '</h3>' +
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
    
});
