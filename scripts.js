const apiUrl =
  "https://davidmarques.github.io/phonevalidator/paises-codes.json";
const arquivoestilo = "https://davidmarques.github.io/phonevalidator/style.css";
var options = null;

var countrylistModalSt = false;
var languageCode = navigator.language || navigator.userLanguage;
var languageCodeParts = languageCode.split("-");

var countries = [];
var options = null;

/* ------------------------------------------------- FUNCOES BOOTRSTRAP ------------------------------------------------- */
function criaModalFone() {
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

function carregarJS(url) {
  var script = document.createElement("script");
  script.src = url;
  document.head.appendChild(script);
}
function criaFoneField(target) {
  var finaltarget = target.parentNode;

  target.style.display = "none";

  var divAsingle = document.createElement("div");
  divAsingle.classList.add("asingleDiv");
  var divPhvContainer = document.createElement("div");
  divPhvContainer.id = "phvContainer";
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
  inputPhone.id = "thePhoneIsHere";
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

// Chamar a função para criar a estrutura do telefone

var inputs = document.querySelectorAll("input[type='tel'");

for (i = 0; i < inputs.length; ++i) {
  var paiDoInput = inputs[i].parentElement;
  var elementosDoPai = paiDoInput.childNodes;
  elementosDoPai.forEach(function (elemento) {
    elemento.style.display = "none";
  });

  //const tempnode = document.createElement("div");
  //const temptext = document.createTextNode("Meu texto");
  //tempnode.appendChild(temptext);
  criaFoneField(inputs[i]);
  //paiDoInput.appendChild(tempnode);
  console.log(inputs[i]);
}

// Exemplo de uso
criaModalFone();

var closeElements = document.querySelectorAll(".closeAct");
var phvCountryButton = document.querySelector(".phvCbot");
var listCountryes = document.querySelector("#countryList");

function carregarScripts(arquivos, comandoAExecutar) {
  var scriptsCarregados = 0;
  function scriptCarregado() {
    scriptsCarregados++;
    if (scriptsCarregados === arquivos.length) {
      comandoAExecutar();
    }
  }
  arquivos.forEach(function (arquivo) {
    var regexJS = /\.js$/;

    // Expressão regular para verificar se a URL termina com .css
    var regexCSS = /\.css$/;

    // Verifica se a URL corresponde ao padrão de um arquivo JavaScript
    if (regexJS.test(arquivo)) {
      console.log("O endereço " + arquivo + " é de um JS");
      var scriptElement = document.createElement("script");
      scriptElement.src = arquivo;
    }
    if (regexCSS.test(arquivo)) {
      console.log("O endereço " + arquivo + " é de um CSS");
      //var scriptElement = document.createElement('script');
      var scriptElement = document.createElement("link");
      scriptElement.rel = "stylesheet";
      scriptElement.href = arquivo;
    }
    scriptElement.onload = scriptCarregado;
    document.body.appendChild(scriptElement);
  });
}

var listaDeArquivos = [
  arquivoestilo,
  "https://code.iconify.design/3/3.1.0/iconify.min.js",
  "https://cdn.jsdelivr.net/npm/libphonenumber-js/bundle/libphonenumber-js.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js",
];

var comando = function () {
  //carregarJS("scripts.js");

  document
    .getElementById("coutrysearch")
    .addEventListener("input", function () {
      couytryesSearch();
    });

  getSupportedCountries();

  phvCountryButton.addEventListener("click", () => {
    CountryModalShow();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && countrylistModalSt) {
      CountryModalHide();
    }
  });

  closeElements.forEach(function (element) {
    element.addEventListener("click", function () {
      CountryModalHide();
    });
  });

  $("#thePhoneIsHere").on("input", formatPhoneNumber);
};

carregarScripts(listaDeArquivos, comando);
/* ------------------------------------------------- FUNCOES BOOTRSTRAP ------------------------------------------------- */

function CountryModalShow() {
  phvCountryButton.classList.toggle("active");
  $(phonemodal).show(500);
  coutrysearch.focus();
  countrylistModalSt = true;
}

function CountryModalHide() {
  phvCountryButton.classList.toggle("active");
  $(phonemodal).hide(500, function () {
    coutrysearch.value = "";
    couytryesSearch();
  });
  countrylistModalSt = false;
}

function couytryesSearch() {
  var inputText = coutrysearch.value.toUpperCase();
  var options = document.querySelectorAll(".option");
  console.log(inputText);

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

// Função para obter a lista de países suportados
async function getSupportedCountries() {
  try {
    const response = await fetch(apiUrl);
    countries = await response.json();
    generateList();
  } catch (error) {
    console.error("Error fetching supported countries:", error);
    return [];
  }
}

function generateList() {
  for (country of countries) {
    if (languageCodeParts[1] == country.code) {
      console.log("Este é o país!!!!!!!!!!!!");
      console.log(country.code + " - " + country.ddi);
      selectedOption(country.code, "+" + country.ddi);
    }
    const option = `
        <li class="option">
            <div class="Myoption">

            <div>
            <span class="iconify" data-icon="flag:${country.code.toLowerCase()}-4x3"></span>
            <span class="country-name">${country.code} | ${country.name}</span>
            <strong class="hided country-code">${country.code}</strong>
        </div>
        <strong class="country-ddi">+${country.ddi}</strong>


            </div>
        </li> `;

    listCountryes.querySelector("ol").insertAdjacentHTML("beforeend", option);
    //select_box.querySelector("ol").insertAdjacentHTML("beforeend", option);
    options = document.querySelectorAll(".option");
  }
  options.forEach((option) => option.addEventListener("click", selectOption));
  //search_box.addEventListener("input", searchCountry);
}

function selectedOption(code, ddi) {
  var iconEl = phvContainer.querySelector(".phvCicon");
  var codeEl = phvContainer.querySelector("strong");
  var ddiEl = phvContainer.querySelector(".phvCddi");
  iconEl.dataset.icon = "flag:" + code.toLowerCase() + "-4x3";
  codeEl.innerHTML = code;
  ddiEl.innerHTML = ddi;
}

function selectOption() {
  var country_ddi = this.querySelector(".country-ddi").innerText,
    country_code = this.querySelector(".country-code").innerText;
  selectedOption(country_code, country_ddi);
  CountryModalHide();
}

function formatPhoneNumber() {
  var phonefield = document.querySelector(".phvCpnum input");

  var selectedCountryCode = document.querySelector(".phvCbot strong").innerHTML;
  var phoneNumber = phonefield.value;
  var ddiValue = document.querySelector(".phvCddi").innerHTML;
  var phoneNumberObj = libphonenumber.parsePhoneNumberFromString(
    ddiValue + " " + phoneNumber,
    selectedCountryCode
  );
  var formattedPhoneNumber = phoneNumberObj
    ? phoneNumberObj.formatInternational()
    : phoneNumber;
  if (phoneNumber.length > 2) {
    phoneparts = formattedPhoneNumber.split(" ");
    if (phoneparts.length > 1) {
      if (phoneparts.length > 2) {
        phonefield.value = phoneparts.slice(1).join(" ");
      } else {
        phonefield.value = phoneparts.slice(1).join(" ");
      }
    } else {
      console.log("Nem posso validar ainda");
      console.log(phoneparts);
    }
    console.log(phoneNumberObj.isPossible());
    console.log(phoneNumberObj.isValid());
    console.log(
      libphonenumber.isPossiblePhoneNumber(
        ddiValue + " " + phoneNumber,
        selectedCountryCode
      )
    );
    console.log(phoneNumberObj);
  }
}