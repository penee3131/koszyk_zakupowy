

function pokazKalkulator() {
    
    document.getElementById('sekcja-kalkulator').style.display = "block";
    document.getElementById('sekcja-porady').style.display = "none";
}

function pokazPorady() {
    
    document.getElementById('sekcja-kalkulator').style.display = "none";
    document.getElementById('sekcja-porady').style.display = "block";
}



function liczBMI() {
    
    var waga = document.getElementById('waga').value;
    var wzrost = document.getElementById('wzrost').value;

    
    if (waga == "" || wzrost == "") {
        alert("Proszę wpisać wszystkie dane!");
        return;
    }

    
    var wzrostMetry = wzrost / 100;
    var bmi = waga / (wzrostMetry * wzrostMetry);
    bmi = bmi.toFixed(2); 

    var divWynik = document.getElementById('wynik');
    divWynik.style.display = "block"; 

   
    if (bmi < 25) {
        divWynik.innerHTML = "Twoje BMI to " + bmi + " - Masz prawidłową wagę! Brawo.";
        divWynik.className = "waga-ok";
    } else {
        divWynik.innerHTML = "Twoje BMI to " + bmi + " - Masz nadwagę. Sprawdź porady zdrowotne.";
        divWynik.className = "waga-zle";
    }
}


pokazKalkulator();