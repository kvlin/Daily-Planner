var clearBut = $("#clearAll");

var hours = [
      "9 AM", "10 AM", "11AM", "12 PM", "1 PM", "2 PM",
    "3 PM", "4 PM", "5 PM"
  ]; 

  var past = [];
  var future = [];
  var currentHour = moment().format("h A").toString()
  var present = [currentHour]
let i =0;
$('#currentDay').text(moment().format('DD/MM/YYYY, h:mm a').toString())

// Make 3 arrays for past, present and future hours
if (hours.includes(currentHour) == false) {
  future = hours.slice(0,hours.length)
} else {
  while (hours[i] !== currentHour) {
    past.push(hours[i])
    i++
  }
  console.log(past)

  let u = hours.length-1;
  while (hours[u] !== currentHour) {
    future.push(hours[u])
    u--
  }
  future = future.reverse()
  
}
console.log(future)



// Initialise localStorage
for (i = 0; i < hours.length ; i++){
  if (localStorage.getItem(i) == "") {
    localStorage.setItem(i, "")
  }
}

// Function to make time blocks
function makeBlocks (time) {   

  $.each(time, function(index,y)  {
  var row = $("<div class = 'row'></div>");
    $("#timeblocks").append(row)
    var hour = $("<div class = 'col-2 hour'></div>");
    hour.text(y);
    row.append(hour)

    // for (i = 0; i < time.length ; i++){
      var input = $("<input class = 'col-8' ></input>")
      input.attr("value", localStorage.getItem(index))
      // Assign colours based on hours
      if (past.includes(y)) {
        input.attr("class", "col-8 past")
      } else if (y == currentHour) {
        input.attr("class", "col-8 present")
      } else if (future.includes(y)) {
        input.attr("class", "col-8 future")
      } 
    // }
   
    row.append(input)
    // Save button
    var save = $("<div class = 'col-2 saveBtn'>y</div")
    save.text("Save");
    row.append(save)
  })
}
makeBlocks(hours)
// Function to save user input upon "Save" button click
allSaveBtn = document.querySelectorAll(".saveBtn")
$.each(allSaveBtn, function (saveBtnIndex,saveBtn) {
  saveBtn.addEventListener('click', function() {
    var message = document.querySelectorAll('.col-8')[saveBtnIndex].value
    localStorage.setItem(saveBtnIndex, message)
  })
})

clearBut.click(function () {
  for (i = 0; i < hours.length ; i++){
    document.querySelectorAll('.col-8')[i].value = ""
  }
  window.localStorage.clear()
} )