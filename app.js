// ===== NEXORA AI — Interactive Portfolio =====

document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initStatCounter();
    initDemoTabs();
    initChatbot();
    initAutomation();
    initScrollAnimations();
});

// ===== NAVIGATION =====
function initNav() {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('navToggle');
    const links = document.querySelector('.nav-links');

    window.addEventListener('scroll', () => {
        nav.style.borderBottomColor = window.scrollY > 50
            ? 'rgba(42,42,50,1)' : 'rgba(42,42,50,0.5)';
    });

    if (toggle) {
        toggle.addEventListener('click', () => {
            if (links.style.display === 'flex') {
                links.style.display = 'none';
            } else {
                links.style.display = 'flex';
                links.style.flexDirection = 'column';
                links.style.position = 'absolute';
                links.style.top = '64px';
                links.style.left = '0';
                links.style.right = '0';
                links.style.background = 'rgba(9,9,11,0.95)';
                links.style.padding = '24px';
                links.style.gap = '16px';
                links.style.borderBottom = '1px solid var(--border)';
            }
        });
    }
}

// ===== STAT COUNTER ANIMATION =====
function initStatCounter() {
    const stats = document.querySelectorAll('.stat-num');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNum(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

function animateNum(el) {
    const target = parseInt(el.dataset.target);
    const duration = 1500;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

// ===== DEMO TABS =====
function initDemoTabs() {
    const tabs = document.querySelectorAll('.demo-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            document.querySelectorAll('.demo-panel').forEach(p => p.classList.remove('active'));
            document.getElementById('demo-' + tab.dataset.tab).classList.add('active');
        });
    });
}

