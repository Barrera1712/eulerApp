document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('euler-form');
    const resultTable = document.getElementById('result-table').querySelector('tbody');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const fRaw = document.getElementById('equation').value;
        const x0 = parseFloat(document.getElementById('x0').value);
        const y0 = parseFloat(document.getElementById('y0').value);
        const h = parseFloat(document.getElementById('h').value);
        const xf = parseFloat(document.getElementById('xf').value);

        // Validar que la ecuación sea correcta
        if (!isValidFunction(fRaw)) {
            alert('La función ingresada no es válida. Asegúrese de usar solo números, operadores y la variable "x".');
            return;
        }

        // Validaciones
        if (!fRaw || isNaN(x0) || isNaN(y0) || isNaN(h) || isNaN(xf)) {
            alert('Por favor, complete todos los campos correctamente.');
            return;
        }

        if (x0 < 0 || y0 < 0 || h <= 0 || xf <= 0) {
            alert('Los valores de x₀, y₀, h y xf deben ser números positivos.');
            return;
        }

        if (h === 0) {
            alert('El valor de h (paso) no puede ser igual a 0.');
            return;
        }

        const f = new Function('x', 'y', `return ${fRaw}`);
        const method = createMethod('heun', f, x0, y0, h, xf);
        const result = method.solve();

        resultTable.innerHTML = '';
        result.forEach((row, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td>${index}</td>
            <td>${row.x.toFixed(4)}</td>
            <td>${row.y.toFixed(4)}</td>
        `;
            resultTable.appendChild(tr);
        });
    });
});

// Función para validar la entrada de la ecuación
function isValidFunction(fRaw) {
    // Expresión regular que permite x, y y operadores matemáticos válidos.
    const validPattern = /^[\d\+\-\*\/xy\(\)\s\.\,]*([sin|cos|tan|exp|log|sqrt|Math\.PI|Math\.pow|Math\.log10]+[\d\+\-\*\/\^xy\(\)\s\.\,]*)+$/;

    // Verifica que la expresión coincida con el patrón y contenga x y/o y.
    if (validPattern.test(fRaw) && (fRaw.includes('x') || fRaw.includes('y'))) {
        return true;
    }

    return false;
}