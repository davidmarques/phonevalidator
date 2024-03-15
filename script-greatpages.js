// URL da API para obter códigos de países
const apiUrl =
  "https://davidmarques.github.io/phonevalidator/paises-codes.json";
// URL do arquivo de estilo CSS
const arquivoestilo =
  "https://davidmarques.github.io/phonevalidator/style-greatpages.css";

// Array com os URLs dos scripts externos a serem carregados
var listaDeArquivos = [
  arquivoestilo,
  "https://code.iconify.design/3/3.1.0/iconify.min.js",
  "https://cdn.jsdelivr.net/npm/libphonenumber-js/bundle/libphonenumber-js.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js",
];
// Variável para armazenar opções (será inicializada posteriormente)
var options = null;
// Variável para controlar o estado do modal de seleção de país
var countrylistModalSt = false;
// Variável para armazenar o código de idioma do navegador do usuário
var languageCode = navigator.language || navigator.userLanguage;
// Array para armazenar as partes do código de idioma
var languageCodeParts = languageCode.split("-");

// Array para armazenar os países disponíveis
var countries = [];

// Declaração de variáveis para os elementos HTML relacionados ao modal de seleção de país
var closeElements;
var phvCountryButton;
var listCountryes;




// Seleciona todos os elementos de input com nome terminado em "-telefone"
var inputs = document.querySelectorAll('input[name$="-telefone"]');
// Loop sobre todos os elementos de input selecionados
for (i = 0; i < inputs.length; ++i) {
  // Oculta os elementos HTML relacionados aos campos de input originais
  var paiDoInput = inputs[i].parentElement;
  var elementosDoPai = paiDoInput.childNodes;
  elementosDoPai.forEach(function (elemento) {
    elemento.style.opacity = 0;
    elemento.style.height = 0;
  });
  // Cria um novo campo de número de telefone em substituição aos campos originais
  criaFoneField(inputs[i]);
}


// Cria o modal de seleção de país
criaModalFone();

// Comando a ser executado após o carregamento dos scripts
var comando = function () {
  // Adiciona listeners de eventos após a inicialização dos scripts
  document
    .getElementById("coutrysearch")
    .addEventListener("input", function () {
      couytryesSearch();
    });
  closeElements = document.querySelectorAll(".closeAct");
  phvCountryButton = document.querySelectorAll(".phvCbot");
  listCountryes = document.querySelector("#countryList");
  setTimeout(getSupportedCountries, 100);
  setTimeout(delayedInit, 200);
};

// Carrega os scripts externos necessários
carregarScripts(listaDeArquivos, comando);


// Função para criar o modal de seleção de país
function criaModalFone() {
  // Criação dos elementos HTML necessários para o modal
  var countrySelectOl = document.createElement("ol");
  countrySelectOl.id = "countrySelect";
  var countryListContDiv = document.createElement("div");
  countryListContDiv.classList.add("countryListCont");
  countryListContDiv.id = "countryList";
  var clboxListDiv = document.createElement("div");
  clboxListDiv.classList.add("clboxList");
  var clboxAreaDiv = document.createElement("div");
  clboxAreaDiv.classList.add("clboxArea");
  var clboxHeadFDiv = document.createElement("div");
  clboxHeadFDiv.classList.add("clboxHeadF");
  var countrySearchInput = document.createElement("input");
  countrySearchInput.type = "text";
  countrySearchInput.id = "coutrysearch";
  var clboxHeadMDiv = document.createElement("div");
  clboxHeadMDiv.classList.add("clboxHeadM");
  clboxHeadMDiv.textContent = "Selecione o país";
  var clboxCloseDiv = document.createElement("div");
  clboxCloseDiv.classList.add("clboxClose", "closeAct");
  clboxCloseDiv.title = "Fechar";
  clboxCloseDiv.textContent = "X";
  var clboxAreaDiv = document.createElement("div");
  clboxAreaDiv.classList.add("clboxArea");
  var clboxBgDiv = document.createElement("div");
  clboxBgDiv.classList.add("clboxBg", "closeAct");
  var modalDiv = document.createElement("div");
  modalDiv.id = "phonemodal";
  var clboxContDiv = document.createElement("div");
  clboxContDiv.id = "clboxCont";
  var clboxHeadDiv = document.createElement("div");
  clboxHeadDiv.classList.add("clboxHead");
  clboxAreaDiv.appendChild(clboxHeadDiv);
  countryListContDiv.appendChild(countrySelectOl);
  clboxListDiv.appendChild(countryListContDiv);
  clboxAreaDiv.appendChild(clboxCloseDiv);
  clboxAreaDiv.appendChild(clboxListDiv);
  clboxHeadDiv.appendChild(clboxHeadMDiv);
  clboxHeadFDiv.appendChild(countrySearchInput);
  clboxHeadDiv.appendChild(clboxHeadFDiv);
  clboxContDiv.appendChild(clboxAreaDiv);
  clboxContDiv.appendChild(clboxBgDiv);
  modalDiv.appendChild(clboxContDiv);
  document.body.appendChild(modalDiv);
}

