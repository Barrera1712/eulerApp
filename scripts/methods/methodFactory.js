function createMethod(type, f, x0, y0, h, xf) {
    if (type === 'heun') {
        return new HeunMethod(f, x0, y0, h, xf);
    } else {
        throw new Error("Método no implementado");
    }
}
