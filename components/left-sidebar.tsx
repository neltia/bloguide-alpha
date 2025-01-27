import { Button } from "@/components/ui/button"

export default function LeftSidebar() {
  const categories = ["기술", "문화", "여행", "음식"]
  const tags = ["기술", "프로그래밍", "웹개발"]

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-semibold">카테고리</h3>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li key={index}>
              <Button variant="ghost" className="w-full justify-start">
                {category}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-4">
        <h3 className="font-semibold">태그</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Button key={index} variant="outline" size="sm">
              #{tag}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

