const datepicker = require('js-datepicker')
const start = datepicker('#travel-date', {
    id: 1,
    onSelect: (instance, date) => {
        let currentDate = Date.now();
        var one_day=1000*60*60*24;
        var dateDiff = Math.ceil((date-currentDate)/one_day);
        console.log(date)
        document.getElementById('travel-date').setAttribute("data-dateDiff",dateDiff);

        //Compute Travel days
        var travelDays = Math.ceil((start.getRange().end-start.getRange().start)/one_day);
        console.log(travelDays)

        if (typeof(date) != "undefined"){
            if (dateDiff<0) {
                document.getElementById('date').innerHTML="You are traveling on " + date.getMonth() + "-" + date.getDate() + "-" + date.getFullYear() + " which is " + dateDiff + " days from now. You are travelling for " + travelDays + " Days. " + "Unfortunately, you are traveling back in time which is not something we can help you with today. We recommend that you select a future travel date."    
            } else {
                document.getElementById('date').innerHTML="You are traveling on " + date.getMonth() + "-" + date.getDate() + "-" + date.getFullYear() + " which is " + dateDiff + " days from now. You are travelling for " + travelDays + " Days. "
            }
        }
    }
  })

const end = datepicker('#travel-date-end', {
    id: 1,
    onSelect: (instance, date) => {
        let currentDate = Date.now();
        var one_day=1000*60*60*24;
        var dateDiff = Math.ceil((date-currentDate)/one_day);
        console.log(date)
        document.getElementById('travel-date').setAttribute("data-dateDiff",dateDiff);

        //Compute Travel days
        var travelDays = Math.ceil((start.getRange().end-start.getRange().start)/one_day);
        console.log(travelDays)
        
        if (typeof(date) != "undefined"){
            if (dateDiff<0) {
                document.getElementById('date').innerHTML="You are traveling on " + date.getMonth() + "-" + date.getDate() + "-" + date.getFullYear() + " which is " + dateDiff + " days from now. You are travelling for " + travelDays + " Days. " + "Unfortunately, you are traveling back in time which is not something we can help you with today. We recommend that you select a future travel date."    
            } else {
                document.getElementById('date').innerHTML="You are traveling on " + date.getMonth() + "-" + date.getDate() + "-" + date.getFullYear() + " which is " + dateDiff + " days from now. You are travelling for " + travelDays + " Days. "
            }
        }
        
    } })

//Current date
//console.log(document.getElementById('travel-date').getAttribute("data-dateDiff"));
