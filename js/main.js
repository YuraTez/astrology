const locale = {
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    today: 'Today',
    clear: 'Clear',
    dateFormat: 'MM/dd/yyyy',
    timeFormat: 'hh:mm aa',
    firstDay: 0
}

const datepicker = new AirDatepicker('#datepicker', {
    autoClose: true,
    position: "bottom right",
    locale: locale,
    visible: false,

    onSelect: function (fd, d) {
        let data = $("#datepicker");
        if (data.val()) {
            $(".change-data").show();
            $(".zodiac-img").attr("src", "assets/img/zodiac/" + getZodiacSign(data.val()) + ".png");
            localStorage.setItem('img', "assets/img/zodiac/" + getZodiacSign(data.val()) + ".png");
            localStorage.setItem('dataBirth' , data.val())
        } else {
            $(".change-data").hide();
        }
    }
});

const zodiacSigns = [
    {name: "Capricorn", startDate: "12-22", endDate: "01-19"},
    {name: "Aquarius", startDate: "01-20", endDate: "02-18"},
    {name: "Pisces", startDate: "02-19", endDate: "03-20"},
    {name: "Aries", startDate: "03-21", endDate: "04-19"},
    {name: "Taurus", startDate: "04-20", endDate: "05-20"},
    {name: "Gemini", startDate: "05-21", endDate: "06-20"},
    {name: "Cancer", startDate: "06-21", endDate: "07-22"},
    {name: "Leo", startDate: "07-23", endDate: "08-22"},
    {name: "Virgo", startDate: "08-23", endDate: "09-22"},
    {name: "Libra", startDate: "09-23", endDate: "10-22"},
    {name: "Scorpio", startDate: "10-23", endDate: "11-21"},
    {name: "Sagittarius", startDate: "11-22", endDate: "12-21"},
];

function getZodiacSign(date) {
    // Преобразуем строку даты в массив [mm, dd, yyyy]
    const [month, day, year] = date.split('/').map(Number);
    const inputDate = new Date(year, month - 1, day); // month - 1, так как месяцы начинаются с 0

    for (const sign of zodiacSigns) {
        const [startMonth, startDay] = sign.startDate.split('-').map(Number);
        const [endMonth, endDay] = sign.endDate.split('-').map(Number);

        const start = new Date(year, startMonth - 1, startDay);
        const end = new Date(year, endMonth - 1, endDay);

        // Проверяем, попадает ли дата в диапазон
        if (startMonth > endMonth) {
            // Если знак охватывает конец и начало года
            if (
                (inputDate >= start && inputDate <= new Date(year, 11, 31)) || // до конца года
                (inputDate >= new Date(year, 0, 1) && inputDate <= end) // с начала года
            ) {
                return sign.name;
            }
        } else if (inputDate >= start && inputDate <= end) {
            // Если дата попадает в обычный диапазон
            return sign.name;
        }
    }

    return null; // Если знак не найден
}


function bgProgressBar(num = bgProgressBar($(".tab.active").attr("data-tab"))) {
    if (num) {
        let calc = 100 / 10 * num;
        $(".progress-bar__content").css("width", `${calc}%`)
    }
}


$(".tab-next").on("click", function () {
    let activeTab = document.querySelector(".tab.active")
    if ($(this).has(".change-data").length) {
        if ($("#datepicker").val()) {
            $(this).closest(".tab").removeClass("active");
            $(this).closest(".tab").next().addClass("active");
            bgProgressBar()
            saveActiveTab(activeTab.getAttribute("data-tab"))
        }
    } else {
        $(this).closest(".tab").removeClass("active");
        $(this).closest(".tab").next().addClass("active");
        bgProgressBar()
        $(".back-slide").removeClass("hide")
        saveActiveTab(activeTab.getAttribute("data-tab"))
    }

})


$(".back-slide").on("click", function () {
    let prevElem = $(".tab.active").prev();

    if (prevElem.length) {
        $(".tab.active").removeClass("active");
        prevElem.addClass("active");
        bgProgressBar()
    }

    if (prevElem.hasClass("tab-1")) {
        $(".back-slide").addClass("hide")
    } else {
        $(".back-slide").removeClass("hide")
    }

})

$("#openPopUpPhoto").on("click", function () {
    $(".popup-take-photo").addClass("active");
})

$("#popupEmail").on("input", function () {
    if ($(this).val()) {
        $(".popup-email__btn").removeAttr("disabled", "false")
    } else {
        $(".popup-email__btn").attr("disabled", "true")
    }
})

$("#popupName").on("input", function () {
    if ($(this).val()) {
        $(".popup-name__btn").removeAttr("disabled", "false")
    } else {
        $(".popup-name__btn").attr("disabled", "true")
    }
})

const HandLineList = document.querySelectorAll(".hand-elem");
const LineList = document.querySelectorAll(".line-elem");

function handView(imgList) {
    imgList.forEach((el, i) => {
        let time = i + "000"
        setTimeout(() => {
            el.classList.add("active");
        }, time)
    })
}

function showImg() {
    setTimeout(() => {
        $(".popup-block").removeClass("active");
        $(".tab").removeClass("active");
        $(".preview-pal").addClass("active");
    }, 1500)

    setTimeout(() => {
        $(".tab").removeClass("active");
        $(".email-slide").addClass("active");
        handView(HandLineList)
        handView(LineList)
        setTimeout(function () {
            $(".popup-email").addClass("active");
        }, 5000)
    }, 3000)
}

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const snapButton = document.getElementById('snap');

