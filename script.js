// simple AJAX API call

const request = new XMLHttpRequest();
const url='https://jsonplaceholder.typicode.com/posts';
request.open("GET",url);
request.send();

request.onreadystatechange=function(){
    if (this.readyState==4 && this.status==200){
        var obj=JSON.parse(request.responseText);
        parseData(obj);
        grid(obj);
        var date=createTimeStamp();
        console.log(date);

        var postRequest=new XMLHttpRequest();
        postRequest.open("POST",url,true);
        postRequest.setRequestHeader("Content-Type","application");
        postRequest.send(obj);
        postRequest.onreadystatechange = function() {
            if (this.readyState=4 && this.status==201)
                var newId=this.responseText;
        }
    }
}

function grid(jsonObj) {
    var header=document.getElementById("header");
    var tmpHeader="";
    var tmpData="";
    var first=new Boolean(true);
    Object.keys(jsonObj).forEach(function(key) {
        let inner=jsonObj[key];
        Object.keys(inner).forEach(function(key2) {
            if (first) {
                tmpHeader+=" "+key2;
                tmpData+=" "+inner[key2];
            }
            else {
                tmpData+=" "+inner[key2];
            }
        });
        addRecord(tmpHeader,tmpData,first);
        tmpData="";
        first=false;
   });
};

function addRecord(header,data,first) {
    var detail=document.getElementById("detail");
    if (first) {
        var head=document.createElement("div");
        head.innerHTML="<div style=''>"+header+"</div>";
        detail.appendChild(head);
    }

    var newdiv=document.createElement("div");
    newdiv.innerHTML="<div style=''>" + data+ "</div>";
    detail.appendChild(newdiv);
};

function parseData(jsonObj) {
    Object.keys(jsonObj).forEach(function(key) {
        let inner=jsonObj[key];
        Object.keys(inner).forEach(function(key2) {
            let data=inner[key2];
            if (typeof data==="string") {
                data=data.concat(" melissa");
            }
            else if (typeof data==="number") {
                if (data % 2==0)
                    data+=44;
                else
                    data=44;
            }
            else if (typeof data==="undefined") {
                data="UNDEFINED";
            }
        });
    });
};

function createTimeStamp() {
    var today = new Date(2019,2,10,9,30,0,0);
    return today;
};
