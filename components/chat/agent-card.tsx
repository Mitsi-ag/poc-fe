import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

interface AgentCardProps {
  id: string
  name: string
  agency: string
  photoUrl: string
  listings: number
  clearanceRate: number
}

export function AgentCard({ id, name, agency, photoUrl, listings, clearanceRate }: AgentCardProps) {
  return (
    <Link href={`/competitors/agents/${id}`} className="block no-underline">
      <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200 border-gray-200 dark:border-gray-800">
        <CardContent className="p-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border">
              <AvatarImage src={photoUrl || "/placeholder.svg"} alt={name} />
              <AvatarFallback>
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm truncate">{name}</h4>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground truncate">{agency}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs px-1.5 py-0 h-5">
                  {listings} listings
                </Badge>
                <Badge variant="outline" className="text-xs px-1.5 py-0 h-5">
                  {clearanceRate}% clearance
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
