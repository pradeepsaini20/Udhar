let data = JSON.parse(localStorage.getItem("udhar")) || [];

const list = document.getElementById("list");
const totalEl = document.getElementById("total");

function save() {
  localStorage.setItem("udhar", JSON.stringify(data));
}

function render() {
  list.innerHTML = "";

  if (data.length === 0) {
    list.innerHTML = `<p class="p-4 text-center text-gray-400">Abhi koi entry nahi hai 😅</p>`;
    totalEl.innerText = "₹0";
    return;
  }

  let total = 0;

  data.forEach((e, i) => {
    const div = document.createElement("div");
    div.className = "item flex justify-between";

    div.innerHTML = `
      <div>
        <b>${e.name}</b><br>
        ₹${e.amount}
      </div>
      <button onclick="del(${i})" class="text-red-500">Delete</button>
    `;

    list.appendChild(div);
    total += Number(e.amount);
  });

  totalEl.innerText = "₹" + total;
}

function del(i) {
  data.splice(i, 1);
  save();
  render();
}

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const f = e.target;

  data.push({
    name: f.name.value,
    amount: f.amount.value
  });

  save();
  render();

  alert("Entry added 👍");
  f.reset();
});

// default date
document.querySelector('input[name="date"]').value =
  new Date().toISOString().split('T')[0];

// quick add
function quickAdd(val) {
  document.querySelector('input[name="amount"]').value = val;
}

// calculator
let exp = "";
const display = document.getElementById("display");

document.querySelectorAll(".btn").forEach(b => {
  b.onclick = () => {
    exp += b.dataset.val || "";
    display.value = exp;
  };
});

document.getElementById("clear").onclick = () => {
  exp = "";
  display.value = "";
};

document.getElementById("equal").onclick = () => {
  try {
    exp = eval(exp).toString();
    display.value = exp;
  } catch {
    alert("Invalid");
  }
};

render();