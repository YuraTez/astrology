const api = 'natal_horoscope_report/tropical';
const userId = '636604';
const apiKey = '6d1f718875721102efe8c925f918ac863343f6b0';
const language = 'en';
const data = {
    name: "Ajeet Kanojia", // Имя пользователя
    day: 6,                // День рождения
    month: 1,              // Месяц рождения
    year: 2000,            // Год рождения
    hour: 7,               // Час рождения
    minute: 45,            // Минуты рождения
    latitude: 19.2056,     // Широта места рождения
    longitude: 25.2056,    // Долгота места рождения
    language: "en",        // Язык
    timezone: 5.5,         // Часовой пояс
    place: "Mumbai,Maharashtra India", // Место рождения
    footer_link: "astrologyapi.com", // Ссылка на ваш домен
    logo_url: "https://example.com/logo.png", // URL логотипа вашей компании
    company_name: "Vedic Rishi Astro Solutions Pvt. Ltd.", // Название вашей компании
    company_info: "Your Company Info", // Информация о компании (менее 500 символов)
    domain_url: "https://www.astrologyapi.com", // Полный URL вашего домена
    company_email: "mail@astrologyapi.com", // Email вашей компании
    company_landline: "+91-22123222", // Номер стационарного телефона вашей компании
    company_mobile: "+91 1212 1212 12" // Номер мобильного телефона вашей компании
};

// Кодируем в Base64
const auth = "Basic " + btoa(userId + ":" + apiKey);

fetch(`https://json.astrologyapi.com/v1/${api}`, {
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