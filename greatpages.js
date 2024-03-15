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

var inputs = document.querySelectorAll('input[name$="-telefone"]');

function updateOriginalFields(newvalue){
  inputs.forEach(function (elemento) {
    elemento.value=newvalue;
    var eventoInput = new Event('input', {
      bubbles: true,
      cancelable: true
    });
    elemento.focus();
    elemento.dispatchEvent(eventoInput);
    elemento.blur();
  });
}


for (i = 0; i < inputs.length; ++i) {
  var paiDoInput = inputs[i].parentElement;
  var elementosDoPai = paiDoInput.childNodes;

  elementosDoPai.forEach(function (elemento) {
    elemento.style.opacity = 0;
    elemento.style.height = 0;
  });
  criaFoneField(inputs[i]);
}

criaModalFone();

var closeElements;
var phvCountryButton;
var listCountryes;

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

var listaDeArquivos = [
  arquivoestilo,
  "https://code.iconify.design/3/3.1.0/iconify.min.js",
  "https://cdn.jsdelivr.net/npm/libphonenumber-js/bundle/libphonenumber-js.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js",
];

var comando = function () {
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

function delayedInit() {
  phvCountryButton.forEach(function (elemento) {
    elemento.addEventListener("click", function () {
      CountryModalShow();
    });
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

  var phoneFieldWithCountries = document.querySelectorAll(
    ".phoneFieldWithCountry"
  );

  phoneFieldWithCountries.forEach(function (input) {
    input.addEventListener("input", function () {
      newformatPhoneNumber(this);
    });
  });

};

carregarScripts(listaDeArquivos, comando);

function CountryModalShow() {
  phvCountryButton.forEach(function (button) {
    button.classList.toggle("active");
  });
  $(phonemodal).show(500);
  coutrysearch.focus();
  countrylistModalSt = true;
}

function CountryModalHide() {
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

function couytryesSearch() {
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

async function getSupportedCountries() {
  try {
    const response = await fetch(apiUrl);
    countries = await response.json();
    generateList();
  } catch (error) {
    return [];
  }
}

function generateList() {
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
                  <span class="country-name">${country.code} | ${country.name}</span>
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

function selectedOption(code, ddi) {
  var phvContainer = document.querySelectorAll(
    ".phvContainer"
  );
  for (container of phvContainer) {
    var iconEl = container.querySelector(".phvCicon");
    var codeEl = container.querySelector("strong");
    var ddiEl = container.querySelector(".phvCddi");
    iconEl.dataset.icon = "flag:" + code.toLowerCase() + "-4x3";
    codeEl.innerHTML = code;
    ddiEl.innerHTML = ddi;
  }
}

function selectOption() {
  var country_ddi = this.querySelector(".country-ddi").innerText,
    country_code = this.querySelector(".country-code").innerText;
  selectedOption(country_code, country_ddi);
  CountryModalHide();
}

function cleanInput(){
  var phonefield = document.querySelectorAll(".phvCpnum input");
  for (startInput of phonefield) {
    startInput.value="";
  }
}

function newformatPhoneNumber(element) {
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
    }
  }
}