// Função para criar o campo de número de telefone
function criaFoneField(target) {
  // Criação dos elementos HTML necessários para o campo de número de telefone
  var finaltarget = target.parentNode;
  var divAsingle = document.createElement("div");
  divAsingle.classList.add("countryPhoneArea");
  var divPhvContainer = document.createElement("div");
  divPhvContainer.classList.add("phvContainer");
  var divPhvCbot = document.createElement("div");
  divPhvCbot.classList.add("phvCbot");
  var divInner = document.createElement("div");
  var spanIconify = document.createElement("span");
  spanIconify.classList.add("iconify", "phvCicon");
  spanIconify.setAttribute("data-icon", "flag:br-4x3");
  var strongBR = document.createElement("strong");
  strongBR.textContent = "BR";
  var divPhvCddi = document.createElement("div");
  divPhvCddi.classList.add("phvCddi");
  divPhvCddi.textContent = "+55";
  var divPhvCpnum = document.createElement("div");
  divPhvCpnum.classList.add("phvCpnum");
  var inputPhone = document.createElement("input");
  inputPhone.type = "tel";
  inputPhone.classList.add("phoneFieldWithCountry");
  divInner.appendChild(spanIconify);
  divInner.appendChild(strongBR);
  divPhvCbot.appendChild(divInner);
  divPhvContainer.appendChild(divPhvCbot);
  divPhvContainer.appendChild(divPhvCddi);
  divPhvContainer.appendChild(divPhvCpnum);
  divPhvCpnum.appendChild(inputPhone);
  divAsingle.appendChild(divPhvContainer);
  finaltarget.appendChild(divAsingle);
}

// Função para atualizar os campos de entrada originais com um novo valor
function updateOriginalFields(newvalue) {
  inputs.forEach(function (elemento) {
    // Atualizando o valor do elemento
    elemento.value = newvalue;
    // Criando um evento de input
    var eventoInput = new Event("input", {
      bubbles: true,
      cancelable: true,
    });
    elemento.focus();
    elemento.dispatchEvent(eventoInput);
    elemento.blur();
  });
}

// Função para carregar scripts externos
function carregarScripts(arquivos, comandoAExecutar) {
  // Função interna para verificar o carregamento de cada script
  var scriptsCarregados = 0;
  function scriptCarregado() {
    scriptsCarregados++;
    if (scriptsCarregados === arquivos.length) {
      comandoAExecutar();
    }
  }
  arquivos.forEach(function (arquivo) {
    var regexJS = /\.js$/;
    var regexCSS = /\.css$/;
    if (regexJS.test(arquivo)) {
      var scriptElement = document.createElement("script");
      scriptElement.src = arquivo;
    }
    if (regexCSS.test(arquivo)) {
      var scriptElement = document.createElement("link");
      scriptElement.rel = "stylesheet";
      scriptElement.href = arquivo;
    }
    scriptElement.onload = scriptCarregado;
    document.body.appendChild(scriptElement);
  });
}

// Função para inicializar as funcionalidades após um atraso
function delayedInit() {
  // Adiciona eventos aos botões de seleção de país
  phvCountryButton.forEach(function (elemento) {
    elemento.addEventListener("click", function () {
      CountryModalShow();
    });
  });

  // Adiciona evento de tecla para fechar o modal ao pressionar Esc
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && countrylistModalSt) {
      CountryModalHide();
    }
  });

  // Adiciona eventos de clique para fechar o modal
  closeElements.forEach(function (element) {
    element.addEventListener("click", function () {
      CountryModalHide();
    });
  });

  // Adiciona eventos de entrada para os campos de telefone
  var phoneFieldWithCountries = document.querySelectorAll(
    ".phoneFieldWithCountry"
  );

  phoneFieldWithCountries.forEach(function (input) {
    input.addEventListener("input", function () {
      newformatPhoneNumber(this);
    });
  });
}


// Função para exibir o modal de seleção de país
function CountryModalShow() {
  // Exibe o modal e adiciona classes para animação
  phvCountryButton.forEach(function (button) {
    button.classList.toggle("active");
  });
  $(phonemodal).show(500);
  coutrysearch.focus();
  countrylistModalSt = true;
}

// Função para esconder o modal de seleção de país
function CountryModalHide() {
  // Esconde o modal e realiza a limpeza de campos e atualizações necessárias
  phvCountryButton.forEach(function (button) {
    button.classList.toggle("active");
  });
  updateOriginalFields("");
  cleanInput();
  $(phonemodal).hide(500, function () {
    coutrysearch.value = "";
    couytryesSearch();
  });
  countrylistModalSt = false;
}

