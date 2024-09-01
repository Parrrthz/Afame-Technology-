const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const history = document.getElementById('history');
const toggleHistoryBtn = document.getElementById('toggle-history');
const historyTable = document.getElementById('history-table');

let expression = '';
let historyIndex = 1;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'AC') {
            expression = '';
            display.textContent = '0';
        } else if (value === 'DEL') {
            expression = expression.slice(0, -1);
            display.textContent = expression || '0';
        } else if (value === '=') {
            try {
                let result = evalExpression(expression);
                display.textContent = result;
                addToHistory(expression, result);
                expression = result.toString();
            } catch {
                display.textContent = 'Error';
            }
        } else {
            if (expression === '0' && !isNaN(value)) {
                expression = value;
            } else {
                expression += value;
            }
            display.textContent = expression;
        }
    });
});

function evalExpression(exp) {
    if (exp.includes('√')) {
        exp = exp.replace('√', 'Math.sqrt');
    }
    if (exp.includes('^')) {
        const parts = exp.split('^');
        return Math.pow(eval(parts[0]), eval(parts[1]));
    }
    return eval(exp);
}

function addToHistory(exp, result) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${historyIndex++}</td>
        <td>${exp}</td>
        <td>${result}</td>
    `;
    history.appendChild(row);
}

toggleHistoryBtn.addEventListener('click', () => {
    historyTable.style.display = historyTable.style.display === 'none' ? 'table' : 'none';
});
