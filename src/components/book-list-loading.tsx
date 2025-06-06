import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen } from "lucide-react";

export function BookListLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <Card key={i} className="flex flex-col h-full overflow-hidden shadow-lg rounded-lg border border-border">
          <CardHeader className="p-0 relative aspect-[2/3] w-full">
             <Skeleton className="w-full h-full bg-muted flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-muted-foreground opacity-25" />
             </Skeleton>
          </CardHeader>
          <CardContent className="p-4 flex-grow flex flex-col justify-between">
            <div>
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-3" />
            </div>
            <Skeleton className="h-4 w-1/3 mt-2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
