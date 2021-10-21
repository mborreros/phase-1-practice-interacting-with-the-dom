const $timer = document.querySelector("#counter"),
  $minusIcon = document.querySelector("#minus"),
  $plusIcon = document.querySelector("#plus"),
  $heartIcon = document.querySelector("#heart"),
  $pauseIcon = document.querySelector("#pause"),
  $inputBox = document.querySelector("#comment-input"),
  $form = document.querySelector("#comment-form");

let timer;

function pauseCounting() {
  clearInterval(timer);
  timer = null;
}

function startCounting() {
  if (!timer) {
    timer = setInterval(() => { $timer.innerText++ }, 1000);
  }
}

function startStop() {
  if ($pauseIcon.getAttribute("data-isrunning") == "1") {
    $pauseIcon.setAttribute("data-isrunning", 0);
    $pauseIcon.innerText = "resume";
    $minusIcon.disabled = true;
    $plusIcon.disabled = true;
    $heartIcon.disabled = true;
    pauseCounting();
  }
  else {
    $pauseIcon.setAttribute("data-isrunning", 1);
    $pauseIcon.innerText = "pause";
    $minusIcon.disabled = false;
    $plusIcon.disabled = false;
    $heartIcon.disabled = false;
    startCounting();
  }
}

function liker() {
  const timerVal = $timer.innerText;
  const existing = document.querySelector('li[data-num="' + timerVal + '"]');

  if (!existing) {
    const likeLog = document.createElement("li");
    const likeLogContainer = document.querySelector(".likes");
    likeLog.innerHTML = timerVal + " has been liked <span>1</span> time";
    likeLog.setAttribute('data-num', timerVal);
    likeLogContainer.appendChild(likeLog);
  }
  else {
    const timesClicked = existing.children[0].innerText;
    const newTime = parseInt(timesClicked) + 1;
    existing.innerHTML = timerVal + " has been liked <span>" + newTime + "</span> times";
  }
}

function addComment(e) {
  e.preventDefault();
  const commentLog = document.createElement("p");
  const commentLogContainer = document.querySelector("#list");
  const comment = $inputBox.value;
  commentLog.innerHTML = comment;
  commentLogContainer.appendChild(commentLog);
  $inputBox.value = "";
};

$heartIcon.addEventListener("click", liker);
$minusIcon.addEventListener("click", () => { $timer.innerText-- });
$plusIcon.addEventListener("click", () => { $timer.innerText++ });
$pauseIcon.addEventListener("click", startStop);
$form.addEventListener("submit", addComment);

$pauseIcon.setAttribute("data-isrunning", 1)
startCounting();
