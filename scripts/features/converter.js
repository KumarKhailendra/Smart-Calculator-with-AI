export function unitConverter() {
    const converterInput = document.getElementById('converter-input');
    const converterResult = document.getElementById('converter-result');

    if (!converterInput || !converterResult) return;

    const converterUnits = () => {
        const query = converterInput.value.trim().toLowerCase();
        if (!query) {
            converterResult.textContent = "";
            return;
        }

        const regex = /^(?:convert\s)?([\d.]+)\s*([a-zA-Z]+)\s+(?:to|in)\s+([a-zA-Z]+)$/i;

        const match = query.match(regex);

        if (!match) {
            converterResult.textContent = "Try '10 kg to lbs'";
            return;
        }

        try {
            const value = parseFloat(match[1]);
            const fromUnit = match[2];
            const toUnit = match[3];

            const result = math.unit(value, fromUnit).to(toUnit);
            const resultString = result.format({ precision: 4 });
            converterResult.textContent = resultString
        } catch (error) {
            converterResult.textContent = "Invalid units.";
        }
    }

    converterInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || converterInput.value.endsWith(' ')) {
            converterUnits();
        }
    });
}