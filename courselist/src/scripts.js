const name_sufix = "cursos";
var selectedList = {};
var allowed = 5; /*Número permitido para o preenchimento se igual a required, a seleção terá um número específico de itens*/
var required = 5; /*Número necessário para preenchimento 0 para preenchido ou não*/
var treating = false;
var messageEnd = "Selecione 5 cursos";
var butonText = messageEnd;
var targetFields = document.querySelectorAll(`[name*="${name_sufix}"]`);

generateCourseSelector();

// Loop sobre todos os elementos de input selecionados
for (i = 0; i < targetFields.length; ++i) {
  // Oculta os elementos HTML relacionados aos campos de input originais
  var paiDoInput = targetFields[i].parentElement;
  var elementosDoPai = paiDoInput.childNodes;
  elementosDoPai.forEach(function (elemento) {
    try {
      elemento.style.opacity = 0;
      elemento.style.height = 0;
    } catch {
      /*console.log(elemento);*/
    }
  });
  criaBotaoCurso(targetFields[i]);
}

function criaBotaoCurso(target) {
  console.log("Vou criar um botão");
  var paiDoInput = target.parentElement;
  var courseButton = document.createElement("div");
  courseButton.classList.add("botaocurso", "botaocurso-exclamation");
  courseButton.addEventListener("click", selCourseOpenAct);
  courseButton.innerHTML = `
    <div class="iconBcurso mustSelect">
        <i class="fa-solid fa-2x fa-circle-exclamation" style=""></i>
    </div>
    <div class="textBcurso">${butonText}</div>`;
  paiDoInput.appendChild(courseButton);
}

function generateCourseSelector() {
  var modalCourses = `<div id="courseSelectModal">
        <div class="courseSelectCtn">
            <div class="courseSelectArea">
                <div class="courseSelectHead">
                    <div class="clboxClose" onclick="selCourseCloseAct()" title="Fechar">X</div>
                    <div><h2>Cursos</h2></div>
                    <div>{{message}}</div>
                </div>
                <div class="selectListArea">
                    <div id="selectTarget" class="courseSelect"></div>
                </div>
                <div class="selectListOk"><div class="selectListOkBtn">Ok</div></div>
            </div>
            <div class="courseSelectBg" onclick="selCourseCloseAct()"></div>
        </div>
    </div>`;
  document.body.insertAdjacentHTML("afterbegin", modalCourses);
  messtarget = document.querySelector(".courseSelectHead");

  if (required > 1 || allowed > 1) {
    subtxt = "opções";
  } else {
    subtxt = "opção";
  }
  if (required == allowed) {
    messageEnd = "Escolha " + required + " " + subtxt;   
  } else {
    messageEnd = "Escolha de " + required + " a " + allowed + " " + subtxt;
  }
  tempmessage = messtarget.innerHTML.replace("{{message}}", messageEnd);
  messtarget.innerHTML = tempmessage;

  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://posfg.com.br/wp-json/wp/v2/posts?categories=81&fields=title&per_page=100",
    true
  );
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 400) {
      // Parseando a resposta JSON
      var posts = JSON.parse(xhr.responseText);
      // Criando uma lista para armazenar os títulos dos posts
      var titulosDosPosts = [];
      // Iterando sobre os posts e armazenando os títulos na lista
      posts.forEach(function (post) {
        titulosDosPosts.push(post.title.rendered);
      });
      // Exibindo os títulos na lista
      generateSelectList(
        titulosDosPosts,
        document.getElementById("selectTarget")
      );
      /*targetField.addEventListener("click", selCourseOpenAct);*/
    } else {
      console.error("Erro ao fazer a requisição: " + xhr.status);
    }
  };
  xhr.send();
}

function selCourseCloseAct() {
  courseSelectModal.style.display = "none";
  document.querySelector("body").style.overflowY = "scroll";
}
function selCourseOpenAct() {
  courseSelTarget = this.parentElement.querySelector("textarea");
  courseSelButton = this.parentElement.querySelector(".iconBcurso");
  courseSelectModal.style.display = "block";
  document.querySelector("body").style.overflowY = "hidden";
}

function generateSelectList(thelist, theTarget) {
  var itemmodel = `<div class="myselectItem">
        <div class="mysName">{{nome}}</div>
        <div class="mysToggle">
            <label class="selectSwitch">
                <input class="monitorswitch" type="checkbox" value="{{valor}}">
                <span class="selectSlider selectRound"></span>
            </label>
        </div>
    </div>`;

  console.log(theTarget.innerHTML);
  thelist.forEach(function (item) {
    if (item != "") {
      itemparts = item.split("|");
      if (itemparts.length > 1) {
        tempitem = itemmodel.replace("{{nome}}", itemparts[1]);
      } else {
        tempitem = itemmodel.replace("{{nome}}", itemparts[0]);
      }
      tempitem = tempitem.replace("{{valor}}", itemparts[0]);
      theTarget.innerHTML += tempitem;
    }
  });

  var elementos = document.querySelectorAll(".monitorswitch");
  // Iterar sobre cada elemento e adicionar um evento de clique
  elementos.forEach(function (elemento) {
    elemento.addEventListener("change", function () {
      result = listSelector(elemento);
      botaoAddress = elemento.parentNode
        .closest(".courseSelectCtn")
        .querySelector(".selectListOkBtn");
      if (result != false) {
        botaoAddress.classList.add("selectListOkBtnBlue");
        botaoAddress.addEventListener("click", selCourseCloseAct);
        console.log(elemento.parentNode);
        elemento.parentNode
          .closest("#selectTarget")
          .classList.add("selectFilled");
        okCourses(
          "Cursos selecionados:\r\n\r\n" + result,
          "exclamation",
          "check"
        );
        for (var i = 0; i < targetFields.length; i++) {
          targetFields[i].value = result;
        }
      } else {
        botaoAddress.classList.remove("selectListOkBtnBlue");
        botaoAddress.removeEventListener("click", selCourseCloseAct);
        elemento.parentNode
          .closest("#selectTarget")
          .classList.remove("selectFilled");
        okCourses("", "check", "exclamation");
      }
    });
  });
}
function okCourses(courses, classr, classa) {
  courseSelTarget.value = courses;
  courseSelButton.parentElement.classList.add("botaocurso-" + classa);
  courseSelButton.parentElement.classList.remove("botaocurso-" + classr);
  courseSelButton.querySelector("i").classList.remove("fa-circle-" + classr);
  courseSelButton.querySelector("i").classList.add("fa-circle-" + classa);
}

function listDeSelector(element) {
  element.querySelector("input");
}

function listSelector(element) {
  var value = element.value;
  var status = element.checked;
  var numeroItens = Object.keys(selectedList).length;
  if (status) {
    if (allowed >= numeroItens + 1) {
      selectedList[value] = true;
    } else {
      element.checked = false;
    }
    if (numeroItens + 1 >= required) {
      return Object.keys(selectedList).sort().join("\r\n");
    }
  } else {
    delete selectedList[value];
  }
  return false;
}
