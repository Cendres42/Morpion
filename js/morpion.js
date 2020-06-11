let Joueur1= document.getElementById("nomJ1");
let Joueur2= document.getElementById("nomJ2");
let Jouer=document.getElementById("boutonJouer");

Jouer.addEventListener("click",initierJeu);

function initierJeu (){
  J1=Joueur1.value;
  J2=Joueur2.value;
  if((J1!=null)&&(J2!=null)){
    window.location.href = 'jeu.html';
    sessionStorage.setItem("J1",JSON.stringify(J1));
    sessionStorage.setItem("J2",JSON.stringify(J2));
  }
  else {
    alert("Veuillez entrer deux noms de joueurs");
  }
}
