// 1. Łączymy kod z elementami na stronie (pobieramy je po ID)
const inputNazwa = document.getElementById('nazwaProduktu');
const inputCena = document.getElementById('cenaProduktu');
const przyciskDodaj = document.getElementById('przyciskDodaj');
const listaUl = document.getElementById('listaProduktow');
const sumaSpan = document.getElementById('sumaCalkowita');
const przyciskReset = document.getElementById('wyczyscWszystko');

// 2. Tworzymy listę na nasze produkty. 
// Próbujemy ją wczytać z pamięci przeglądarki (localStorage).
// Jeśli pamięć jest pusta, zaczynamy z pustą tablicą [].
let produkty = JSON.parse(localStorage.getItem('listaZakupow')) || [];

// 3. Główna funkcja, która rysuje listę na ekranie
function wyswietlProdukty() {
    // Najpierw czyścimy listę, żeby nie dublować starych rzeczy
    listaUl.innerHTML = ""; 
    let suma = 0;

    // Pętla for przechodzi przez każdy produkt w naszej tablicy
    for (let i = 0; i < produkty.length; i++) {
        // Tworzymy nowy element listy <li>
        const li = document.createElement('li');
        li.className = "produkt-item";
        
        // Wpisujemy treść do środka <li> - nazwa, cena i przycisk usuwania
        li.innerHTML = `
            <span>${produkty[i].nazwa} - ${produkty[i].cena} zł</span>
            <button onclick="usunProdukt(${i})" style="background: red; padding: 2px 5px; color: white; border: none; cursor: pointer;">Usuń</button>
        `;
        
        // Dodajemy gotowy element do naszej listy na stronie
        listaUl.appendChild(li);

        // Dodajemy cenę aktualnego produktu do ogólnej sumy
        suma = suma + parseFloat(produkty[i].cena);
    }

    // Wyświetlamy obliczoną sumę na stronie (zaokrągloną do 2 miejsc po przecinku)
    sumaSpan.innerText = suma.toFixed(2);
    
    // Zapisujemy aktualny stan listy w pamięci przeglądarki (localStorage)
    localStorage.setItem('listaZakupow', JSON.stringify(produkty));
}

// 4. Reakcja na kliknięcie przycisku "Dodaj do listy"
przyciskDodaj.addEventListener('click', function() {
    const nazwa = inputNazwa.value;
    const cena = inputCena.value;

    // Sprawdzamy, czy użytkownik wpisał cokolwiek
    if (nazwa === "" || cena === "") {
        alert("Proszę wpisać nazwę produktu i jego cenę!");
        return; // Przerywamy funkcję, jeśli pola są puste
    }

    // Tworzymy obiekt reprezentujący nasz produkt
    const nowyProdukt = {
        nazwa: nazwa,
        cena: cena
    };

    // Dodajemy nasz obiekt do tablicy "produkty"
    produkty.push(nowyProdukt);

    // Czyścimy pola tekstowe, żeby były gotowe na następny produkt
    inputNazwa.value = "";
    inputCena.value = "";

    // Odświeżamy widok strony
    wyswietlProdukty();
});

// 5. Funkcja do usuwania pojedynczego produktu
function usunProdukt(numerNaLiscie) {
    // Usuwamy jeden element z tablicy o konkretnym indeksie
    produkty.splice(numerNaLiscie, 1);
    
    // Odświeżamy widok po usunięciu
    wyswietlProdukty();
}

// 6. Funkcja do czyszczenia całej listy
przyciskReset.addEventListener('click', function() {
    // Pytamy użytkownika, czy na pewno chce to zrobić
    if (confirm("Czy na pewno chcesz usunąć całą listę?")) {
        produkty = []; // Zerujemy tablicę
        wyswietlProdukty(); // Odświeżamy stronę
    }
});

// 7. Wywołujemy funkcję na samym początku, żeby po odświeżeniu 
// strony wczytały się produkty zapisane wcześniej w pamięci
wyswietlProdukty();
