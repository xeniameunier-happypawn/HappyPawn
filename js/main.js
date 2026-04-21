document.addEventListener('DOMContentLoaded', () => {

    // ══════════════════════════════════════
    // SMOOTH SCROLL (liens ancres)
    // ══════════════════════════════════════
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ══════════════════════════════════════
    // FADE-IN AU SCROLL
    // ══════════════════════════════════════
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    fadeElements.forEach((el, i) => {
        el.style.transitionDelay = `${i * 80}ms`;
        observer.observe(el);
    });

    // ══════════════════════════════════════
    // COMPTEUR CARACTÈRES — TEXTAREA
    // ══════════════════════════════════════
    const messageField = document.getElementById('message');
    const charCount = document.getElementById('char-count');

    if (messageField && charCount) {
        messageField.addEventListener('input', () => {
            const len = messageField.value.length;
            charCount.textContent = `${len} / 1000`;
            charCount.style.color = len > 1000 ? '#DC2626' : '#6B7280';
        });
    }

    // ══════════════════════════════════════
    // VALIDATION
    // ══════════════════════════════════════
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnLoader = document.getElementById('btn-loader');
    const confirmation = document.getElementById('confirmation');
    const confirmationTitle = document.getElementById('confirmation-title');
    const errorNetwork = document.getElementById('error-network');

    // ✅ BON URL WEBHOOK N8N
    const WEBHOOK_URL = 'https://n8n-formation.isao.io/webhook/3e3df76e-c94f-4c17-903c-5c75cc0ff1b1';

    const namePattern = /^[A-Za-zÀ-ÿ\s\-']{2,50}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validateField(field, errorEl, validationFn, errorMsg) {
        const value = field.value.trim();
        if (!value) {
            field.classList.add('invalid');
            field.classList.remove('valid');
            errorEl.textContent = 'Ce champ est obligatoire.';
            return false;
        }
        if (!validationFn(value)) {
            field.classList.add('invalid');
            field.classList.remove('valid');
            errorEl.textContent = errorMsg;
            return false;
        }
        field.classList.remove('invalid');
        field.classList.add('valid');
        errorEl.textContent = '';
        return true;
    }

    const fields = [
        {
            el: document.getElementById('prenom'),
            errorEl: document.getElementById('error-prenom'),
            fn: v => namePattern.test(v),
            msg: 'Lettres uniquement, entre 2 et 50 caractères.'
        },
        {
            el: document.getElementById('nom'),
            errorEl: document.getElementById('error-nom'),
            fn: v => namePattern.test(v),
            msg: 'Lettres uniquement, entre 2 et 50 caractères.'
        },
        {
            el: document.getElementById('email'),
            errorEl: document.getElementById('error-email'),
            fn: v => emailPattern.test(v),
            msg: 'Veuillez entrer une adresse email valide.'
        },
        {
            el: document.getElementById('message'),
            errorEl: document.getElementById('error-message'),
            fn: v => v.length >= 10 && v.length <= 1000,
            msg: 'Le message doit contenir entre 10 et 1000 caractères.'
        }
    ];

    // Validation en temps réel (blur + correction)
    fields.forEach(({ el, errorEl, fn, msg }) => {
        el.addEventListener('blur', () => validateField(el, errorEl, fn, msg));
        el.addEventListener('input', () => {
            if (el.classList.contains('invalid')) {
                validateField(el, errorEl, fn, msg);
            }
        });
    });

    // ══════════════════════════════════════
    // SOUMISSION → WEBHOOK N8N
    // ══════════════════════════════════════
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Valider tous les champs
        let allValid = true;
        fields.forEach(({ el, errorEl, fn, msg }) => {
            if (!validateField(el, errorEl, fn, msg)) allValid = false;
        });
        if (!allValid) return;

        // UI : loading
        btnText.classList.add('hidden');
        btnLoader.classList.remove('hidden');
        submitBtn.disabled = true;
        errorNetwork.classList.add('hidden');

        const data = {
            prenom: document.getElementById('prenom').value.trim(),
            nom: document.getElementById('nom').value.trim(),
            email: document.getElementById('email').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        try {
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                // Succès → confirmation personnalisée
                form.classList.add('hidden');
                confirmationTitle.textContent = `Merci, ${data.prenom} ! Votre demande est envoyée`;
                confirmation.classList.remove('hidden');
            } else {
                throw new Error(`Erreur serveur : ${response.status}`);
            }
        } catch (error) {
            console.error('Erreur envoi formulaire :', error);
            errorNetwork.classList.remove('hidden');
        } finally {
            btnText.classList.remove('hidden');
            btnLoader.classList.add('hidden');
            submitBtn.disabled = false;
        }
    });

});
