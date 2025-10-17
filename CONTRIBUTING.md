# Contributing to NPM Mastery Course

First off, thank you for considering contributing to the NPM Mastery Course! It's people like you that make this course a great learning resource for the community. 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Style Guide](#style-guide)
- [Submitting Changes](#submitting-changes)
- [Review Process](#review-process)

## 📜 Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. By participating, you agree to maintain a respectful, inclusive, and harassment-free environment for everyone.

### Our Standards

**Positive behaviors include:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Accepting constructive criticism gracefully
- Focusing on what's best for the community
- Showing empathy towards other community members

**Unacceptable behaviors include:**
- Harassment, trolling, or insulting comments
- Personal or political attacks
- Publishing others' private information
- Any conduct inappropriate in a professional setting

## 🤝 How Can I Contribute?

There are many ways to contribute to this course:

### 1. Report Issues or Suggest Improvements

Found something wrong or have an idea? [Open an issue](https://github.com/yourusername/npm-mastery-course/issues/new)!

**For bug reports, include:**
- Module number and section
- Description of the error or outdated information
- Suggested correction (if applicable)
- Why it matters

**For suggestions, include:**
- What you'd like to see added/changed
- Why it would improve the course
- Any relevant resources or examples

### 2. Improve Documentation

Help make explanations clearer:
- Fix typos or grammatical errors
- Improve clarity of explanations
- Add diagrams or visuals
- Enhance code examples with comments

### 3. Add Examples

Share real-world examples:
- Additional use cases
- Industry-specific scenarios
- Common patterns you've encountered
- Solutions to problems you've solved

### 4. Contribute Code Examples

Expand the practical exercises:
- More complete project examples
- Alternative approaches to problems
- Different tech stack integrations
- Testing examples

### 5. Translate Content

Help make the course accessible worldwide:
- Translate modules into other languages
- Review existing translations
- Maintain translation consistency

### 6. Create Supplementary Materials

Enhance learning with:
- Video walkthroughs
- Interactive quizzes
- Cheat sheets
- Mind maps or flowcharts

## 🚀 Getting Started

### Prerequisites

- A GitHub account
- Basic knowledge of Git and Markdown
- Familiarity with NPM (you're learning it here!)

### Setting Up Your Development Environment

1. **Fork the repository**
   - Click the "Fork" button at the top right of the repository page

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/npm-mastery-course.git
   cd npm-mastery-course
   ```

3. **Add the upstream repository**
   ```bash
   git remote add upstream https://github.com/yourusername/npm-mastery-course.git
   ```

4. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Making Changes

1. Make your changes in your feature branch
2. Test that all markdown renders correctly
3. Verify all code examples work
4. Ensure consistency with existing content

## 📝 Style Guide

### Writing Style

**Tone:**
- Conversational but professional
- Encouraging and supportive
- Clear and concise
- Avoid jargon when possible (or explain it)

**Structure:**
- Use clear headings (##, ###, ####)
- Break content into digestible sections
- Include practical examples
- Add exercises where appropriate

### Formatting Markdown

**Headers:**
```markdown
## Module Title (H2)
### Major Section (H3)
#### Subsection (H4)
```

**Code Blocks:**
Always specify the language:
````markdown
```bash
npm install express
```

```javascript
const express = require('express');
```

```json
{
  "name": "my-package"
}
```
````

**Emphasis:**
- Use **bold** for important terms or commands
- Use *italics* for emphasis or references
- Use `inline code` for commands, file names, and code snippets

**Lists:**
- Use `-` for unordered lists
- Use `1.` for ordered lists
- Indent nested lists with 2 spaces

**Links:**
```markdown
[Link Text](URL)
[Module 1](modules/01-fundamentals.md)
```

### Code Examples

**Good code examples:**
```javascript
// ✅ Good: Clear, commented, complete
const express = require('express');
const app = express();

// Simple route
app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

**Avoid:**
```javascript
// ❌ Avoid: Incomplete, unclear, no context
app.get('/', (req, res) => {
  // ... code here
});
```

**Command examples:**
```bash
# Always include comments explaining what the command does
# Install Express as a dependency
npm install express

# Start development server
npm run dev
```

### Exercise Format

Structure exercises consistently:
```markdown
**Exercise X.Y - Exercise Title:**

**Objective:** What the learner will accomplish

**Steps:**
1. First step with clear instructions
2. Second step
3. Third step

**Expected Outcome:** What should happen when done correctly

**Common Issues:**
- Problem 1 and solution
- Problem 2 and solution
```

### File Naming Conventions

- Module files: `01-fundamentals.md`, `02-package-json.md`
- Exercise files: `exercise-01.md`, `exercise-02.md`
- Example code: `example-express-app/`, `example-package/`
- Use lowercase and hyphens (kebab-case)

## 🔄 Submitting Changes

### Before Submitting

**Checklist:**
- [ ] Code examples are tested and work
- [ ] Markdown formatting is correct
- [ ] Spelling and grammar are correct
- [ ] Changes are consistent with existing style
- [ ] Commit messages are clear and descriptive
- [ ] Changes are in a feature branch

### Commit Messages

Write clear, descriptive commit messages:

**Format:**
```
type: Short description (50 chars or less)

Longer explanation if needed (wrap at 72 chars)
```

**Types:**
- `docs:` Documentation changes
- `feat:` New feature or content
- `fix:` Bug fix or correction
- `style:` Formatting changes
- `refactor:` Restructuring content
- `test:` Adding tests or examples
- `chore:` Maintenance tasks

**Examples:**
```
docs: Fix typo in Module 6 NPM Scripts section

feat: Add example for npm workspaces in Module 11

fix: Correct npm version command in Module 10
```

### Creating a Pull Request

1. **Push your changes**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open a Pull Request**
   - Go to the original repository
   - Click "Pull Requests" → "New Pull Request"
   - Select your fork and branch
   - Fill in the PR template

3. **PR Description Should Include:**
   - What changes you made
   - Why you made them
   - Which issue it addresses (if applicable)
   - Screenshots (if visual changes)
   - Any breaking changes or notes

**PR Template:**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (typo, error, outdated info)
- [ ] New content (example, exercise, section)
- [ ] Enhancement (improved explanation, clarity)
- [ ] Documentation (README, contributing guide)

## Checklist
- [ ] I have tested all code examples
- [ ] I have checked for spelling/grammar errors
- [ ] My changes follow the style guide
- [ ] I have updated relevant documentation

## Related Issue
Fixes #(issue number)
```

## 👀 Review Process

### What Happens After You Submit

1. **Automated Checks** - Markdown linting and link checking
2. **Maintainer Review** - Usually within 3-5 days
3. **Discussion** - Maintainers may request changes
4. **Approval** - Once approved, your PR will be merged!

### Review Criteria

Maintainers will check:
- ✅ Accuracy of information
- ✅ Consistency with existing content
- ✅ Code examples work as described
- ✅ Follows style guide
- ✅ Adds value to learners

### Feedback

- Be patient - reviews take time
- Be open to feedback and suggestions
- Engage in constructive discussion
- Make requested changes promptly

## 🏷️ Issue Labels

Understanding issue labels:

- `good first issue` - Great for newcomers
- `help wanted` - Looking for contributors
- `bug` - Something isn't working correctly
- `enhancement` - New feature or improvement
- `documentation` - Documentation improvements
- `question` - Further information requested
- `translation` - Translation work needed

## 🌍 Translation Guidelines

### Starting a Translation

1. Open an issue announcing your intention to translate
2. Create a folder: `translations/[language-code]/`
3. Translate modules one at a time
4. Maintain formatting and structure
5. Update links to reference translated files

### Translation Standards

- Keep code examples in English (with translated comments)
- Translate all explanatory text
- Maintain technical terms where appropriate
- Include language code in file names: `01-fundamentals-es.md`

## 💡 Tips for Great Contributions

1. **Start small** - Begin with typo fixes or small improvements
2. **Read existing content** - Understand the style and tone
3. **Ask questions** - Don't hesitate to ask if unsure
4. **Be patient** - Reviews take time
5. **Have fun** - Enjoy contributing to the community!

## 🎓 Recognition

Contributors will be:
- Listed in the README
- Mentioned in release notes
- Given credit in the relevant modules
- Forever appreciated by the community! ❤️

## 📞 Questions?

- **General questions:** Open a [Discussion](https://github.com/yourusername/npm-mastery-course/discussions)
- **Issues or bugs:** Open an [Issue](https://github.com/yourusername/npm-mastery-course/issues)
- **Need help contributing:** Ask in your Pull Request or Issue

---

Thank you for contributing to NPM Mastery Course! Together, we're building an amazing learning resource for the JavaScript community. 🚀