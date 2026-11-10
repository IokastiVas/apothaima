# apothaima.gr

Το site του **ΑΠΟΘΑΙΜΑ COMMUNITY ΑΜΚΕ**. Φτιαγμένο με [Astro](https://astro.build), στατικό, φιλοξενία στο Vercel.

## Τρέξιμο στον υπολογιστή

```bash
npm install
npm run dev      # ανοίγει στο http://localhost:4321
npm run build    # φτιάχνει το τελικό site στον φάκελο dist/
```

## Πώς προσθέτω νέα δράση (χωρίς κώδικα)

1. Αντιγράψτε ένα αρχείο από το `src/content/draseis/` και δώστε του νέο όνομα, π.χ. `2026-12-10i-aimodosia-megaro.md`. Το όνομα γίνεται το link: `apothaima.gr/draseis/2026-12-10i-aimodosia-megaro/`.
2. Αλλάξτε τα στοιχεία στο πάνω μέρος (`title`, `startDate`, `location` κ.λπ.). Οι ημερομηνίες γράφονται `ΕΕΕΕ-ΜΜ-ΗΗ`.
3. Γράψτε την περιγραφή κάτω από τη δεύτερη γραμμή `---`.
4. Βάλτε τις φωτογραφίες στο `src/assets/draseis/<όνομα-δράσης>/` και γράψτε τες στο `cover` και `gallery`, π.χ. `../../assets/draseis/2026-12-10i-aimodosia-megaro/01.jpg`.
5. Κάντε commit. Το Vercel ανεβάζει το site μόνο του σε 1–2 λεπτά.

Αν η ημερομηνία είναι στο μέλλον, η δράση εμφανίζεται αυτόματα ως «Επόμενη δράση». Όταν περάσει, μετακινείται μόνη της στις παλιές (το site ξαναχτίζεται κάθε βράδυ).

`tag`: `aimodosia` ή `allileggyi`. Αν κάτι λείπει ή είναι λάθος, το build σταματάει και λέει τι φταίει.

## Άλλα στοιχεία

- Τηλέφωνο, email, social: `src/data/site.json`
- Συνεργάτες: `src/data/partners.json`
- Αριθμός ασκών αίματος: `src/data/stats.json` (με `null` το κουτί δεν εμφανίζεται)
- Λογότυπο: `src/components/Logo.astro`
- Χρώματα: στην αρχή του `src/styles/global.css`

## Deploy (Vercel)

1. Vercel → Add New Project → διαλέξτε αυτό το repo. Framework: Astro (το βρίσκει μόνο του).
2. Settings → Domains: προσθέστε `apothaima.gr` (κύριο), και τα `www.apothaima.gr`, `apothaima.com`, `www.apothaima.com`, `apothaima.org`, `www.apothaima.org` με **Redirect to apothaima.gr (301)**.
3. Στον registrar βάλτε τα DNS records που δείχνει το Vercel για κάθε domain.
4. Settings → Git → Deploy Hooks: φτιάξτε ένα hook και βάλτε το URL στο GitHub ως secret `VERCEL_DEPLOY_HOOK` (για το βραδινό rebuild).

## Εκκρεμότητες από τον οργανισμό

- [ ] Πραγματικές φωτογραφίες ανά δράση (τώρα υπάρχουν προσωρινές εικόνες στο `src/assets/placeholders/`)
- [ ] Λογότυπο σε SVG ή PNG υψηλής ανάλυσης
- [ ] Συνολικός αριθμός ασκών αίματος
- [ ] Λογότυπα συνεργατών και άδεια να εμφανιστούν
- [ ] Επόμενη προγραμματισμένη δράση
