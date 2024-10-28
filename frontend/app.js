function init() {
    loadEvents()
    // should reload the events every five seconds
    setInterval(loadEvents, 5000)
}

function loadEvents() {
    return fetch("/get-events")
        .then((response) => response.json()
        .then((response) => {
            let events = document.getElementById("events")
            if (response.length == 0) {
                return
            }
            events.innerHTML = ""
            response.forEach((event) => {
                let entry = document.createElement("div")
                entry.className = "entry row border p-3"

                let keyDiv = document.createElement("div")
                keyDiv.className = "key col-md-6 font-weight-bold"
                keyDiv.innerText = event.event

                let valDiv = document.createElement("div")
                valDiv.className = "value col-md-6"
                valDiv.innerText = event.description

                let timeDiv = document.createElement("div")
                timeDiv.className = "endtime p-1"
                timeDiv.innerText = event.endTime
                
                let locationDiv = document.createElement("div")
                locationDiv.className = "location p-1"
                locationDiv.innerText = event.location

                entry.appendChild(keyDiv)
                entry.appendChild(valDiv)
                entry.appendChild(timeDiv)
                entry.appendChild(locationDiv)
                
                events.appendChild(entry)
            })
        }))
}

function submitEvent() {
    let event = document.getElementById("event name").value
    let description = document.getElementById("event description").value
    let endTime = document.getElementById("end time").value
    let location = document.getElementById("location").value
    data = {
        event: event,
        description: description,
        endTime: endTime,
        location: location
    }
    if (validateSubmission(data)) {
        fetch("/modify-events", {
            method: "POST",
            body: JSON.stringify(data)
        }).then((response) => {
            loadEvents().then((x) => {
                document.getElementById("event name").value = ""
                document.getElementById("event description").value = ""
                document.getElementById("end time").value = ""
                document.getElementById("location").value = ""
            })  
        })
    } else {
        alert("Submission not formed correctly, please edit and resubmit!");
    }
}

function validateSubmission(data) {
    return (data.event.length != 0 && data.endTime.length != 0 && data.location.length != 0)
}
