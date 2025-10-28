# Style Guide

## Writing Style

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

## Formatting Markdown

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

## Code Examples

**Good code examples:**
```javascript
// Good: Clear, commented, complete
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
// Avoid: Incomplete, unclear, no context
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

## Exercise Format

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

## File Naming Conventions

- Module files: `01-fundamentals.md`, `02-package-json.md`
- Exercise files: `exercise-01.md`, `exercise-02.md`
- Example code: `example-express-app/`, `example-package/`
- Use lowercase and hyphens (kebab-case)
