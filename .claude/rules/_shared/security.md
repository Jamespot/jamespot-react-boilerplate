# Sécurité

## Pas de secrets dans le code

Interdit d'écrire des secrets en dur dans les fichiers :

- Clés API, tokens, mots de passe
- Clés AWS (format `AKIA` suivi de 16 caractères)
- Tokens JWT (format `eyJ...`)
- Clés privées
- URLs contenant des identifiants (`https://user:pass@...`)

Cette règle peut être enforced par un hook PreToolUse de Claude Code (`.claude/hooks/preToolUse-secrets.sh`) qui bloque l'écriture avant qu'elle n'atteigne le fichier.

## Pas d'écriture dans les fichiers `.env`

Les fichiers `.env`, `.env.*`, et équivalents ne doivent pas être modifiés par les outils automatisés. Les variables d'environnement sont gérées manuellement ou via un gestionnaire de secrets.

## Gestion des credentials

- Les credentials de test ou de développement sont dans des variables d'environnement.
- Les credentials de test Cypress (comptes de test) vivent dans un fichier dédié versionné, **jamais** dans des commentaires ou du code d'application.
- Le CSRF est géré par la couche réseau.

## Règle d'audit

Avant tout commit, relire le diff et vérifier qu'aucune valeur n'a l'apparence d'un secret. En cas de doute, un `grep` rapide sur les patterns connus (`AKIA`, `eyJ`, `Bearer `, `password=`, `api_key=`) permet une vérification ciblée.
