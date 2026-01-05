const rankEl = document.getElementById("rank");
const arcEl = document.getElementById("arc");
const obligationEl = document.getElementById("obligation");
const systemMessage = document.getElementById("systemMessage");

let state = JSON.parse(localStorage.getItem("SYSTEM_STATE")) || {
  rank: "E",
  arc: null,
  obligation: null
};

function save() {
  localStorage.setItem("SYSTEM_STATE", JSON.stringify(state));
}

function showMessage(text) {
  systemMessage.textContent = text;
  systemMessage.classList.remove("hidden");
  setTimeout(() => {
    systemMessage.classList.add("hidden");
  }, 3000);
}

function refreshUI() {
  rankEl.textContent = state.rank;
  arcEl.textContent = state.arc ?? "None";
  obligationEl.textContent = state.obligation ?? "—";
}

document.getElementById("declareArc").onclick = () => {
  if (state.arc) {
    showMessage("You already chose an arc. No escape.");
    return;
  }
  state.arc = prompt("Enter Subject Name:");
  state.obligation = "1 Focus Session";
  save();
  refreshUI();
  showMessage("Arc accepted. Failure will be remembered.");
};

document.getElementById("startFocus").onclick = () => {
  if (!state.arc) {
    showMessage("No arc. No progress.");
    return;
  }
  showMessage("Focus started. Do not leave.");
  setTimeout(() => {
    state.obligation = null;
    save();
    refreshUI();
    showMessage("Focus complete. Continue.");
  }, 1500); // placeholder (later real timer)
};

refreshUI();
