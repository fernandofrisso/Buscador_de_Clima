document.querySelector(".busca").addEventListener('submit', async (event) =>{ 

    event.preventDefault(); //basicamente significa: previna o comportamento padrão que aquele formulário deveria ter, ou seja, não vai enviar informações
    
    //proximo passo: pegar a informação digitada no campo do formulário

    let input = document.querySelector('#searchInput').value; //peguei a informação digitada pelo usuário (dentro da minha variável "input" tenho a informação digitada pelo usuário)

    if ( input !== ''){ //ou seja, se tem alguma digitada

        showWarning('carregando...') // vai aparecer essa mensagem, em razão da função que foi feita

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&units=metric&lang=pt_br&appid=9f92068be954cd029674946078298bf6`//peguei a api no site e fiz uma string no local em que é pra colcoar o valor (nome da cidade). Importante destcar que precisei dar um encodeURI

        // sistema de promessa  = fiz a requisição, ele esperou (await), quanto teve o resultado ele armazenou em results e guardou em JSON

        let results = await fetch(url) // faço a requisição, fico esperando a resposta, e somente quando eu tiver a resposta que eu vou continuar meu código

        let json = await results.json(); // peguei os resultados e vou tranformar em um objeto do JavaScript

        //se o resultado do codigo for igual a 200, é seinal que deu certo, senão aparece a mensagem que n encontrou essa cidade
        if(json.cod === 200){ // 200 é o código que aparece no objeto quando a cidade existe, e 404 é quando da erro

            showInfo({

                name: json.name,
                country: json.sys.country, // essa nomeação é de acordo com o json da nossa api
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })

        } else{

            clearInfo();

            showWarning('Não econtramos essa localização')

        }


    }

});

function showInfo(json){

    showWarning(''); // tira a mensagem de carrgando


    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;

    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;

    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed}<span>km/h</span></div>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`); //setAttribute troca a url da imagem

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

    document.querySelector('.resultado').style.display = 'block'; // faz aparecer essa class, a qual estava no css como display none


}

// FUNÇÃO PARA LIMPAR AS INFORMAÇÕES QUANDO A CIDADE NÃO FOR ENCONTRADA

function clearInfo(){

    showWarning('');

    document.querySelector('.resultado').style.display = 'none' // OCULTA O RESULTADO

}

function showWarning(msg){

    document.querySelector('.aviso').innerHTML = msg // tem a função de mostrar a mensagem de "carregando"

}   