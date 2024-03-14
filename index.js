// Get value from the html elements
const floorNumber = document.getElementById("floors");
const liftNumber = document.getElementById("lift");
const simulate = document.querySelector(".Generate");
const outputSection = document.querySelector(".section-output");
const alertSection = document.querySelector(".alert-sections");
const inputSection=document.querySelector(".section-input")

// Event listener for the "Generate" button
simulate.addEventListener("click", function () {
  // Get the number of floors and lifts from input fields
    const numberOfLift=parseInt(liftNumber.value)
    const numberOfFloor=parseInt(floorNumber.value)

    // Input validation
 if(isNaN(numberOfFloor) || isNaN(numberOfLift)){
  // Display alert for invalid numbers
  alertSection.classList.add("section-alert");
  alertSection.innerHTML="Please Enter A Valid Number";
  setTimeout(()=>{
    alertSection.classList.remove("section-alert");
  },5000);
 }
 else if(numberOfFloor==1){
  // if there are only one floor
  inputSection.classList.add("hidden");
  alertSection.innerHTML="There is only one floor. No lifts are needed";
    addFloor(numberOfFloor);
 }


 else if (numberOfLift > 9 || numberOfLift < 1 ) {
  // Display alert if lift count is outside the allowed range
    alertSection.classList.add("section-alert");
    alertSection.innerHTML="Please Enter A Value Between 1 to 9";
    setTimeout(() => {
      alertSection.classList.remove("section-alert");
    }, 5000);

  } 
  
  else {
    // All good! Hide input and generate the simulation
    inputSection.classList.add("hidden");
    addFloor(numberOfFloor, numberOfLift);
  }
});

// adding Floor
function addFloor(numberOfFloor, liftNo) {
  outputSection.innerHTML = ""; // Clear previous floors

    // Loop backwards to create floors from top to bottom 
  for (let i = numberOfFloor; i > 0; i--) {
    outputSection.innerHTML =
      outputSection.innerHTML +
      `
    <div class="container">
    <div class="navigation">
      <div class="navigationButtons ${i}" id="up-only" data-floor = ${i}>Up</div>
      <div class="navigationButtons ${i}" id="Down-only" data-floor = ${i}>Down</div>
    </div>
    <div class="floor_number"> ${i}</div>
    <div class="floorDetails">
    <div class="Lift-Details">
    ${i == 1 ? addLift(liftNo) : ``}
    </div>
    <div id="floor-ground"></div>
    </div>
  </div>
    `;
  }
}

// Function to create elevator elements
function addLift(e) {
  let containerLift = document.createElement("div");
  containerLift.classList.add("lifts");

  let Lifts = "";
  for (let j = 0; j < e; j++) {
    Lifts += `<div class="lift" data-currentlocation = "0">
    <div id="lift-left" class="lift-door"></div>
    <div id="lift-right" class="lift-door"></div>
  </div>`;
  }

  containerLift.innerHTML = Lifts;
  return containerLift.innerHTML;
}

let x = 0;
// Event listener for "Up" and "Down" buttons
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("navigationButtons")) {
    if (e.target.dataset.floor == x) {
      return;
    } else {
      LiftStatus(e.target.classList.item(1));
    }
    x = e.target.dataset.floor;
  }
});
// Function to find an available elevator and start movement
function LiftStatus(ClickedFloor) {
  const selectedLift = Array.from(document.getElementsByClassName("lift"));

  let i;
  for (i = 0; i < selectedLift.length; i++) {
    if (!selectedLift[i].classList.contains("busy")) {
      MovingTheLift(ClickedFloor, selectedLift[i]);

      return;
    }
  }
}

// Function to animate the movement of the elevator
function MovingTheLift(ClickedFloor, LiftMove) {
  let currentlocations = LiftMove.dataset.currentlocation;
  let timming = Math.abs(ClickedFloor - currentlocations) * 2;
  let move = (ClickedFloor - 1) * -125;
  LiftMove.style.transition = `transform ${timming}s linear`;
  LiftMove.style.transform = "translateY(" + move + "px)";
  LiftMove.classList.add("busy");
  LiftMove.dataset.currentlocation = ClickedFloor;

  // Open the doors
  setTimeout(() => {
    LiftMove.children[0].classList.add("lift-left-open");
    LiftMove.children[1].classList.add("lift-right-open");
  }, timming * 1000 + 1000);
// Close the doors
  setTimeout(() => {
    LiftMove.children[0].classList.remove("lift-left-open");
    LiftMove.children[1].classList.remove("lift-right-open");
  }, timming * 1000 + 4000);
// Mark the lift as available after the full process is complete
  setTimeout(() => {
    LiftMove.classList.remove("busy");
  }, timming * 1000 + 7000);
}