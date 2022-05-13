export const note = `# Welcome to Typedelic✨

Thank you for Downloading Typedelic!!
For more information, please visit:

* [Official Website](https://typedelic.netlify.app/)
* [Github repository](https://github.com/typedelic-app/typedelic)

## Codeblocks

\`\`\`jsx App.jsx
const Hello = ({ name }) => {
  return (
    <div className="hello">
      <h1>'Hello, {name} 👋✨'</h1>
    </div>
  )
}
export default Hello;
\`\`\`

## Diagrams

### Mermaid

\`\`\`mermaid flowchart
flowchart TB
  User-->LB[Load Balanser]
  LB--> Web1[Web Server] & Web2[Web Server]
  Web1 & Web2 --> DB[(Database)]
\`\`\`

\`\`\`mermaid sequence
sequenceDiagram
  participant U as User
  participant S as Server
  participant DB
  U->>+S: Request
  S->>DB: SQL
  DB-->>S: Data
  S-->>-U: HTML
  U->>+S: Request
  S-->>-U: JavaScript / CSS
\`\`\`

\`\`\`mermaid pie chart
pie
  title Key elements in Product X
  "Calcium" : 60
  "Potassium" : 20
  "Magnesium" : 15
  "Iron" :  5
\`\`\`

### PlantUML

\`\`\`uml Entities
entity "Entity01" as e01 {
  *e1_id : number <<generated>>
  --
  *name : text
  description : text
}
entity "Entity02" as e02 {
  *e2_id : number <<generated>>
  --
  *e1_id : number <<FK>>
  other_details : text
}
entity "Entity03" as e03 {
  *e3_id : number <<generated>>
  --
  e1_id : number <<FK>>
  other_details : text
}

e01 ||..o{ e02
e01 |o..o{ e03
\`\`\`

\`\`\`uml Components
package "Some Group" {
  HTTP - [First Component]
  [Another Component]
}

node "Other Groups" {
  FTP - [Second Component]
  [First Component] --> FTP
}

cloud {
  [Example 1]
}

database "MySql" {
  folder "This is my folder" {
    [Folder 3]
  }
  frame "Foo" {
    [Frame 4]
  }
}

[Another Component] --> [Example 1]
[Example 1] --> [Folder 3]
[Folder 3] --> [Frame 4]
\`\`\`

### flowchart.js

\`\`\`flow
st=>start: Start
e=>end: End
op1=>operation: My Operation
sub1=>subroutine: My Subroutine
cond=>condition: Yes or No?
io=>inputoutput: catch something...
para=>parallel: parallel task

st->op1->cond
cond(yes)->io->e
cond(no)->para
para(path1, bottom)->sub1(right)->op1
para(path2, top)->op1
\`\`\`

### js-sequence-diagram

\`\`\`sequence
Title: Here is a title
A->B: Normal line
B-->C: Dashed line
C->>D: Open arrow
D-->>A: Dashed open arrow
\`\`\`

## Math typesetting (KaTeX)

$ e^{i\\theta} = \\cos\\theta + i \\sin\\theta $

$ f(x) = \\frac{1}{\\sqrt{2\\pi\\sigma^2}}\\exp{-\\frac{(x-\\mu)^2}{2\\sigma^2}} $

$$
\\frac{1}{1} + \\frac{1}{2} + \\frac{1}{3} + \\dots = \\displaystyle\\sum_{i=1}^\\infty \\frac{1}{n}= \\infty
$$

## Lists

### Task List

* [ ] Task-List 1
    * [x] Task-List 1-1
    * [ ] Task-List 1-2
* [x] Task-List 2
* [ ] Task-List 3

### Unordered List

- Unordered-list 1
    - Unordered-list 1-1
    - Unordered-list 1-2
- Unordered-list 2
- Unordered-list 3

### Ordered List

1. Unordered-list 1
    1. Unordered-list 1-1
    2. Unordered-list 1-2
2. Unordered-list 2
3. Unordered-list 3

## Table

| Left     |    Right |   Center   |
|:-------- |---------:|:----------:|
| This     |     This |    This    |
| column   |   column |   column   |
| will     |     will |    will    |
| be       |       be |     be     |
| left     |    right |   center   |
| aligned  |  aligned |  aligned   |

`;