// ===== CHATBOT DEMO =====
function initChatbot() {
    const input = document.getElementById('chatInput');
    const sendBtn = document.getElementById('chatSend');
    const messages = document.getElementById('chatMessages');
    const suggestions = document.querySelectorAll('.suggestion');

    const responses = {
        'shipping': {
            text: `Great question! We offer several shipping options:\n\n📦 **Standard Shipping** — Free on orders over $50 (5-7 business days)\n🚀 **Express Shipping** — $9.99 (2-3 business days)\n⚡ **Next Day Delivery** — $19.99 (order before 2PM)\n\nAll orders include tracking. Would you like to place an order?`
        },
        'return': {
            text: `Our return policy is hassle-free! Here's how it works:\n\n✅ **30-day return window** from delivery date\n✅ **Free return shipping** on all orders\n✅ **Full refund** within 5 business days\n\nJust go to your order page and click "Start Return." Need help with a specific item?`
        },
        'discount': {
            text: `You're in luck! 🎉 Here are our current deals:\n\n🔥 **WELCOME15** — 15% off your first order\n💎 **BUNDLE20** — 20% off when you buy 3+ items\n⭐ **VIP members** get exclusive early access to sales\n\nWant me to apply a code to your cart?`
        },
        'product': {
            text: `I'd love to help! To find the perfect product, I have a few questions:\n\n1. What **category** are you looking for? (Electronics, Home, Fashion)\n2. What's your **budget range**?\n3. Any **specific features** you need?\n\nOr tell me what problem you're trying to solve, and I'll recommend the best options! 🛍️`
        },
        'human': {
            text: `Of course! I'll connect you with a human agent right away. 👤\n\n⏳ **Estimated wait time:** 2 minutes\n📞 You can also call us at: **1-800-TECH-PRO**\n💬 Or email: **support@techstorepro.com**\n\nWhile you wait, is there anything else I can help with?`
        },
        'payment': {
            text: `We accept a wide range of payment methods! 💳\n\n✅ **Credit/Debit Cards** — Visa, Mastercard, Amex\n✅ **Digital Wallets** — Apple Pay, Google Pay, PayPal\n✅ **Buy Now, Pay Later** — Klarna, Afterpay (4 interest-free payments)\n✅ **Crypto** — Bitcoin, Ethereum\n\nAll payments are secured with 256-bit encryption. 🔒`
        },
        'default': {
            text: `Thanks for your message! I understand you're asking about that. Let me help:\n\n🔍 I can assist you with:\n• Product information & recommendations\n• Order status & tracking\n• Shipping & returns\n• Payment & billing\n• Technical support\n\nCould you tell me a bit more about what you need? I'll make sure you get the right help! 😊`
        }
    };

    function getResponse(msg) {
        const lower = msg.toLowerCase();
        if (lower.includes('ship') || lower.includes('deliver')) return responses.shipping;
        if (lower.includes('return') || lower.includes('refund')) return responses.return;
        if (lower.includes('discount') || lower.includes('coupon') || lower.includes('deal') || lower.includes('sale')) return responses.discount;
        if (lower.includes('product') || lower.includes('recommend') || lower.includes('choosing') || lower.includes('help')) return responses.product;
        if (lower.includes('human') || lower.includes('person') || lower.includes('agent') || lower.includes('speak')) return responses.human;
        if (lower.includes('pay') || lower.includes('credit') || lower.includes('method')) return responses.payment;
        return responses.default;
    }

    function addMessage(text, type) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${type}`;

        const bubble = document.createElement('div');
        bubble.className = 'msg-bubble';
        bubble.innerHTML = text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        const time = document.createElement('div');
        time.className = 'msg-time';
        time.textContent = 'Just now';

        msgDiv.appendChild(bubble);
        msgDiv.appendChild(time);
        messages.appendChild(msgDiv);
        messages.scrollTop = messages.scrollHeight;
        return msgDiv;
    }

    function showTyping() {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-msg bot';
        msgDiv.id = 'typing';

        const bubble = document.createElement('div');
        bubble.className = 'msg-bubble';
        bubble.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';

        msgDiv.appendChild(bubble);
        messages.appendChild(msgDiv);
        messages.scrollTop = messages.scrollHeight;
    }

    function removeTyping() {
        const el = document.getElementById('typing');
        if (el) el.remove();
    }

    function sendMessage(text) {
        if (!text.trim()) return;
        addMessage(text, 'user');
        input.value = '';

        showTyping();

        const delay = 800 + Math.random() * 1200;
        setTimeout(() => {
            removeTyping();
            const resp = getResponse(text);
            addMessage(resp.text, 'bot');
        }, delay);
    }

    sendBtn.addEventListener('click', () => sendMessage(input.value));
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage(input.value);
    });

    suggestions.forEach(btn => {
        btn.addEventListener('click', () => {
            sendMessage(btn.dataset.msg);
        });
    });
}

// ===== AUTOMATION DEMO =====
function initAutomation() {
    const triggers = document.querySelectorAll('.auto-trigger');
    let isRunning = false;

    const emailData = {
        support: {
            email: {
                from: 'john.doe@gmail.com',
                subject: 'My order #4521 hasn\'t arrived yet',
                body: 'Hi, I placed an order 10 days ago and still haven\'t received it. Order number is #4521. Can you please check?'
            },
            classification: { category: 'Customer Support', priority: 'High', sentiment: 'Frustrated' },
            extracted: { orderNumber: '#4521', customerName: 'John Doe', issue: 'Delayed delivery', daysSinceOrder: 10 },
            routing: { team: 'Support Team', assignee: 'Agent Sarah M.', sla: '4 hours' },
            response: 'Hi John, I\'m sorry about the delay with order #4521. I\'ve checked and your package is currently in transit — it should arrive within 1-2 business days. I\'ve also applied a 10% discount to your next order as an apology. Tracking link has been sent to your email.'
        },
        invoice: {
            email: {
                from: 'billing@acmecorp.com',
                subject: 'Invoice #INV-2024-0892 — Payment Due March 15',
                body: 'Please find attached invoice #INV-2024-0892 for $3,450.00. Payment terms: Net 15. Bank details attached.'
            },
            classification: { category: 'Finance / Invoice', priority: 'Medium', sentiment: 'Neutral' },
            extracted: { invoiceNumber: '#INV-2024-0892', amount: '$3,450.00', dueDate: 'March 15, 2026', vendor: 'Acme Corp' },
            routing: { team: 'Finance Team', assignee: 'Controller Mike R.', sla: '24 hours' },
            response: 'Invoice #INV-2024-0892 from Acme Corp ($3,450.00) has been logged in the accounting system. Due date: March 15. Auto-scheduled for payment on March 13. Approval request sent to Controller Mike R.'
        },
        lead: {
            email: {
                from: 'emma.wilson@techstartup.io',
                subject: 'Interested in your Enterprise plan',
                body: 'Hi, I\'m the CTO of TechStartup (50 employees). We\'re looking for an AI automation solution. Can we schedule a demo? Budget is around $5-10K.'
            },
            classification: { category: 'Sales Lead', priority: 'Urgent', sentiment: 'Positive' },
            extracted: { contactName: 'Emma Wilson', company: 'TechStartup', role: 'CTO', teamSize: '50 employees', budget: '$5-10K' },
            routing: { team: 'Sales Team', assignee: 'AE David K.', sla: '1 hour' },
            response: 'Hi Emma! Thanks for your interest in our Enterprise plan. I\'d love to set up a personalized demo for TechStartup. I\'ve reserved a slot this Thursday at 2 PM — does that work? I\'ll prepare a custom proposal based on your team size. Looking forward to it!'
        },
        complaint: {
            email: {
                from: 'angry_customer@email.com',
                subject: 'TERRIBLE SERVICE - I want a full refund NOW',
                body: 'This is the WORST experience I\'ve ever had. Your product broke after 2 days and nobody answers the phone. I want a FULL REFUND immediately or I\'m leaving a 1-star review everywhere.'
            },
            classification: { category: 'Complaint — Escalated', priority: 'Critical', sentiment: 'Very Negative' },
            extracted: { issue: 'Product defect + support unavailability', urgency: 'Immediate', churnRisk: 'Very High', requestedAction: 'Full refund' },
            routing: { team: 'Customer Success (Manager)', assignee: 'CS Manager Lisa H.', sla: '30 minutes' },
            response: 'I sincerely apologize for this frustrating experience. I\'ve processed a full refund immediately — you\'ll see it in 2-3 business days. I\'m also sending a free replacement unit via express shipping. Our CS Manager Lisa will personally follow up within 30 minutes to ensure everything is resolved.'
        }
    };

    triggers.forEach(btn => {
        btn.addEventListener('click', () => {
            if (isRunning) return;
            runAutomation(btn.dataset.type);
        });
    });

    async function runAutomation(type) {
        isRunning = true;
        const data = emailData[type];
        const status = document.getElementById('autoStatus');
        const output = document.getElementById('autoOutput');
        const steps = ['receive', 'classify', 'extract', 'route', 'respond'];

        // Reset
        steps.forEach(s => {
            document.getElementById('step-' + s).className = 'pipeline-step';
        });
        document.querySelectorAll('.pipeline-connector').forEach(c => c.className = 'pipeline-connector');
        status.textContent = 'Processing...';
        status.className = 'auto-status running';
        output.innerHTML = '<div class="auto-placeholder">Processing incoming email...</div>';

        const connectors = document.querySelectorAll('.pipeline-connector');

        // Step 1: Receive
        await delay(500);
        activateStep('receive');
        output.innerHTML = renderEmailPreview(data.email);

        // Step 2: Classify
        await delay(1200);
        completeStep('receive');
        if (connectors[0]) connectors[0].classList.add('done');
        activateStep('classify');
        await delay(1000);
        output.innerHTML = renderClassification(data.classification);

        // Step 3: Extract
        completeStep('classify');
        if (connectors[1]) connectors[1].classList.add('done');
        activateStep('extract');
        await delay(1000);
        output.innerHTML = renderExtracted(data.extracted);

        // Step 4: Route
        completeStep('extract');
        if (connectors[2]) connectors[2].classList.add('done');
        activateStep('route');
        await delay(800);
        output.innerHTML = renderRouting(data.routing);

        // Step 5: Respond
        completeStep('route');
        if (connectors[3]) connectors[3].classList.add('done');
        activateStep('respond');
        await delay(1000);
        completeStep('respond');
        output.innerHTML = renderResponse(data.response);

        status.textContent = 'Completed ✓';
        status.className = 'auto-status';
        isRunning = false;
    }

    function activateStep(id) {
        document.getElementById('step-' + id).className = 'pipeline-step active';
    }
    function completeStep(id) {
        document.getElementById('step-' + id).className = 'pipeline-step done';
    }
    function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

    function renderEmailPreview(email) {
        return `<div class="auto-result">
            <span class="result-label label-category">📨 Incoming Email</span>
            <p><strong>From:</strong> ${email.from}<br>
            <strong>Subject:</strong> ${email.subject}<br><br>
            "${email.body}"</p>
        </div>`;
    }

    function renderClassification(cls) {
        return `<div class="auto-result">
            <span class="result-label label-category">🧠 AI Classification</span>
            <span class="result-label label-priority" style="margin-left:8px">Priority: ${cls.priority}</span>
            <p><strong>Category:</strong> ${cls.category}<br>
            <strong>Sentiment:</strong> ${cls.sentiment}<br>
            <strong>Priority:</strong> ${cls.priority}</p>
        </div>`;
    }

    function renderExtracted(ext) {
        const entries = Object.entries(ext).map(([k, v]) =>
            `<strong>${k.replace(/([A-Z])/g, ' $1').trim()}:</strong> ${v}`
        ).join('<br>');
        return `<div class="auto-result">
            <span class="result-label label-action">🔍 Extracted Data</span>
            <p>${entries}</p>
        </div>`;
    }

    function renderRouting(route) {
        return `<div class="auto-result">
            <span class="result-label label-category">🔀 Routed</span>
            <p><strong>Team:</strong> ${route.team}<br>
            <strong>Assigned to:</strong> ${route.assignee}<br>
            <strong>SLA:</strong> ${route.sla}</p>
        </div>`;
    }

    function renderResponse(text) {
        return `<div class="auto-result">
            <span class="result-label label-action">✉️ Auto-Generated Response</span>
            <p>"${text}"</p>
            <p style="margin-top:12px;color:var(--success);font-weight:600">✅ Email sent successfully — Total processing time: 4.2 seconds</p>
        </div>`;
    }
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.service-card, .result-card, .price-card, .process-step').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}
