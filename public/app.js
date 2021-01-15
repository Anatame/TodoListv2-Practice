$(document).ready(function () {

    $.getJSON('api/todos').then(addTodos)

    $('#todoInput').keypress(function (event) {

        if (event.which === 13) {
            createTodo();
        }

    })




    function addTodos(todos) {

        todos.forEach(function (todo) {
            addTodo(todo)

        })

    }

    function addTodo(todo) {

        var newTodo = $('<li>' + todo.name + ' <span> X </span></li>')
        newTodo.data('id', todo._id)
        newTodo.data('completed', todo.completed)


        if (todo.completed) {
            newTodo.addClass('done')
        }

        $(".list").append(newTodo)
    }

    function createTodo() {

        var input = $('#todoInput').val()

        $.post('/api/todos', {
                name: input
            })
            .then(function (newTodo) {

                addTodo(newTodo);
            })
    }




    function removeTodo(todo) {
        var clickedID = todo.data('id')

        $.ajax({
                method: 'DELETE',
                url: '/api/todos/' + clickedID
            }).then(function (data) {
                console.log(data);
                todo.remove()
            })
            .catch(function (err) {
                console.log(err)
            })
    }

    $(".list").on('click', 'li', function (event) {
        event.stopPropagation();

        updateTodo($(this));

    })



    $(".list").on("click", 'span', function () {
        console.log("click")
        removeTodo($(this).parent())

    })


    function updateTodo(todo) {

        var clickedID = todo.data('id')
        var isDone = !todo.data('completed')
        var updateData = {
            completed: isDone
        }

        $.ajax({
            method: 'PUT',
            url: '/api/todos/' + clickedID,
            data: updateData

        }).then(function (data) {
            todo.toggleClass('done')
            todo.data('completed', isDone)
        })
    }
})