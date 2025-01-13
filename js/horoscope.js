const api = 'mini_horscope_pdf';
const userId = '4545';
const apiKey = 'ByVOIaODH57QRVi6CqswHXGlcpDvj7tZBRoorY';
const language = 'en';
const data = {
    name: "Ajeet Kanojia", // Имя пользователя
    day: 6,                // День рождения
    month: 1,              // Месяц рождения
    year: 1992,            // Год рождения
    hour: 7,               // Час рождения
    minute: 45,            // Минуты рождения
    latitude: 19.2056,     // Широта места рождения
    longitude: 25.2056,    // Долгота места рождения
    language: "en",        // Язык
    timezone: 3.5,         // Часовой пояс
    place: "USA", // Место рождения
    footer_link: "https://yuratez.github.io", // Ссылка на ваш домен
    logo_url: "https://yuratez.github.io/astrology/assets/img/logo.svg", // URL логотипа вашей компании
    company_name: "4partners", // Название вашей компании
    company_info: "4partners", // Информация о компании (менее 500 символов)
    domain_url: "https://yuratez.github.io/astrology", // Полный URL вашего домена
    company_email: "4partners@gmail.com", // Email вашей компании
    company_landline: "+375293321611", // Номер стационарного телефона вашей компании
    company_mobile: "+375293321611" // Номер мобильного телефона вашей компании
};

// Кодируем в Base64
const auth = "Basic " + btoa(userId + ":" + apiKey);

fetch(`https://pdf.astrologyapi.com/v1/${api}`, {
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