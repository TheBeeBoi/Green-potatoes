var a = 0.01;
const func = () => {
    a = a+a
    console.log(a)
    setTimeout(func, 20)
}

func()