const userId = '4545';
const apiKey = 'ByVOIaODH57QRVi6CqswHXGlcpDvj7tZBRoorY';
const language = 'en';
let place;

// Функция для получения местоположения
async function getLocation() {
    const response = await $.ajax({ url: "https://api.ipify.org/?format=json" });
    const ip = response.ip;

    // Функция получения адреса юзера
    const getUserLocation = async (ip) => {
        const response = await fetch(`http://ip-api.com/json/${ip}`);
        const data = await response.json();
        return {
            country: data.country,
            city: data.city
        };
    };

    // Вызов функции получения адреса юзера
    const location = await getUserLocation(ip);
    return `${location.country}, ${location.city}`;
}

// Асинхронная функция для инициализации и получения данных
async function init() {
    place = await getLocation(); // Ожидаем разрешения промиса и присваиваем значение переменной

}

// Запускаем инициализацию
init();


function getHoroscope (){
    let dataBirth = $("#datepicker").val() ? $("#datepicker").val() : localStorage.getItem('dataBirth')
    let race = $(".race__el.active").text().trim() ? $(".race__el.active").text().trim() : localStorage.getItem('race')
    let name = $("#popupName").val() ? $("#popupName").val() : localStorage.getItem("name")

    console.log(dataBirth , race , name )


    const data = {
        name: name, // Имя пользователя
        gender: race,
        day: dataBirth.replace(/\//g, "").slice(2, 4),  // День рождения
        month: dataBirth.replace(/\//g, "").slice(0, 2), // Месяц рождения
        year: dataBirth.replace(/\//g, "").slice(4, 8),  // Год рождения
        hour: 7,               // Час рождения
        minute: 45,            // Минуты рождения
        latitude: 51.5085,     // Широта места рождения
        longitude: -0.12574,    // Долгота места рождения
        language: "en",        // Язык
        timezone: 3.5,         // Часовой пояс
        place: place, // Место рождения
        footer_link: "https://yuratez.github.io", // Ссылка на ваш домен
        logo_url: "https://yuratez.github.io/astrology/assets/img/logo.svg", // URL логотипа вашей компании
        company_name: "Palmreading App", // Название вашей компании
        company_info: "support@palmreading.app", // Информация о компании (менее 500 символов)
        domain_url: "https://yuratez.github.io/astrology", // Полный URL вашего домена
        company_email: "support@palmreading.app", // Email вашей компании
        company_landline: "+447533049957", // Номер стационарного телефона вашей компании
        company_mobile: "+447533049957" // Номер мобильного телефона вашей компании
    };

// Кодируем в Base64
    const auth = "Basic " + btoa(userId + ":" + apiKey);

    fetch(`https://pdf.astrologyapi.com/v1/mini_horoscope_pdf`, {
        method: 'POST',
        headers: {
            "Authorization": auth,
            "Content-Type": 'application/json',
            "Accept-Language": language
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            let url = data.pdf_url;
            $(".tab-download").attr("href" , url)
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
