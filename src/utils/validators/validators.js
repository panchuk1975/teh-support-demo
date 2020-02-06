export const required = value => {
    if (value) return undefined;
    return "Field is required";
}

//--------------------Замыкание - Сircuit-----------------//

// - функция возвращает функцию которая имеет доступ к ---//
// - аргументам материнской функции "maxLength"--------//
export const maxLengthCreator = (maxLength) => (value) => {
    if(value.length > maxLength) return (
        `Max length is more ${maxLength} symbols`
    ); 
return undefined;
}