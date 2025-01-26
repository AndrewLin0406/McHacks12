const STATUS = [
    "Triage", "Registration", "The First Wait", "Initial Assessment", "Investigation", "Review", "Treatment", "End", "The Second Wait"
];

const statusFlow = {
    "Triage": ["Registration"],
    "Registration": ["The First Wait", "Initial Assessment"],
    "The First Wait": ["Initial Assessment"],
    "Initial Assessment": ["Investigation", "Treatment"],
    "Investigation": ["End", "The Second Wait"],
    "The Second Wait": ["Review"],
    "Review": ["End", "Treatment"],
    "Treatment": ["End"],
};

let currentStatus = "Triage";

function goToNextStatus(selectedOption = null) {
    let possibleNextStatuses = statusFlow[currentStatus];
    
    if (possibleNextStatuses.length === 1 || selectedOption) {
        currentStatus = selectedOption || possibleNextStatuses[0];
        updateStatusDisplay();
    } else {
        displayChoiceButtons(possibleNextStatuses);
        return;
    }

    if (currentStatus === "End") {
        document.getElementById("buttons-container").innerHTML = "";
        alert("Process completed. STATUS is now at End.");
    }
}

function updateStatusDisplay() {
    document.getElementById("current-status").textContent = currentStatus;
    document.getElementById("buttons-container").innerHTML = '<button class="btn" onclick="goToNextStatus()">Go to next STATUS</button>';
}

function displayChoiceButtons(choices) {
    let buttonsHTML = choices.map(choice => `<button class="btn" onclick="goToNextStatus('${choice}')">${choice}</button>`).join(' ');
    document.getElementById("buttons-container").innerHTML = buttonsHTML;
}

