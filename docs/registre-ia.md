# 🤖 Registre d'utilisation de l'Intelligence Artificielle — Happy Pawn

> Document interne — Non publié sur le site
> Responsable : Xénia Meunier
> Dernière mise à jour : 21 avril 2026

---

## 1. Workflow "Lead Capture" — Email de confirmation

| Champ                        | Détail                                                        |
|------------------------------|---------------------------------------------------------------|
| **Modèle IA utilisé**        | GPT-5.4 (OpenAI)                                             |
| **Finalité**                 | Personnalisation de l'email de confirmation envoyé au prospect après soumission du formulaire de contact |
| **Déclencheur**              | Soumission du formulaire sur happy-pawn.vercel.app            |
| **Données personnelles transmises au modèle** | Prénom, nom, email, contenu du message           |
| **Données NON transmises**   | Adresse IP, données de navigation, choix newsletter           |
| **Base légale (RGPD)**       | Intérêt légitime (répondre à une demande commerciale B2B)     |
| **Paramètres du modèle**     | Température : 0.7 · Max tokens : 500 · Top-p : 1             |
| **Mode API**                 | API OpenAI — données NON utilisées pour l'entraînement (opt-out activé) |
| **Sécurité**                 | HTTPS · API key stockée en variable d'environnement N8N · Aucun log des prompts côté client |
| **Vérification humaine**     | Le template de prompt est pré-validé. L'email généré est envoyé automatiquement sans relecture unitaire. Le template est révisé mensuellement. |
| **Outil d'orchestration**    | N8N (self-hosted sur n8n-formation.isao.io)                   |

---

## 2. Workflow "Newsletter" — Rédaction de contenu éditorial

| Champ                        | Détail                                                        |
|------------------------------|---------------------------------------------------------------|
| **Modèle IA utilisé**        | GPT-4o (OpenAI)                                               |
| **Finalité**                 | Génération de contenu éditorial pour la newsletter hebdomadaire sur la nutrition canine et féline |
| **Déclencheur**              | Manuel ou planifié (hebdomadaire)                             |
| **Données personnelles transmises au modèle** | Aucune                                        |
| **Base légale (RGPD)**       | Non applicable (aucune donnée personnelle traitée par le modèle) |
| **Paramètres du modèle**     | Température : 0.7 · Max tokens : 2000 · Top-p : 1            |
| **Mode API**                 | API OpenAI — données NON utilisées pour l'entraînement (opt-out activé) |
| **Sécurité**                 | HTTPS · API key en variable d'environnement                   |
| **Vérification humaine**     | **Obligatoire** — Chaque contenu généré est relu et validé par Xénia Meunier (experte certifiée en nutrition animale) avant publication. Les informations nutritionnelles sont vérifiées sur sources scientifiques. |
| **Outil d'orchestration**    | N8N (self-hosted sur n8n-formation.isao.io)                   |

---

## 3. Mesures transversales

| Mesure                                | Statut     |
|---------------------------------------|------------|
| Opt-out entraînement OpenAI activé    | ✅ Oui     |
| API keys en variables d'environnement | ✅ Oui     |
| Communication HTTPS uniquement        | ✅ Oui     |
| Mention transparence IA sur le site   | ✅ Oui (footer + politique de confidentialité section 11) |
| Mention transparence IA dans newsletters | 🔲 À ajouter dans le footer de chaque newsletter |
| Révision trimestrielle de ce registre | 🔲 Prochaine révision : juillet 2026 |

---

## 4. Cadre réglementaire de référence

- **RGPD** — Article 5.2 (accountability), Article 13 (information des personnes), Article 22 (décisions automatisées)
- **AI Act** (Règlement UE 2024/1689) — Articles 50 et suivants relatifs aux obligations de transparence pour les systèmes d'IA à usage général. Application progressive 2025-2027.

---

*Ce registre est mis à jour à chaque modification des workflows IA ou ajout d'un nouveau cas d'usage.*
