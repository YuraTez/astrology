const userId = '4545';
const apiKey = 'ByVOIaODH57QRVi6CqswHXGlcpDvj7tZBRoorY';
const language = 'en';


function getHoroscope (){

    const data = {
        name: $("#popupName").val(), // Имя пользователя
        gender: $(".race__el.active").text().trim(),
        day: $("#datepicker").val().replace(/\//g, "").slice(2, 4),  // День рождения
        month: $("#datepicker").val().replace(/\//g, "").slice(0, 2), // Месяц рождения
        year: $("#datepicker").val().replace(/\//g, "").slice(4, 8),  // Год рождения
        hour: 7,               // Час рождения
        minute: 45,            // Минуты рождения
        latitude: 19.2056,     // Широта места рождения
        longitude: 25.2056,    // Долгота места рождения
        language: "en",        // Язык
        timezone: 3.5,         // Часовой пояс
        place: "mink,belarus", // Место рождения
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
            console.log(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
