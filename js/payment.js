/*const url = 'http://174.138.83.54/solidgate/generate_onetime_payment';*/
const url = 'https://rocknlabs.com/solidgate/generate_subscription_payment';

function generateUUIDString(length = 255) {
    // Генерируем UUID
    const uniqueId = generateUUID();

    // Проверяем, не превышает ли длина UUID заданную длину
    if (uniqueId.length > length) {
        throw new Error("UUID exceeds the specified length.");
    }

    // Заполняем оставшуюся часть строки пробелами
    const remainingLength = length - uniqueId.length;
    return uniqueId + ' '.repeat(remainingLength);
}

// Функция для генерации UUID
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function postData(){
console.log($("input[name='price']:checked").val())
    const data = {
        "order_id": generateUUIDString(),
        "product_id" : $("input[name='price']:checked").val(),
        "order_description": "Premium package",
        "customer_account_id" : "4dad42f879",
        "product_price_id": "625915e8-9830-45b8-b75e-5953fd589c9e",
        "customer_email": "test@solidgate.com",
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Сеть ответила с ошибкой: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            const initData = {
                iframeParams: {
                    containerId: 'solid-payment-form-container'
                },
                merchantData: {
                    merchant: data.merchantId,
                    signature: data.signature,
                    paymentIntent: data.paymentIntent
                },
                formParams: {
                    buttonType: 'default',
                    submitButtonText: 'Pay',
                    isCardHolderVisible: true,
                    hideCvvNumbers: true,
                    headerText: 'Enter your debit or credit card details (from merchant)',
                    titleText: 'Card info (from merchant)',
                    formTypeClass: 'default',
                    googleFontLink: 'https://fonts.cdnfonts.com/css/sf-pro-display?styles=98774,98773',
                    autoFocus: false,
                    width: "100%",
                    responsive: true,
                    applePayButtonParams: true
                },

                styles: {
                    form_body:{
                      "width": "100%"
                    },
                    submit_button: {
                        'background-color': 'rgb(6,111,222)',
                        'font-size': '16px',
                        'font-weight': 'bold',
                        ':hover': {
                            'background-color': 'rgba(6,111,222,0.8)'
                        },
                        form_body: {
                            'font-family': 'SF Pro Display'
                        }
                    },
                    iframe: {
                        width: "100%",
                        maxWidth: "100%",
                        border: "none",
                    },
                }
            }

            const  formPay = PaymentFormSdk.init(initData);

            formPay.on('success', e => {
               setTimeout(function (){
                   $(".pay").removeClass("active");
                   $(".last-tab").addClass("active")
               },1000)
            })
        })
        .catch((error) => {
            console.error('Ошибка:', error);
        });
}


// Обработка нажатия кнопки
const payButton = document.getElementById('pay-button');
if (payButton) {
    payButton.addEventListener('click', postData);
} else {
    console.error('Кнопка с ID "pay-button" не найдена на странице.');
}
