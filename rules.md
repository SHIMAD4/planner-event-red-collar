
## Rules

### array-callback-return
https://eslint.org/docs/rules/array-callback-return  
Например, если мы не возвращаем ничего из map/reduce, то нам нужен forEach

```js
// 👎
let bar = foo.filter(function(x) {
    if (x) {
        return true;
    } else {
        return;
    }
});

// 👍
let indexMap = myArray.reduce(function(memo, item, index) {
  memo[item] = index;
  return memo;
}, {});
```


### no-var
https://eslint.org/docs/latest/rules/no-var  
Скажем нет var'ам.

### complexity max 4
https://eslint.org/docs/latest/rules/complexity  
Определяет максимальную границу цикломатической сложности

```js

// 👎
function a(x) {
  if (x === true) {
    return 1;
  } 
  else if (x === null) {
    return 2;
  } 
  else if (x === 'abs') {
    return 3;
  } 
  else {
    return 4;
  }
}


// 👍
function a(x) {
    if (true) {
        return x;
    } else {
        return 4;
    }
}

```


### curly
https://eslint.org/docs/rules/curly  
Фигурные скобки для всех выражений


```js

// 👎
if (foo) foo++;

while (bar)
    baz();

if (foo) {
    baz();
} else qux();


// 👍
if (foo) {
  foo++;
}

while (bar) {
  baz();
}

if (foo) {
  baz();
} else {
  qux();
}
```


### default-case
https://eslint.org/docs/latest/rules/default-case  
Обязательный default в switch (отключается с помощью коммента `// no default`)

```js
// 👎
switch (a) {
    case 1:
        /* code */
        break;
}

// 👍
switch (a) {
  case 1:
    /* code */
    break;

  default:
    /* code */
    break;
}
```

### default-case-last
https://eslint.org/docs/rules/default-case-last  
default должен быть последним в switch

```js
// 👎
switch (foo) {
    default: {
      bar();
      break;
    }
    case "a": {
      baz();
      break;
    }
}

// 👍
switch (foo) {
  case "a": {
    baz();
    break;
  }
  default: {
    bar();
    break;
  }
}

```


### default-param-last
https://eslint.org/docs/rules/default-param-last  
Аргументы функций со значениями по умолчанию должны быть в конце, для того, чтобы можно было использовать функцию без указания аргумента

```js
// 👎
function f(a = 0, b) {}

// 👍
function f(b, a = 0) {}
```

### dot-notation
https://eslint.org/docs/rules/dot-notation  
Доступ к свойствам осуществляется через точку.

```js
// 👎
let x = foo["bar"];

// 👍
let x = foo.bar;
let y = foo[bar];
```


### dot-location property
https://eslint.org/docs/latest/rules/dot-location  
Расположение точки у свойств при переносе строки


```js
// 👎
let foo = object.
            property;

// 👍
let foo = object
            .property;
```


### eqeqeq
https://eslint.org/docs/rules/eqeqeq  
Использование строгих равенств в сравнении (за исключением сравнения c null)

```js
// 👎
foo == 1
foo != 0

// 👍
foo === 1
foo !== 0
foo == null
```


### grouped-accessor-pairs
Геттеры и сеттеры должны быть рядом.

```js
// 👎
let foo = {
    get a() {
        return this.val;
    },
    b: 1,
    set a(value) {
        this.val = value;
    }
};

// 👍
let foo = {
  get a() {
    return this.val;
  },
  set a(value) {
    this.val = value;
  },
  b: 1,
};
```

### no-alert
https://eslint.org/docs/rules/no-alert  
Никаких alert, prompt и confirm.

```js
// 👎
alert("here!");
confirm("Are you sure?");
prompt("What's your name?", "John Doe");
```

### no-case-declarations
https://eslint.org/docs/rules/no-case-declarations  
Запрет декларирования в лексическом окружении switch'а.

```js
// 👎
switch (foo) {
  case 1:
    let x = 1;
    break;
  case 2:
    const y = 2;
    break;
  case 3:
  function f() {}
    break;
  default:
    class C {}
}
// 👍
const a = 0;

switch (foo) {
  // The following case clauses are wrapped into blocks using brackets
  case 1: {
    let x = 1;
    break;
  }
  case 2: {
    const y = 2;
    break;
  }
  case 3: {
    function f() {}
    break;
  }
  default: {
    class C {}
  }
}

```


### no-constructor-return
https://eslint.org/docs/rules/no-constructor-return  
Запрет return в конструкторах классов.

```js
// 👎
class A {
    constructor(a) {
        this.a = a;
        return a;
    }
}

class B {
    constructor(f) {
        if (!f) {
            return 'falsy';
        }
    }
}

// 👍
class C {
  constructor(c) {
    this.c = c;
  }
}
```

###  no-else-return
https://eslint.org/docs/latest/rules/no-else-return  
Запрет ненужного return'а в else.

```js
// 👎
function foo() {
    if (x) {
        return y;
    } else {
        return z;
    }
}

// 👍
function foo() {
  if (x) {
    return y;
  }

  return z;
}
```


### no-eval no-implied-eval no-new-func no-script-url
https://eslint.org/docs/rules/no-eval  
https://eslint.org/docs/rules/no-implied-eval  
https://eslint.org/docs/rules/no-new-func  
https://eslint.org/docs/rules/no-script-url  
Запрет применения eval и eval подобных конструкций


### no-extend-native
https://eslint.org/docs/rules/no-extend-native  
Запрет расширения нативных объектов.

```js
// 👎
// seems harmless
Object.prototype.extra = 55;

// loop through some userIds
let users = {
    "123": "Stan",
    "456": "David"
};

// not what you'd expect
for (let id in users) {
    console.log(id); // "123", "456", "extra"
}
```

### no-extra-bind
https://eslint.org/docs/latest/rules/no-extra-bind
Запрет ненужны байндов.

```js
// 👎
let x = function () {
    foo();
}.bind(bar);

let x = (() => {
    foo();
}).bind(bar);

let x = (() => {
    this.foo();
}).bind(bar);

let x = function () {
    (function () {
      this.foo();
    }());
}.bind(bar);

let x = function () {
    function foo() {
      this.bar();
    }
}.bind(baz);

// 👍
let x = function () {
  this.foo();
}.bind(bar);

let x = function (a) {
  return a + 1;
}.bind(foo, bar);

```

