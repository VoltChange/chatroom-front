import {becomeFriend, briefInfo, cancelFriend, changeIntroduction, friendList, strangerList} from "./api.js";

window.onload = function ()
{
    var userId = sessionStorage.getItem("userId")
    var toUserId
    var friends = []
    var strangers = []
    let pname = document.getElementById("p-name")
    let pintroduction = document.getElementById("p-introduction")
    let friendsul = document.getElementById("friends")
    let strangersul = document.getElementById("strangers")
    if(userId==null){
        window.location.href='login.html'
    }
    openSocket()
    briefInfo(userId).then(response=>{
        let user = response.data
        pname.innerText=user.name
        pintroduction.value = user.introduction
    })
    friendList(userId).then(response=>{
        friends = response.data
        refreshFSList()
    })
    strangerList(userId).then(response=>{
        strangers = response.data
        refreshFSList()
    })
    //个人信息
    let saveIntroductionBtn = document.getElementById("save-introduction")
    saveIntroductionBtn.addEventListener("click",()=>{
        changeIntroduction(sessionStorage.getItem("userId"),pintroduction.value).then(response=>{
            alert(response.data)
        })
    })
    //刷新好友陌生人列表
    function refreshFSList(){
        friendsul.innerHTML = ""
        strangersul.innerHTML = ""
        for(var user of friends){
            const li = document.createElement("li")
            const userNameP = document.createElement("p")
            const chatBtn = document.createElement("button")
            const removeBtn = document.createElement("button")

            chatBtn.innerHTML = "聊天"
            chatBtn.setAttribute("userId",user.id)
            chatBtn.setAttribute("userName",user.name)
            chatBtn.onclick = function () {
                //alert("聊天"+this.getAttribute("userId"))
                startChat(this.getAttribute("userId"),this.getAttribute("userName"))
            }
            removeBtn.innerHTML = "移除好友"
            removeBtn.setAttribute("userId",user.id)
            removeBtn.onclick = function () {
                //alert("移出好友"+this.getAttribute("userId"))
                cancelFriend(userId,this.getAttribute("userId")).then(response=>{
                    if(response.status ===200)
                        getAndRefreshList()
                })
            }
            userNameP.innerHTML = user.name

            li.append(userNameP)
            li.append(chatBtn)
            li.append(removeBtn)
            li.setAttribute("userId",user.id)
            friendsul.append(li)
        }
        for(var user of strangers){
            const li = document.createElement("li")
            const userNameP = document.createElement("p")
            const addBtn = document.createElement("button")

            addBtn.innerHTML = "添加好友"
            addBtn.setAttribute("userId",user.id)
            addBtn.onclick = function () {
                //alert("添加好友"+this.getAttribute("userId"))
                becomeFriend(userId,this.getAttribute("userId")).then(response=>{
                    if(response.status ===200)
                        getAndRefreshList()
                })
            }
            userNameP.innerHTML = user.name

            li.append(userNameP)
            li.append(addBtn)
            li.setAttribute("userId",user.id)
            strangersul.append(li)
        }
    }
    function getAndRefreshList(){
        friendList(userId).then(response=>{
            friends = response.data
            strangerList(userId).then(response=>{
                strangers = response.data
                refreshFSList()
            })
        })
    }

    //选择人开始聊天
    function startChat(friendId,friendName){
        let chatBoxTitle = document.getElementById("chatBox-title")
        chatBoxTitle.innerHTML = friendName
        toUserId = friendId
        //刷新聊天
        messages =[]
        refreshMessagesBox()
    }

    //聊天部分
    var socket;
    function openSocket() {
        if(typeof(WebSocket) == "undefined") {
            console.log("您的浏览器不支持WebSocket");
        }else{
            console.log("您的浏览器支持WebSocket");
            //实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
            //等同于socket = new WebSocket("ws://localhost:8888/xxxx/im/25");
            //var socketUrl="${request.contextPath}/im/"+$("#userId").val();
            var socketUrl="http://localhost:8080/imserver/"+userId;
            socketUrl=socketUrl.replace("https","ws").replace("http","ws");
            console.log(socketUrl);
            if(socket!=null){
                socket.close();
                socket=null;
            }
            socket = new WebSocket(socketUrl);
            //打开事件
            socket.onopen = function() {
                console.log("websocket已打开");
                //socket.send("这是来自客户端的消息" + location.href + new Date());
            };
            //获得消息事件
            socket.onmessage = function(msg) {
                let message = JSON.parse(msg.data)
                console.log(message);
                //发现消息进入    开始处理前端触发逻辑
                console.log(message.fromUserId);
                if(msg.data.fromUserId===toUserId){
                    addReceivedMessageInBox(msg.data.contentText)
                }
            };
            //关闭事件
            socket.onclose = function() {
                console.log("websocket已关闭");
            };
            //发生了错误事件
            socket.onerror = function() {
                console.log("websocket发生了错误");
            }
        }
    }
    function sendMessage() {
        if(typeof(WebSocket) == "undefined") {
            console.log("您的浏览器不支持WebSocket");
        }else {
            console.log("您的浏览器支持WebSocket");
            const textarea = document.getElementById("textarea")
            console.log('{"toUserId":"'+toUserId+'","contentText":"'+textarea.value+'"}');
            socket.send('{"toUserId":"'+toUserId+'","contentText":"'+textarea.value+'"}');
            addSentMessageInBox(textarea.value)
        }
    }
    const sendBtn = document.getElementById("sendBtn")
    sendBtn.onclick= function () {
        if(toUserId==null)
            alert("请先选择聊天对象")
        else{
            sendMessage()
        }
    }

    var messages =[
    ]
    const messagesBox = document.getElementById("messagesBox")
    function refreshMessagesBox() {
        messagesBox.innerHTML =""
        for (var message of messages){
            console.log(message)
            if(message.type=='sent')
            {
                addSentMessageInBox(message.context)
            }else{
                addReceivedMessageInBox(message.context)
            }
        }
    }

    function addSentMessageInBox(message){
        const m = document.createElement("div")
        m.setAttribute("class","message-sent")
        m.innerHTML = message
        messagesBox.append(m)
    }
    function addReceivedMessageInBox(message){
        const m = document.createElement("div")
        m.setAttribute("class","message-received")
        m.innerHTML = message
        messagesBox.append(m)
    }
};