function openCamera() {
    // Запрашиваем доступ к камере
    navigator.mediaDevices.getUserMedia({video: true})
        .then(stream => {
            video.autoplay = true;
            video.srcObject = stream;

            video.onloadeddata = () => {
                if (video.videoWidth === 0 || video.videoHeight === 0) {
                    console.error("Не удалось определить размеры видео.");
                    return;
                }
                setCanvas();
            };
        })
        .catch(err => {
            console.error("Ошибка доступа к камере: ", err);
            alert("Не удалось получить доступ к камере. Проверьте настройки разрешений и протокол HTTPS.");
        });
}

function stopCamera() {
    const stream = video.srcObject;
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
    }
    video.srcObject = null;
}

function updateCanvas() {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
    }
    requestAnimationFrame(updateCanvas);
}

function setCanvas() {
    canvas.width = video.videoWidth || 640; // Устанавливаем дефолтное значение
    canvas.height = video.videoHeight || 480; // Устанавливаем дефолтное значение
    updateCanvas();
}

// Обработчик нажатия кнопки "Сделать фото"
snapButton.addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png');

    $(".popup-block").removeClass("active");
    $(".loader").addClass("active");
    sendImage(false, dataURL);
    stopCamera()
});

$("#openSnap").on("click", function () {
    $(".popup-video").addClass("active");
    openCamera()
})


async function loadImageAsBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]); // Убираем префикс data:image/jpeg;base64,
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Функция для отправки изображения на сервер
async function sendImage(file, img) {
    let base64Image
    if (img) {
        base64Image = img;
    } else {
        base64Image = await loadImageAsBase64(file);
    }

    const response = await fetch("https://outline.roboflow.com/palm-reading-b3tep/1?api_key=ZMR2mb4kZKLy4ou71Peo", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: base64Image
    });

    if (!response.ok) {
        console.log("error")
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.predictions.length) {
        $(".popup-block").removeClass("active");
        showImg()
    } else {
        $(".popup-error").addClass("active");
    }
}

// Пример использования: добавьте обработчик события для выбора файла
document.getElementById("fileInput").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        $(".popup-block").removeClass("active");
        $(".loader").addClass("active");
        sendImage(file).catch(error => console.error(error.message));
    }
});

$(".popup-cross, #errorBtn").on("click", function () {
    $(".popup-block").removeClass("active");
})

$(".price-list").on("click", function () {
    let selected = $("input[name='price']:checked").next().text()
    $(".preview-pay__total-sum").text(selected);
    $(".price-total-sale").text(selected);
})

const timeBlock = document.querySelectorAll('.time-sale__content');

timeBlock.forEach((el) => {
    let time = el.textContent;
    let [minutes, seconds] = time.split(':').map(Number);

    function updateTime() {
        if (seconds > 0) {
            seconds--;
        } else if (minutes > 0) {
            minutes--;
            seconds = 59;
        }

        const formattedTime =
            String(minutes).padStart(2, '0') + ':' +
            String(seconds).padStart(2, '0');

        const listLettersTime = formattedTime.split("");

        let resultTimeString = "";

        listLettersTime.forEach((el, i) => {
            if (i === 2) {
                resultTimeString += `<span class="time-letter--no-bg">${el}</span>`
            } else {
                resultTimeString += `<span class="time-letter">${el}</span>`
            }
        })

        el.innerHTML = resultTimeString;

        if (minutes === 0 && seconds === 0) {
            clearInterval(timer);
        }
    }

    const timer = setInterval(updateTime, 1000);
})

$(".form-email").on("submit", function () {
    event.preventDefault();
    $(".popup-email").removeClass("active");
    $(".popup-name").addClass("active");
})

$(".popup-name__btn").on("click", function () {
    event.preventDefault();
    $(".popup-block , .email-slide").removeClass("active");
    $(".tab-15").addClass("active");
    localStorage.setItem("name" , $("#popupName").val())
})

$(".race__el").on("click", function (){
    $(".race__el").removeClass("active");
    $(this).addClass("active");
    localStorage.setItem("race" , $(".race__el.active").text().trim())
})


function saveActiveTab(tabData) {
    localStorage.setItem('activeTab', tabData);
}

function loadActiveTab() {
    const activeTab = localStorage.getItem('activeTab');
    const imgUrl = localStorage.getItem('img');

    $(".zodiac-img").attr("src", imgUrl)

    if (activeTab) {
        // Отображение соответствующего таба
        document.querySelectorAll('[data-tab]').forEach(tab => {
            tab.classList.remove('active');
        });
        const tabToActivate = document.querySelector(`[data-tab="${activeTab}"]`);
        if (tabToActivate) {
            if (activeTab === "add-email") {
                document.querySelector(`[data-tab="add-photo"]`).classList.add("active");
                return
            }

            tabToActivate.classList.add('active');
            if (Number(activeTab)) {
                bgProgressBar(num = activeTab)
            } else {
                bgProgressBar(num = 10)
            }

        }
    } else {
        document.querySelector(`[data-tab="0"]`).classList.add('active');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    loadActiveTab();
});