###  no-fallthrough
https://eslint.org/docs/latest/rules/no-fallthrough  
Заперт проваливания на следующий кейс в switch'е (отключается комментом // falls through)

```js
// 👎
switch(foo) {
    case 1: {
      doSomething();
    }
    case 2: {
      doSomething();
    }
}

// 👍
switch(foo) {
  case 1:
    doSomething();
    break;

  case 2:
    doSomething();
}

function bar(foo) {
  switch(foo) {
    case 1:
      doSomething();
      return;

    case 2:
      doSomething();
  }
}

switch(foo) {
  case 1:
    doSomething();
    throw new Error("Boo!");

  case 2:
    doSomething();
}

switch(foo) {
  case 1:
  case 2:
    doSomething();
}

switch(foo) {
  case 1:
    doSomething();
  // falls through

  case 2:
    doSomething();
}

switch(foo) {
  case 1: {
    doSomething();
    // falls through
  }

  case 2: {
    doSomethingElse();
  }
}
```

### no-floating-decimal
https://eslint.org/docs/latest/rules/no-floating-decimal  
Запрет использования значений с плавающей точкой без указания целой части.

```js
// 👎
let num = .5;
let num = 2.;
let num = -.7;

// 👍
let num = 0.5;
let num = 2.0;
let num = -0.7;
```


### no-global-assign
https://eslint.org/docs/latest/rules/no-global-assign  
Запрет определения глобальных объектов

```js
// 👎
Object = null
undefined = 1
window = {}

// 👍
a = 1
var b = 1
b = 2
```

### no-implicit-coercion
Запрет неочевидных приведений типов для number и string.

```js
// 👎
let n = +foo;
let n = 1 * foo;

let s = "" + foo;
let s = `` + foo;
foo += "";
foo += ``;

// 👍
let n = Number(foo);
let n = parseFloat(foo);
let n = parseInt(foo, 10);
let s = String(foo);
foo = String(foo);
```


### no-magic-numbers
https://eslint.org/docs/rules/no-magic-numbers  
Запрет магических чисел в коде.

```js
// 👎
let dutyFreePrice = 100,
    finalPrice = dutyFreePrice + (dutyFreePrice * 0.25);

// 👍
let TAX = 0.25;

let dutyFreePrice = 100,
  finalPrice = dutyFreePrice + (dutyFreePrice * TAX);
```

### no-multi-spaces
https://eslint.org/docs/rules/no-multi-spaces  
Запрет нескольких пробелов между блоками.

```js
// 👎
let a =  1;
if(foo   === "bar") {}
a <<  b
let arr = [1,  2];
a ?  b: c

// 👍
let a = 1;
if(foo === "bar") {}
a << b
let arr = [1, 2];
a ? b: c
```


### no-multi-str
https://eslint.org/docs/latest/rules/no-multi-str  
Запрет мультистрок с использованием слэша.

```js
// 👎
let x = "Line 1 \
         Line 2";

// 👍
let x = "some very " +
  "long text";
```


### no-new
https://eslint.org/docs/latest/rules/no-new  
Заперт new без присваивания.

```js
// 👎
new Thing();

// 👍
let thing = new Thing();
```

### no-new-wrappers
https://eslint.org/docs/latest/rules/no-new-wrappers  
Запрет использования ключевого слова new для объектов-обёрток String, Number, Boolean.

```js
// 👎
let stringObject = new String("Hello world");
let numberObject = new Number(33);
let booleanObject = new Boolean(false);

let stringObject = new String;
let numberObject = new Number;
let booleanObject = new Boolean;

// 👍
let text = String(someValue);
let num = Number(someValue);

```


### no-octal
https://eslint.org/docs/latest/rules/no-octal  
Запрет на использование восьмеричной записи через 0

```js
// 👎
let num = 071;      // 57
let result = 5 + 07;

// 👍
let num  = "071";
```


### no-proto
Т.к. мы не поддерживает древнее, запрещаем `__proto__`
https://eslint.org/docs/latest/rules/no-proto

```js
// 👎
var a = obj.__proto__;
var a = obj["__proto__"];
obj.__proto__ = b;
obj["__proto__"] = b;

// 👍
let a = Object.getPrototypeOf(obj);
Object.setPrototypeOf(obj, b);
let c = { __proto__: a };

```


### no-redeclare
https://eslint.org/docs/rules/no-redeclare  
Запрет переопределения переменных в одном скоупе.

```js
// 👎
let a = 3;
let a = 10;

class C {
    foo() {
        let b = 3;
        let b = 10;
    }

    static {
        let c = 3;
        let c = 10;
    }
}

// 👍
let a = 3;
a = 10;

class C {
  foo() {
    let b = 3;
    b = 10;
  }

  static {
    let c = 3;
    c = 10;
  }
}
```


### no-restricted-properties
https://eslint.org/docs/rules/no-restricted-properties
Запрещены:
```js 
arguments.callee
isFinite => Number.isFinite
isNaN => Number.isNaN
__defineGetter__ => Object.defineProperty
__defineSetter__ => Object.defineProperty
pow => **
```


### no-return-assign
https://eslint.org/docs/rules/no-return-assign  
Запрет присваивания в return (кейс, когда вместо сравнения используется присваивание)

```js
// 👎
function doSomething() {
    return foo = bar + 2;
}

// 👍
function doSomething() {
  return foo == bar + 2;
}
```

### no-return-await
https://eslint.org/docs/rules/no-return-await  
Помогает избежать создания бесполезных микро-задач.

```js
// 👎
async function foo() {
    return await bar();
}

// 👍
async function foo() {
  return bar();
}
```

### no-self-assign
https://eslint.org/docs/latest/rules/no-self-assign  
Запрет присваивания себя самому себе
```js
// 👎
foo = foo;
// 👍
foo = bar;
```


### no-self-compare
https://eslint.org/docs/rules/no-self-compare  
Запрет сравнения себя с самим собой.

```js
// 👎
let x = 10;
if (x === x) {
    x = 20;
}
```

### no-sequences
https://eslint.org/docs/latest/rules/no-sequences  
Запрет последовательных операций через `,` (данное ограничение обходится с помощью круглых скобок)

