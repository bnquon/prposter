import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React from "react";
import { Trash } from "lucide-react";

interface MediaUploadProps {
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
}

export default function MediaUpload({
  selectedFile,
  setSelectedFile,
}: MediaUploadProps) {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <Label
          htmlFor="file"
          className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center"
        >
          <FileIcon className="w-12 h-12" />
          <span className="text-sm font-medium text-gray-500">
            Drag and drop a file or click to browse
          </span>
          <span className="text-xs text-gray-500">
            Image or video file up to 5MB
          </span>
        </Label>
        <div className="space-y-2 text-sm">
          <Label htmlFor="file" className="text-sm font-medium">
            {selectedFile ? (
              <div className="flex justify-between">
                {selectedFile.name}
                <Trash
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                  }}
                  className="w-4 h-4 cursor-pointer"
                />
              </div>
            ) : (
              "No file selected"
            )}
          </Label>
          <Input
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            multiple={false}
            id="file"
            type="file"
            placeholder="File"
            accept="image/*, video/*"
            className="hidden"
          />
        </div>

        {selectedFile &&
          (selectedFile.type.startsWith("image") ? (
            <img
              className="max-w-[200px] h-auto"
              src={URL.createObjectURL(selectedFile)}
              alt="Attachment Preview"
            />
          ) : (
            <video width="200" height="300" controls>
              <source
                src={URL.createObjectURL(selectedFile)}
                type="video/mp4"
              />
            </video>
          ))}
      </CardContent>
    </Card>
  );
}

function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}
