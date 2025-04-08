function HeunMethod(f, x0, y0, h, xf) {
    this.f = f;
    this.x0 = x0;
    this.y0 = y0;
    this.h = h;
    this.xf = xf;

    this.solve = function () {
        const results = [];
        let x = this.x0;
        let y = this.y0;

        results.push({ x, y });

        while (x < this.xf) {
            const k1 = this.f(x, y);
            const k2 = this.f(x + this.h, y + this.h * k1);
            y = y + (this.h / 2) * (k1 + k2);
            x = x + this.h;
            results.push({ x, y });
        }

        return results;
    };
}
