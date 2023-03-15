// Получаем элементы калькулятора
const calculator = document.querySelector('.calculator')
const display = calculator.querySelector('.calculator__display')
const buttons = calculator.querySelectorAll('.calculator__button')

// Создаем переменные для хранения значений
let currentOperand = ''
let previousOperand = ''
let operation = undefined

// Функция для обновления значения на дисплее
function updateDisplay() {
  display.innerText = currentOperand
}

// Функция для добавления числа или точки
function appendNumber(number) {
  if (number === '.' && currentOperand.includes('.')) return
  currentOperand = currentOperand.toString() + number.toString()
  updateDisplay()
}

// Функция для выбора операции
function chooseOperation(selectedOperation) {
  if (currentOperand === '') return
  if (previousOperand !== '') {
    compute()
  }
  operation = selectedOperation
  previousOperand = currentOperand
  currentOperand = ''
}

// Функция для вычисления результата
function compute() {
  let result
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(current)) return
  switch (operation) {
    case '+':
      result = prev + current
      break
    case '-':
      result = prev - current
      break
    case '*':
      result = prev * current
      break
    case '÷':
      result = prev / current
      break
    default:
      return
  }
  currentOperand = result
  operation = undefined
  previousOperand = ''
}

// Функция для очистки калькулятора
function clear() {
  currentOperand = ''
  previousOperand = ''
  operation = undefined
  updateDisplay()
}

// Добавляем обработчики событий для кнопок калькулятора
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.dataset.value
    if (value === 'C') {
      clear()
    } else if (value === '=') {
      compute()
      updateDisplay()
    } else if (isNaN(value)) {
      chooseOperation(value)
    } else {
      appendNumber(value)
    }
  })
})
