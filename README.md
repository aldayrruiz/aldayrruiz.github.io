# 🔐 Hack The Box Write-ups — GitHub Pages Template

> A clean, extensible **GitHub Pages + Jekyll** template for publishing structured Hack The Box write-ups.

This repository powers **aldayrruiz.github.io**, where I publish my Hack The Box walkthroughs.
It is also designed to be reused as a **template** for anyone who wants to host their own HTB write-ups using GitHub Pages.

---

## 🌐 Live Site

**Production URL:**
👉 [https://aldayrruiz.github.io](https://aldayrruiz.github.io)

---

## 🚀 Purpose

This project provides:

* A structured layout for Hack The Box machine write-ups
* GitHub Pages integration (no external hosting required)
* Consistent directory organization
* Markdown-based workflow
* Optional automation for parsing Obsidian notes

It can be forked and customized for personal use.

---

# 📦 Technology Stack

* **Jekyll**
* **GitHub Pages**
* **Ruby / Bundler**
* Markdown-based content structure

---

# 🛠 Installation

## 1️⃣ Install Dependencies

Follow the official Jekyll installation guide:

🔗 [https://jekyllrb.com/docs/installation/ubuntu/](https://jekyllrb.com/docs/installation/ubuntu/)

Ensure the following are installed:

* Ruby
* RubyGems
* Bundler
* Jekyll

---

## 2️⃣ Install Project Dependencies

```bash
bundle install
```

---

## 3️⃣ Run Locally

```bash
bundle exec jekyll serve
```

Then open:

```
http://localhost:4000
```

---

# 🧠 Adding a New Walkthrough

## 📄 File Naming Convention

Create a new file inside the appropriate posts directory using:

```
YYYY-MM-DD-MACHINE_NAME.htb.md
```

Example:

```
2026-02-10-blue.htb.md
```

---

## 🖼 Image Structure

If your write-up contains images, place them in:

```
assets/machines/MACHINE_NAME.htb/images/
```

Example:

```
assets/machines/blue.htb/images/exploit.png
```

---

## 🖼 Referencing Images in Markdown

Use absolute paths:

```markdown
![Exploit Screenshot](/assets/machines/blue.htb/images/exploit.png)
```

---

# ⚙️ Obsidian Parsing Automation

Inside the `parsing/` directory, there is an automation script that converts Obsidian `.md` notes into the required format for this project.

This allows:

* Faster write-up publishing
* Structured formatting
* Cleaner migration from personal notes

Review:

```
/parsing/
```

---

# 🧩 Using This as a Template

You can:

* Fork this repository
* Replace content with your own write-ups
* Update `_config.yml`
* Change branding, theme, or layout

Then enable GitHub Pages in:

```
Settings → Pages
```

Set the branch to `main` (or your default branch).

Your site will be available at:

```
https://yourusername.github.io
```

---

# 📁 Project Structure Overview

```
.
├── _posts/
├── assets/
│   └── machines/
│       └── MACHINE_NAME.htb/
│           └── images/
├── parsing/
├── _config.yml
└── README.md
```

---

# 👤 Author

**Aldayr Ruiz**
Ethical Hacker | Pentester

Website: [https://aldayrruiz.github.io](https://aldayrruiz.github.io)

---

# 📜 License

This repository is intended for educational use.
Feel free to fork and adapt it to your workflow.

---

If you use this template, consider improving it and contributing back.
