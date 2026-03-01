export class HistoryManager {
    constructor() {
        this.historyList = document.getElementById('history-list');
        this.historySearch = document.getElementById('history-search');
        this.exportCsvBtn = document.getElementById('export-csv');
        this.exportPdfBtn = document.getElementById('export-pdf');
        this.calculations = this.load();
        this.render();
        this.attachEventListeners();
    }

    load() {
        return JSON.parse(localStorage.getItem('calculatorHistory')) || [];
    }

    save() {
        localStorage.setItem('calculatorHistory', JSON.stringify(this.calculations));
    }

    add(expression, result) {
        if (!expression || !result) return;
        const newEntry = {
            id: Date.now(),
            expression,
            result,
            tag: '',
            timestamp: new Date().toISOString()
        };
        this.calculations.unshift(newEntry);
        if (this.calculations.length > 100) { // Limit history size
            this.calculations.pop();
        }
        this.save();
        this.render();
    }

    render(filter = '') {
        this.historyList.innerHTML = '';
        const filteredCalcs = this.calculations.filter(c => 
            c.expression.includes(filter) || 
            c.result.toString().includes(filter) || 
            c.tag.toLowerCase().includes(filter.toLowerCase())
        );

        if (filteredCalcs.length === 0) {
            this.historyList.innerHTML = '<li class="history-item"><p style="text-align:center; opacity:0.7;">No history yet.</p></li>';
            return;
        }

        filteredCalcs.forEach(calc => {
            const item = document.createElement('li');
            item.className = 'history-item';
            item.dataset.id = calc.id;
            item.innerHTML = `
                <div class="expression">${calc.expression} =</div>
                <div class="result">${calc.result}</div>
                <div class="history-item-footer">
                    <input type="text" class="tag-input" value="${calc.tag}" placeholder="Add a tag...">
                    <div class="history-actions">
                        <button class="copy-btn" title="Copy Result">📋</button>
                        <button class="share-btn" title="Share">🔗</button>
                    </div>
                </div>
            `;
            this.historyList.appendChild(item);
        });
    }

    updateTag(id, tag) {
        const index = this.calculations.findIndex(c => c.id == id);
        if (index > -1) {
            this.calculations[index].tag = tag;
            this.save();
        }
    }

    attachEventListeners() {
        this.historySearch.addEventListener('input', () => this.render(this.historySearch.value));

        this.historyList.addEventListener('change', (e) => {
            if (e.target.classList.contains('tag-input')) {
                const id = e.target.closest('.history-item').dataset.id;
                this.updateTag(id, e.target.value);
            }
        });

        this.historyList.addEventListener('click', (e) => {
            const item = e.target.closest('.history-item');
            if (!item) return;

            const calc = this.calculations.find(c => c.id == item.dataset.id);
            if (!calc) return;
            
            const textToShare = `${calc.expression} = ${calc.result}`;

            if (e.target.classList.contains('copy-btn')) {
                navigator.clipboard.writeText(calc.result).then(() => alert('Result copied!'));
            } else if (e.target.classList.contains('share-btn')) {
                if (navigator.share) {
                    navigator.share({ title: 'Calculator Result', text: textToShare });
                } else {
                    alert('Web Share API not supported in your browser.');
                }
            }
        });

        this.exportCsvBtn.addEventListener('click', () => this.export('csv'));
        this.exportPdfBtn.addEventListener('click', () => this.export('pdf'));
    }

    export(format) {
        if (this.calculations.length === 0) return;
        const headers = ["Timestamp", "Expression", "Result", "Tag"];
        const rows = this.calculations.map(c => [
            new Date(c.timestamp).toLocaleString(), c.expression, c.result, c.tag
        ]);

        if (format === 'csv') {
            let csvContent = "data:text/csv;charset=utf-8," 
                + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `calculation_history_${Date.now()}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else if (format === 'pdf') {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            doc.autoTable({
                head: [headers],
                body: rows,
            });
            doc.save(`calculation_history_${Date.now()}.pdf`);
        }
    }
}