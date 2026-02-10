document.addEventListener('DOMContentLoaded', () => {
    // Reveal Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.querySelector('.stat-number')) startCounters();
                if (entry.target.id === 'terminalBody') typeTerminal();
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Stats Counter logic
    function startCounters() {
        document.querySelectorAll('.stat-number').forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const inc = target / 100;
            const update = () => {
                if (count < target) {
                    count += inc;
                    counter.innerText = Math.ceil(count);
                    setTimeout(update, 20);
                } else counter.innerText = target;
            };
            update();
        });
    }

    // Terminal Typing Simulation
    const terminalLines = [
        { text: "$ endpoint-it diagnose --all", color: "#fff" },
        { text: "Checking system health...", color: "#9ca3af" },
        { text: "✔ Disk space: OK", color: "#27c93f" },
        { text: "✖ VPN Client: Configuration error found", color: "#ff5f56" },
        { text: "Applying fix IT-402...", color: "#6366f1" },
        { text: "✔ VPN connectivity restored.", color: "#27c93f" }
    ];

    function typeTerminal() {
        const body = document.getElementById('terminalBody');
        if (body.innerHTML !== "") return; // Prevent double trigger
        
        terminalLines.forEach((line, i) => {
            setTimeout(() => {
                const div = document.createElement('div');
                div.style.color = line.color;
                div.style.marginBottom = "8px";
                div.innerText = line.text;
                body.appendChild(div);
            }, i * 1000);
        });
    }
});
