// ===== NEXORA AI — Interactive Portfolio =====

document.addEventListener('DOMContentLoaded', () => {
    initBanner();
    initNav();
    initStatCounter();
    initDemoTabs();
    initChatbot();
    initAutomation();
    initFAQ();
    initContactForm();
    initScrollAnimations();
});

// ===== TOP BANNER =====
function initBanner() {
    const banner = document.getElementById('topBanner');
    const close = document.getElementById('bannerClose');
    if (close) {
        close.addEventListener('click', () => banner.classList.add('hidden'));
    }
}

// ===== NAVIGATION =====
function initNav() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');

    if (toggle && links) {
        toggle.addEventListener('click', () => {
            links.classList.toggle('open');
            toggle.textContent = links.classList.contains('open') ? '✕' : '☰';
        });
        // Close menu on link click (mobile)
        links.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                links.classList.remove('open');
                toggle.textContent = '☰';
            });
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
        const progress = Math.min((now - start) / duration, 1);
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
            text: `Great question! Here are our shipping options:\n\n📦 **Standard Shipping** — Free on orders over $50 (5-7 business days)\n🚀 **Express Shipping** — $9.99 (2-3 business days)\n⚡ **Next Day Delivery** — $19.99 (order before 2PM)\n🌍 **International** — $14.99 (7-14 business days)\n\nAll orders include real-time tracking. Want to place an order?`
        },
        'return': {
            text: `Our return policy is hassle-free:\n\n✅ **30-day return window** from delivery date\n✅ **Free return shipping** on all orders\n✅ **Full refund** processed within 3-5 business days\n✅ **Exchange option** available at no extra cost\n\nJust visit your order page and click "Start Return." Need help with a specific item?`
        },
        'discount': {
            text: `You're in luck! 🎉 Current promotions:\n\n🔥 **WELCOME15** — 15% off your first order\n💎 **BUNDLE20** — 20% off when you buy 3+ items\n🌟 **FLASH30** — 30% off select electronics (ends Friday)\n⭐ **VIP members** get exclusive early access\n\nShall I apply a code to your cart?`
        },
        'product': {
            text: `I'd love to help you find the perfect product! Quick questions:\n\n1. What **category**? (Laptops, Phones, Audio, Accessories)\n2. What's your **budget range**?\n3. Any **must-have features**? (battery life, screen size, etc.)\n\nOr just tell me what you're trying to do — I'll find the best match! 🛍️`
        },
        'human': {
            text: `Of course! Connecting you to a human agent now. 👤\n\n⏳ **Estimated wait:** ~2 minutes\n📞 **Direct line:** 1-800-TECH-PRO\n💬 **Email:** support@techstorepro.com\n\n_I've passed along our conversation summary so you won't need to repeat anything._\n\nAnything else I can help with while you wait?`
        },
        'payment': {
            text: `We accept a wide range of payment methods! 💳\n\n✅ **Cards** — Visa, Mastercard, Amex, Discover\n✅ **Digital Wallets** — Apple Pay, Google Pay, PayPal\n✅ **Buy Now, Pay Later** — Klarna (4 interest-free payments)\n✅ **Wire Transfer** — For orders over $1,000\n\nAll payments secured with 256-bit encryption. 🔒`
        },
        'default': {
            text: `Thanks for your message! I can help you with:\n\n🛍️ **Product recommendations** — Tell me what you need\n📦 **Order & shipping** — Track or manage orders\n🔄 **Returns & refunds** — Hassle-free process\n💰 **Deals & discounts** — Current promotions\n💳 **Payment options** — All methods we accept\n👤 **Human agent** — Connect anytime\n\nWhat would you like help with?`
        }
    };

    function getResponse(msg) {
        const lower = msg.toLowerCase();
        if (lower.includes('ship') || lower.includes('deliver') || lower.includes('track')) return responses.shipping;
        if (lower.includes('return') || lower.includes('refund') || lower.includes('exchange')) return responses.return;
        if (lower.includes('discount') || lower.includes('coupon') || lower.includes('deal') || lower.includes('sale') || lower.includes('promo')) return responses.discount;
        if (lower.includes('product') || lower.includes('recommend') || lower.includes('choos') || lower.includes('laptop') || lower.includes('phone') || lower.includes('help')) return responses.product;
        if (lower.includes('human') || lower.includes('person') || lower.includes('agent') || lower.includes('speak') || lower.includes('talk')) return responses.human;
        if (lower.includes('pay') || lower.includes('credit') || lower.includes('method') || lower.includes('card')) return responses.payment;
        return responses.default;
    }

    function addMessage(text, type) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${type}`;
        const bubble = document.createElement('div');
        bubble.className = 'msg-bubble';
        bubble.innerHTML = text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/_(.*?)_/g, '<em>$1</em>');
        const time = document.createElement('div');
        time.className = 'msg-time';
        time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        msgDiv.appendChild(bubble);
        msgDiv.appendChild(time);
        messages.appendChild(msgDiv);
        messages.scrollTop = messages.scrollHeight;
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
        const delay = 600 + Math.random() * 1000;
        setTimeout(() => {
            removeTyping();
            addMessage(getResponse(text).text, 'bot');
        }, delay);
    }

    sendBtn.addEventListener('click', () => sendMessage(input.value));
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage(input.value);
    });
    suggestions.forEach(btn => {
        btn.addEventListener('click', () => sendMessage(btn.dataset.msg));
    });
}

// ===== AUTOMATION DEMO =====
function initAutomation() {
    const triggers = document.querySelectorAll('.auto-trigger');
    let isRunning = false;

    const emailData = {
        support: {
            email: { from: 'john.doe@gmail.com', subject: 'My order #4521 hasn\'t arrived yet', body: 'Hi, I placed an order 10 days ago and still haven\'t received it. Order number is #4521. Can you please check?' },
            classification: { category: 'Customer Support', priority: 'High', sentiment: 'Frustrated' },
            extracted: { orderNumber: '#4521', customerName: 'John Doe', issue: 'Delayed delivery', daysSinceOrder: '10 days' },
            routing: { team: 'Support Team', assignee: 'Agent Sarah M.', sla: '4 hours' },
            response: 'Hi John, I\'m sorry about the delay with order #4521. I\'ve checked and your package is currently in transit — it should arrive within 1-2 business days. I\'ve also applied a 10% discount to your next order as an apology. Tracking link has been sent to your email.'
        },
        invoice: {
            email: { from: 'billing@acmecorp.com', subject: 'Invoice #INV-2024-0892 — Payment Due March 15', body: 'Please find attached invoice #INV-2024-0892 for $3,450.00. Payment terms: Net 15. Bank details attached.' },
            classification: { category: 'Finance / Invoice', priority: 'Medium', sentiment: 'Neutral' },
            extracted: { invoiceNumber: '#INV-2024-0892', amount: '$3,450.00', dueDate: 'March 15, 2026', vendor: 'Acme Corp' },
            routing: { team: 'Finance Team', assignee: 'Controller Mike R.', sla: '24 hours' },
            response: 'Invoice #INV-2024-0892 from Acme Corp ($3,450.00) has been logged. Due: March 15. Auto-scheduled for payment on March 13. Approval request sent to Controller Mike R.'
        },
        lead: {
            email: { from: 'emma.wilson@techstartup.io', subject: 'Interested in your Enterprise plan', body: 'Hi, I\'m the CTO of TechStartup (50 employees). We\'re looking for an AI automation solution. Can we schedule a demo? Budget is around $5-10K.' },
            classification: { category: 'Sales Lead — Hot', priority: 'Urgent', sentiment: 'Positive / High Intent' },
            extracted: { contact: 'Emma Wilson, CTO', company: 'TechStartup (50 employees)', interest: 'Enterprise plan', budget: '$5,000-$10,000' },
            routing: { team: 'Sales Team', assignee: 'AE David K.', sla: '1 hour (hot lead)' },
            response: 'Hi Emma! Thanks for your interest in our Enterprise plan. I\'d love to show you a personalized demo for TechStartup. I\'ve reserved Thursday at 2 PM — does that work? I\'ll prepare a custom proposal based on your 50-person team. Looking forward to it!'
        },
        complaint: {
            email: { from: 'angry_customer@email.com', subject: 'TERRIBLE SERVICE - I want a full refund NOW', body: 'This is the WORST experience I\'ve ever had. Your product broke after 2 days and nobody answers the phone. I want a FULL REFUND or I\'m leaving 1-star reviews everywhere.' },
            classification: { category: 'Complaint — ESCALATED', priority: 'Critical', sentiment: 'Very Negative — Churn Risk' },
            extracted: { issue: 'Product defect + support unavailability', urgency: 'Immediate action required', churnRisk: 'Very High', demand: 'Full refund' },
            routing: { team: 'CS Manager (Escalated)', assignee: 'Manager Lisa H.', sla: '30 minutes' },
            response: 'I sincerely apologize for this frustrating experience. I\'ve processed a full refund immediately — you\'ll see it in 2-3 business days. I\'m also sending a free replacement via express shipping. Our CS Manager Lisa will personally follow up within 30 minutes.'
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
        const connectors = document.querySelectorAll('.pipeline-connector');

        // Reset
        steps.forEach(s => document.getElementById('step-' + s).className = 'pipeline-step');
        connectors.forEach(c => c.className = 'pipeline-connector');
        status.textContent = 'Processing...';
        status.className = 'auto-status running';
        output.innerHTML = '<div class="auto-placeholder">Scanning incoming email...</div>';

        await wait(500);
        activate('receive');
        output.innerHTML = renderBlock('📨 Incoming Email', 'category',
            `<strong>From:</strong> ${data.email.from}<br><strong>Subject:</strong> ${data.email.subject}<br><br>"${data.email.body}"`);

        await wait(1200);
        complete('receive'); if (connectors[0]) connectors[0].classList.add('done');
        activate('classify');
        await wait(1000);
        output.innerHTML = renderBlock('🧠 AI Classification', 'category',
            `<strong>Category:</strong> ${data.classification.category}<br><strong>Priority:</strong> ${data.classification.priority}<br><strong>Sentiment:</strong> ${data.classification.sentiment}`)
            + `<span class="result-label label-priority" style="margin-left:8px;display:inline-block;margin-top:8px">Priority: ${data.classification.priority}</span>`;

        await wait(1000);
        complete('classify'); if (connectors[1]) connectors[1].classList.add('done');
        activate('extract');
        await wait(900);
        const entries = Object.entries(data.extracted).map(([k, v]) =>
            `<strong>${k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}:</strong> ${v}`).join('<br>');
        output.innerHTML = renderBlock('🔍 Extracted Data', 'action', entries);

        await wait(800);
        complete('extract'); if (connectors[2]) connectors[2].classList.add('done');
        activate('route');
        await wait(800);
        output.innerHTML = renderBlock('🔀 Smart Routing', 'category',
            `<strong>Team:</strong> ${data.routing.team}<br><strong>Assigned to:</strong> ${data.routing.assignee}<br><strong>SLA:</strong> ${data.routing.sla}`);

        await wait(900);
        complete('route'); if (connectors[3]) connectors[3].classList.add('done');
        activate('respond');
        await wait(800);
        complete('respond');
        output.innerHTML = renderBlock('✉️ Auto-Generated Response', 'action',
            `"${data.response}"`)
            + `<p style="margin-top:12px;color:var(--success);font-weight:600;font-size:0.85rem">✅ Completed — Total time: ${(3.5 + Math.random() * 2).toFixed(1)}s</p>`;

        status.textContent = 'Completed ✓';
        status.className = 'auto-status';
        isRunning = false;
    }

    function activate(id) { document.getElementById('step-' + id).className = 'pipeline-step active'; }
    function complete(id) { document.getElementById('step-' + id).className = 'pipeline-step done'; }
    function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

    function renderBlock(title, type, content) {
        return `<div class="auto-result"><span class="result-label label-${type}">${title}</span><p>${content}</p></div>`;
    }
}

// ===== FAQ =====
function initFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
        const q = item.querySelector('.faq-q');
        q.addEventListener('click', () => {
            const wasOpen = item.classList.contains('open');
            // Close all
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
            // Open clicked (if wasn't open)
            if (!wasOpen) item.classList.add('open');
        });
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    const form = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Collect form data
            const data = new FormData(form);
            const entries = {};
            data.forEach((v, k) => entries[k] = v);

            // Try to submit to Formspree (will fail gracefully if no real ID)
            fetch(form.action, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: data
            }).catch(() => {});

            // Show success regardless (for demo purposes / portfolio showcase)
            form.style.display = 'none';
            success.style.display = 'block';

            // Also log to console for testing
            console.log('Form submission:', entries);
        });
    }
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger animations within same section
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    const animElements = document.querySelectorAll(
        '.service-card, .result-card, .price-card, .process-step, .problem-list li, .solution-list li, .channel, .faq-item, .proof-item'
    );

    animElements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        // Stagger within groups
        const siblings = el.parentElement.children;
        const index = Array.from(siblings).indexOf(el);
        el.dataset.delay = index * 80;
        observer.observe(el);
    });
}
