import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const openSourceLibraries = [
  { name: "Next.js", license: "MIT", website: "https://nextjs.org/" },
  { name: "React", license: "MIT", website: "https://reactjs.org/" },
  { name: "Tailwind CSS", license: "MIT", website: "https://tailwindcss.com/" },
  { name: "shadcn/ui", license: "MIT", website: "https://ui.shadcn.com/" },
  { name: "Lucide React", license: "ISC", website: "https://lucide.dev/" },
  { name: "React Markdown", license: "MIT", website: "https://github.com/remarkjs/react-markdown" },
  { name: "Recharts", license: "MIT", website: "https://recharts.org/" },
  {
    name: "React Syntax Highlighter",
    license: "MIT",
    website: "https://github.com/react-syntax-highlighter/react-syntax-highlighter",
  },
]

export default function OpenSource() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">오픈 소스 라이선스</h1>
      <p className="mb-6">
        BloGuide는 다음과 같은 오픈 소스 프로젝트를 사용하고 있습니다. 각 프로젝트의 노고에 깊은 감사를 표합니다.
      </p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>라이브러리</TableHead>
            <TableHead>라이선스</TableHead>
            <TableHead>웹사이트</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {openSourceLibraries.map((lib) => (
            <TableRow key={lib.name}>
              <TableCell>{lib.name}</TableCell>
              <TableCell>{lib.license}</TableCell>
              <TableCell>
                <a
                  href={lib.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {lib.website}
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

