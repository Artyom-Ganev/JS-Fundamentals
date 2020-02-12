console.log("Topic: Iterators");
// Task 1
// RU: Написать функцию keyValueIterable(target),
//     которая на вход получает объект и возвращает итерируемый объект.
//     Итерируемый объект позволяет получить пары ключ/значение.
//     Выведите в консоль цвета из объекта colors.
// EN: Create a function keyValueIterable(target)
//     which takes an objects and returns iterable object.
//     Iterable object allows you to get key/value pairs.
//     Display in a console all colors from the object colors.
console.log("Task 1");
const keyValueIterable = obj => ({
  ...obj,
  [Symbol.iterator]() {
    const keys = Object.keys(obj);
    return {
      next: () => {
        const done = keys.length === 0;
        const key = keys.shift();
        const value = [key, obj[key]];
        return { value, done };
      }
    };
  }
});

const colors = {
  green: "#0e0",
  orange: "#f50",
  pink: "#e07"
};

const itColors = keyValueIterable(colors);
for (const [, color] of itColors) {
  console.log(color);
}

// Task 2
// RU: В коллекции хранятся все имена пользователей, которые присоединились к определенной группе телеграмм.
//     Булевый флаг указывает, является ли пользователь администратором группы.
//     Создайте итератор, который возвращает только имена администраторов.
// EN: The following collection store all the names of the user that have joined a particular telegram group.
//     The boolean flag indicates whether a user is an administrator of the group.
//     Сreatereate an iterator that returns only the administrators' names.
console.log("Task 2");
const users = {
  anna: false,
  boris: true, // admin
  christina: false,
  dave: false,
  elena: false,
  felix: true // admin
};

users[Symbol.iterator] = function() {
  const admins = Object.keys(this).filter(key => this[key]);
  return {
    next: () => {
      const { length } = admins;
      return {
        value: admins.shift(),
        done: length === 0
      };
    }
  };
};

[...users].forEach(name => console.log(name)); // boris, felix

// Task 3
// RU: Написать функцию take(sequence, amount), которая из бесконечного итерируемого объекта random
//     вернет указаное количество элементов.
// EN: Create a function take(sequence, amount), which returns a specified amount of numbers
//     from iterable object random
console.log("Task 3");
const random = {
  [Symbol.iterator]: () => ({
    next: () => ({
      value: Math.random()
    })
  })
};

const take = (seq, count) => {
  return {
    [Symbol.iterator]() {
      const it = seq[Symbol.iterator]();
      return {
        next() {
          if (count-- < 1) {
            return { done: true };
          }
          return it.next();
        }
      };
    }
  };
};

const a = [...take(random, 3)];
console.log(a);

// Task 4
// RU: Написать итерируемый итератор, который возвращает числа Фибоначи
//     Реализовать метод return для остановки итератора с помощью for-of + break
// EN: Create iterable iterator, which produces Fibonacci numbers
//     Implement method return, which allows you to stop iterator using for-of + break
console.log("Task 4");
const Fib = {
  [Symbol.iterator]() {
    let curr = 0;
    let next = 1;
    return {
      [Symbol.iterator]: () => this,
      next: () => {
        const value = curr;
        curr = next;
        next = value + curr;
        return { value, done: false };
      },
      return: value => ({ value, done: true })
    };
  }
};

for (let v of Fib) {
  console.log(v);
  if (v > 50) break;
}

// Task 5
// RU: Написать итератор для чисел, который позволит получать массивы последовательных целых элементов.
//     Например, [...-3] => [0, -1, -2, -3], [...3] => [0, 1, 2, 3]
// EN: Create iterator for numbers, which allows you to get arrays of sequential integers.
//     Example, [...-3] => [0, -1, -2, -3], [...3] => [0, 1, 2, 3]
console.log("Task 5");

Number.prototype[Symbol.iterator] = function() {
  let current = 0;
  const value = this.valueOf();
  const positive = value > 0;
  const comparator = positive
    ? (cur, val) => cur > val
    : (cur, val) => cur < val;
  const changer = positive ? () => current++ : () => current--;
  return {
    next: () => {
      return comparator(current, value)
        ? {
            done: true
          }
        : {
            value: changer(),
            done: false
          };
    }
  };
};

console.log([...-5]);
console.log([...5]);