```js
// 👎
foo = doSomething(), val;
switch (val = foo(), val) {}

// 👍
foo = (doSomething(), val);
while ((val = foo(), val < 42));
```

### no-throw-literal
https://eslint.org/docs/rules/no-throw-literal  
Запрет throw без Error

```js
// 👎
throw "error";
throw 0;
throw undefined;
throw null;

// 👍
throw new Error();
throw new Error("error");

```

### no-unused-expressions
https://eslint.org/docs/latest/rules/no-unused-expressions  
Запрет на неиспользуемые выражения.

### no-useless-catch
https://eslint.org/docs/latest/rules/no-useless-catch  
Запрет бесполезных catch'ей которые перепробрасывают ошибки.

```js
// 👎
try {
  doSomethingThatMightThrow();
} catch (e) {
  throw e;
}

// 👍
try {
  doSomethingThatMightThrow();
} catch (e) {
  doSomethingBeforeRethrow();
  throw e;
}
```

### no-useless-concat
Запрет бесполезных склеиваний.

```js
// 👎
let foo = "a" + "b";
let a = '1' + '0';
let a = '1' + `0`;
let a = `1` + '0';
let a = `1` + `0`;
```


### no-useless-return
Запрет бесполезных return'ов.

```js
// 👎
function foo() { return; }

function foo() {
  doSomething();
  return;
}

// 👍
function foo() { return 5; }

function foo() {
  return doSomething();
}

```

### no-with
Запрет устаревшего with


### prefer-promise-reject-errors
https://eslint.org/docs/rules/prefer-promise-reject-errors  
Запрет промис-реджекта без Error.

```js
// 👎
Promise.reject("something bad happened");
Promise.reject(5);
new Promise(function(resolve, reject) {
  reject("something bad happened");
});

// 👍
Promise.reject(new Error("something bad happened"));
Promise.reject(new TypeError("something bad happened"));
Promise.reject();
new Promise(function(resolve, reject) {
  reject();
});
```


### prefer-regex-literals
https://eslint.org/docs/rules/prefer-regex-literals
Литерал регулярного выражения предпочтительнее `new RegExp`

```js
// 👎
new RegExp("abc");
new RegExp("abc", "u");
RegExp("abc");
RegExp("abc", "u");

// 👍
/abc/;
/abc/u;
new RegExp(pattern);
RegExp("abc", flags);
new RegExp(prefix + "abc");
RegExp(`${prefix}abc`);
new RegExp(String.raw`^\d\. ${suffix}`);
```

### radix
https://eslint.org/docs/latest/rules/radix  
Проверка системы счислений, там где это необходимо.

```js
// 👎
let num = parseInt("071", 10);
let num = parseInt("071", "abc");
let num = parseInt();

// 👍
let num = parseInt("071");
let num = parseInt("071", 8);
let num = parseFloat(someValue);
```

# ITER 2
### for-direction
https://eslint.org/docs/rules/for-direction  
Проверяет достижимость конечного условия в циклах for

```js
// 👎
for (let i = 0; i < 10; i--) {
}

for (let i = 10; i >= 0; i++) {
}

for (let i = 0; i > 10; i++) {
}


// 👍
for (let i = 0; i < 10; i++) {
}
```


