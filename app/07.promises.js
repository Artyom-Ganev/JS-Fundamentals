console.log("Topic: Promises");
// Task 01
// Создайте промис, который постоянно находиться в состоянии pending.
// В конструкторе промиса выведите в консоль сообщение "Promise is created".
const p1 = new Promise(() => {
  console.log("Task 01: Promise is created");
});
console.log(p1);

// Task 02
// Создайте промис, который после создания сразу же переходит в состояние resolve
// и возвращает строку 'Promise Data'
// Получите данные промиса и выведите их в консоль
const p2 = Promise.resolve("Task 02: Promise Data");
console.log(p2);
p2.then(value => console.log(value));

// Task 03
// Создайте промис, который после создания сразу же переходит в состояние rejected
// и возвращает строку 'Promise Error'
// Получите данные промиса и выведите их в консоль
const p3 = Promise.reject("Task 03: Promise Error");
console.log(p3);
p3.catch(e => console.log(e));

// Task 04
// Создайте промис, который переходит в состояние resolved через 3с.
// (Используйте setTimeout)
// и возвращает строку 'Promise Data'
// Получите данные промиса и выведите их в консоль
const p4 = new Promise(resolve => {
  setTimeout(() => {
    console.log("Task 04: 3 seconds later");
    resolve("Task 04: Promise Data");
  }, 3000);
});
p4.then(value => console.log(value));

// Task 05
// Создайте литерал объекта handlePromise со следующими свойствами:
// promise, resolve, reject, onSuccess, onError
// Проинициализируйте первые три свойства null,
// а последние два функциями, которые принимают один параметр и выводят
// в консоль сообщения: первая - `Promise is resolved with data: ${paramName}`
// вторая - `Promise is rejected with error: ${paramName}`
// Создайте три кнопки и три обработчика события click для этих кнопок
// Первый обработчик, создает промис, заполняет первые три свойства,
// описаного выше объекта: свойство promise получает новый созданный промис,
// свойства resolve и reject получают ссылки на соответствующие функции
// resolve и reject. Следующие два обработчика запускают методы resolve и reject.
const handlePromise = {
  promise: null,
  resolve: null,
  reject: null,
  onSuccess(param) {
    console.log(`Task 05: Promise is resolved with data: ${param}`);
    return "Additional Data";
  },
  onError(param) {
    console.log(`Task 05: Promise is rejected with data: ${param}`);
  }
};

document.querySelector("#btn-create-promise").addEventListener("click", () => {
  handlePromise.promise = new Promise((resolve, reject) => {
    console.log("Task 05: Promise is created");
    handlePromise.resolve = resolve;
    handlePromise.reject = reject;
  })
    .then(handlePromise.onSuccess)
    // Task 06
    // Используйте предыдущее задание. Продублируйте строчку с методом then
    .then(handlePromise.onSuccess)
    .catch(handlePromise.onError);
});

document.querySelector("#btn-resolve-promise").addEventListener("click", () => {
  const { resolve } = handlePromise;
  if (resolve) {
    resolve("Task 05: Promise Data");
  }
});

document.querySelector("#btn-reject-promise").addEventListener("click", () => {
  const { reject } = handlePromise;
  if (reject) {
    reject("Task 05: Promise Error");
  }
});

// Task 07
// Создайте промис, который через 1 с возвращает строку "My name is".
// Создайте функцию onSuccess, которая получает один параметр,
// прибавляет к нему Ваше имя и возвращает новую строку из функции
// Создайте функцию print, которая выводит в консоль значение своего параметра
// Добавьте два метода then и зарегистрируйте созданные функции.
const p7 = new Promise(resolve => {
  setTimeout(() => {
    console.log("Task 07: 1 second later");
    resolve("Task 07: My name is");
  }, 1000);
});
const onSuccess = param => `${param} Artem`;
const print = param => console.log(param);
p7.then(onSuccess).then(print);

// Task 08
// Используйте предыдущий код. Добавьте в функци onSuccess генерацию исключения
// Обработайте даное исключение, используя catch. Обратите внимание,
// что метод print при этом не выполняется.
const p8 = new Promise(resolve => {
  setTimeout(() => {
    console.log("Task 08: 1 second later");
    resolve("Task 08: My name is");
  }, 1000);
});
const onSuccess8 = () => {
  throw new Error("Task 08: Error");
};
p8.then(onSuccess8)
  .then(print)
  .catch(print);

// Task 09
// Напишите функцию getPromiseData, которая принимает один параметр - промис. Функция получает
// значение промиса и выводит его в консоль
// Объявите объект со свойтвом name и значением Anna.
// Создайте врапер для этого объекта и вызовите для него функцию getPromiseData
const getPromiseData = promise => {
  promise.then(data => console.log(`Task 9: ${JSON.stringify(data)}`));
};
const o9 = { name: "Anna" };
getPromiseData(Promise.resolve(o9));

// Task 10
// Создайте два промиса. Первый промис возвращает объект { name: "Anna" } через 2с,
// а второй промис возвращает объект {age: 16} через 3 с.
// Получите результаты работы двух промисов, объедините свойства объектов
// и выведите в консоль
const p10_1 = new Promise(resolve => {
  setTimeout(() => {
    console.log("Task 10: 2 seconds later");
    resolve({ name: "Anna" });
  }, 2000);
});

const p10_2 = new Promise(resolve => {
  setTimeout(() => {
    console.log("Task 10: 3 seconds later");
    resolve({ age: 16 });
  }, 3000);
});
Promise.all([p10_1, p10_2]).then(([data1, data2]) => {
  const data = { ...data1, ...data2 };
  console.log(`Task 10: ${JSON.stringify(data)}`);
});

// Task 11
// Используйте предыдущее задание. Пусть теперь второй промис переходит в
// состояние rejected со значением "Promise Error". Измените код, чтобы обработать
// эту ситуацию.
const p11_1 = new Promise(resolve => {
  setTimeout(() => {
    console.log("Task 11: 2 seconds later");
    resolve({ name: "Anna" });
  }, 2000);
});

const p11_2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Task 11: 3 seconds later");
    reject("Task 11: Promise Error");
  }, 3000);
});

Promise.all([p11_1, p11_2])
  .then(([data1, data2]) => {
    const data = { ...data1, ...data2 };
    console.log(`Task 11: ${JSON.stringify(data)}`);
  })
  .catch(print);

// Task 12
// Создайте промис, который перейдет в состояние resolve через 5с и вернет строку
// 'Promise Data'.
// Создайте второй промис, который перейдет в состояние rejected по клику на
// кнопку. Добавьте обработчик для кнопки.
// Используя метод race организуйте отмену промиса.
const p12_1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Task 12: 5 seconds later");
    resolve("Task 12: Promise Data");
  }, 5000);
});

let cancel;
const p12_2 = new Promise((resolve, reject) => {
  console.log("Task 12: Promise is created");
  cancel = reject;
});

document.querySelector("#btn-cancel-promise").addEventListener("click", () => {
  cancel("Task 12: Promise Error");
});

Promise.race([p12_1, p12_2])
  .then(print)
  .catch(print);
