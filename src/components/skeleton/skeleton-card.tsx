import { Card, CardContent } from "@/components";

export default function SkeletonCard() {
  return (
    <Card className="p-2 h-full flex justify-center min-w-[20rem] animate-pulse">
      <CardContent>
        <div className="space-y-2 max-w-96 w-full">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-16 w-16 rounded-full bg-gray-200"></div>
                <div>
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                  <div className="h-3 w-48 bg-gray-200 mt-2 rounded"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="h-3 w-24 bg-gray-200 mb-2 rounded"></div>
            <div className="flex flex-wrap gap-2">
              <div className="h-6 w-16 bg-gray-200 rounded"></div>
              <div className="h-6 w-20 bg-gray-200 rounded"></div>
              <div className="h-6 w-14 bg-gray-200 rounded"></div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="h-3 w-24 bg-gray-200 mb-2 rounded"></div>
            <div className="space-y-2">
              <div className="h-3 w-40 bg-gray-200 rounded"></div>
              <div className="h-3 w-32 bg-gray-200 rounded"></div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {Array(8).fill(0).map((_, i) => (
                <div key={i} className="h-6 w-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}