### getter-return
https://eslint.org/docs/rules/getter-return  
Геттеры должны возвращать значение (отключается через // return undefined implicitly.)

```js
// 👎
p = {
    get name(){
        // no returns.
    }
};

Object.defineProperty(p, "age", {
    get: function (){
        // no returns.
    }
});

class P{
    get name(){
        // no returns.
    }
}

// 👍

p = {
  get name(){
    return "nicholas";
  }
};

p = {
  get name(){
    return; // return undefined implicitly.
  }
};

```

### no-async-promise-executor
https://eslint.org/docs/latest/rules/no-async-promise-executor  
Запрет использования асинхронных функций в конструкторе промиса

```js
// 👎
const foo = new Promise(async (resolve, reject) => {
  readFile('foo.txt', function(err, result) {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

const result = new Promise(async (resolve, reject) => {
  resolve(await foo);
});

// 👍
const foo = new Promise((resolve, reject) => {
  readFile('foo.txt', function(err, result) {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

const result = Promise.resolve(foo);
```

### no-await-in-loop
https://eslint.org/docs/rules/no-await-in-loop  
В большинстве случаев `await` в циклах не оправдан и правильнее вернуть массив промисов и обработать через `Promise.all`.

```js
// 👎
async function foo(things) {
  const results = [];
  for (const thing of things) {
    // Bad: each loop iteration is delayed until the entire asynchronous operation completes
    results.push(await bar(thing));
  }
  return baz(results);
}

// 👍
async function foo(things) {
  const results = [];
  for (const thing of things) {
    // Good: all asynchronous operations are immediately started.
    results.push(bar(thing));
  }
  // Now that all the asynchronous operations are running, here we wait until they all complete.
  return baz(await Promise.all(results));
}
```

### no-compare-neg-zero
https://eslint.org/docs/latest/rules/no-compare-neg-zero   
Запрет явного сравнения с отрицательным нулём `-0`

```js
// 👎
if (x === -0) {
    // doSomething()...
}

// 👍
if (x === 0) {
  // doSomething()...
}

if (Object.is(x, -0)) {
  // doSomething()...
}

```


### no-cond-assign
https://eslint.org/docs/latest/rules/no-cond-assign  
Запрет присваивания в условиях (в большинстве случаев = в условии это опечатки)

```js
// 👎
if (user.jobTitle = "manager") {
    // user.jobTitle is now incorrect
}


// 👍
if (user.jobTitle === "manager") {
  // user.jobTitle is now incorrect
}
```


### no-console no-debugger
https://eslint.org/docs/latest/rules/no-console  
Запрет методов console (кроме "warn", "error", "debug" ) и включенного дебаггера

### no-dupe-args
https://eslint.org/docs/latest/rules/no-dupe-args
Запрет дублирования аргументов в функциях

```js
// 👎
function foo(a, b, a) {
    console.log("value of the second a:", a);
}

// 👍
function foo(a, b, c) {
  console.log(a, b, c);
}
```

### no-dupe-else-if
https://eslint.org/docs/latest/rules/no-dupe-else-if  
Запрет дублирования условий в ветвлениях

```js
// 👎
if (isSomething(x)) {
  foo();
} else if (isSomething(x)) {
  bar();
}

// 👍
if (isSomething(x)) {
  foo();
} else if (isSomethingElse(x)) {
  bar();
}

```

### no-dupe-keys
https://eslint.org/docs/latest/rules/no-dupe-keys  
Запрет дублирования свойств объектов

```js
// 👎
var foo = {
    bar: "baz",
    bar: "qux"
};

var foo = {
    "bar": "baz",
    bar: "qux"
};

var foo = {
    0x1: "baz",
    1: "qux"
};

// 👍
var foo = {
  bar: "baz",
  quxx: "qux"
};
```

### no-duplicate-case
https://eslint.org/docs/latest/rules/no-duplicate-case  
Запрет дублирования case'ов в switch

### no-empty
https://eslint.org/docs/latest/rules/no-empty
Запрет пустых блоков

```js
// 👎
if (foo) {
}

while (foo) {
}

switch(foo) {
}

// 👍
if (foo) {
  // empty
}

while (foo) {
  /* empty */
}

try {
  doSomething();
} catch (ex) {
  // continue regardless of error
}
```

### no-empty-character-class
https://eslint.org/docs/latest/rules/no-empty-character-class  
Запрет пустых классов `[]` в регулярных выражениях

```js
// 👎
/^abc[]/.test("abcdefg"); // false
"abcdefg".match(/^abc[]/); // null

// 👍
/^abc/.test("abcdefg"); // true
"abcdefg".match(/^abc/); // ["abc"]
/^abc[a-z]/.test("abcdefg"); // true
"abcdefg".match(/^abc[a-z]/); // ["abcd"]

```


### no-ex-assign
https://eslint.org/docs/latest/rules/no-ex-assign  
Запрет присваивания значений ошибке в catch

```js
// 👎
try {
    // code
} catch (e) {
    e = 10;
}

// 👍
try {
  // code
} catch (e) {
  // do something
}
```


### no-extra-boolean-cast
Запрет лишних приведений к boolean

```js
// 👎
let foo = !!!bar;
let foo = !!bar ? baz : bat;
let foo = Boolean(!!bar);

// 👍
let foo = !!bar;
let foo = Boolean(bar);
```


### no-extra-semi
https://eslint.org/docs/latest/rules/no-extra-semi  
Запрет лишних символов `;`


```js
// 👎
var x = 5;;

function foo() {
    // code
};

class C {
    field;;

    method() {
        // code
    };

    static {
        // code
    };
};

// 👍
var x = 5;

function foo() {
  // code
}

var bar = function() {
  // code
};

class C {
  field;

  method() {
    // code
  }

  static {
    // code
  }
}

```


### no-func-assign
https://eslint.org/docs/latest/rules/no-func-assign  
Заперт присваивания для `function delcaration`

```js
// 👎
function foo() {}
foo = bar;

function foo() {
    foo = bar;
}

var a = function hello() {
  hello = 123;
};

// 👍
var foo = function () {}
foo = bar;

function foo(foo) { // `foo` is shadowed.
  foo = bar;
}

function foo() {
  var foo = bar;  // `foo` is shadowed.
}
```


### no-import-assign
https://eslint.org/docs/latest/rules/no-import-assign  
Запрет присваивания значений импортам

```js
// 👎
import mod, { named } from "./mod.mjs"
import * as mod_ns from "./mod.mjs"

mod = 1          // ERROR: 'mod' is readonly.
named = 2        // ERROR: 'named' is readonly.
mod_ns.named = 3 // ERROR: The members of 'mod_ns' are readonly.
mod_ns = {}      // ERROR: 'mod_ns' is readonly.
// Can't extend 'mod_ns'
Object.assign(mod_ns, { foo: "foo" }) // ERROR: The members of 'mod_ns' are readonly.

// 👍
import mod, { named } from "./mod.mjs"
import * as mod_ns from "./mod.mjs"

mod.prop = 1
named.prop = 2
mod_ns.named.prop = 3

// Known Limitation
function test(obj) {
  obj.named = 4 // Not errored because 'obj' is not namespace objects.
}
test(mod_ns) // Not errored because it doesn't know that 'test' updates the member of the argument.

```

### no-invalid-regexp
https://eslint.org/docs/latest/rules/no-invalid-regexp  
Проверка регулярных выражений на корректность

```js
// 👎
RegExp('[')
RegExp('.', 'z')
new RegExp('\\')

// 👍
RegExp('.')
new RegExp
this.RegExp('[')
```


### no-loss-of-precision
https://eslint.org/docs/rules/no-loss-of-precision  
Запрет чисел теряющих точность (при конвертации в f64 в рантайме)

```js
// 👎
const x = 9007199254740993
const x = 5123000000000000000000000000001
const x = 1230000000000000000000000.0
const x = .1230000000000000000000000
const x = 0X20000000000001
const x = 0X2_000000000_0001;


// 👍
const x = 12345
const x = 123.456
const x = 123e34
const x = 12300000000000000000000000
const x = 0x1FFFFFFFFFFFFF
const x = 9007199254740991
const x = 9007_1992547409_91

```

### no-obj-calls
https://eslint.org/docs/latest/rules/no-obj-calls  
Запрет вызова глобальных объектов.

```js
// 👎
let math = Math();
let newMath = new Math();
let json = JSON();
let newJSON = new JSON();
let reflect = Reflect();
```

### no-promise-executor-return
https://eslint.org/docs/rules/no-promise-executor-return  
Возвращение значения в функциях промисов говорит о том, что мы скорее всего допустили ошибку и нам необходимо обернуть это значение в reslove/reject.

```js
// 👎
new Promise((resolve, reject) => {
    if (someCondition) {
        return defaultResult;
    }
    getSomething((err, result) => {
        if (err) {
            reject(err);
        } else {
            resolve(result);
        }
    });
});

new Promise((resolve, reject) => getSomething((err, data) => {
    if (err) {
        reject(err);
    } else {
        resolve(data);
    }
}));

new Promise(() => {
    return 1;
});

// 👍
new Promise((resolve, reject) => {
  if (someCondition) {
    resolve(defaultResult);
    return;
  }
  getSomething((err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

new Promise((resolve, reject) => {
  getSomething((err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

Promise.resolve(1);
```


### no-regex-spaces
https://eslint.org/docs/latest/rules/no-regex-spaces
Запрет нескольких пробелов в регулярных выражениях (используем `{n}`)
```js
// 👎
new RegExp("foo   bar");

// 👍
new RegExp("foo {3}bar");
```

### no-setter-return
https://eslint.org/docs/latest/rules/no-setter-return  
Запрет возврата значений в сеттерах

```js
// 👎
var foo = {
    set a(value) {
        this.val = value;
        return value;
    }
};

class Foo {
    set a(value) {
        this.val = value * 2;
        return this.val;
    }
}
```

### no-sparse-arrays
https://eslint.org/docs/latest/rules/no-sparse-arrays  
Запрет дырявых массивов

```js
// 👎
let items = [,];
let colors = [ "red",, "blue" ];
```

### no-template-curly-in-string
https://eslint.org/docs/latest/rules/no-template-curly-in-string  
Заперт шаблонных выражений заключённых не в `

```js
// 👎
"Hello ${name}!";
'Hello ${name}!';
"Time: ${12 * 60 * 60 * 1000}";

// 👍
`Hello ${name}!`;
`Time: ${12 * 60 * 60 * 1000}`;
templateFunction`Hello ${name}`;
```

### no-unreachable
https://eslint.org/docs/latest/rules/no-unreachable  
Запрет недостижимого кода.

```js
// 👎
function foo() {
    return true;
    console.log("done");
}

function bar() {
    throw new Error("Oops!");
    console.log("done");
}

```

### no-unsafe-negation
https://eslint.org/docs/rules/no-unsafe-negation  
Запрет ошибочного использования оператора отрицания в операциях сравнения

```js
// 👎
if (!key in object) {
}

if (!obj instanceof Ctor) {
}

if (! a < b) {}

while (! a > b) {}

foo = ! a <= b;

foo = ! a >= b;

// 👍
if (!(key in object)) {
  // key is not in object
}

if (!(obj instanceof Ctor)) {
  // obj is not an instance of Ctor
}

```

### no-unsafe-optional-chaining
https://eslint.org/docs/latest/rules/no-unsafe-optional-chaining  
Заперт не безопасного опшинал чейнинга

```js
// 👎
(obj?.foo)();

(obj?.foo).bar;

(foo?.()).bar;

(foo?.()).bar();

(obj?.foo ?? obj?.bar)();

(foo || obj?.foo)();

(obj?.foo && foo)();

(foo ? obj?.foo : bar)();

(foo, obj?.bar).baz;

(obj?.foo)`template`;

new (obj?.foo)();

[...obj?.foo];

bar(...obj?.foo);

1 in obj?.foo;

bar instanceof obj?.foo;

for (bar of obj?.foo);

const { bar } = obj?.foo;

[{ bar } = obj?.foo] = [];

with (obj?.foo);

class A extends obj?.foo {}

var a = class A extends obj?.foo {};

async function foo () {
  const { bar } = await obj?.foo;
  (await obj?.foo)();
  (await obj?.foo).bar;
}


// 👍
(obj?.foo)?.();

obj?.foo();

(obj?.foo ?? bar)();

obj?.foo.bar;

obj.foo?.bar;

foo?.()?.bar;

(obj?.foo ?? bar)`template`;

new (obj?.foo ?? bar)();

var baz = {...obj?.foo};

const { bar } = obj?.foo || baz;

async function foo () {
  const { bar } = await obj?.foo || baz;
  (await obj?.foo)?.();
  (await obj?.foo)?.bar;
}

```

### use-isnan
https://eslint.org/docs/latest/rules/use-isnan  
Запрет прямого сравнения с NaN

```js
// 👎
if (foo == NaN) {
    // ...
}

if (foo != NaN) {
    // ...
}

if (foo == Number.NaN) {
    // ...
}

if (foo != Number.NaN) {
    // ...
}
```

### valid-typeof
https://eslint.org/docs/latest/rules/valid-typeof
Проверка на валидность typeof

```js
// 👎
typeof foo === "strnig"
typeof foo == "undefimed"
typeof bar != "nunber"
typeof bar !== "fucntion"
```


# Style
### array-bracket-spacing
https://eslint.org/docs/latest/rules/array-bracket-spacing  
Запрет пробелов внутри скобок массивов

```js
// 👎
var arr = [ 'foo', 'bar' ];
var arr = ['foo', 'bar' ];
var arr = [ ['foo'], 'bar'];
var arr = [[ 'foo' ], 'bar'];
var arr = [ 'foo',
  'bar'
];
var [ x, y ] = z;
var [ x,y ] = z;
var [ x, ...y ] = z;
var [ ,,x, ] = z;

// 👍
var arr = [];
var arr = ['foo', 'bar', 'baz'];
var arr = [['foo'], 'bar', 'baz'];
var arr = [
  'foo',
  'bar',
  'baz'
];
var arr = ['foo',
  'bar'
];

```


### block-spacing
https://eslint.org/docs/latest/rules/block-spacing  
Скобки блоков должны отделяться пробелами

```js
// 👎
function foo() {return true;}
if (foo) { bar = 0;}
function baz() {let i = 0;
    return i;
}

class C {
    static {this.bar = 0;}
}

// 👍
function foo() { return true; }
if (foo) { bar = 0; }

class C {
  static { this.bar = 0; }
}
```

### brace-style
Начало блока должно находиться на уровне с функцией/условием/etc, а само выражение начинаться с новой строки.

```js
// 👎
function foo()
{
  return true;
}

if (foo)
{
  bar();
}

try
{
  somethingRisky();
} catch(e)
{
  handleError();
}

if (foo) {
  bar();
}
else {
  baz();
}

class C
{
    static
    {
        foo();
    }
}

if (foo) { bar(); }

if (foo) { bar(); } else { baz(); }

// 👍
function foo() {
  return true;
}

if (foo) {
  bar();
}

if (foo) {
  bar();
} else {
  baz();
}

try {
  somethingRisky();
} catch(e) {
  handleError();
}

class C {
  static {
    foo();
  }
}

```


### comma-dangle
https://eslint.org/docs/latest/rules/comma-dangle  
Обязательная запятая в конце многострочных выражений,  тем самым получаем диффы в одну строку - вместо нескольких при добавлении или удалении из конца списка

```js
var foo = {
    bar: "baz",
    qux: "quux",
};

var foo = {
  -    bar: "baz",
  -    qux: "quux"
  +    bar: "baz"
};

var foo = {
    bar: "baz",
 -  qux: "quux",
};

```



```js
// 👎
var foo = {
    bar: "baz",
    qux: "quux"
};

var foo = { bar: "baz", qux: "quux", };

var arr = [1,2,];

var arr = [1,
    2,];

var arr = [
    1,
    2
];

foo({
  bar: "baz",
  qux: "quux"
});

// 👍

var foo = {
  bar: "baz",
  qux: "quux",
};

var foo = {bar: "baz", qux: "quux"};
var arr = [1,2];

var arr = [1,
  2];

var arr = [
  1,
  2,
];

foo({
  bar: "baz",
  qux: "quux",
});

```

### comma-spacing
https://eslint.org/docs/latest/rules/comma-spacing  
Пробел после запятой

```js
// 👎
var foo = 1 ,bar = 2;
var arr = [1 , 2];
var obj = {"foo": "bar" ,"baz": "qur"};
foo(a ,b);
new Foo(a ,b);
function foo(a ,b){}
a ,b

// 👍
var foo = 1, bar = 2, baz = 3;
var arr = [1, 2];
var obj = {"foo": "bar", "baz": "qur"};
foo(a, b);
new Foo(a, b);
function foo(a, b){}
a, b
```


### comma-style
https://eslint.org/docs/latest/rules/comma-style  
Стиль запятых. Запятая должна быть в конце строки.

```js
// 👎
var foo = 1
,
bar = 2;

var foo = 1
  , bar = 2;

var foo = ["apples"
           , "oranges"];

function bar() {
    return {
        "a": 1
        ,"b:": 2
    };
}

// 👍
var foo = 1, bar = 2;

var foo = 1,
  bar = 2;

var foo = ["apples",
  "oranges"];

function bar() {
  return {
    "a": 1,
    "b:": 2
  };
}

```

### computed-property-spacing
https://eslint.org/docs/latest/rules/computed-property-spacing  
Вычисляемые свойства не должны отделяться пробелом.

```js
// 👎
obj[foo ]
obj[ 'foo']
var x = {[ b ]: a}
obj[foo[ bar ]]

const { [ a ]: someProp } = obj;
({ [ b ]: anotherProp } = anotherObj);

// 👍
obj[foo]
obj['foo']
var x = {[b]: a}
obj[foo[bar]]

const { [a]: someProp } = obj;
({ [b]: anotherProp } = anotherObj);
```

### eol-last
https://eslint.org/docs/latest/rules/eol-last  
Новая строка в конце файла - обязательна.

### function-call-argument-newline
https://eslint.org/docs/latest/rules/function-call-argument-newline  
Консистентное расположение аргументов функций

```js
// 👎
foo("one", "two",
    "three");
//or
foo("one",
    "two", "three");

bar("one", "two",
    { one: 1, two: 2}
);

baz("one", "two",
    (x) => { console.log(x); }
);

// 👍
foo("one", "two", "three");
// or
foo(
  "one",
  "two",
  "three"
);

bar("one", "two", {
  one: 1,
  two: 2
});
// or
bar(
  "one",
  "two",
  { one: 1, two: 2 }
);
// or
bar(
  "one",
  "two",
  {
    one: 1,
    two: 2
  }
);

baz("one", "two", (x) => {
  console.log(x);
});
// or
baz(
  "one",
  "two",
  (x) => {
    console.log(x);
  }
);
```

### func-call-spacing
https://eslint.org/docs/latest/rules/func-call-spacing  
Между идентификатором и вызовом функции не должно быть пробелов

```js
// 👎
fn ();

fn
();

// 👍
fn();
```

### func-style
https://eslint.org/docs/latest/rules/func-style
Используем только function declaration и arrow function.

```js
// 👎
let foo = function() {
  // ...
};

// 👍
function foo() {
  // ...
}

// Methods (functions assigned to objects) are not checked by this rule
SomeObject.foo = function() {
  // ...
};

let foo = () => {};
```

### id-denylist
https://eslint.org/docs/rules/id-denylist

Тут вопросик, хотим ли мы банить какой-либо слишком абстрактный нейминг вроде "data", "err", "cb", "callback"


### implicit-arrow-linebreak
https://eslint.org/docs/latest/rules/implicit-arrow-linebreak
расположение стрелки в стрелочной функции

```js
// 👎
(foo) =>
  bar;

(foo) =>
  (bar);

(foo) =>
  bar =>
    baz;

(foo) =>
  (
    bar()
  );

// 👍
(foo) => bar;

(foo) => (bar);

(foo) => bar => baz;

(foo) => (
  bar()
);


```

### indent
https://eslint.org/docs/latest/rules/indent
отступы в выражениях

```js
// 👎
switch(a){
case "a":
    break;
case "b":
    break;
}

var a,
    b,
    c;
const a = 1, 
    b = 2,
    c = 3;

function foo(qux) {
    qux();
}

function foo(qux) {
qux();
}

foo(bar,
    baz,
qux
);

var foo = [
      bar,
baz,
    qux
];

var foo = {
      bar: 1,
baz: 2,
    qux: 3
};

import { foo,
         bar,
         baz,
} from 'qux';

var a =
  foo ? bar :
  baz ? qux :
  boop;

// 👍
switch(a){
  case "a":
    break;
  case "b":
    break;
}

let a,
  b,
  c;
const a = 1,
  b = 2,
  c = 3;

function foo(qux) {
  qux();
}

foo(bar,
  baz,
  qux
);

var foo = [
  bar,
  baz,
  qux
];

var foo = {
  bar: 1,
  baz: 2,
  qux: 3
};

import { foo,
  bar,
  baz,
} from 'qux';

var a =
  foo ? bar :
    baz ? qux :
      boop;
```


### jsx-quotes
https://eslint.org/docs/latest/rules/jsx-quotes
Двойные кавычки предпочтительнее для jsx

```js
// 👎
<a b='c' />

// 👍
<a b="c" />
<a b='"' />
```

### key-spacing
Пробелы между клюем и значением.

```js
// 👎
var obj = { "foo":42 };

// 👍
var obj = { "foo": 42 };
```

### keyword-spacing
Пробелы в выражениях.

```js
// 👎
if (foo) {
    //...
}else if (bar) {
    //...
}else {
    //...
}

if(foo) {
  //...
} else if(bar) {
  //...
} else{
  //...
}

// 👍
if (foo) {
  //...
} else if (bar) {
  //...
} else {
  //...
}


```

### linebreak-style
https://eslint.org/docs/rules/linebreak-style  
Unix стиль переноса строка через LF(/n)

### lines-between-class-members
https://eslint.org/docs/rules/lines-between-class-members  
Методы и свойства классов должны отделяться новой строкой.

```js
// 👎
class MyClass {
  x;
  foo() {
    //...
  }
  bar() {
    //...
  }
}

// 👍
class MyClass {
  x;

  foo() {
    //...
  }

  bar() {
    //...
  }
}
```


### lines-around-directive
https://eslint.org/docs/latest/rules/lines-around-directive  
Директивы должны отделяться пустой строкой.

```js
// 👎
var bar;
"use strict";
var foo;

// 👍
var bar;

"use strict";

var foo;

```


### max-len 100
https://eslint.org/docs/latest/rules/max-len  
Максимальная длина строки (не распространяется на урлы, регулярные выражения, шаблонные строки и комментарии)

### newline-before-return ????
https://eslint.org/docs/latest/rules/newline-before-return
return должен отделяться новой строкой

```js
// 👎
function foo(bar) {
    if (!bar) {
        return;
    }
    return bar;
}

function foo(bar) {
    if (!bar) {
        return;
    }
    /* multi-line
    comment */
    return bar;
}

// 👍

function foo() {
  return;
}

function foo() {

  return;
}

function foo(bar) {
  if (!bar) {
    return;
  }
}

function foo(bar) {
  if (!bar) {
    return;
  }

  return bar;
}

function foo(bar) {
  if (!bar) {

    return;
  }
}

function foo() {

  // comment
  return;
}
```

### no-lonely-if
https://eslint.org/docs/latest/rules/no-lonely-if
Ненужные ифы в else блоках


```js
// 👎
if (foo) {
    // ...
} else {
    if (bar) {
        // ...
    }
}

if (condition) {
  // ...
} else {
  if (anotherCondition) {
    // ...
  }
}

if (condition) {
  // ...
} else {
  if (anotherCondition) {
    // ...
  } else {
    // ...
  }
}

// 👍
if (foo) {
  // ...
} else if (bar) {
  // ...
}


if (condition) {
  // ...
} else if (anotherCondition) {
  // ...
}

if (condition) {
  // ...
} else if (anotherCondition) {
  // ...
} else {
  // ...
}

if (condition) {
  // ...
} else {
  if (anotherCondition) {
    // ...
  }
  doSomething();
}
```

### no-mixed-spaces-and-tabs
https://eslint.org/docs/latest/rules/no-mixed-spaces-and-tabs
Запрещено смешивать табы и пробелы.

### no-multi-assign
https://eslint.org/docs/latest/rules/no-multi-assign  
Запрещено присваивание по цепочке.

```js
// 👎
var a = b = c = 5;

// 👍
var a = 5;
var b = 5;
var c = 5;
```

### no-multiple-empty-lines
https://eslint.org/docs/rules/no-multiple-empty-lines  
Запрещено использование ненужных пустых строк

### no-tabs
https://eslint.org/docs/latest/rules/no-tabs  
Не используем символ табуляции в коде.

### no-trailing-spaces
https://eslint.org/docs/latest/rules/no-trailing-spaces  
Запрещены ненужные пробелы в конце строки

### no-unneeded-ternary
https://eslint.org/docs/rules/no-unneeded-ternary  
Не используем тернарные выражения, там где они не нужны.

```js
// 👎
var isYes = answer === 1 ? true : false;
var isNo = answer === 1 ? false : true;

// 👍
var isYes = answer === 1;
var isNo = answer !== 1;

```

### no-whitespace-before-property
https://eslint.org/docs/latest/rules/no-whitespace-before-property  
Не отделяем пробелами свойства
```js
// 👎
foo. bar
foo .bar
foo. bar. baz
```

### object-curly-spacing
https://eslint.org/docs/latest/rules/object-curly-spacing  
Выражения в фигурных скобках объекта должны быть отделены пробелом

```js
// 👍
// simple object literals
var obj = { foo: "bar" };

// nested object literals
var obj = { foo: { zoo: "bar" } };

// destructuring assignment (EcmaScript 6)
var { x, y } = y;

// import/export declarations (EcmaScript 6)
import { foo } from "bar";
export { foo };
```

### object-curly-newline
https://eslint.org/docs/rules/object-curly-newline  
Если у нас больше || === 4х свойств в объекте - они должны переноситься на новую строку.

```js

let b = {
  foo: 1,
  fob: 1,
  foc: 1,
  fod: 1,
  fod: 1,
};
```

### one-var
https://eslint.org/docs/latest/rules/one-var
Переменные декларируются отдельно друг от друга.


```js
// 👎
function foo() {
    let bar, baz;
}

// 👍
function foo() {
  var bar;
  var baz;
}
```

### padded-blocks
https://eslint.org/docs/latest/rules/padded-blocks  
Запрет ненужных паддингов в блоках

```js
// 👎
if (a) {

    b();

}

if (a) {

    b();
}

if (a) {
    b();

}

class C {

    static {

        a();

    }

}

// 👍
if (a) {
  b();
}


class C {
  static {
    a();
  }
}
```

### prefer-object-spread
https://eslint.org/docs/latest/rules/prefer-object-spread
spred оператор предпочтительнее Object.assign

```js
// 👎
Object.assign({}, foo);
Object.assign({}, {foo: 'bar'});
Object.assign({ foo: 'bar'}, baz);
Object.assign({}, baz, { foo: 'bar' });
Object.assign({}, { ...baz });
// Object.assign with a single argument that is an object literal
Object.assign({});
Object.assign({ foo: bar });


// 👍
({ ...foo });
({ ...baz, foo: 'bar' });
// Any Object.assign call without an object literal as the first argument
Object.assign(foo, { bar: baz });
Object.assign(foo, bar);
Object.assign(foo, { bar, baz });
Object.assign(foo, { ...baz });

```

### quote-props
https://eslint.org/docs/latest/rules/quote-props.html  
Заключаем свойства в двойные кавычки только там, где это необходимо.

```js
// 👎
var object = {
    "a": 0,
    "0": 0,
    "true": 0,
    "null": 0
};

// 👍
var object2 = {
  foo: 'bar',
  baz: 42,
  true: 0,
  0: 0,
  'qux-lorem': true
};

```

### quotes
https://eslint.org/docs/latest/rules/quotes  
Используем одинарные кавычки в коде.

```js
// 👎
var double = "double";
var unescaped = "a string containing 'single' quotes";
// 👍
var single = 'single';
var backtick = `back${x}tick`; 
```

### semi
https://eslint.org/docs/latest/rules/semi    
Используем `;` в коде

```js
// 👎
let name = "ESLint"

object.method = function() {
  // ...
}

class Foo {
  bar = 1
}

// 👍
let name = "ESLint";

object.method = function() {
  // ...
};

class Foo {
  bar = 1;
}
```

### semi-style
https://eslint.org/docs/latest/rules/semi-style  
Определяет положение `;` в конце строки


```js
// 👎
foo()
;[1, 2, 3].forEach(bar)

for (
    var i = 0
    ; i < 10
    ; ++i
) {
    foo()
}

class C {
    static {
        foo()
        ;bar()
    }
}


// 👍
foo();
[1, 2, 3].forEach(bar)

for (
  var i = 0;
  i < 10;
  ++i
) {
  foo()
}

class C {
  static {
    foo();
    bar()
  }
}
```

### space-before-function-paren
https://eslint.org/docs/latest/rules/space-before-function-paren  
Ставятся пробелы перед скобками именованны и стрелочных функций.

```js
// 👎
function foo () {
    // ...
}

var bar = function() {
    // ...
};

class Foo {
    constructor () {
        // ...
    }
}

var foo = {
    bar () {
        // ...
    }
};

// 👍
function foo() {
  // ...
}

var bar = function () {
  // ...
};

class Foo {
  constructor() {
    // ...
  }
}

var foo = {
  bar() {
    // ...
  }
};

var foo = async (a) => await a

```

### space-in-parens
https://eslint.org/docs/latest/rules/space-in-parens  
Пробелы в выражениях в круглых скобках


```js
// 👎
foo( );
foo( 'bar');
foo('bar' );
foo( 'bar' );
foo( /* bar */ );

// 👍
foo();
foo('bar');
```


### space-infix-ops
https://eslint.org/docs/latest/rules/space-infix-ops
Обязательные пробелы между операторами

```js
// 👎
a+b

a+ b

a +b

a?b:c

// 👍
let sum = 1 + 2;
```

### space-unary-ops
https://eslint.org/docs/latest/rules/space-unary-ops  
Использование пробелов для унарных операторов.

```js
// 👎
typeof!foo;
void{foo:0};
new[foo][0];
delete(foo.bar);
++ foo;
foo --;
- foo;
+ "3";

// 👍
typeof !foo;
void {foo:0};
new [foo][0];
delete (foo.bar);
++foo;
foo--;
-foo;
+"3";

```

### no-undef
https://eslint.org/docs/latest/rules/no-undef  
Запрет использования не декларированных перменных

```js
// 👎
var foo = someFunction();
var bar = a + 1;
```

### no-unused-vars
https://eslint.org/docs/latest/rules/no-unused-vars  
Запрещает неиспользуемые переменные.


### arrow-parens
https://eslint.org/docs/latest/rules/arrow-parens
Аргументы стрелочных функций должны быть заключены в скобки.


```js
// 👎
a => {};
a => a;
a => {'\n'};
a.then(foo => {});
a.then(foo => a);
a(foo => { if (true) {} });

// 👍
() => {};
(a) => {};
(a) => a;
(a) => {'\n'}
a.then((foo) => {});
a.then((foo) => { if (true) {} });
```

### arrow-spacing
https://eslint.org/docs/latest/rules/arrow-spacing  
Стрелка должна быть отделена от аргументов и тела пробелами

```js
// 👎
(a)=>{}

// 👍
(a) => {}
```

### constructor-super
https://eslint.org/docs/latest/rules/constructor-super  
Если мы расширяем другой класс, мы должны вызывать `super`

```js
// 👎
class A {
    constructor() {
        super();  // This is a SyntaxError.
    }
}

class A extends B {
    constructor() { }  // Would throw a ReferenceError.
}

// 👍
class A {
  constructor() { }
}

class A extends B {
  constructor() {
    super();
  }
}
```

### generator-star-spacing yield-star-spacing
https://eslint.org/docs/latest/rules/generator-star-spacing  
https://eslint.org/docs/latest/rules/yield-star-spacing  
Местонахождение звёздочки у генераторов

```js
// 👍
function* generator() {}
var anonymous = function* () {};
var shorthand = { * generator() {} };

function* generator() {
  yield* other();
}
```

### no-class-assign
https://eslint.org/docs/latest/rules/no-class-assign  
Запрет переопределения классов

```js
// 👎
class A { }
A = 0;

// 👍
let A = class A { }
A = 0;

```

### no-dupe-class-members
https://eslint.org/docs/latest/rules/no-dupe-class-members
Запрет дублирования свойств и методов классов.

### no-this-before-super
https://eslint.org/docs/rules/no-this-before-super  
Запрет использования this до вызова super()

### prefer-const
https://eslint.org/docs/latest/rules/prefer-const  
Если переменная не изменяется, то предпочтительнее использовать const.

### prefer-rest-params
https://eslint.org/docs/rules/prefer-rest-params  
...args предпочтительнее псевдомассива arguments

### prefer-template
https://eslint.org/docs/rules/prefer-template    
Шаблонные строки предпочтительнее "str" + str

### require-yield
https://eslint.org/docs/rules/require-yield  
В генераторах должен быть yield
