const filterBtns = document.querySelectorAll('.filter-btn');
const tableRows = document.querySelectorAll('tbody tr');
const tableContainer = document.querySelector('.table-container');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {

        filterBtns.forEach(b => b.classList.remove('active'));

        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        tableContainer.classList.add('loading');

        setTimeout(() => {
            tableRows.forEach(row => {
                const category = row.getAttribute('data-category');
                if (filter === 'all') {
                    row.classList.remove('hidden');
                } else {
                    if (category && category.includes(filter)) {
                        row.classList.remove('hidden');
                    } else {
                        row.classList.add('hidden');
                    }
                }
            });
            tableContainer.classList.remove('loading');
        }, 150); // Simulate loading delay
    });
});