// Função para filtrar países com base no texto de busca
function couytryesSearch() {
  // Filtra países com base no texto de busca inserido pelo usuário
  var inputText = coutrysearch.value.toUpperCase();
  var options = document.querySelectorAll(".option");
  options.forEach(function (option) {
    var countryName = option
      .querySelector(".country-name")
      .textContent.toUpperCase();
    var countryContainer = option.querySelector(".Myoption");

    if (countryName.indexOf(inputText) > -1) {
      option.classList.remove("hided");
    } else {
      option.classList.add("hided");
    }
  });
}

// Função assíncrona para obter a lista de países suportados
async function getSupportedCountries() {
  // Faz uma requisição para obter a lista de países
  // Armazena a lista de países no array 'countries'
  // Chama a função 'generateList' para gerar a lista de países na interface
  try {
    const response = await fetch(apiUrl);
    countries = await response.json();
    generateList();
  } catch (error) {
    return [];
  }
}

// Função para gerar a lista de países na interface
function generateList() {
  // Loop sobre todos os países disponíveis
  // Gera a marcação HTML para cada país e adiciona à lista de países na interface
  // Adiciona listeners de eventos para cada opção de país na lista
  var counter = 0;
  for (country of countries) {
    if (languageCodeParts[1] == country.code) {
      selectedOption(country.code, "+" + country.ddi);
    }
    const option = `
        <li class="option">
            <div class="Myoption">
              <div>
                  <span class="iconify" data-icon="flag:${country.code.toLowerCase()}-4x3"></span>
                  <span class="country-name">${country.code} | ${
      country.name
    }</span>
                  <strong class="hided country-code">${country.code}</strong>
              </div>
              <strong class="country-ddi">+${country.ddi}</strong>
            </div>
        </li>`;
    listCountryes.querySelector("ol").insertAdjacentHTML("beforeend", option);
    options = document.querySelectorAll(".option");
    counter++;
  }
  options.forEach((option) => option.addEventListener("click", selectOption));
}

// Função para atualizar a aparência do país selecionado na interface
function selectedOption(code, ddi) {
  // Atualiza a aparência do país selecionado na interface
  var phvContainer = document.querySelectorAll(".phvContainer");
  for (container of phvContainer) {
    var iconEl = container.querySelector(".phvCicon");
    var codeEl = container.querySelector("strong");
    var ddiEl = container.querySelector(".phvCddi");
    iconEl.dataset.icon = "flag:" + code.toLowerCase() + "-4x3";
    codeEl.innerHTML = code;
    ddiEl.innerHTML = ddi;
  }
}

// Função para lidar com a seleção de um país na lista
function selectOption() {
  // Obtém o código do país e o DDI do país selecionado
  // Atualiza a aparência do país selecionado na interface
  // Esconde o modal de seleção de país
  var country_ddi = this.querySelector(".country-ddi").innerText,
    country_code = this.querySelector(".country-code").innerText;
  selectedOption(country_code, country_ddi);
  CountryModalHide();
}

// Função para limpar o campo de número de telefone
function cleanInput() {
  // Limpa o campo de número de telefone
  var phonefield = document.querySelectorAll(".phvCpnum input");
  for (startInput of phonefield) {
    startInput.value = "";
  }
}

// Função para formatar o número de telefone conforme o país selecionado
function newformatPhoneNumber(element) {
  // Obtém o valor do campo de número de telefone e o código do país selecionado
  // Formata o número de telefone de acordo com as regras do país selecionado
  // Atualiza os campos de input originais com o novo número formatado
  var phonecontainer = element.closest(".phvContainer");
  var phonefield = phonecontainer.querySelector(".phvCpnum input");
  var selectedCountryCode =
    phonecontainer.querySelector(".phvCbot strong").innerHTML;
  var phoneNumber = phonefield.value;
  var ddiValue = phonecontainer.querySelector(".phvCddi").innerHTML;

  var phoneNumberObj = libphonenumber.parsePhoneNumberFromString(
    ddiValue + " " + phoneNumber,
    selectedCountryCode
  );
  console.log(phoneNumberObj);
  console.log(phoneNumberObj.isPossible());
  console.log(phoneNumberObj.isValid());
  var formattedPhoneNumber = phoneNumberObj
    ? phoneNumberObj.formatInternational()
    : phoneNumber;
  updateOriginalFields("");
  if (phoneNumber.length > 2) {
    phoneparts = formattedPhoneNumber.split(" ");
    if (phoneparts.length > 1) {
      if (phoneparts.length > 2) {
        phonefield.value = phoneparts.slice(1).join(" ");
        updateOriginalFields(phoneparts.slice(1).join(" "));
      } else {
        updateOriginalFields("");
        phonefield.value = phoneparts.slice(1).join(" ");
      }
    } else {
      updateOriginalFields("");
    }
  }
  element.focus();
}
