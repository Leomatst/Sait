const users = {
  "Leonardo": "01121723",
  "Silvia": "Silvia123"
};

let betoneiras = [];

function gerarBetoneiras() {
  for (let i = 1; i <= 97; i++) {
    const id = "BT" + String(i).padStart(2, '0');
    const nome = `${id} - BETONEIRA 400L`;
    betoneiras.push({ id, nome, status: "disponível" });
  }
}

function salvarBetoneiras() {
  localStorage.setItem("betoneirasData", JSON.stringify(betoneiras));
}

function carregarBetoneiras() {
  const data = localStorage.getItem("betoneirasData");
  if (data) {
    betoneiras = JSON.parse(data);
  } else {
    gerarBetoneiras();
    salvarBetoneiras();
  }
}

function login() {
  const user = document.getElementById("userSelect").value;
  const pass = document.getElementById("password").value;
  const errorBox = document.getElementById("loginError");

  if (users[user] === pass) {
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("mainContent").classList.remove("hidden");
    carregarBetoneiras();
    renderTabela();
    errorBox.textContent = "";
  } else {
    errorBox.textContent = "Senha incorreta!";
  }
}

function logout() {
  location.reload();
}

function renderTabela() {
  const tbody = document.querySelector("#betoneiraTable tbody");
  tbody.innerHTML = "";

  betoneiras.forEach((b, i) => {
    const tr = document.createElement("tr");

    const tdId = document.createElement("td");
    tdId.textContent = b.nome;

    const tdStatus = document.createElement("td");
    tdStatus.textContent = b.status;
    tdStatus.className = "status-" + b.status;

    const tdAcao = document.createElement("td");
    const select = document.createElement("select");
    ["disponível", "alugada", "manutenção", "sucata"].forEach(status => {
      const option = document.createElement("option");
      option.value = status;
      option.textContent = status;
      if (status === b.status) option.selected = true;
      select.appendChild(option);
    });

    select.onchange = () => {
      betoneiras[i].status = select.value;
      salvarBetoneiras();
      renderTabela();
    };

    tdAcao.appendChild(select);

    tr.appendChild(tdId);
    tr.appendChild(tdStatus);
    tr.appendChild(tdAcao);
    tbody.appendChild(tr);
  });
}
