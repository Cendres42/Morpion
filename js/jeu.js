let joueur=document.querySelector("h2 span");
let joueur1=document.querySelector("#symboleJ1 span");
let joueur2=document.querySelector("#symboleJ2 span");


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
  let str=this.innerHTML;
  let test= str.indexOf("img");
  if(test == -1){
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
  testMorpion(1,1);
  testMorpion(1,4);
  testMorpion(1,3);
  testMorpion(2,3);
  testMorpion(3,3);
  testMorpion(4,1);
  testMorpion(5,1);
  testMorpion(3,2);
  testJeufini();
}


  function testMorpion(deb,inc){
    let compteurJ1=0;
    let compteurJ2=0;
    for(let j=0; j<3;j++) {
      let qs="a"+(deb+(j*inc));
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
        sessionStorage.setItem("vainqueur",JSON.stringify(joueur1.innerHTML));
        finDuJeu();

      }
      if (compteurJ2==3){
        sessionStorage.setItem("vainqueur",JSON.stringify(joueur2.innerHTML));
        finDuJeu();
      }
    }
}

function testJeufini(){
  let compteur=0;
  for(let j=1; j<=9;j++) {
    let qs="a"+j;
    let str=document.getElementById(qs).innerHTML;
    test= str.indexOf("img");
    if(test !== -1){
      compteur+=1;
    }
  }
  if((compteur==9)&&(compteurJ1!==3)&&(compteurJ2!==3)){
    sessionStorage.setItem("vainqueur",JSON.stringify("personne n'"));
    finDuJeu();
  }
}

function finDuJeu(){
  document.location.href="resultats.html";
}

function enregistrement(){
let boutonEnregistrement=document.getElementById("boutonEnregistrer");
boutonEnregistrement.addEventListener("click",function(){
  let listeParties=JSON.parse(sessionStorage.getItem("listeParties"));
  if(listeParties==null){
    listeParties=[];
  }
  let adresse=window.location.search;
  let test= adresse.indexOf("partie");
  let nomPartie;
  if(test==1){
    nomPartie=(adresse.replace('?partie=', ''));
  }
  else{
    while(nomPartie==null){
      alert("Vous devez choisir un nom pour enregistrer votre partie");
      nomPartie=prompt("Choisissez un nom pour enregistrer votre partie");
      let test2 = listeParties.indexOf(nomPartie);
      if(test2!==-1){
        alert("Choisissez un autre nom de partie, celui-ci est déjà pris!!");
        nomPartie=null;
        }
      else{
        listeParties.push(nomPartie);
        sessionStorage.setItem("listeParties",JSON.stringify(listeParties));
        }
      }
    }
    enregistrer(nomPartie);
  });
  }



function enregistrer(nomPartie){
  let objetPartie={};
  let partieEnCours=[];
  for (let i=1;i<=9;i++){
    let qs="a"+i;
    partieEnCours.push(document.getElementById(qs).innerHTML)
    }
    //clef grille de l'objet partie avec valeur des cases
   objetPartie.grille=partieEnCours;
   objetPartie.joueur1=joueur1.innerHTML;
   objetPartie.joueur2=joueur2.innerHTML;
   sessionStorage.setItem(nomPartie,JSON.stringify(objetPartie));
   document.location.href="accueil.html";
}

function initialiserPartie(){
let adresse=window.location.search;
let test= adresse.indexOf("partie");
if(test==1){
  let nomPartie=(adresse.replace('?partie=', ''));
  let partieAfficher=JSON.parse(sessionStorage.getItem(nomPartie));
  if(partieAfficher==null){
    document.location.href="accueil.html";
  }
  let compteurJ1=0;
  let compteurJ2=0;
  for (let j=1; j<=9; j++){
    let qs="a"+j;
    let nouvelleCase=document.getElementById(qs);
    nouvelleCase.innerHTML=partieAfficher.grille[j-1];
    console.log(nouvelleCase.innerHTML);
    let testJoueur=nouvelleCase.innerHTML;
    let testCercle=testJoueur.indexOf("cercle");
    let testCroix=testJoueur.indexOf("croix");
    if(testCercle!==-1){
        compteurJ1=compteurJ1+1;
      }
    else if(testCroix!==-1){
      compteurJ2=compteurJ2+1;
      }
    console.log(compteurJ1);
    console.log(compteurJ2);
    joueur1.innerHTML=partieAfficher.joueur1;
    joueur2.innerHTML=partieAfficher.joueur2;
    if (compteurJ1>compteurJ2){
      joueur.innerHTML=partieAfficher.joueur2;
      }
    else {
      joueur.innerHTML=partieAfficher.joueur1;
      }
    }
  }
  else{
    let nb1=Math.floor(Math.random() * 2);
    console.log(nb1);
    joueur1.innerHTML=JSON.parse(sessionStorage.getItem("J1"));
    joueur2.innerHTML=JSON.parse(sessionStorage.getItem("J2"));
    if (nb1==1){
      joueur.innerHTML=JSON.parse(sessionStorage.getItem("J1"));
      }
    else {
      joueur.innerHTML=JSON.parse(sessionStorage.getItem("J2"));
      }
    }
  }



window.addEventListener("load", function(){
  choixCellule();
  survoler();
  enregistrement();
  initialiserPartie();
});
