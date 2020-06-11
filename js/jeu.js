let joueur=document.querySelector("h2 span");
let joueur1=document.querySelector("#symboleJ1 span");
let joueur2=document.querySelector("#symboleJ2 span");
joueur1.innerHTML=JSON.parse(sessionStorage.getItem("J1"));
joueur2.innerHTML=JSON.parse(sessionStorage.getItem("J2"));
joueur.innerHTML=JSON.parse(sessionStorage.getItem("J1"));

function survoler(){
    for(let i=1; i<=9; i++){
      let qs="a"+ i;
      let survol=document.getElementById(qs);
      survol.onmouseover=testCellule;
      survol.addEventListener("mouseout", function() {
      survol.setAttribute("style","");
      });
    }
  }

function testCellule(){
  let str=this.innerHTML;
  let test= str.indexOf("img");
  if(test == -1){
    if (joueur.innerHTML==joueur1.innerHTML)
      this.setAttribute("style","background-image:url('../images/cercle2.png');");
    else
      this.setAttribute("style","background-image:url('../images/croix2.png');");
  }
};


function choixCellule(){
  let i=1;
  while (i<=9){
    let qs="#a"+i;
    let coche=document.querySelector(qs);
    coche.onclick=selection;
    i++;
  };
}


function selection () {
  let img = document.createElement("img");
  if (joueur.innerHTML==joueur1.innerHTML){
    img.src = "../images/cercle1.png";
    this.appendChild(img);
    changerJoueur();
  }
  else{
    img.src = "../images/croix1.png";
    this.appendChild(img);
    changerJoueur();
  }
  morpion();
}

function changerJoueur(){
  if (joueur.innerHTML==joueur1.innerHTML){
    joueur.innerHTML=joueur2.innerHTML;
  }
  else{
    joueur.innerHTML=joueur1.innerHTML;
  }
  choixCellule();
}

function morpion(){
  testMorpion(1);
  testMorpion(4);
  testMorpion(3);
}


  function testMorpion(inc){
    let compteurJ1=0;
    let compteurJ2=0;
    for(let j=0; j<3;j++) {
      let qs="a"+(1+(j*inc));
      let str=document.getElementById(qs).innerHTML;
      testCercle= str.indexOf("cercle");
      testCroix= str.indexOf("croix");
      if(testCercle !== -1){
        compteurJ1=compteurJ1+1;
      }
      if(testCroix !== -1){
        compteurJ2=compteurJ2+1;
      }
      if (compteurJ1==3){
        alert("Joueur 1 a gagné");
      }
      if (compteurJ2==3){
        alert("Joueur 2 a gagné");
      }
    }
}
  /*let qs="a2";
  let str=getElementById(qs).innerHTML;
  let test= str.indexOf("cercle");
  if(test == -1){
    return false;
  }
  let qs="a4";
  let str=getElementById(qs).innerHTML;
  let test= str.indexOf("cercle");
  if(test == -1){
    return false;
  }
  let qs="a5";
  let str=getElementById(qs).innerHTML;
  let test= str.indexOf("cercle");
  if(test == -1){
    return false;
  }
}*/


window.addEventListener("load", function(){
  choixCellule();
  survoler();
});
