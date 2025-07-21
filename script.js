let timers = {
  Arrays: 0,
  Lists: 0,
  Trees: 0,
};

let startTime = 0;

function startTimer(section) {
  startTime = Date.now();
  timers.currentSection = section;
}

function endTimer() {
  const endTime = Date.now();
  const timeSpent = Math.floor((endTime - startTime) / 1000); // in seconds
  if (timers.currentSection) {
    timers[timers.currentSection] = timeSpent;
  }
}

function submitForm(sectionId) {
  endTimer(); // stop the current timer before submitting

  const formData = {
    section: sectionId,
    first: document.querySelector("#first")?.value || "",
    second: document.querySelector("#second")?.value || "",
    stretch: document.querySelector("#stretch")?.value || "",
    frontToBack: document.querySelector("#frontToBack")?.value || "",
    compress: document.querySelector("#compress")?.value || "",
    hasPath1: document.querySelector("#path1")?.value || "",
    hasPath2: document.querySelector("#path2")?.value || "",
    hasPath3: document.querySelector("#path3")?.value || "",
    hasPath4: document.querySelector("#path4")?.value || "",
    timeArrays: timers.Arrays || "",
    timeLists: timers.Lists || "",
    timeTrees: timers.Trees || "",
  };

  fetch("https://script.google.com/macros/s/AKfycbyAv9Agy6BB79hnbgoOUALikAkjWIMjas-AYrowYmGki42hg7r0a9kZZJUocXMV1qc7PQ/exec", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    }
  }).then(res => {
    alert("Submitted successfully!");
  }).catch(err => {
    alert("Failed to submit. Please try again.");
    console.error(err);
  });
}
