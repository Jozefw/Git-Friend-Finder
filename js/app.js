$(document).ready(function() {
    var pageLayout = $('#data_output');

    $('.btn#userNameSubmit').on('click',
        function() {
            var gitUserName = $('#githubUserName').val(),
                url = 'https://api.github.com/users/';
            urlUserName = 'https://api.github.com/users/' + gitUserName,


            getUserName(urlUserName);

        });

    function appendToPage(response) {
        var handle = response.data.login;
        var followerCount = response.data.followers;
        var followers = response.data.followers_url;
        $.get(followers, function(data, status) {
            data.forEach(function(item, index) {
                var list = "<li class='hidden' >" + "<img src='" + item.avatar_url + "' alt=''/>";
                $('.hold').append(list);
            });

            function loadMore() {
                $(".hold .hidden").slice(0, 2).removeClass("hidden");
            }

            loadMore();
            $("#btnLoadMore").removeClass('hidden');
            $("#btnLoadMore").on("click", loadMore);
        });
        if (response.data.message === "Not Found") {
            pageLayout.html("<h1>No User Info !!!!</h1>");
        } else {
            pageLayout.html("<h1>Handle: " + handle + "<br>" + " Follower Count: " + followerCount + "</h1>" + "<br>");
        }
    }

    function getUserName(url) {
        $.ajax({
            url: url,
            dataType: "jsonp",
            success: function(returnData, status) {
                appendToPage(returnData);
            }
        });
    }


});