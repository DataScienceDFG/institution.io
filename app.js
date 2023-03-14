d3.csv("QS_STANDARD.csv").then(function (data) {
  var institutions = data;
  var button = d3.select('#button');
  var form = d3.select("#form");
  button.on("click", runEnter);
  form.on("submit", runEnter);

  function runEnter() {
    d3.select("tbody").html("")
    event.preventDefault();

    var inputValue = d3.select("#user-input").property("value");
    var inputyear = d3.select("#user-years").property("value");
    var filteredInstitutions = institutions.filter(institution => institution.Institution.toLowerCase().includes(inputValue.toLowerCase()) && institution.Year == inputyear);
    var mylist = [];

    for (var i = 0; i < filteredInstitutions.length; i++) {

      var currentWorldRank = filteredInstitutions[i]['World Rank'];
      var rank = currentWorldRank;
      if (currentWorldRank.includes('-')) {
        rank = currentWorldRank.split('-')[0];
      }

      mylist.push(parseInt(rank));

      d3.select("tbody").insert("tr").html(
        "<td>" + (filteredInstitutions[i]['World Rank']) + "</a>" + "</td>" +
        "<td>" + (filteredInstitutions[i]['Institution']) + "</a>" + "</td>" +
        "<td>" + (filteredInstitutions[i]['Country']) + "</td>" +
        "<td>" + (filteredInstitutions[i]['Year']) + "</td>" +
        "<td>" + (filteredInstitutions[i]['Ranking']) + "</td>")
    }

    if (mylist.length === 0) {
      var minValue = "Rank not provided";
    } else {
      var minValue = Math.min(...mylist);
    }

    document.getElementById("user-rank").value = minValue;
    if (minValue >= 1 && minValue <= 200) {
      document.getElementById("user-category").value = 'I';
    }
    if (minValue >= 200 && minValue <= 400) {
      document.getElementById("user-category").value = 'II';
    }
    if (minValue >= 400 && minValue <= 600) {
      document.getElementById("user-category").value = 'III';
    }
    if (minValue >= 600 || minValue == 'Rank not provided') {
      document.getElementById("user-category").value = 'IV';
    }
  };
});
