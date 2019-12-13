$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
      margin: 10,
      loop: true,
      autoWidth: true,
      items: 3
    });
    loadData();
});

/*** Data Scripts ***/
function loadData(){
  $.ajax({
        type:"GET",
        url:"json/people.json",
        dataType:"json",
        success: parseData
      });
}

function parseData(data){

  var name = [];
  var company = [];
  var email = [];
  var gender = [];
  var favoriteSport = [];
  var about = [];
  var picture = [];
  var html = "";
  var html2 = "";
  var html3 = "";
  var maleCount = 0;
  var femaleCount = 0;
  var unknownCount = 0;
  var sportCount = 0;

  for (var i = 0, len = data.length; i < len; ++i) {
    name.push(data[i]["name"]);
    company.push(data[i]["company"]);
    email.push(data[i])["email"];
    gender.push(data[i]["gender"]);
    favoriteSport.push(data[i]["favoriteSport"]);
    about.push(data[i]["about"]);
    picture.push(data[i]["picture"]);

    html += '<h2 style="color:#4056a1;">' + data[i]["name"] + '</h2>';
    html += '<h5>' + data[i]["company"] + ' | ' + data[i]["email"] + '</h5>';
    html += '<h6> Favorite sport: ' + data[i]["favoriteSport"] + '</h6>';
    html += '<img src="' + data[i]["picture"] + '" class="display" style="float:left; width:100px; margin-right: 15px;">' + '<p class="display">' + data[i]["about"] + '</p>';
    html += '<h6> Gender: ' + data[i]["gender"] + '</h6><br>';

    if (data[i]["gender"] == "male") { //if the gender item is male, add 1 to the male count; else add 1 to the female count
      maleCount ++;
    }else{
      femaleCount ++;
    }

    if (data[i]["favoriteSport"] == "unknown") {
      unknownCount ++;
    }else{
      sportCount ++;
    }
  }
  html2 += '<h5 class="center">There are ' + femaleCount + ' females and ' + maleCount + ' males.</h5><br>';
  html3 += '<h5 class="center">There are ' + sportCount + ' people with a favorite sport and ' + unknownCount + ' without.</h5>';

  $("#one").html(html);
  $("#stat").html(html2);
  $("#sport").html(html3);

/* Did not close this function bracket until after chart script */

/*** Chart Scripts ***/
var chart = c3.generate({
  bindto: '#chart',
    data: {
        // iris data from R
        columns: [
            ['Female', femaleCount],
            ['Male', maleCount],
        ],
        type : 'pie',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    },
    color: {
      pattern: ['c5cbe3', '#4056a1']
    }
})

var donut = c3.generate({
  bindto: '#donut',
    data: {
        columns: [
            ['Soccer', 1],
            ['Basketball', 1],
            ['Baseball', 1],
            ['Football', 1],
            ['unknown', 2],
        ],
        type : 'donut',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    },
    donut: {
        title: "Favorite sports"
    },
    color: {
      pattern: ['c5cbe3', '#4056a1', '#d79922', '#f13c20', '#efe2ba']
    }
});
}
