$(function() {

  //文字が１文字以上の時に発火するHTML
  function addUser(user) {
    let html = `
                <div class="ChatMember clearfix">
                  <p class="ChatMember__name">${user.name}</p>
                  <div class="ChatMember__add ChatMember__button" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>
                `;
    // チャットメンバーの下に検索結果が表示されるのでセレクタはUserSearchResult
    $("#UserSearchResult").append(html);
  }

  // 文字が0文字の時に発火するHTML
  function addNoUser() {
    let html =  `
                 <div class="ChatMember clearfix">
                  <p class="ChatMember__name">ユーザーが見つかりません</p>
                </div>
                `;
    // チャットメンバーの下に検索結果が表示されるのでセレクタはUserSearchResult
    $("#UserSearchResult").append(html);
  }



  //addMembeの定義
  function addMember(name, id) {
    let html = `
                <div class="ChatMember">
                  <p class="ChatMember__name">${name}</p>
                  <input name="group[user_ids][]" type="hidden" value="${id}" />
                  <div class="ChatMember__remove ChatMember__button">削除</div>
                </div>
                `;
    $(".ChatMembers").append(html);
  } 



  //１文字打つたびに内容が表示される
  //チャットメンバーに入力した内容を取得
  $("#UserSearch__field").on("keyup", function() {
    let input = $("#UserSearch__field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })


    .done(function(users) {
      $("#UserSearchResult").empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          addUser(user);
        });
      } else if (input.length == 0) {
        return false;
      } else {
        addNoUser();
      }
    })


    .fail(function() {
      alert("通信エラーです。ユーザーが表示できません。");
    });
  });

  
  //追加ボタンの対象ユーザー情報をuserNameに代入
  //メンバーを追加に入力した内容をattrの内容を取得して変数に代入
  $("#UserSearchResult").on("click", ".ChatMember__add", function() {
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this).parent().remove();
    addMember(userName, userId);
  });

  //チャットメンバーに追加したメンバーを削除
  $(".ChatMembers").on("click", ".ChatMember__remove", function() {
    $(this).parent().remove();
  });
});